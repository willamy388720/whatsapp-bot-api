import { app } from "@/app";
import { create } from "./create";
import { fetchSuspiciousMessages } from "./fetch-suspicious-messages";
import { destroy } from "./destroy";
import { catchSuspiciousMessage } from "./catch-suspicious-messages";
import { verifyJWT } from "@/middlewares/verify-jwt";

export async function suspiciousMessageRoutes() {
  app.post("/suspicious_messages", create);
  app.post("/suspicious_messages/catch", catchSuspiciousMessage);

  app.get(
    "/suspicious_messages",
    { onRequest: [verifyJWT] },
    fetchSuspiciousMessages
  );

  app.delete("/suspicious_messages/:id", destroy);
}
