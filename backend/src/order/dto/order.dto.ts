//TODO реализовать DTO для /orders

import {
  IsArray,
  IsDate,
  IsEmail,
  IsNumber,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export class PostTicketsDTO {
  @IsString()
  film: string;

  @IsString()
  session: string;

  @IsDate()
  daytime: Date;

  @IsNumber()
  row: number;

  @IsNumber()
  seat: number;

  @IsNumber()
  price: number;
}

export class PostOrderDTO {
  @IsEmail()
  email: string;

  @IsPhoneNumber()
  phone: string;

  @IsArray()
  tickets: PostTicketsDTO[];
}
