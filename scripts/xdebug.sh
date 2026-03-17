#!/bin/sh

set -eu

XDEBUG_INI="/usr/local/etc/php/conf.d/zzz-lando-xdebug.ini"
GREEN='\033[0;32m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

reload_web_server() {
  kill -USR2 "$(pgrep -o php-fpm)" 2>/dev/null || /etc/init.d/apache2 reload 2>/dev/null || true
}

print_usage() {
  printf 'Usage: %s [status|off|debug|debug,develop|profile|trace|<mode>]\n' "$(basename "$0")"
}

set_mode() {
  printf 'xdebug.mode = %s\n' "$1" > "$XDEBUG_INI"
}

MODE="${1:-}"

case "$MODE" in
  '')
    print_usage
    ;;
  off)
    set_mode off
    reload_web_server
    printf '%bXdebug disabled.%b\n' "$RED" "$NC"
    ;;
  status)
    print_usage
    ;;
  *)
    docker-php-ext-enable xdebug 2>/dev/null || true
    set_mode "$MODE"
    reload_web_server
    printf '%bXdebug enabled in %s mode.%b\n' "$GREEN" "$MODE" "$NC"
    ;;
esac
