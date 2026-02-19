# Database Client MySQL 5.7 SSL Test

This example tests that `db_client: auto` correctly handles MySQL 5.7, which uses self-signed certificates that cause TLS/SSL errors with the MySQL 8.0 client.

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
# Auto-detection installs MySQL client (not MariaDB)
lando exec php -- mysql --version | grep -q "mysql"
lando exec php -- mysql --version | grep -qi "Ver 8.0"
lando exec php -- mysql --version | grep -qiv "MariaDB"
```

```bash
# MySQL client can connect to MySQL 5.7 database without SSL errors
lando exec php -- mysql -h database -u testuser -ptestpass testdb -e "SELECT 1"
```

```bash
# mysqldump works against MySQL 5.7 without SSL errors
lando exec php -- mysqldump -h database -u testuser -ptestpass testdb --no-data > /dev/null
```

## Destroy tests

Run the following commands to trash this app like nothing ever happened.

```bash
# Should be destroyed with success
lando destroy -y
lando poweroff
```
