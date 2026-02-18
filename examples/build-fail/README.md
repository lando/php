# PHP Build Fail Example

This example exists primarily to test the following issue:

* [Composer silently fails to install if a build_as_root command fails](https://github.com/lando/php/issues/211)

## Start up tests

Run the following commands to get up and running with this example.

```bash
# Should start even if build steps fail
lando poweroff
lando start || true
```

## Verification commands

Run the following commands to validate things are rolling as they should.

```bash
# Should still have composer installed even when build_as_root fails
lando exec failroot -- composer --version --no-ansi | tee >(cat 1>&2) | grep -q "Composer version 2."
```

## Destroy tests

Run the following commands to trash this app like nothing ever happened.

```bash
# Should be destroyed with success
lando destroy -y
lando poweroff
```
