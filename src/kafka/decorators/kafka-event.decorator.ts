import { SetMetadata } from '@nestjs/common';
import { KAFKA_EVENT_METADATA } from '../interface/kafka-event.interface.js';

/**
 * Dekorator zur Registrierung eines Kafka-Event-Handlers für ein bestimmtes Event.
 *
 * @param eventName Name des Kafka-Events (z. B. 'profile.user.created')
 */
export const KafkaEvent = (eventName: string): ClassDecorator => {
  return SetMetadata(KAFKA_EVENT_METADATA, eventName);
};
