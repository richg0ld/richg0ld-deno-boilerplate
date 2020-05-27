import { isHttpError, Status } from "https://deno.land/x/oak/mod.ts";

export class HttpError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

export default async (ctx: any, next: any) => {
  try {
    await next();
  } catch (err) {
    if (isHttpError(err)) {
      switch (err.status) {
        case Status.NotFound:
          // handle NotFound
          ctx.response.status = err.status;
          ctx.response.body = err.message;
          break;
        default:
          ctx.response.status = err.status || 500;
          ctx.response.body = err.message || "Unknown Error";
      }
    } else {
      // rethrow if you can't handle the error
      ctx.response.status = err.status || 500;
      ctx.response.body = err.message || "Unknown Error";
      throw err;
    }
  }
};
