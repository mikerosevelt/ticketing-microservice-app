import { Publisher, OrderCancelledEvent, Subjects } from "@au_ah_gelap/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled
}