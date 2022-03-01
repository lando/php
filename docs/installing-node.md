---
title: Installing node in your Lando PHP service
description: Learn how to install node in a Lando PHP service for things like Pattern Lab or Emulsify
guide: true
authors:
  - name: Geoff St. Pierre
    link: mailto:lando@lando.dev
    pic: https://www.gravatar.com/avatar/e103c2a2a8f8caf5848b38b80422cdd9
updated:
  timestamp: 1613073690000
mailchimp:
  action: https://dev.us12.list-manage.com/subscribe/post?u=59874b4d6910fa65e724a4648&amp;id=613837077f
  title: Want more PHP guide content?
  byline: Signup and we will send you a weekly blog digest of similar content to keep you satiated.
  button: Sign me up!
---

Some frontend tooling kits like [Emulsify](https://www.drupal.org/project/emulsify_drupal) or [Pattern Lab](https://patternlab.io/) _may_ assume that `composer/php` can invoke `yarn/npm/node` and vice-versa. This pattern, sadly, is fundamentally at odds with Lando's one-thing-per-container model.

You can, however, get around it by installing the needed dependencies directly in the service that requires them.

We've found installing `node` inside a Lando PHP service to generally be the path of least resistance.

## 1. Using build steps

Below is an example that installs `node12` using [build-steps](https://docs.lando.dev/config/services.html#build-steps).

```yaml
services:
  myservice:
    type: php
    build_as_root:
      # Note that you will want to use the script for the major version of node you want to install
      # See: https://github.com/nodesource/distributions/blob/master/README.md#installation-instructions
      - curl -sL https://deb.nodesource.com/setup_12.x | bash -
      - apt-get install -y nodejs
tooling:
  node:
    service: myservice
  npm:
    service: myservice
```

You can verify with:

```bash
lando node -v
lando npm -v
```

## 2. Extending a Dockerfile

If you are planning to extend your service with _additional_ build steps or would like to cache the build steps for a faster `lando rebuild` you should instead consider [extending with a Dockerfile](https://docs.lando.dev/config/services.html#using-dockerfiles) as in the example below:

**.lando.yml**

```yaml
services:
  myservice:
    type: php:custom
    via: cli
    overrides:
      image: lando/php:7.4-with-node12
      build:
        context: ./
        dockerfile: Dockerfile.node
tooling:
  node:
    service: myservice
  npm:
    service: myservice
```

**Dockerfile.node**

```docker
FROM devwithlando/php:7.4-apache-2

# Choose the major node version
ENV NODE_VERSION=12

# Install node
RUN curl -sL "https://deb.nodesource.com/setup_${NODE_VERSION}.x" | bash - \
  && apt-get install -y nodejs
```

Again, you can verify with:

```bash
lando node -v
lando npm -v
```
