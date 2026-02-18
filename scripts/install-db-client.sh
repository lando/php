#!/bin/bash
# Install database client matching the detected database type/version
# Usage: install-db-client.sh <type>:<version>
# Examples:
#   install-db-client.sh mysql:8.4
#   install-db-client.sh mariadb:11.8

set -e

DB_CLIENT="${1:-}"
if [[ -z "$DB_CLIENT" ]]; then
  echo "No database client specified, keeping defaults"
  exit 0
fi

DB_TYPE="${DB_CLIENT%%:*}"
DB_VERSION="${DB_CLIENT##*:}"
SCRIPTS_DIR="$(dirname "$0")"

case "$DB_TYPE" in
  mysql)
    "$SCRIPTS_DIR/mysql-client-install.sh" "$DB_VERSION"
    ;;
  mariadb)
    "$SCRIPTS_DIR/mariadb-compat-install.sh"
    ;;
  *)
    echo "Unknown database type: $DB_TYPE"
    exit 1
    ;;
esac
