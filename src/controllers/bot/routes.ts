import { app } from "@/app";
import { verifyJWT } from "@/middlewares/verify-jwt";
import { startWhatsapp } from "./startWhatsapp";

export async function botRoutes() {
  app.post("/start-whatsapp", { onRequest: [verifyJWT] }, startWhatsapp);
}
