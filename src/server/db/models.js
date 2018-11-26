import db from 'db/db'

const models = {
  account: db.collection('account')
}

const modelKeys = Object.keys(models);

(async () => {
  for (const key of modelKeys) {
    const collection = models[key]
    const result = await collection.exists()

    if (!result) {
      await collection.create()
    }
  }
})()

export default models
