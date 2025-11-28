import { Controller, Post } from '@nestjs/common';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  postOrder() {
    console.log(`OrderController::postOrder`);
    return this.orderService.postOrder;
  }
}
