import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Venue } from './venue.schema';
import { Model, Types } from 'mongoose';
import { CreateVenueDto, UpdateVenueDto } from './venue.dto';

@Injectable()
export class VenueService {
  constructor(
    @InjectModel(Venue.name) private readonly venueModel: Model<Venue>,
  ) {}

  //#region Create Venue
  async createVenue(createVenueDto: CreateVenueDto): Promise<Venue> {
    return await this.venueModel.create(createVenueDto);
  }
  //#endregion

  //#region Find All
  async findAllVenues(): Promise<Venue[]> {
    return await this.venueModel.find({}).exec();
  }
  //#endregion

  //#region Find One
  async findOneVenue(id: string): Promise<Venue> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException(`Invalid ObjectId: ${id}`);
    }

    const venue = await this.venueModel.findById(id).exec();

    if (!venue) {
      throw new NotFoundException(`Venue with id ${id} not found`);
    }

    return venue;
  }
  //#endregion

  //#region Update Venue
  async updateVenue(
    id: string,
    updateVenueDto: UpdateVenueDto,
  ): Promise<Venue> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException(`Invalid ObjectId: ${id}`);
    }

    const venue = await this.venueModel
      .findByIdAndUpdate(id, { $set: updateVenueDto }, { new: true })
      .exec();

    if (!venue) {
      throw new NotFoundException(`Venue with id ${id} not found`);
    }
    return venue;
  }
  //#endregion

  //#region Delete Venue
  async deleteVenue(id: string): Promise<void> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException(`Invalid ObjectId: ${id}`);
    }

    const venue = await this.venueModel.findByIdAndDelete(id).exec();

    if (!venue) {
      throw new NotFoundException(`Venue with id ${id} not found`);
    }

    console.log(`Venue Deleted: `, { venue });
  }
  //#endregion
}
