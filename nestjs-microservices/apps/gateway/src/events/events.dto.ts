import { Type } from 'class-transformer';
import {
  isArray,
  IsArray,
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';

class TicketTierDto {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsNumber()
  @Min(0)
  @Max(1000) // Dependant on business logic
  available: number;

  @IsOptional()
  @IsString()
  description?: string;
}

export class CreateEventDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  subtitle?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsString()
  artist: string;

  @IsDateString()
  date: string;

  @IsString()
  time: string;

  @IsOptional()
  @IsString()
  doorsOpen?: string;

  @IsString()
  venueId: string;

  @IsOptional()
  @IsString()
  heroImage?: string;

  @IsOptional()
  @IsArray()
  /**
   * Specifies if validated value is an array and each of its items must be validated.
   */
  @IsString({ each: true })
  galleryImages?: string[];

  @IsOptional()
  @IsString()
  genre?: string;

  @IsOptional()
  @IsArray()
  //NOTE: Objects / object arrays marked with this decorator will also be validated.
  @ValidateNested({ each: true })
  @Type(() => TicketTierDto)
  ticketTiers?: TicketTierDto[];
}
