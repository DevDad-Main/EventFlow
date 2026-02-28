import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Event, EventDocument } from './event.schema';
import { Model, Types } from 'mongoose';

@Injectable()
export class EventsService {
  constructor(
    @InjectModel(Event.name) private eventModel: Model<EventDocument>,
  ) {}

  //#region Find All
  async findAll(): Promise<Event[]> {
    return this.eventModel
      .find({ isPublished: true })
      .populate('venueId')
      .sort({ date: 1 })
      .exec();
  }
  //#endregion

  //#region Find One
  async findOne(id: string): Promise<Event> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException(`Invalid ObjectId: ${id}`);
    }

    const event = await this.eventModel.findById(id).populate('venueId').exec();

    if (!event) {
      throw new NotFoundException(`Event with id ${id} not found`);
    }

    return event;
  }
  //#endregion

  //#region Find Upcoming Events
  async findUpcomingEvents(limit: number = 10): Promise<Event[]> {
    return this.eventModel
      .find({
        isPublished: true,
        date: { $gte: new Date() },
      })
      .populate('venueId')
      .sort({ date: 1 })
      .limit(limit)
      .exec();
  }
  //#endregion
}
