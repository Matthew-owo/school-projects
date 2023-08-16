import Koa, { Context, DefaultState } from "koa";
import Router from "koa-router";
import logger from "koa-logger";
import json from "koa-json";
import { setupCatRoutes } from "./routes/cat";
import request from "supertest";

const app: Koa = new Koa();
const router = new Router<DefaultState, Context>();

setupCatRoutes(router);

app.use(router.routes());
app.use(router.allowedMethods);
app.use(json());
app.use(logger());

app.listen(3000);

describe("Get cats function", () => {
  test("Get all cats", async () => {
    const result = await request(app.callback()).get("/api/v1/cat");

    expect(result.statusCode).toEqual(200);
  });

  test("Get cat by id", async () => {
    const result = await request(app.callback()).get(
      "/api/v1/cat/IOVEARJY60mmkX5V4YKr"
    );

    expect(result.statusCode).toEqual(200);
  });

  test("Get cat by name", async () => {
    const result = await request(app.callback()).get(
      "/api/v1/cat/query/Abyssinian"
    );

    expect(result.statusCode).toEqual(200);
  });
});
