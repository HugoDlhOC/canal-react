import { createContext, useState } from "react";

export const CanalContext = createContext(null);

export const CanalContextProvider = ({ children }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [contentModal, setContentModal] = useState(undefined);
  const [data, setData] = useState(undefined);
  const [typeOfData, setTypeOfData] = useState(undefined);
  const [totalPagesResult, setTotalPagesResult] = useState(1);
  const [results, setResults] = useState(undefined);

  const value = {
    modalIsOpen,
    setModalIsOpen,
    contentModal,
    setContentModal,
    data,
    setData,
    typeOfData,
    setTypeOfData,
    totalPagesResult,
    setTotalPagesResult,
    results,
    setResults,
  };

  return (
    <CanalContext.Provider value={value}>{children}</CanalContext.Provider>
  );
};

export default CanalContext;
