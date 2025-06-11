import { Controller, Get } from '@nestjs/common';
import {
  HealthCheckService,
  MongooseHealthIndicator,
  HttpHealthIndicator,
  HealthCheck,
} from '@nestjs/terminus';
import { KafkaIndicator } from './kafka.indicator.js';
import { Public } from '../security/keycloak/decorators/public.decorator.js';

@Controller('health')
export class HealthController {
  readonly #health: HealthCheckService;
  readonly #mongoose: MongooseHealthIndicator;
  readonly #http: HttpHealthIndicator;
  readonly #kafka: KafkaIndicator;

  constructor(
    health: HealthCheckService,
    mongoose: MongooseHealthIndicator,
    http: HttpHealthIndicator,
    kafka: KafkaIndicator,
  ) {
    this.#health = health;
    this.#mongoose = mongoose;
    this.#http = http;
    this.#kafka = kafka;
  }

  @Get('liveness')
  @HealthCheck()
  @Public()
  liveness() {
    return this.#health.check([
      () => Promise.resolve({ app: { status: 'up' } }),
    ]);
  }

  @Get('readiness')
  @HealthCheck()
  @Public()
  readiness() {
    return this.#health.check([
      () => this.#mongoose.pingCheck('mongodb'),
      () => this.#kafka.isHealthy(),
      () => this.#http.pingCheck('tempo', process.env.TEMPO_HEALTH_URL!),
      () =>
        this.#http.pingCheck('prometheus', process.env.PROMETHEUS_HEALTH_URL!),
    ]);
  }
}
