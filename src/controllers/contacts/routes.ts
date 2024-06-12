import { app } from "@/app";
import { create } from "./create";
import { getContact } from "./get-Contact";
import { fetchContacts } from "./fetch-contacts";
import { update } from "./update";
import { destroy } from "./destroy";

export async function contactRoutes() {
  app.post("/contacts", create);

  app.get("/contacts/:id", getContact);
  app.get("/contacts", fetchContacts);

  app.put("/contacts/:id", update);

  app.delete("/contacts/:id", destroy);
}
