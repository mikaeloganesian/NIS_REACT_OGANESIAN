import React, { createContext, useContext, useState, useCallback } from 'react';
import type { ReactNode } from 'react';

interface EventContextType {
  events: string[];
  addEvent: (event: string) => void;
  clearEvents: () => void;
}

const EventContext = createContext<EventContextType | undefined>(undefined);

export const EventProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [events, setEvents] = useState<string[]>([]);

  const addEvent = useCallback((event: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setEvents((prev) => [`[${timestamp}] ${event}`, ...prev]);
  }, []);

  const clearEvents = useCallback(() => {
    setEvents([]);
  }, []);

  return (
    <EventContext.Provider value={{ events, addEvent, clearEvents }}>
      {children}
    </EventContext.Provider>
  );
};

export const useEventLog = (): EventContextType => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error('useEventLog must be used within EventProvider');
  }
  return context;
};
