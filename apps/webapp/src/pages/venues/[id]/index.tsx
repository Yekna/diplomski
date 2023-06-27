import { Spinner } from "@diplomski/components/Spinner";
import { VenueStatus } from "@diplomski/gql/graphql";
import useVenue from "@diplomski/hooks/useVenue";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { lazy, Suspense } from "react";
import { useDarkMode } from "usehooks-ts";

const StaticMap = lazy(() => import("@diplomski/components/StaticMap"));
const VenueNavigation = lazy(
  () => import("@diplomski/components/Venue/VenueNavigation")
);
const Button = lazy(() => import("@diplomski/components/Form/Button"));
const EventListItem = lazy(
  () => import("@diplomski/components/Event/EventListItem")
);

export default function VenuePage() {
  const { venue, fetching, error } = useVenue();
  const router = useRouter();
  const { isDarkMode } = useDarkMode();

  if (error && !fetching) {
    router.push("/404");
  }

  if (!venue || fetching) {
    return null;
  }

  return (
    <>
      <Head>
        <title>{venue.name} Profile Page</title>
      </Head>
      <Suspense fallback={<Spinner />}>
        <div className={`sm:flex ${isDarkMode && 'dark'}`}>
          <div className="p-3 w-full sm:w-1/2 dark:bg-gray-900 bg-gray-200 dark:text-white">
            <VenueNavigation venue={venue} />
            {venue.status !== VenueStatus.Active && (
              <p className="text-xl border-2 border-red-500 rounded-2xl p-3 my-2 text-center">
                This venue is currently{" "}
                <span className="font-bold">under review.</span>
              </p>
            )}
            <h1 className="text-4xl font-bold">
              {venue.name}
              {venue.isOwnedByMe && (
                <span className="text-xl"> (Your venue)</span>
              )}
            </h1>
            <p className="text-xl">
              Address: <span>{venue.address}</span>
            </p>
            <p className="text-xl">
              Phone number:{" "}
              <a href={`tel:${venue.phone}`} className="hover:underline">
                {venue.phone}
              </a>
            </p>
            <Image
              className="rounded-2xl"
              src={venue.picture}
              alt={venue.name}
              width={500}
              height={500}
            />
            <div className="flex flex-col my-3 overflow-y-auto">
              {venue.events?.map((event) => (
                <EventListItem
                  key={event.id}
                  event={event}
                  fallbackPicture={venue.picture}
                />
              ))}
            </div>
            <Button
              hidden={!venue.isOwnedByMe}
              type="button"
              onClick={() => router.push(`/venues/${venue.id}/events/add`)}
            >
              Add event to this venue
            </Button>
          </div>
          <div className="w-full sm:w-1/2">
            <Suspense fallback={<Spinner />}>
              <StaticMap
                viewport={{
                  latitude: venue.latitude,
                  longitude: venue.longitude,
                  zoom: 15,
                  bearing: 0,
                  pitch: 30,
                  padding: {
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                  },
                }}
                venues={[venue]}
              />
            </Suspense>
          </div>
        </div>
      </Suspense>
    </>
  );
}
