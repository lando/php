#!/bin/bash
# Usage: mariadb-compat-install.sh
# Creates wrapper scripts to map deprecated mysql commands to mariadb equivalents
# The mariadb-client package is already installed in the base image

set -e

echo "Installing MariaDB compatibility wrappers..."

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

# Create MySQL client config with compatibility settings
cat > /etc/mysql/conf.d/lando.cnf << 'MYCNF'
[client]
default-character-set=utf8mb4

[client-mariadb]
# Prevent SSL errors when connecting to servers without SSL
disable-ssl-verify-server-cert
MYCNF

echo "MariaDB compatibility wrappers installed"
