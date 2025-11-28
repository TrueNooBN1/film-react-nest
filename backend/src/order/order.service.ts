import { Inject, Injectable } from '@nestjs/common';
import {
  IRepositoryService,
  FILM_REPOSITORY_SERVICE,
} from '../repository/repository.interface';
import { PostOrderDTO } from './dto/order.dto';

@Injectable()
export class OrderService {
  constructor(
    @Inject(FILM_REPOSITORY_SERVICE)
    private readonly repository: IRepositoryService,
  ) {}

  async postOrder(order: PostOrderDTO) {
    console.log(`OrderService::postOrder(order: ${JSON.stringify(order)})`);
    return this.repository.postOrder(order);
  }
}
