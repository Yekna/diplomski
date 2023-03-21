import { Field, ID, ObjectType } from '@nestjs/graphql';

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

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field({ nullable: true })
  deletedAt?: Date;

  @Field()
  phone: string;
}
