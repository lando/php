# docker build -t devwithlando/php:8.4-apache-7 .

FROM mysql:8.0 AS mysql-client-80
FROM mysql:8.4 AS mysql-client-84

FROM php:8.4-apache-trixie

ARG TARGETARCH

ADD --chmod=0755 https://github.com/mlocati/docker-php-extension-installer/releases/latest/download/install-php-extensions /usr/local/bin/

RUN \
  mkdir -p /usr/share/man/man1 /usr/share/man/man7 \
  && apt -y update && apt-get install -y \
    default-mysql-client \
    libimage-exiftool-perl \
    git \
    gnupg2 \
    imagemagick \
    mariadb-client \
    mariadb-client-compat \
    postgresql-client-17 \
    pv \
    rsync \
    ssh \
    unzip \
    wget

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

# Pre-download MySQL client binaries for version-matched installs
COPY --from=mysql-client-80 /usr/bin/mysql /usr/local/mysql-client/8.0/mysql
COPY --from=mysql-client-80 /usr/bin/mysqldump /usr/local/mysql-client/8.0/mysqldump
COPY --from=mysql-client-80 /usr/bin/mysqladmin /usr/local/mysql-client/8.0/mysqladmin
COPY --from=mysql-client-84 /usr/bin/mysql /usr/local/mysql-client/8.4/mysql
COPY --from=mysql-client-84 /usr/bin/mysqldump /usr/local/mysql-client/8.4/mysqldump
COPY --from=mysql-client-84 /usr/bin/mysqladmin /usr/local/mysql-client/8.4/mysqladmin

RUN \
  chsh -s /bin/bash www-data && mkdir -p /var/www/.composer && chown -R www-data:www-data /var/www \
  && apt-get -y clean \
  && apt-get -y autoclean \
  && apt-get -y autoremove \
  && rm -rf /var/lib/apt/lists/* && rm -rf && rm -rf /var/lib/cache/* && rm -rf /var/lib/log/* && rm -rf /tmp/*
