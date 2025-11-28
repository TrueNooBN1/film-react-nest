import { Inject, Injectable } from '@nestjs/common';
import {
  IRepositoryService,
  FILM_REPOSITORY_SERVICE,
} from '../repository/repository.interface';

@Injectable()
export class OrderService {
  constructor(
    @Inject(FILM_REPOSITORY_SERVICE)
    private readonly repository: IRepositoryService,
  ) {}

  async postOrder(filmId: string, row: number, seat: number) {
    console.log(`postOrder(filmId: ${filmId}, row: ${row}, seat: ${seat})`);
    return this.repository.postOrder(filmId, row, seat);
  }
}
