import { BadRequestException, Injectable } from '@nestjs/common';
import { IRepositoryService } from '../repository.interface';
import { GetFilmDTO } from '../../films/dto/films.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Film } from 'src/films/schemas/films.schema';
import { Model } from 'mongoose';
import { PostOrderDTO } from 'src/order/dto/order.dto';
import { randomUUID } from 'crypto';

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
    if (!films) throw new BadRequestException({ message: `Films not found` });

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
      throw new BadRequestException({
        message: `Film with id ${id} not found`,
      });

    const { schedule } = this.getFilmMapperFn()(dbFilm);
    return {
      total: schedule.length,
      items: schedule,
    };
  }

  async postOrder(order: PostOrderDTO) {
    console.log(
      `RepositoryService::postOrder(order: ${JSON.stringify(order)})`,
    );
    if (order.tickets.length === 0)
      throw new BadRequestException({ message: 'no tickets in request' });

    order.tickets.forEach(async (ticket) => {
      const film = await this.filmModel.updateOne(
        {
          id: ticket.film,
          schedule: { $elemMatch: { id: ticket.session } },
        },
        {
          $push: {
            'schedule.$.taken': `${ticket.row}:${ticket.seat}`,
          },
        },
        {
          new: true,
        },
      );
      if (!film)
        throw new BadRequestException({ message: 'session not found' });
      // console.log(this.getFilmMapperFn()(film));
    });
    const responseObject = {
      total: order.tickets.length,
      items: order.tickets.map((ticket) => ({
        ...ticket,
        id: randomUUID(),
      })),
    };
    console.log(responseObject);
    return responseObject;
  }
}
