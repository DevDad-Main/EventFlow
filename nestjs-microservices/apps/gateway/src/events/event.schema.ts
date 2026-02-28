import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type EventDocument = HydratedDocument<Event>;

@Schema({ timestamps: true })
export class Event {
  @Prop({ required: true })
  title: string;

  @Prop()
  subtitle: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  artist: string;

  @Prop({ required: true })
  date: Date;

  @Prop({ required: true })
  time: string;

  @Prop()
  doorsOpen: string;

  //NOTE: Reference to the Venue Collection
  @Prop({ type: Types.ObjectId, ref: 'Venue' })
  venueId: Types.ObjectId;

  @Prop()
  heroImage: string;

  @Prop({ type: [String] })
  galleryImages: string[];

  @Prop()
  genre: string;

  @Prop({ default: 0 })
  rating: number;

  @Prop({ default: 0 })
  reviewCount: number;

  @Prop({ default: 0 })
  savedCount: number;

  @Prop({
    type: [
      {
        id: String,
        name: String,
        price: Number,
        available: Number,
        description: String,
      },
    ],
  })
  ticketTiers: Array<{
    id: string;
    name: string;
    price: number;
    available: number;
    description: string;
  }>;

  @Prop({ default: false })
  isPublished: boolean;
}

export const EventSchema = SchemaFactory.createForClass(Event);
