import { PostOrderDTO } from 'src/order/dto/order.dto';

export const FILM_REPOSITORY_SERVICE = 'FILM_REPOSITORY_SERVICE';

export interface IRepositoryService {
  getFilms();
  getFilmSchedule(id: string);
  postOrder(order: PostOrderDTO);
}
