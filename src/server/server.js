import Koa from 'koa';
import dotenv from 'dotenv';
import bodyParser from 'koa-bodyparser';
import Account from 'db/models/Account';
dotenv.config();

const app = new Koa();

app.use(bodyParser());

app.post('sign-up', async (ctx) => {
  const {
    pin,
    privateKey,
  } = ctx.request.body;

  const account = new Account({
    pin,
    privateKey,
  });

  const doc = await account.save();
  const key = aes([pin, pin, pin])
  const arr = key.encrypt(privateKey);
  
});

app.post('sign-in', async (ctx) => {
  const {
    pin,
    accountName,
  } = ctx.request.body;

  const account = await Account.findOne({
    name: accountName,
  });
})

app.listen(3001);