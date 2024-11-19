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
