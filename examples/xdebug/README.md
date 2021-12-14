PHP Xdebug Example
===========

This example exists primarily to test the following documentation:

* [PHP Service](https://docs.lando.dev/config/php.html)
* [Using XDebug](https://docs.lando.dev/config/php.html#using-xdebug)

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
# Should enable xdebug 2 for php 5.6
lando ssh -s xdebug2 -c "php --re xdebug | head -1" | grep "xdebug version 2."

# Should enable xdebug 3 for php 7.2+
lando ssh -s xdebug3on -c "php --re xdebug | head -1" | grep "xdebug version 3."

# Should not enable xdebug by when set to false
lando ssh -s xdebug3off -c "php -m | grep xdebug" || echo $? | grep 1

# Should use develop, debug if defined
lando ssh -s xdebug3 -c "env" | grep 'XDEBUG_MODE' | grep 'debug,develop'

# Should use xdebug version 3.0.4 if installed
lando ssh -s manual -c "php --re xdebug | head -1" | grep "xdebug version 3.0.4"
```

Destroy tests
-------------

Run the following commands to trash this app like nothing ever happened.

```bash
# Should be destroyed with success
lando destroy -y
lando poweroff
```
