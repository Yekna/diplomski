import EventForm, {
  EventFormValues,
} from "@diplomski/components/Event/EventForm";
import useAddEvent from "@diplomski/hooks/useAddEvent";
import Head from "next/head";
import { useRouter } from "next/router";
import { useCallback } from "react";

export default function AddEventPage() {
  const { addEvent, result } = useAddEvent();
  const router = useRouter();
  const { id } = router.query;

  const onSubmit = useCallback(
    async (values: EventFormValues) => {
      await addEvent({
        ...values,
        venueId: Number(id),
      });
    },
    [addEvent, id]
  );

  if (result.data?.createEvent.id) {
    router.push(`/events/${result.data.createEvent.id}`);
  }

  return (
    <>
      <Head>
        <title>Add an event</title>
      </Head>
      <EventForm title="Add an event" buttonText="Add" onSubmit={onSubmit} />
    </>
  );
}