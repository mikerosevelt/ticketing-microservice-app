import { Publisher, Subjects, TicketUpdatedEvent } from '@au_ah_gelap/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}
