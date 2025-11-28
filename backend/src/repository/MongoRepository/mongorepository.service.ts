import { Injectable, NotFoundException } from '@nestjs/common';
import { IRepositoryService } from '../repository.interface';
import { GetFilmDTO } from '../../films/dto/films.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Film } from 'src/films/schemas/films.schema';
import { Model } from 'mongoose';

@Injectable()
export class MongoRepositoryService implements IRepositoryService {
  constructor(@InjectModel(Film.name) private filmModel: Model<Film>) {}

  private getFilmMapperFn(): (Film) => GetFilmDTO {
    return (root) => {
      return {
        id: root.id,
        rating: root.rating,
        director: root.director,
        tags: root.tags,
        image: root.image,
        cover: root.cover,
        title: root.title,
        about: root.about,
        description: root.description,
        schedule: root.schedule,
      };
    };
  }

  async getFilms() {
    console.log('RepositoryService::getFilms');
    const filmsCount = await this.filmModel.countDocuments({});
    const films = await this.filmModel.find({});
    if (!films) throw new NotFoundException({ message: `Films not found` });

    const dbFilms = films.map(this.getFilmMapperFn());

    const mappedFilm = dbFilms.map((film) => {
      const { schedule: _schedule, ...filmInfo } = film;
      return filmInfo;
    });

    return {
      total: filmsCount,
      items: mappedFilm,
    };
  }

  async getFilmSchedule(id: string) {
    console.log('RepositoryService::getFilmSchedule(id: string),', id);
    const dbFilm = await this.filmModel.findOne({ id: id });
    if (!dbFilm)
      throw new NotFoundException({ message: `Film with id ${id} not found` });

    const { schedule } = this.getFilmMapperFn()(dbFilm);
    return {
      total: schedule.length,
      items: schedule,
    };
  }

  async postOrder(filmId: string, row: number, seat: number) {
    console.log(
      `RepositoryService::postOrder(filmId: ${filmId}, row: ${row}, seat: ${seat})`,
    );
  }
}
