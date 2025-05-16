import React, { createContext, useContext, useState } from "react";

type SkipResetContextType = {
  skipNextReset: boolean;
  setSkipNextReset: (val: boolean) => void;
  pendingBookingEventId: string | null;
  setPendingBookingEventId: (id: string | null) => void;
};

const SkipResetContext = createContext<SkipResetContextType>({
  skipNextReset: false,
  setSkipNextReset: () => {},
  pendingBookingEventId: null,
  setPendingBookingEventId: () => {},
});

export const SkipResetProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [skipNextReset, setSkipNextReset] = useState(false);
  const [pendingBookingEventId, setPendingBookingEventId] = useState<string | null>(null);

  return (
    <SkipResetContext.Provider value={{ skipNextReset, setSkipNextReset, pendingBookingEventId, setPendingBookingEventId }}>
      {children}
    </SkipResetContext.Provider>
  );
};

export const useSkipReset = () => useContext(SkipResetContext);