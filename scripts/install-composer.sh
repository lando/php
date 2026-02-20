#!/bin/sh

set -e

VERSION="$1"

# NOTE: we should have better protections here
php -r "copy('https://getcomposer.org/installer', '/tmp/composer-setup.php');"

# Allow for a few convenience install methods
if [ "$VERSION" = '1-latest' ]; then
  php /tmp/composer-setup.php --install-dir=/usr/local/bin --filename=composer --1
elif [ "$VERSION" = '1' ]; then
  php /tmp/composer-setup.php --install-dir=/usr/local/bin --filename=composer --1
elif [ "$VERSION" = '2-latest' ]; then
  php /tmp/composer-setup.php --install-dir=/usr/local/bin --filename=composer --2
elif [ "$VERSION" = '2' ]; then
  php /tmp/composer-setup.php --install-dir=/usr/local/bin --filename=composer --2
elif [ "$VERSION" = '2.2' ]; then
  php /tmp/composer-setup.php --install-dir=/usr/local/bin --filename=composer --2.2
elif [ "$VERSION" = '2.2-latest' ]; then
  php /tmp/composer-setup.php --install-dir=/usr/local/bin --filename=composer --2.2
elif [ "$VERSION" = 'preview' ]; then
  php /tmp/composer-setup.php --install-dir=/usr/local/bin --filename=composer --preview
elif [ "$VERSION" = 'snapshot' ]; then
  php /tmp/composer-setup.php --install-dir=/usr/local/bin --filename=composer --snapshot
else
  php /tmp/composer-setup.php --install-dir=/usr/local/bin --filename=composer --version="$VERSION"
fi

# Remove the setup script
php -r "unlink('/tmp/composer-setup.php');"

# If upgrading from Composer 1 to 2, remove the prestissimo plugin
# which is incompatible with Composer 2 (parallel downloads are built-in now).
# Use COMPOSER_HOME to find the right global composer.json for the current user.
COMPOSER_HOME="${COMPOSER_HOME:-$(composer global config home 2>/dev/null || echo '')}"
if [ -n "$COMPOSER_HOME" ] && [ -f "$COMPOSER_HOME/composer.json" ]; then
  if composer --version 2>/dev/null | grep -qE "Composer (version )?2\."; then
    composer global remove hirak/prestissimo 2>/dev/null || true
  fi
fi
