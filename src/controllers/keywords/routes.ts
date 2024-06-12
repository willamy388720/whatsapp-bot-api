import { app } from "@/app";
import { create } from "./create";
import { fetchKeywords } from "./fetch-keywords";
import { destroy } from "./destroy";

export async function keywordRoutes() {
  app.post("/keywords", create);

  app.get("/keywords", fetchKeywords);

  app.delete("/keywords/:id", destroy);
}
