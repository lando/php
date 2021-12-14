PHP Composer Example
===========

This example exists primarily to test the following documentation:

* [PHP Service](https://docs.devwithlando.io/tutorials/php.html)

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
lando ssh -s composer1 -c "composer --version --no-ansi" | grep "Composer version 2."

# Should install composer 2.x if composer_version set to 2-latest
lando ssh -s composer1latest -c "composer --version --no-ansi" | grep "Composer version 2."

# Should install composer 2.1.10 if composer_version set to specific version
lando ssh -s composer1ver -c "composer --version --no-ansi" | grep "Composer version 2.1.10"
```

Destroy tests
-------------

Run the following commands to trash this app like nothing ever happened.

```bash
# Should be destroyed with success
lando destroy -y
lando poweroff
```
