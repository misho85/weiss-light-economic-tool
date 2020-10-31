import { createContext, useState } from 'react';

export const ChartContext = createContext();

export const ChartProvider = ({ children }) => {
  const [state, setState] = useState();

  return (
    <ChartContext.Provider value={{ state, setState }}>
      {children}
    </ChartContext.Provider>
  );
};
