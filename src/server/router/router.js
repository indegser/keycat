import Router from 'koa-router'
import models from 'db/models';
const router = new Router({
  prefix: '/api'
})

router.post('/sign-up', async (ctx) => {
  const {
    account,
    sig,
  } = ctx.request.body;

  try {
    const account = await models.account.save({ account, sig })
    ctx.body = account
  } catch (err) {
    console.error(err)
  }
})

export default router
