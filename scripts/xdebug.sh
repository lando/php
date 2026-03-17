#!/bin/sh

set -u

XDEBUG_INI="/usr/local/etc/php/conf.d/zzz-lando-xdebug.ini"
GREEN='\033[0;32m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

reload_web_server() {
  if pgrep -o php-fpm >/dev/null 2>&1; then
    kill -USR2 "$(pgrep -o php-fpm)" 2>/dev/null || true
  elif [ -f /etc/init.d/apache2 ]; then
    /etc/init.d/apache2 reload 2>/dev/null || true
  fi
}

print_usage() {
  printf 'Usage: %s [status|off|debug|debug,develop|profile|trace|<mode>]\n' "$(basename "$0")"
}

get_ini_value() {
  VALUE=$(php -r "echo ini_get('$1');" 2>/dev/null || true)
  if [ -n "$VALUE" ]; then
    printf '%s\n' "$VALUE"
  else
    printf '(not set)\n'
  fi
}

print_status() {
  if php -m | grep -qi '^xdebug$'; then
    LOADED='yes'
  else
    LOADED='no'
  fi

  printf '%bXdebug status%b\n' "$BLUE" "$NC"
  printf 'Loaded: %s\n' "$LOADED"
  printf 'Mode: %s\n' "$(get_ini_value 'xdebug.mode')"
  printf 'Client host: %s\n' "$(get_ini_value 'xdebug.client_host')"
  printf 'Client port: %s\n' "$(get_ini_value 'xdebug.client_port')"
  printf 'Start with request: %s\n' "$(get_ini_value 'xdebug.start_with_request')"
  print_usage
}

set_mode() {
  printf 'xdebug.mode = %s\n' "$1" > "$XDEBUG_INI"
}

MODE="${1:-}"

case "$MODE" in
  '')
    print_status
    ;;
  off)
    set_mode off
    reload_web_server
    printf '%bXdebug disabled.%b\n' "$RED" "$NC"
    ;;
  status)
    print_status
    ;;
  *)
    docker-php-ext-enable xdebug 2>/dev/null || true
    set_mode "$MODE"
    reload_web_server
    printf '%bXdebug enabled in %s mode.%b\n' "$GREEN" "$MODE" "$NC"
    ;;
esac
