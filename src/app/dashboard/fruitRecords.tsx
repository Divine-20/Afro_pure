"use client"
import React, { useEffect, useState } from "react";
import { FruitDetails } from "./dataAssets";

interface FruitRecordsProps extends FruitDetails {}

const COLORS = ["#5160B3", "#000000", "#2CA900", "#D29539"];
import { useFarmersContext } from '../components/context/FarmersPageProvider'
import { get_all_farmers, get_farmers } from "../components/api-services/farmers";
import { PaginationOptionType } from "../components/types/pagination.type";
import { FarmerType } from "../components/types/farmers.type";

function FruitRecords(props: FruitRecordsProps) {
  const [farmerData, setFarmerData] = useState<FarmerType[]>([]);
  const [hassCount, setHassCount] = useState<number>(0);
  const [jumboCount, setJumboCount] = useState<number>(0);
  const [fuerteCount, setFuerteCount] = useState<number>(0);
  const getFarmersList = async () => {
    try {
      const allFarmers: any = await get_all_farmers();
      setFarmerData(allFarmers.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    let hassTreeCount = 0;
    let jumboTreeCount = 0;
    let fuerteTreeCount = 0;

    farmerData.forEach((farmer) => {
      if (farmer.hasHass) {
        hassTreeCount += farmer.hassTrees;
        setHassCount(hassTreeCount);
      }
      if (farmer.hasJumbo) {
        jumboTreeCount += farmer.jumboTrees;
        setJumboCount(jumboTreeCount);
      }
      if (farmer.hasFuerte) {
        fuerteTreeCount += farmer.fuerteTrees;
        setFuerteCount(fuerteTreeCount);
      }
    });
  });


  useEffect(() => {
    getFarmersList();
  }, []);
  return (
    <div className="flex items-center mb-4 p-3 min-w-[250px] gap-4 border cursor-pointer rounded-lg shadow-sm">
      <div className="w-full">
        <p className="text-gray-400">{props.title}</p>
          <h1
            className="font-bold text-2xl"
            style={{ color: COLORS[Math.floor(Math.random() * COLORS.length)] }}
          >
          
          {props.title ===  "Fuerte" ? `${fuerteCount} trees` : props.title === "Fuerte" ? `${fuerteCount} trees` : `${jumboCount} trees`}
          </h1>

      </div>  
    </div>
  );
}

export default FruitRecords;
