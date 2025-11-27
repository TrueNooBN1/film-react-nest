import { Injectable } from '@nestjs/common';

@Injectable()
export class FilmsService {

  async getFilms(){// :GetFilmDTO
    console.log("getFilms");
  }

  async getFilmSchedule(id: string){//: GetSchedulDTO
    console.log("getFilmSchedule(id: string),",id);
  }
}
