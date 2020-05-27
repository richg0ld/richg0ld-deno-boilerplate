import * as sampleController from "../app/http/controllers/api/sampleController.ts";

export default (router: any) => {
  router.get("/api/sample", sampleController.getSample);
  router.post("/api/sample", sampleController.postSample);
};
