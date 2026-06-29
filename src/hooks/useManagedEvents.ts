import { useEffect, useState } from "react";
import {
  ManagedEvent,
  readManagedEvents,
  subscribeToManagedEvents,
  writeManagedEvents,
} from "../data/managedEvents";

type EventUpdater = ManagedEvent[] | ((currentEvents: ManagedEvent[]) => ManagedEvent[]);

export function useManagedEvents() {
  const [events, setEventsState] = useState<ManagedEvent[]>(() =>
    readManagedEvents(),
  );

  useEffect(() => {
    return subscribeToManagedEvents(() => {
      setEventsState(readManagedEvents());
    });
  }, []);

  const setEvents = (updater: EventUpdater) => {
    setEventsState((currentEvents) => {
      const nextEvents =
        typeof updater === "function" ? updater(currentEvents) : updater;
      writeManagedEvents(nextEvents);
      return nextEvents;
    });
  };

  return { events, setEvents };
}

