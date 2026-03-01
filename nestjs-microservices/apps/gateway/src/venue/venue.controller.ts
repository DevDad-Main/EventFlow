import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { VenueService } from './venue.services';
import { AdminOnly } from '../auth/admin.decorator';
import { CreateVenueDto, UpdateVenueDto } from './venue.dto';
import { Public } from '../auth/public.decorator';

@Controller('venue')
export class VenueController {
  constructor(private readonly venueService: VenueService) {}

  @Get()
  @Public()
  findAllVenues() {
    return this.venueService.findAllVenues();
  }

  @Get(':id')
  @Public()
  findOneVenue(@Param('id') id: string) {
    return this.venueService.findOneVenue(id);
  }

  @Post()
  @AdminOnly() // <- Admins Only are allowed to create venues
  createVenue(@Body() createVenueDto: CreateVenueDto) {
    return this.venueService.createVenue(createVenueDto);
  }

  @Put(':id')
  @AdminOnly()
  updateVenue(@Param('id') id: string, @Body() updateVenueDto: UpdateVenueDto) {
    return this.venueService.updateVenue(id, updateVenueDto);
  }

  @Delete(':id')
  @AdminOnly()
  deleteVenue(@Param('id') id: string) {
    return this.venueService.deleteVenue(id);
  }
}
