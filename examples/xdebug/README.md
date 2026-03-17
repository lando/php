# PHP Xdebug Example

This example exists primarily to test the following documentation:

* [PHP Service](https://docs.lando.dev/config/php.html)
* [Using Xdebug](https://docs.lando.dev/config/php.html#using-xdebug)

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
# Should not have xdebug 2 deprecation warnings
lando exec xdebug-true -- php -v 2>&1 | grep "has been renamed\|remote_autostart" && exit 1 || true

# Should use host.lando.internal in XDEBUG_CONFIG
lando exec xdebug-true -- env | grep XDEBUG_CONFIG | grep host.lando.internal

# Should have world-writable xdebug log
lando exec xdebug-true -- stat -c "%a" /tmp/xdebug.log | grep 666

# Should not load xdebug when disabled
lando exec xdebug-false -- php -m | grep xdebug || echo $? | grep 1

# Should have xdebug script available
lando exec xdebug-true -- test -f /etc/lando/service/helpers/xdebug.sh

# Should be able to toggle xdebug off at runtime
lando exec xdebug-true -- /etc/lando/service/helpers/xdebug.sh off
lando exec xdebug-true -- grep "xdebug.mode = off" /usr/local/etc/php/conf.d/zzz-lando-xdebug.ini

# Should be able to toggle xdebug back on
lando exec xdebug-true -- /etc/lando/service/helpers/xdebug.sh debug
lando exec xdebug-true -- php -i | grep "xdebug.mode" | grep debug

# Should show status with no arguments
lando exec xdebug-true -- /etc/lando/service/helpers/xdebug.sh | grep -i "mode"

# Should enable xdebug when set to true (backward compat)
lando exec xdebug-true -- php -i | grep "xdebug.mode" | grep debug

# Should set mode from string (backward compat)
lando info -s xdebug-string --deep | grep "debug,develop"

# Should set mode from object config
lando exec xdebug-object -- php -i | grep "xdebug.mode" | grep debug

# Should set start_with_request from object config
lando info -s xdebug-object --deep | grep start_with_request | grep yes

# Should apply config pass-through settings
lando exec xdebug-passthrough -- php -i | grep "xdebug.max_nesting_level" | grep 256

# Should not load xdebug when object mode is off
lando exec xdebug-off-object -- php -m | grep xdebug || echo $? | grep 1

# Should have generated xdebug ini file
lando exec xdebug-true -- test -f /usr/local/etc/php/conf.d/yyy-lando-xdebug.ini

# Should show xdebug info in lando info
lando info -s xdebug-true --deep | grep xdebug

# Should show mode in info output
lando info -s xdebug-true --deep | grep debug
```

## Destroy tests

Run the following commands to trash this app like nothing ever happened.

```bash
# Should be destroyed with success
lando destroy -y
lando poweroff
```
