import Koa from 'koa';
import dotenv from 'dotenv';
dotenv.config();

const app = new Koa();

app.use(ctx => ctx.body = 'Hello');

app.listen(3001);