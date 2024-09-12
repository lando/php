# PHP Custom Example

This example exists primarily to test the following documentation:

* [PHP Service](https://docs.lando.dev/config/php.html)
* [Service Overrides](https://docs.lando.dev/config/services.html#advanced)

And probably other stuff

## Start up tests

Run the following commands to get up and running with this example.

```bash
# Should start up successfully
lando poweroff
lando start
```

## Verification commands

Run the following commands to validate things are rolling as they should.

```bash
# Should have node12 installed in withnode service
lando node -v | grep v12.

# Should use 7.4 as the php version
lando exec withnode -- php -v | grep "PHP 7.4"

# Should use 8.1 as the php version
lando exec custom81 -- php -v | grep "PHP 8.1"

# Should install composer 2.1.14 if version number is set
lando exec custom81 -- composer --version --no-ansi | grep "Composer version 2.1.14"

# Should use nginx version 1.17.x as the webserver version
lando exec custom81_nginx --  nginx -v 2>&1 | grep 1.17

# Should have a PATH_INFO and PATH_TRANSLATED SERVER vars
lando exec custom81_nginx -- curl https://localhost | grep SERVER | grep PATH_INFO
lando exec custom81_nginx -- curl https://localhost | grep SERVER | grep PATH_TRANSLATED

# Should serve via nginx if specified
lando exec custom81_nginx -- curl http://localhost | grep "WEBDIR"

# Should serve via https if specified
lando exec custom81_nginx -- curl https://localhost | grep "WEBDIR"

# Should use custom php ini if specified
lando exec custom81 -- php -i | grep memory_limit | grep 514
lando exec custom81 -- curl http://custom81_nginx | grep html_errors | grep On | grep On

# Detect whether php-fpm is using custom www.conf
lando exec custom81 -- ps axf | grep "php-fpm: pool www" | wc -l | grep 3
```

## Destroy tests

Run the following commands to trash this app like nothing ever happened.

```bash
# Should be destroyed with success
lando destroy -y
lando poweroff
```
