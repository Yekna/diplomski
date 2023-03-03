import {
  ForbiddenException,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  ResolveField,
  Resolver,
  Query,
} from '@nestjs/graphql';
import { FirebaseGuard } from 'src/common/firebase/firebase.guard';
import { FirebaseUser } from 'src/common/firebase/firebase.user.decorator';
import { User } from 'src/user/models/user.model';
import { Venue } from 'src/venues/models/venue.model';
import { VenuesService } from 'src/venues/venues.service';
import { EventsService } from './events.service';
import { Event } from './models/event.model';

@Resolver(() => Event)
export class EventsResolver {
  constructor(
    private readonly eventsService: EventsService,
    private readonly venuesService: VenuesService,
  ) {}

  @ResolveField(() => Venue)
  async venue(@Parent() event: Event): Promise<Venue> {
    return this.venuesService.findById(event.venueId);
  }

  @Query(() => Event)
  async event(@Args('eventId') eventId: number): Promise<Event> {
    return this.eventsService.findById(eventId);
  }

  @Query(() => [Event])
  async venueEvents(@Args('venueId') venueId: number): Promise<Event[]> {
    return this.eventsService.findAllByVenueId(venueId);
  }

  @Mutation(() => Event)
  @UseGuards(FirebaseGuard)
  async cancelEvent(
    @Args('eventId') eventId: number,
    @FirebaseUser() user: User,
  ): Promise<Event> {
    const event = await this.eventsService.findById(eventId);
    if (!event) {
      throw new NotFoundException('Event not found');
    }
    if (event.venue.firebaseUserId !== user.id) {
      throw new ForbiddenException('You are not the owner of this event');
    }

    return this.eventsService.cancelEvent(eventId);
  }
}
