import { makeCreateSuspiciousMessageService } from "@/controllers/factories/make-create-suspicious-message";
import { formatPhoneNumber } from "@/utils/services/formatPhoneNumber";
import { Message, Whatsapp } from "venom-bot";

export async function customerDecision(
  userId: string,
  client: Whatsapp,
  message: Message,
  maliciousMessage: string,
  maliciousNameContact: string,
  malicousPhoneNumberContact: string,
  clientNumber: string
) {
  if (
    message.body.toLocaleLowerCase() === "sim" &&
    message.from === `${clientNumber}@c.us`
  ) {
    try {
      const createSuspiciousMessage = makeCreateSuspiciousMessageService();
      await createSuspiciousMessage.execute({
        userId,
        message: maliciousMessage,
        name: maliciousNameContact,
        phoneNumber: malicousPhoneNumberContact,
        photoUrl: null,
      });

      client.sendText(
        `${clientNumber}@c.us`,
        `Agradecemos por sua resposta. O número ${formatPhoneNumber(
          malicousPhoneNumberContact
        )} foi adicionado à nossa lista negra. Embora isso não impeça que ele envie mensagens através do WhatsApp, é uma medida preventiva importante.
  
  Recomendamos que você também bloqueie o número diretamente no WhatsApp para evitar futuros contatos indesejados. Continuamos à disposição para ajudar em qualquer outra dúvida ou questão de segurança.
  
  A sua segurança é nossa prioridade. Obrigado por colaborar conosco.`
      );
    } catch (error) {
      throw error;
    }
  } else if (message.from === `${clientNumber}@c.us`) {
    client.sendText(
      `${clientNumber}@c.us`,
      `Agradecemos por sua resposta. Respeitamos sua decisão de não adicionar o número ${formatPhoneNumber(
        malicousPhoneNumberContact
      )} à nossa lista negra. 
  
  Lembramos que é importante continuar atento(a) e seguir as medidas de segurança recomendadas:
  - Bloqueie o número em seu dispositivo.
  - Não responda nem forneça informações pessoais ou financeiras.
  - Reporte qualquer mensagem suspeita que receber.
  
  Caso mude de ideia ou precise de assistência adicional, estamos à disposição para ajudar.
  
  A sua segurança é nossa prioridade. Obrigado por colaborar conosco.`
    );
  }
}
