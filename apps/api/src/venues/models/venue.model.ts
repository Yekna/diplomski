import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Event } from 'src/events/models/event.model';

@ObjectType({ description: 'Venue' })
export class Venue {
  @Field(() => ID)
  id: number;

  @Field()
  name: string;

  firebaseUserId: string;

  @Field()
  address: string;

  @Field()
  latitude: number;

  @Field({ nullable: true })
  isOwnedByMe?: boolean;

  @Field()
  longitude: number;

  @Field()
  picture: string;

  @Field(() => [Event], { nullable: true, defaultValue: [] })
  events?: Event[] = [];

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field({ nullable: true })
  deletedAt?: Date;
}
