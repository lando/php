#!/bin/bash
# Usage: mariadb-compat-install.sh
# Creates wrapper scripts to map deprecated mysql commands to mariadb equivalents
# and inject --skip-ssl-verify-server-cert so --defaults-file callers (e.g. Drush)
# can reach local Lando DB services that do not speak TLS.
# The mariadb-client package is already installed in the base image

set -e

SSL_FLAG="--skip-ssl-verify-server-cert"
# Non-interactive client tools only. Do not glob mariadb-* — helpers such as
# mariadb-secure-installation hang on --help.
CLIENT_CMDS="mariadb mariadb-admin mariadb-dump mariadb-check mariadb-import mariadb-show"

echo "Installing MariaDB compatibility wrappers..."

# Run a client probe with a short timeout so a stuck binary cannot hang install.
probe_cmd() {
  if command -v timeout >/dev/null 2>&1; then
    timeout 5 "$@"
  else
    "$@"
  fi
}

# Return 0 if the client binary accepts --skip-ssl-verify-server-cert.
# Gate on client capability, not DB server version: appserver clients are often
# 11.x while the local DB service is older (e.g. 10.6) and has no TLS.
client_supports_ssl_flag() {
  local bin="$1"
  if probe_cmd "$bin" --help 2>&1 | grep -q -- '--ssl-verify-server-cert'; then
    return 0
  fi
  probe_cmd "$bin" "$SSL_FLAG" --version >/dev/null 2>&1
}

# Install a PATH wrapper that appends SSL_FLAG after caller args so
# --defaults-file remains the first client option (required by MariaDB).
install_ssl_wrapper() {
  local cmd="$1"
  local real="$2"

  if [[ ! -x "$real" ]]; then
    return 0
  fi
  if ! client_supports_ssl_flag "$real"; then
    echo "  Skipping SSL wrapper for $cmd (client does not support $SSL_FLAG)"
    return 0
  fi

  cat > "/usr/local/bin/$cmd" << EOF
#!/bin/bash
exec -a "\$0" "$real" "\$@" $SSL_FLAG
EOF
  chmod +x "/usr/local/bin/$cmd"
  echo "  Created SSL wrapper: $cmd -> $real \"\$@\" $SSL_FLAG"
}

# Wrap known client tools from standard locations (not /usr/local/bin, so
# re-runs do not wrap our own wrappers).
for cmd in $CLIENT_CMDS; do
  for dir in /usr/bin /usr/sbin; do
    bin="$dir/$cmd"
    [[ -e "$bin" && -x "$bin" ]] || continue
    real="$(readlink -f "$bin" || echo "$bin")"
    install_ssl_wrapper "$cmd" "$real"
    break
  done
done

# Create wrapper scripts for each mysql* command that maps to mariadb* equivalent
for cmd in mysql mysqldump mysqladmin mysqlcheck mysqlimport mysqlshow; do
  suffix="${cmd#mysql}"
  mariadb_cmd="mariadb${suffix:+-}${suffix}"

  if command -v "$mariadb_cmd" &> /dev/null; then
    cat > "/usr/local/bin/$cmd" << EOF
#!/bin/bash
exec -a "\$0" $mariadb_cmd "\$@"
EOF
    chmod +x "/usr/local/bin/$cmd"
    echo "  Created wrapper: $cmd -> $mariadb_cmd"
  fi
done

# Create config directory if it doesn't exist
mkdir -p /etc/mysql/conf.d

# Create MySQL client config with compatibility settings.
# --defaults-file ignores this file; the PATH wrappers above cover that case.
cat > /etc/mysql/conf.d/lando.cnf << 'MYCNF'
[client]
default-character-set=utf8mb4

[client-mariadb]
# Prevent SSL errors when connecting to servers without SSL
disable-ssl-verify-server-cert

MYCNF

echo "MariaDB compatibility wrappers installed"
