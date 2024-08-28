import { app } from "@/app";
import { register } from "./register";
import { authenticate } from "./authenticate";
import { refresh } from "./refresh";
import { verifyJWT } from "@/middlewares/verify-jwt";
import { profile } from "./profile";
import { update } from "./update";

export async function userRoutes() {
  app.post("/signup", register);
  app.post("/signin", authenticate);

  app.put("/users", { onRequest: [verifyJWT] }, update);
  app.patch("/token/refresh", refresh);

  app.get("/users/profile", { onRequest: [verifyJWT] }, profile);
}
