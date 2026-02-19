#!/bin/bash
# Install MySQL client from pre-downloaded binaries
# Usage: mysql-client-install.sh <version>
# Examples: mysql-client-install.sh 8.4, mysql-client-install.sh 8.0

set -e

VERSION="${1:-8.4}"

echo "Installing MySQL $VERSION client..."

# Map version to the closest available pre-downloaded version
# We have 8.0 and 8.4 available
case "$VERSION" in
  8.4*|8.3*)
    CLIENT_VERSION="8.4"
    ;;
  8.0*|8.1*|8.2*|5.7*)
    CLIENT_VERSION="8.0"
    ;;
  *)
    # Default to 8.4 for unknown versions
    CLIENT_VERSION="8.4"
    echo "Warning: Unknown MySQL version $VERSION, using $CLIENT_VERSION client"
    ;;
esac

CLIENT_DIR="/usr/local/mysql-client/$CLIENT_VERSION"

if [ -d "$CLIENT_DIR" ]; then
  # Remove MariaDB client symlinks if they exist in /usr/local/bin
  rm -f /usr/local/bin/mysql /usr/local/bin/mysqldump /usr/local/bin/mysqladmin 2>/dev/null || true

  # Create symlinks to the pre-downloaded MySQL client
  ln -sf "$CLIENT_DIR/mysql" /usr/local/bin/mysql
  ln -sf "$CLIENT_DIR/mysqldump" /usr/local/bin/mysqldump
  ln -sf "$CLIENT_DIR/mysqladmin" /usr/local/bin/mysqladmin

  echo "MySQL $CLIENT_VERSION client activated from pre-downloaded binaries"
else
  echo "Warning: Pre-downloaded MySQL client not found at $CLIENT_DIR"
  echo "Keeping default mariadb-client"
  exit 0
fi

# Create config directory if it doesn't exist
mkdir -p /etc/mysql/conf.d

# Create MySQL client config with compatibility settings
cat > /etc/mysql/conf.d/lando.cnf << 'MYCNF'
[client]
default-character-set=utf8mb4
ssl-mode=PREFERRED

[mysqldump]
# Prevent column-statistics errors with newer mysqldump
skip-column-statistics
MYCNF

if ! mysql --version 2>/dev/null; then
  echo "Error: MySQL client not available after activation"
  exit 1
fi
