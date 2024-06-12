import { app } from "@/app";
import { create } from "domain";
import { fetchSuspiciousMessages } from "./fetch-suspicious-messages";
import { destroy } from "./destroy";

export async function contactRoutes() {
  app.post("/contacts", create);

  app.get("/contacts", fetchSuspiciousMessages);

  app.delete("/contacts/:id", destroy);
}
