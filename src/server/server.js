import Koa from 'koa';
import dotenv from 'dotenv';
import bodyParser from 'koa-bodyparser';
import 'db/db';
import router from 'router/router';
dotenv.config();

const app = new Koa();

app
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods())
// app.post('sign-up', async (ctx) => {
//   const {
//     pin,
//     privateKey,
//   } = ctx.request.body;

//   const account = new Account({
//     pin,
//     privateKey,
//   });

//   const doc = await account.save();
//   const key = aes([pin, pin, pin])
//   const arr = key.encrypt(privateKey);
  
// });

// app.post('sign-in', async (ctx) => {
//   const {
//     pin,
//     accountName,
//   } = ctx.request.body;

//   const account = await Account.findOne({
//     name: accountName,
//   });
// })

app.listen(3001, () => {
  console.log('connected')
})
