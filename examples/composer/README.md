PHP Composer Example
===========

This example exists primarily to test the following documentation:

* [PHP Service](https://docs.lando.dev/config/php.html)
* [Installing Composer](https://docs.lando.dev/config/php.html#installing-composer)

And probably other stuff

Start up tests
--------------

Run the following commands to get up and running with this example.

```bash
# Should start up successfully
lando poweroff
lando start
```

Verification commands
---------------------

Run the following commands to validate things are rolling as they should.

```bash
# Should install composer 1.x if composer_version set to 1
lando ssh -s composer1 -c "composer --version --no-ansi" | grep "Composer version 1."

# Should install composer 1.x if composer_version set to 1-latest
lando ssh -s composer1latest -c "composer --version --no-ansi" | grep "Composer version 1."

# Should install composer 1.10.21 if composer_version set to specific version
lando ssh -s composer1ver -c "composer --version --no-ansi" | grep "Composer version 1.10.21"

# Should install composer 2.x if composer_version set to 2
lando ssh -s composer2 -c "composer --version --no-ansi" | grep "Composer version 2."

# Should install composer 2.x if composer_version set to 2-latest
lando ssh -s composer2latest -c "composer --version --no-ansi" | grep "Composer version 2."

# Should install composer 2.1.10 if composer_version set to specific version
lando ssh -s composer2ver -c "composer --version --no-ansi" | grep "Composer version 2.1.10"

# Should install compose global dependencies if specified by user and have them available in PATH
lando ssh -s dependencies -c "phpunit --version"
lando ssh -s dependencies -c "which phpunit" | grep "/var/www/.composer/vendor/bin/phpunit"

# Should PATH prefer composer dependency binaries installed in /app/vendor over global ones
lando ssh -s dependencies -c "composer require phpunit/phpunit"
lando ssh -s dependencies -c "phpunit --version"
lando ssh -s dependencies -c "which phpunit" | grep "/app/vendor/bin/phpunit"
lando ssh -s dependencies -c "composer remove phpunit/phpunit"
lando ssh -s dependencies -c "which phpunit" | grep "/var/www/.composer/vendor/bin/phpunit"
```

Destroy tests
-------------

Run the following commands to trash this app like nothing ever happened.

```bash
# Should be destroyed with success
lando destroy -y
lando poweroff
```
