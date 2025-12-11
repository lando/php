---
title: Caveats
description: Learn about caveats and known issues with the Lando PHP service.
---

# Caveats

## Path Considerations

Lando will set the `PATH` hierarchy for this service as follows:

```js
[
  # The line below should be where your app's composer.json binaries live
  '/app/vendor/bin',
  '/app/bin',
  '/usr/local/sbin',
  '/usr/local/bin',
  '/usr/sbin',
  '/usr/bin',
  '/sbin',
  '/bin',
  # The line below should be where global composer binaries live
  '/var/www/.composer/vendor/bin',
]
```

This is useful to note if you are not using absolute paths in any [tooling routes](https://docs.lando.dev/landofile/tooling.html) and are getting the unexpected version of a particular utility.

## Database Client Compatibility

When connecting to MySQL or MariaDB databases, you may encounter issues if the client version doesn't match your database server:

* **MySQL 8.4+**: Removed the `mysql_native_password` authentication plugin, requiring a MySQL 8.x client
* **MariaDB 10.11+**: Deprecated the `mysql` command in favor of `mariadb`, causing warning messages

For PHP 8.3+, Lando automatically detects your database service and installs a compatible client. See [Database client configuration](./config.md#database-client) for details.

For older PHP versions, you may need to work around these issues manually or use tooling commands that connect from a compatible container.
