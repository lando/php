# docker build -t devwithlando/php:8.3-apache-5 .

FROM php:8.3-apache-bookworm

ARG TARGETARCH

ADD --chmod=0755 https://github.com/mlocati/docker-php-extension-installer/releases/latest/download/install-php-extensions /usr/local/bin/

RUN \
  # MariaDB client compatibility (https://github.com/lando/php/issues/120)
  mkdir -p /etc/apt/keyrings \
  && curl -o /etc/apt/keyrings/mariadb-keyring.pgp 'https://mariadb.org/mariadb_release_signing_key.pgp' \
  && echo "deb [signed-by=/etc/apt/keyrings/mariadb-keyring.pgp] https://mirror.mariadb.org/repo/10.11/debian bookworm main" > /etc/apt/sources.list.d/mariadb.list

# Drupal 11 requires sqlite3 3.45+
ARG SQLITE_VERSION=3.45.1
RUN \
  curl -Lo /tmp/sqlite3.deb "https://snapshot.debian.org/archive/debian/20240506T211830Z/pool/main/s/sqlite3/sqlite3_${SQLITE_VERSION}-1_${TARGETARCH}.deb" \
  && curl -Lo /tmp/libsqlite3-0.deb "https://snapshot.debian.org/archive/debian/20240506T211830Z/pool/main/s/sqlite3/libsqlite3-0_${SQLITE_VERSION}-1_${TARGETARCH}.deb" \
  && curl -Lo /tmp/libsqlite3-dev.deb "https://snapshot.debian.org/archive/debian/20240506T211830Z/pool/main/s/sqlite3/libsqlite3-dev_${SQLITE_VERSION}-1_${TARGETARCH}.deb"

RUN \
  mkdir -p /usr/share/man/man1 /usr/share/man/man7 \
  && apt -y update && apt-get install -y \
  default-mysql-client \
  exiftool \
  git-core \
  gnupg2 \
  imagemagick \
  postgresql-client-15 \
  pv \
  rsync \
  ssh \
  unzip \
  wget \
  /tmp/sqlite3.deb \
  /tmp/libsqlite3-0.deb \
  /tmp/libsqlite3-dev.deb

RUN \
  install-php-extensions @fix_letsencrypt \
  && install-php-extensions apcu \
  && install-php-extensions bcmath \
  && install-php-extensions bz2 \
  && install-php-extensions calendar \
  && install-php-extensions exif \
  && install-php-extensions gd \
  && install-php-extensions gettext \
  && install-php-extensions imagick \
  && install-php-extensions imap \
  && install-php-extensions intl \
  && install-php-extensions ldap \
  && install-php-extensions mbstring \
  && install-php-extensions memcached \
  && install-php-extensions mysqli \
  && install-php-extensions oauth \
  && install-php-extensions opcache \
  && install-php-extensions pcntl \
  && install-php-extensions pdo \
  && install-php-extensions pdo_mysql \
  && install-php-extensions pdo_pgsql \
  && install-php-extensions redis \
  && install-php-extensions soap \
  && install-php-extensions xhprof \
  && install-php-extensions zip

# Install xdebug but disable it by default
RUN install-php-extensions xdebug \
  && rm -f /usr/local/etc/php/conf.d/*xdebug.ini

RUN \
  chsh -s /bin/bash www-data && mkdir -p /var/www/.composer && chown -R www-data:www-data /var/www \
  && apt-get -y clean \
  && apt-get -y autoclean \
  && apt-get -y autoremove \
  && rm -rf /var/lib/apt/lists/* && rm -rf && rm -rf /var/lib/cache/* && rm -rf /var/lib/log/* && rm -rf /tmp/*
