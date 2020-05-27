import { HttpError } from "../../middleware/ErrorHandler.ts";
import samples, {ISampleModel, Sample} from "../../models/Sample.ts";

export const getSample = async (ctx: any) => {
  try {
    const fetchedSamples = await samples.find();

    if (fetchedSamples) {
      const list = fetchedSamples.length
        ? fetchedSamples.map((sample: ISampleModel) => sample)
        : [];
      ctx.response.body = list;
    } else {
      ctx.response.body = null;
    }
  } catch (error) {
    throw new HttpError(error.message, error.status || 500);
  }
};

export const postSample = async (ctx: any) => {
  try {
    if (ctx.request.headers.get("content-type") !== "application/json") {
      throw new HttpError("Invalid body", 422);
    }
    const body = await ctx.request.body();
    if (!Object.keys(body.value).length) {
      throw new HttpError("Request body can not be empty!", 400);
    }
    const { title, author } = body.value;

    const insertedSample = await samples.insertOne(new Sample(
      title,
      author
    ));

    ctx.response.status = 201;
    ctx.response.body = insertedSample;
  } catch (error) {
    throw new HttpError(error.message, error.status || 500);
  }
};
