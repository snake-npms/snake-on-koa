# snake-on-koa
[![npm](https://img.shields.io/npm/v/snake-on-koa.svg?style=flat-square)](https://www.npmjs.com/package/snake-on-koa)


### QuickStart

Install

```
$ npm i snake-on-koa -g
```

Create Project

```bash
$ snake new my-project [-d mysql]
$ cd my-project
$ npm install
$ node run start
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

Op DB
```bash
$ [NODE_ENV=development] snake db:create
$ [NODE_ENV=development] snake db:migrate
$ [NODE_ENV=development] snake db:drop
```

Modify Table | Migration
```bash
$ snake generate migration addColumnBirthdayAndAgeToUsers birthday:date age:integer:index
$ snake g migration renameColumnBirthdayToBirthFromUsers
$ snake g migration removeColumnBirthdayFromUsers
$ snake g migration removeIndexAgeFromUsers
$ snake g migration dropTableUsers
```


