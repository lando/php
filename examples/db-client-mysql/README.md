# Database Client MySQL Auto-Detection Example

This example tests that `db_client: auto` correctly detects and installs the MySQL client when only a MySQL database service is present.

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
lando exec php -- mysql --version | grep -qi "Ver 8.4"
lando exec php -- mysql --version | grep -qiv "MariaDB"
```

```bash
# MySQL client can connect to MySQL database
lando exec php -- mysql -h database -u testuser -ptestpass testdb -e "SELECT 1"
```

```bash
# mysqldump uses MySQL (not MariaDB) and works
lando exec php -- mysqldump -h database -u testuser -ptestpass testdb --no-data > /dev/null
```

## Destroy tests

Run the following commands to trash this app like nothing ever happened.

```bash
# Should be destroyed with success
lando destroy -y
lando poweroff
```
