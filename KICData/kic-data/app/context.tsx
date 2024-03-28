import { useContext, createContext, useState } from "react";

const Context = { consent: false, setConsent2: (data: any) => {} };

export const Consent = createContext(Context);

export function ConsentSession({ children }: { children: React.ReactNode }) {
  const load: typeof Context =
    JSON.parse(localStorage.getItems("consent")) ?? Context;
  const [consent, setConsent] = useState<boolean>(load as unknown as any);
  const setConsent2 = (data: any) => {
    localStorage.setItem("consent", data());
    setConsent(data());
  };

  return (
    <Consent.Provider value={{ consent, setConsent2 }}>
      {children}
    </Consent.Provider>
  );
}
