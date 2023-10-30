"use client"
import React, { ReactNode, createContext, useContext, useState } from "react";
import { PaginationType } from "../types/pagination.type";
import { FarmerType } from "../types/farmers.type";
type FarmersPageContextValue = {
  farmers: PaginationType<FarmerType> | undefined;
  setFarmers: React.Dispatch<
    React.SetStateAction<PaginationType<FarmerType> | undefined>
  >;
  onClose: () => void;
};

export const FarmersPageContext =
  createContext<FarmersPageContextValue>({} as FarmersPageContextValue);

type FarmersPageProviderProps = {
  children: ReactNode;
};

const FarmersPageProvider = (props: FarmersPageProviderProps) => {
  const { children } = props;
  const [farmers, setFarmers] = useState<PaginationType<FarmerType>>();

  const onClose = () => {};

  return (
    <FarmersPageContext.Provider
      value={{
        farmers,
        setFarmers,
        onClose
      }}
    >
      {children}
    </FarmersPageContext.Provider>
  );
};

export default FarmersPageProvider;

export const useFarmersContext = () => useContext(FarmersPageContext);
