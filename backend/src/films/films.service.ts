import { Inject, Injectable } from '@nestjs/common';
import {
  IRepositoryService,
  FILM_REPOSITORY_SERVICE,
} from '../repository/repository.interface';

@Injectable()
export class FilmsService {
  constructor(
    @Inject(FILM_REPOSITORY_SERVICE)
    private readonly repository: IRepositoryService,
  ) {}

  async getFilms() {
    // :GetFilmDTO
    console.log('FilmsService::getFilms');
    return this.repository.getFilms();
  }

  async getFilmSchedule(id: string) {
    //: GetSchedulDTO
    console.log('FilmsService::getFilmSchedule(id: string),', id);
    return this.repository.getFilmSchedule(id);
  }
}
