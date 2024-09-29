import { app } from "@/app";
import { create } from "./create";
import { getContact } from "./get-Contact";
import { fetchContacts } from "./fetch-contacts";
import { update } from "./update";
import { destroy } from "./destroy";
import { verifyJWT } from "@/middlewares/verify-jwt";

export async function contactRoutes() {
  app.post("/contacts", { onRequest: [verifyJWT] }, create);

  app.get("/contacts/:id", getContact);
  app.get("/contacts", { onRequest: [verifyJWT] }, fetchContacts);

  app.put("/contacts/:id", update);

  app.delete("/contacts/:id", destroy);
}
