import { Injectable } from '@nestjs/common';

@Injectable()
export class OrderService {
  async postOrder(filmId: string, row: number, seat: number){
    console.log(`postOrder(filmId: ${filmId}, row: ${row}, seat: ${seat})`);
  }
}
