import React, { createContext, useEffect, useState } from "react";

export const MedaContext = createContext();

export const MedaContextProvider = ({ children, ext }) => {
  const [medaExtVal, setMedaExtVal] = useState({});
  useEffect(() => {
    setMedaExtVal(ext);
    return () => {};
  }, [ext]);

  return (
    <MedaContext.Provider value={[medaExtVal, setMedaExtVal]}>
      {children}
    </MedaContext.Provider>
  );
};
