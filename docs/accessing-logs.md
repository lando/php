---
title: Accessing the PHP Error Logs
description: Learn how to see your PHP error logs in Lando.
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
Seeing errors coming off a PHP app is usually very easy in Lando:

```bash
lando logs -s appserver -f
```

Because `lando logs` is actually a light wrapper around `docker logs`, you'll notice that you also get general server error messages and other warnings aside from PHP errors. Sometimes it can help to grep the output to isolate PHP-relevant messages:

```bash
lando logs -s appserver -f | grep 'WARNING\|PHP'
```

::: warning If PHP isn't running in "appserver"...
`appserver` is the default service name in most PHP applications on Lando. If you have PHP running in a service with a different name than `appserver`, simply substitute the relevant service name instead of `appserver`.
:::
