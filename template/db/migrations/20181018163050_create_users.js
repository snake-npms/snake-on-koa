module.exports = {
	async up (ormProxy) {
		// await ormProxy.runSql(`CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username VARCHAR(20), createdAt datetime, updatedAt datetime)`)
		await ormProxy.createTable('users', {}, function (t) {
			t.string('username', {null: false, unique: true})
			t.string('mobile')
			t.timestamps()
		})
		await ormProxy.addIndex('users', 'mobile', {index: true})
	}
}