import Router from 'koa-router'
import Account from 'db/models/Account';
const router = new Router()

router.post('/sign-up', async (ctx) => {
  const {
    pin,
    privateKey,
  } = ctx.request.body;

  try {
    const account = new Account({ pin, privateKey })
    const created = await account.save()

    console.log(created)
  
    ctx.body = created
  } catch (err) {
    console.error(err)
  }
})

export default router
