import { Application, send } from "https://deno.land/x/oak/mod.ts";
import { config } from "https://deno.land/x/dotenv/mod.ts";
import {
  viewEngine,
  engineFactory,
  adapterFactory
} from "https://raw.githubusercontent.com/gjuoun/view-engine/master/mod.ts";
import routeServiceProvider from "./app/providers/routeServiceProvider.ts";
import db from "./database/index.ts";
import ErrorHandler from "./app/http/middleware/ErrorHandler.ts";

const handlebarsEngine = await engineFactory.getHandlebarsEngine();
const oakAdapter = await adapterFactory.getOakAdapter();

const { APP_HOST, APP_PORT } = config();
const app = new Application();

db.connect();

// Logger
app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.headers.get("X-Response-Time");
  console.log(`${ctx.request.method} ${ctx.request.url} - ${rt}`);
});

// Timing
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.response.headers.set("X-Response-Time", `${ms}ms`);
});

app.use(ErrorHandler);
app.use(
  viewEngine(oakAdapter, handlebarsEngine, {
    viewRoot: "./resources/views/",
    viewExt: ".hbs"
  })
);

routeServiceProvider(app);

console.log(`Listening on ${APP_HOST}:${APP_PORT}...`);
await app.listen({ port: parseInt(APP_PORT, 10) });
