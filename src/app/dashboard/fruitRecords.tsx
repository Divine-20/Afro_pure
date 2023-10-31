"use client"
import React, { useEffect, useState } from "react";
import { FruitDetails } from "./dataAssets";

interface FruitRecordsProps extends FruitDetails { }

const COLORS = ["#5160B3", "#000000", "#2CA900", "#D29539"];
import { get_farmers_stats } from "../components/api-services/farmers";
import { StatsType } from "../components/types/stats.type";

function FruitRecords(props: FruitRecordsProps) {
  const [farmerData, setFarmerData] = useState({} as StatsType);

  const getFarmersList = async () => {
    try {
      const allFarmers: any = await get_farmers_stats();
      setFarmerData(allFarmers.data);
      console.log(allFarmers.data.fuerteTrees, "fuerteTrees");
    } catch (error) {
      console.error(error);
    }
  };

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
          
          {props.title === "Fuerte"
            ? `${farmerData.fuerteTrees} trees`
            : props.title === "Hass"
            ? `${farmerData.hassTrees} trees`
            : props.title === "Jumbo"
            ? `${farmerData.jumboTrees} trees`
            : `${farmerData.farmers} farmers`}
          </h1>
      </div>
    </div>
  );
}

export default FruitRecords;
