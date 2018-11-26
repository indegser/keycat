import Router from 'koa-router'
import models from 'db/models';
const router = new Router()

router.post('/sign-up', async (ctx) => {
  const {
    pin,
    privateKey,
  } = ctx.request.body;

  try {
    const account = await models.account.save({ pin, privateKey })
    ctx.body = account
  } catch (err) {
    console.error(err)
  }
})

export default router
