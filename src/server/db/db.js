import { Database } from 'arangojs'

const {
  ARANGO_ROOT_PASSWORD: PASSWORD,
} = process.env;

const db = new Database()
db.useDatabase('xafe')
db.useBasicAuth('root', PASSWORD)

db.createDatabase('xafe')
  .then(log => console.log(log))
  .catch(err => console.error('111'))

export default db
