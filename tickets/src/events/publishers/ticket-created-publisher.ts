import { Publisher, Subjects, TicketCreatedEvent } from "@au_ah_gelap/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
  
}
