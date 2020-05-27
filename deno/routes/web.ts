import * as indexController from "../app/http/controllers/web/indexController.ts";

export default (router: any) => {
  router.get("/", indexController.render);
};
