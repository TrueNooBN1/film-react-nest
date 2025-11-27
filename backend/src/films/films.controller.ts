import { Controller, Get, Req } from '@nestjs/common';

@Controller('films')
export class FilmsController {

  @Get()
  getAllFilms(){
    return "";
  }

  @Get(":id/schedule")
  getFilmSchedule(@Req() req:Request){
    return "schedule"
  }
}
