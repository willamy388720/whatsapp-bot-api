import { app } from "@/app";
import { verifyJWT } from "@/middlewares/verify-jwt";
import { startWhatsapp } from "./startWhatsapp";
import { positiveDecision } from "./positiveDecision";
import { negativeDecision } from "./negativeDecision";

export async function botRoutes() {
  app.post("/start-whatsapp", { onRequest: [verifyJWT] }, startWhatsapp);

  app.post("/positive-decision", { onRequest: [verifyJWT] }, positiveDecision);

  app.post("/negative-decision", { onRequest: [verifyJWT] }, negativeDecision);
}
