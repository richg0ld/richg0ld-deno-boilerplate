import { Response, Router, send } from "https://deno.land/x/oak/mod.ts";
import apiRoutes from "./../../routes/api.ts";
import webRoutes from "./../../routes/web.ts";

export default (app: any) => {
  const router = new Router();

  apiRoutes(router);
  webRoutes(router);

  app.use(
    async ({ response }: { response: Response }, next: () => Promise<void>) => {
      try {
        await next();
      } catch (err) {
        response.status = 500;
        response.body = { msg: err.message };
      }
    }
  );
  app.use(router.routes());
  app.use(router.allowedMethods());

  //Static
  app.use(async (ctx: any, next: any) => {
    try {
      await send(ctx, ctx.request.url.pathname, {
        root: `${Deno.cwd()}/public`
      });
    } catch (err) {
      await next();
    }
  });

  app.use((ctx: any) => {
    // @ts-ignore
    ctx.response.status = 404;
    ctx.render("index", { data: { name: "Not found" } });
  });
};
