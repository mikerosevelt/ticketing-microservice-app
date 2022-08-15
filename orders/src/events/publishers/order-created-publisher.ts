import { Publisher, OrderCreatedEvent, Subjects } from "@au_ah_gelap/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated
}