export const FILM_REPOSITORY_SERVICE = 'FILM_REPOSITORY_SERVICE';

export interface IRepositoryService {
  getFilms();
  getFilmSchedule(id: string);
  postOrder(filmId: string, row: number, seat: number);
}
