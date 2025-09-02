# PHP Composer Example

This example exists primarily to test the following documentation:

* [PHP Service](https://docs.lando.dev/config/php.html)
* [Installing Composer](https://docs.lando.dev/config/php.html#installing-composer)

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
# PHP 7.2 Should install composer 2.2.x by default
lando exec php72 -- composer --version --no-ansi | tee >(cat 1>&2) | grep -q "Composer version 2.2."

# PHP 8.3 Should install composer 2.8.x by default
lando exec php83 -- composer --version --no-ansi | tee >(cat 1>&2) | grep -q "Composer version 2.8."

# Should not install composer if composer_version is false
echo $(lando exec nocomposer -- composer --version --no-ansi 2>&1) | grep "executable file not found"

# Should install composer 1.x if composer_version set to 1
lando exec composer1 -- composer --version --no-ansi | tee >(cat 1>&2) | grep -q "Composer version 1."

# Should install composer 1.x if composer_version set to 1-latest
lando exec composer1latest -- composer --version --no-ansi | tee >(cat 1>&2) | grep -q "Composer version 1."

# Should install composer 1.10.26 if composer_version set to specific version
lando exec composer1ver -- composer --version --no-ansi | tee >(cat 1>&2) | grep -q "Composer version 1.10.26"

# Should install composer 2.x if composer_version set to 2
lando exec composer2 -- composer --version --no-ansi | tee >(cat 1>&2) | grep -q "Composer version 2."

# Should install composer 2.x if composer_version set to 2-latest
lando exec composer2latest -- composer --version --no-ansi | tee >(cat 1>&2) | grep -q "Composer version 2."

# Should install composer 2.1.10 if composer_version set to specific version
lando exec composer2ver -- composer --version --no-ansi | tee >(cat 1>&2) | grep -q "Composer version 2.1.10"

# Should install composer 2.2.x if composer_version set to 2.2
lando exec composer22 -- composer --version --no-ansi | tee >(cat 1>&2) | grep -q "Composer version 2.2."

# Should install composer 2.2.x if composer_version set to 2.2-latest
lando exec composer22latest -- composer --version --no-ansi | tee >(cat 1>&2) | grep -q "Composer version 2.2."

# Should install composer 2.2.10 if composer_version set to 2.2.10
lando exec composer22ver -- composer --version --no-ansi | tee >(cat 1>&2) | grep -q "Composer version 2.2.10"

# Should install compose global dependencies if specified by user and have them available in PATH
lando exec dependencies -- phpunit --version
lando exec dependencies -- which phpunit | grep "/var/www/.composer/vendor/bin/phpunit"

# Should PATH prefer composer dependency binaries installed in /app/vendor over global ones
lando exec dependencies -- composer require phpunit/phpunit
lando exec dependencies -- phpunit --version
lando exec dependencies -- which phpunit | grep "/app/vendor/bin/phpunit"
lando exec dependencies -- composer remove phpunit/phpunit
lando exec dependencies -- which phpunit | grep "/var/www/.composer/vendor/bin/phpunit"
```

## Destroy tests

Run the following commands to trash this app like nothing ever happened.

```bash
# Should be destroyed with success
lando destroy -y
lando poweroff
```
