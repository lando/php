# PHP 7.0 Example

This example exists primarily to test the following documentation:

* [PHP Service](https://docs.lando.dev/config/php.html)
* [Installing Node in a PHP Service](https://docs.lando.dev/guides/installing-node-in-your-lando-php-service.html)
* [Issue #1990](https://github.com/lando/lando/issues/1990)
* [Issue #2192](https://github.com/lando/lando/issues/2192)

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
# Should use 7.0 as the default php version
lando exec defaults -- php -v | grep "PHP 7.0"

# Should use 9.x as the default postgresql-client version
lando exec defaults -- psql -V | grep "9."

# Should use apache 2.4 as the default webserver version
lando exec defaults -- apachectl -V | grep "2.4."

# Should only serve over http by default
lando exec defaults -- curl https://localhost || echo $? | grep 7

# Should serve from the app root by default
lando exec defaults -- curl http://localhost | grep "ROOTDIR"

# Should have a 1G php mem limit on appserver
lando exec defaults -- curl http://localhost | grep "memory_limit" | grep "1G"

# Should have COMPOSER_MEMORY_LIMIT set to -1
lando exec defaults -- env | grep "COMPOSER_MEMORY_LIMIT=-1"

# Should install composer 2.2.x by default
lando exec defaults -- composer --version --no-ansi | tee >(cat 1>&2) | grep -q "Composer version 2.2."

# Should have unlimited memory for php for CLI opts
lando php -i | grep memory_limit | grep -e "-1"
lando exec defaults -- php -i | grep "memory_limit" | grep -e "-1"

# Should not enable xdebug by default
lando exec defaults -- php -m | grep xdebug || echo $? | grep 1

# Should have a PATH_INFO and PATH_TRANSLATED SERVER vars
lando exec custom_nginx -- curl https://localhost | grep SERVER | grep PATH_INFO
lando exec custom_nginx -- curl https://localhost | grep SERVER | grep PATH_TRANSLATED

# Should use specified php version if given
lando exec custom -- php -v | grep "PHP 7.0"

# Should install composer 2.x if 2-latest is set
lando exec custom -- composer --version --no-ansi | tee >(cat 1>&2) | grep -q "Composer version 2."

# Should serve via nginx if specified
lando exec custom_nginx -- curl http://localhost | grep "WEBDIR"

# Should serve via https if specified
lando exec custom_nginx -- curl https://localhost | grep "WEBDIR"

# Should enable xdebug if specified
lando exec custom -- php -m | grep "xdebug"

# Should not serve port 80 for cli
lando exec cli -- curl http://localhost || echo $? | grep 7

# Should install the latest composer 1.x using the 1 flag
lando exec cli -- composer --version --no-ansi | tee >(cat 1>&2) | grep -q "Composer version 1."

# Should use custom php ini if specified
lando exec custom -- php -i | grep memory_limit | grep 514
lando exec custom -- curl http://custom_nginx | grep html_errors | grep On | grep On

# Should serve and be accessible over ssl if specified
lando exec custom_nginx -- curl https://localhost
lando exec custom -- curl https://custom_nginx

# Should inherit overrides from its generator
lando exec custom -- env | grep DUALBLADE | grep maxim
lando exec custom_nginx -- env | grep DUALBLADE | grep maxim

# Should be able to run build steps on lando managed nginx service
# https://github.com/lando/lando/issues/1990
lando exec custom_nginx -- cat /app/test/managed_build_step

# Should be able to override lando managed nginx service
# https://github.com/lando/lando/issues/1990
lando exec custom_nginx -- env | grep OTHER | grep stuff
lando exec custom_nginx -- env | grep MORE | grep things

# Should set PATH_INFO and PATH_TRANSLATED if appropriate
# https://github.com/lando/lando/issues/2192
lando exec custom_nginx -- curl http://localhost/path_info.php/a/b.php | grep PATH_INFO | grep "/a/b.php"
lando exec custom_nginx -- curl http://localhost/path_info.php/a/b.php | grep PATH_TRANSLATED | grep "/app/web/a/b.php"
lando exec custom_nginx -- curl http://localhost/path_info.php/a/b.php | grep SCRIPT_NAME | grep "/path_info.php"
lando exec defaults -- curl http://localhost/path_info.php/a/b.php | grep PATH_INFO | grep "/a/b.php"
lando exec defaults -- curl http://localhost/path_info.php/a/b.php | grep PATH_TRANSLATED | grep "/app/a/b.php"
lando exec defaults -- curl http://localhost/path_info.php/a/b.php | grep SCRIPT_NAME | grep "/path_info.php"

# Should allow cli services to specify a boot up command
lando info -s cliworker --deep | grep Cmd | grep sleep | grep infinity

# Should not install composer when composer_version is false
echo $(lando exec cliworker -- composer --version --no-ansi 2>&1) | grep "executable file not found"

# Should have node14 installed in cli service
lando node -v | grep v14.
```

## Destroy tests

Run the following commands to trash this app like nothing ever happened.

```bash
# Should be destroyed with success
lando destroy -y
lando poweroff
```
