import React, { createContext, useContext, useState } from "react";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [selectedData, setSelectedData] = useState({});

  return (
    <DataContext.Provider value={{ selectedData, setSelectedData }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
