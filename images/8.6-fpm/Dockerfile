# docker buildx build -t devwithlando/php:8.6-fpm-7 .

FROM mysql:8.4 AS mysql-client-84
FROM mysql:9.7 AS mysql-client-97

FROM php:8.6-fpm-trixie
ARG MIN_PHP=
RUN [ -z "$MIN_PHP" ] || dpkg --compare-versions "$PHP_VERSION" ge "$MIN_PHP" || { echo "PHP $PHP_VERSION < $MIN_PHP"; exit 1; }

ARG TARGETARCH

ADD --chmod=0755 https://github.com/mlocati/docker-php-extension-installer/releases/latest/download/install-php-extensions /usr/local/bin/

RUN \
  mkdir -p /usr/share/man/man1 /usr/share/man/man7 \
  && apt -y update && apt-get install -y \
    bzip2 \
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
  && install-php-extensions bcmath \
  && install-php-extensions bz2 \
  && install-php-extensions calendar \
  && install-php-extensions exif \
  && install-php-extensions gd \
  && install-php-extensions gettext \
  && install-php-extensions imagick/imagick@master \
  && install-php-extensions intl \
  && install-php-extensions ldap \
  && install-php-extensions mbstring \
  && install-php-extensions mysqli \
  && install-php-extensions php/pecl-web_services-oauth@f524860cba69b9655bf3836628b3d4fe385ab74c \
  && install-php-extensions opcache \
  && install-php-extensions pcntl \
  && install-php-extensions pdo \
  && install-php-extensions pdo_mysql \
  && install-php-extensions pdo_pgsql \
  && install-php-extensions soap \
  && install-php-extensions xhprof \
  && install-php-extensions zip

# No PECL releases of apcu, memcached and redis support PHP 8.6 yet, so build pinned upstream commits.
# install-php-extensions can't be used here as its configure flags don't match these unreleased versions.
# imap is omitted as it is unmaintained and does not compile against PHP 8.6.
RUN \
  apt-get update && apt-get install -y libmemcached-dev libsasl2-dev liblz4-dev libzstd-dev zlib1g-dev \
  && build_ext() { \
    git clone --quiet --recursive "https://github.com/$1.git" "/tmp/$2" \
    && git -C "/tmp/$2" checkout --quiet --recurse-submodules "$3" \
    && cd "/tmp/$2" && phpize && ./configure $4 && make -j"$(nproc)" && make install \
    && docker-php-ext-enable "$2" && cd / && rm -rf "/tmp/$2"; \
  } \
  && build_ext krakjoe/apcu apcu fb2c942552a3f5dab7f4dea4afb5cf0831222c57 \
  && build_ext phpredis/phpredis redis 5b60b125aba347159b0c9c319296fbb3c5ed9214 \
    "--enable-redis-lzf --enable-redis-zstd --with-libzstd --enable-redis-lz4 --with-liblz4" \
  && build_ext php-memcached-dev/php-memcached memcached 0b52d3657140750fa0eddd20cdbfc6edc8fbdadd \
    "--enable-memcached-session --enable-memcached-json --enable-memcached-sasl"

# Install xdebug but disable it by default
RUN install-php-extensions xdebug/xdebug@master \
  && rm -f /usr/local/etc/php/conf.d/*xdebug.ini

# Pre-download MySQL client binaries for version-matched installs
COPY --from=mysql-client-84 /usr/bin/mysql /usr/local/mysql-client/8.4/mysql
COPY --from=mysql-client-84 /usr/bin/mysqldump /usr/local/mysql-client/8.4/mysqldump
COPY --from=mysql-client-84 /usr/bin/mysqladmin /usr/local/mysql-client/8.4/mysqladmin
COPY --from=mysql-client-97 /usr/bin/mysql /usr/local/mysql-client/9.7/mysql
COPY --from=mysql-client-97 /usr/bin/mysqldump /usr/local/mysql-client/9.7/mysqldump
COPY --from=mysql-client-97 /usr/bin/mysqladmin /usr/local/mysql-client/9.7/mysqladmin

# Ensure required MySQL client shared libraries are present (the 9.7 client does not need any)
COPY --from=mysql-client-84 /usr/lib64/libmysqlclient.so* /usr/lib/

RUN \
  chsh -s /bin/bash www-data && mkdir -p /var/www/.composer && chown -R www-data:www-data /var/www \
  && apt-get -y clean \
  && apt-get -y autoclean \
  && apt-get -y autoremove \
  && rm -rf /var/lib/apt/lists/* && rm -rf && rm -rf /var/lib/cache/* && rm -rf /var/lib/log/* && rm -rf /tmp/*
