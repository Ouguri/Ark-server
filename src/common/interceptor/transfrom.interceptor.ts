// 响应拦截器
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface Response<T> {
  data: T;
}

@Injectable()
export class TransfromInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<Response<any>> {
    return next.handle().pipe(
      map((data) => ({
        data: instanceToPlain(data),
        status: 200,
        extra: {},
        message: 'success',
        success: true,
      })),
    );
  }
}

// Observable<Response<T>> | Promise<Observable<Response<T>>>
