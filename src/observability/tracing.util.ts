import {
  Span,
  trace,
  context as otelContext,
  SpanStatusCode,
} from '@opentelemetry/api';
import { LoggerPlus } from './logger-plus';

export async function runWithTracing<T>(
  spanName: string,
  logger: LoggerPlus,
  fn: (span: Span) => Promise<T>,
): Promise<T> {
  return trace.getTracer('default').startActiveSpan(spanName, async (span) => {
    try {
      return await otelContext.with(
        trace.setSpan(otelContext.active(), span),
        async () => {
          return await fn(span);
        },
      );
    } catch (error) {
      span.recordException(error as Error);
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: (error as Error).message,
      });
      logger.error(`${spanName} failed: ${(error as Error).message}`);
      throw error;
    } finally {
      span.end();
    }
  });
}
