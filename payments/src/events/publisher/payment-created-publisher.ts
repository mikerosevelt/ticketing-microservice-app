import { Subjects, Publisher, PaymentCreatedEvent } from '@au_ah_gelap/common';

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  readonly subject = Subjects.PaymentCreated;
}
