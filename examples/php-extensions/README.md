# PHP Extensions Example

This example exists primarily to test the following:

* [Installing PHP Extensions on Lando](https://docs.lando.dev/guides/installing-php-extensions-on-lando.html)
* [Issue #1894](https://github.com/lando/lando/pull/1894)
* [Issue #1906](https://github.com/lando/lando/pull/1906)
* [Issue #2201](https://github.com/lando/lando/pull/2201)
* [Issue #2240](https://github.com/lando/lando/pull/2240)

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
# Should have installed the needed php extensions
lando exec 84scripted -- php -m | grep swoole
lando exec buildsteps -- php -m | grep stats
lando exec buildsteps -- php -m | grep xsl
lando exec dockerfile -- php -m | grep oci8
lando exec dockerfile -- php -m | grep pdo_sqlsrv
lando exec dockerfile -- php -m | grep sqlsrv
```

## Destroy tests

Run the following commands to trash this app like nothing ever happened.

```bash
# Should be destroyed with success
lando destroy -y
lando poweroff
```
