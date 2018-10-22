### QuickStart

Install

```
npm i snake-on-koa -g
```

Create Project

```bash
$ snake new my-project [-d mysql]
```
> default: db is sqlite3


Create Controller

```bash
$ snake generate controller admin/orders [index show update delete]
```

Create Model

```bash
$ snake generate model order user:references title:string:index amount:decimal
```

Modify Table | Migration
```bash
$ snake generate migration addColumnBirthdayAndAgeToUsers birthday:date age:integer:index
$ snake g migration renameColumnBirthdayToBirthFromUsers
$ snake g migration removeColumnBirthdayFromUsers
$ snake g migration removeIndexAgeFromUsers
$ snake g migration dropTableUsers
```


