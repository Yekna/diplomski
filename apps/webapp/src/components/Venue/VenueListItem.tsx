import { Venue, VenueStatus } from "@diplomski/gql/graphql";
import { useMapHover } from "@diplomski/hooks/useMapHover";
import clsx from "clsx";
import Image from "next/image";
import { useRouter } from "next/router";
import { FC, useMemo } from "react";

interface Props {
  venue: Venue;
}

const VenueListItem: FC<Props> = ({ venue }) => {
  const router = useRouter();

  const { setHighlightedVenueId, isHighlighted } = useMapHover();

  const name = useMemo(() => {
    if (venue.status === VenueStatus.Draft) {
      return `${venue.name} (Draft)`;
    }

    return venue.name;
  }, [venue]);

  return (
    <div
      key={venue.id}
      className={clsx(
        [
          "flex",
          "border",
          "p-2",
          "rounded",
          "shadow",
          "gap-2",
          "cursor-pointer",
        ],
        {
          "bg-blue-900": isHighlighted(venue.id),
          grayscale: venue.status === VenueStatus.Draft,
        }
      )}
      onClick={() => {
        venue.status === VenueStatus.Active &&
          router.push(`/venues/${venue.id}`);
      }}
      onMouseEnter={() => setHighlightedVenueId(venue.id)}
      onMouseLeave={() => setHighlightedVenueId(null)}
    >
      <Image
        className="rounded"
        alt={venue.name}
        src={venue.picture}
        width={100}
        height={100}
      />
      <div className="flex flex-col">
        <span className="font-bold">{name}</span>
        <span>{venue.address}</span>
      </div>
    </div>
  );
};

export default VenueListItem;
