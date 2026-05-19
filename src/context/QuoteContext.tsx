import { createContext, useCallback, useContext, useState, ReactNode } from "react";

type QuoteContextValue = {
  open: boolean;
  service: string;
  openQuote: (service?: string) => void;
  closeQuote: () => void;
};

const QuoteContext = createContext<QuoteContextValue | undefined>(undefined);

export const QuoteProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [service, setService] = useState("");

  const openQuote = useCallback((s?: string) => {
    setService(s ?? "");
    setOpen(true);
  }, []);
  const closeQuote = useCallback(() => setOpen(false), []);

  return (
    <QuoteContext.Provider value={{ open, service, openQuote, closeQuote }}>
      {children}
    </QuoteContext.Provider>
  );
};

export const useQuote = () => {
  const ctx = useContext(QuoteContext);
  if (!ctx) throw new Error("useQuote must be used inside QuoteProvider");
  return ctx;
};
