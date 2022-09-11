import {
  Publisher,
  Subjects,
  ExpirationCompleteEvent
} from '@au_ah_gelap/common';

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  readonly subject = Subjects.ExpirationComplete;
}
