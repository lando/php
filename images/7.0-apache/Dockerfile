# docker build -t devwithlando/php:7.0-apache-6 .

FROM php:7.0-apache-stretch

# Debian Stretch has archived repositories and expired keys
RUN \
  sed -i 's/deb.debian.org/archive.debian.org/g' /etc/apt/sources.list \
  && sed -i 's|security.debian.org|archive.debian.org/|g' /etc/apt/sources.list \
  && sed -i '/stretch-updates/d' /etc/apt/sources.list \
  && echo 'Acquire::Check-Valid-Until "false";' > /etc/apt/apt.conf.d/99ignore-release-date \
  && apt-get -qq update -o Acquire::AllowInsecureRepositories=true -o Acquire::AllowDowngradeToInsecureRepositories=true -o APT::Get::AllowUnauthenticated=true \
  && DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends --no-install-suggests -o APT::Get::AllowUnauthenticated=true debian-archive-keyring

# Install dependencies
RUN \
  mkdir -p /usr/share/man/man1 /usr/share/man/man7 \
  && apt-get update && apt-get install -y \
    gnupg2 \
    wget \
    bzip2 \
    exiftool \
    git-core \
    imagemagick \
    libbz2-dev \
    libc-client2007e-dev \
    libjpeg-dev \
    libkrb5-dev \
    libldap2-dev \
    libmagickwand-dev \
    libmcrypt-dev \
    libmemcached-dev \
    libpng-dev \
    libpq-dev \
    libwebp-dev \
    libxml2-dev \
    libicu-dev \
    mysql-client \
    postgresql-client \
    pv \
    ssh \
    unzip \
    wget \
    xfonts-base \
    xfonts-75dpi \
    zlib1g-dev \
  && pecl install apcu \
  && pecl install imagick \
  && pecl install memcached \
  && pecl install oauth-2.0.2 \
  && pecl install redis-3.1.2 \
  && pecl install xdebug-2.9.0 \
  && docker-php-ext-configure gd --with-freetype-dir=/usr --with-png-dir=/usr --with-jpeg-dir=/usr --with-webp-dir=/usr \
  && docker-php-ext-configure imap --with-imap-ssl --with-kerberos \
  && docker-php-ext-configure ldap --with-libdir=lib/$(uname -m)-linux-gnu/ \
  && docker-php-ext-enable apcu \
  && docker-php-ext-enable imagick \
  && docker-php-ext-enable memcached \
  && docker-php-ext-enable oauth \
  && docker-php-ext-enable redis \
  && docker-php-ext-install \
    bcmath \
    bz2 \
    calendar \
    exif \
    gd \
    imap \
    ldap \
    mcrypt \
    mbstring \
    mysqli \
    opcache \
    pdo \
    pdo_mysql \
    pdo_pgsql \
    soap \
    zip \
    intl \
    gettext \
    pcntl \
  && chsh -s /bin/bash www-data && mkdir -p /var/www/.composer && chown -R www-data:www-data /var/www \
  && apt-get -y clean \
  && apt-get -y autoclean \
  && apt-get -y autoremove \
  && rm -rf /var/lib/apt/lists/* && rm -rf && rm -rf /var/lib/cache/* && rm -rf /var/lib/log/* && rm -rf /tmp/*
