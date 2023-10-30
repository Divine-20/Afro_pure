import React from "react";
import { FruitDetails } from "./dataAssets";

interface FruitRecordsProps extends FruitDetails {}

const COLORS = ["#5160B3", "#000000", "#2CA900", "#D29539"];
import { useFarmersContext } from '../components/context/FarmersPageProvider'
import { get_farmers } from "../components/api-services/farmers";
import { PaginationOptionType } from "../components/types/pagination.type";

function FruitRecords(props: FruitRecordsProps) {
  const { farmers, setFarmers } =
  useFarmersContext();
  const getFarmers = async (options: PaginationOptionType) => {
    try {
      
      const farmers:any = await get_farmers({
        ...options
      });
      setFarmers(farmers.data);
    } catch (error) {
      console.error(error);
    } finally {
    
    }
  };
  return (
    <div className="flex items-center mb-4 p-3 min-w-[250px] gap-4 border cursor-pointer rounded-lg shadow-sm">
      <div className="w-full">
        <p className="text-gray-400">{props.title}</p>
          <h1
            className="font-bold text-2xl"
            style={{ color: COLORS[Math.floor(Math.random() * COLORS.length)] }}
          >
          {`${props.fruitNumber}`}
          </h1>
      </div>
    </div>
  );
}

export default FruitRecords;
