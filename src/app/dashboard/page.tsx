"use client";
import React, { useEffect, useState } from "react";
import SectionHead from "./sectionHead";
import SideBar from "./sideBar";
import { fruitDetails } from "./dataAssets";
import FruitRecords from "./fruitRecords";
import {
  PaginationOptionType,
  PaginationType,
} from "../components/types/pagination.type";
import { DataTable, TableColumn } from "../components/dataTable";
import { FarmerType } from "../components/types/farmers.type";
import {
  get_all_farmers,
  get_farmers,
} from "../components/api-services/farmers";
import { useFarmersContext } from "../components/context/FarmersPageProvider";
import ExportExcel from "../units/excelExport";
function Index() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [farmerData, setFarmerData] = useState<FarmerType[]>();
  const { farmers, setFarmers } = useFarmersContext();

  const farmers_columns: TableColumn<FarmerType>[] = [
    {
      title: "Farmer's Name",
      cell: (row) => <div>{`${row.surname} ${row.otherNames}`}</div>,
    },
    {
      title: "Phone Number",
      cell: (row) => <div>{row.phoneNumber}</div>,
    },
    {
      title: "District",
      cell: (row) => <div>{row.district}</div>,
    },
    {
      title: "Sector",
      cell: (row) => <div>{row.sector}</div>,
    },
    {
      title: "Village",
      cell: (row) => <div>{row.village}</div>,
    },
    {
      title: "Fuerte Trees",
      cell: (row) => <div>{row.jumboTrees}</div>,
    },
    {
      title: "Fuerte Trees Age",
      cell: (row) => <div>{row.jumboTreesAge}</div>,
    },
    {
      title: "Jumbo Trees",
      cell: (row) => <div>{row.jumboTrees}</div>,
    },
    {
      title: "Jumbo Trees Age",
      cell: (row) => <div>{row.jumboTreesAge}</div>,
    },
    {
      title: "Hass Trees",
      cell: (row) => <div>{row.jumboTrees}</div>,
    },
    {
      title: "Hass Trees Age",
      cell: (row) => <div>{row.jumboTreesAge}</div>,
    },
    {
      title: "Registration Date",
      cell: (row) => <div>{row.registrationDate}</div>,
    },
    {
      title: "Farm Size",
      cell: (row) => <p>{row.farmSize}</p>,
    },
    {
      title: "Farmer Code",
      cell: (row) => <div>{row.farmerCode}</div>,
    },
  ];
  const getFarmers = async (options: PaginationOptionType) => {
    try {
      setIsLoading(true);
      const foundFarmers = await get_farmers({
        ...options,
      });
      setFarmers(foundFarmers.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  const getFarmersList = async () => {
    try {
      const allFarmers: any = await get_all_farmers();
      setFarmerData(allFarmers.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {getFarmersList()}, []);
  return (
    <div className="w-full bg-[#00800010] flex">
      <SideBar />
      <div className="m-[20px] w-full rounded-md ">
        <div className=" bg-white w-full  relative p-[20px] rounded-md shadow-sm shadow-neutal-300">
          <div className="flex  z-100  items-start justify-between">
            <SectionHead title="Avocado Fruits" desc="All Fruits available" />
          </div>
          <div className="flex gap-4 my-[20px] overflow-x-scroll scrollable">
            {fruitDetails.map((item, index) => (
              <FruitRecords {...item} key={index} />
            ))}
          </div>
        </div>
        <div className=" bg-white p-[20px] rounded-md shadow-sm shadow-neutal-300 mt-2">
          <div className="items-start justify-between">
            <div className="flex">
              <SectionHead
                title="Farmer's table"
                desc="More Details about the Farmers"
              />
              <ExportExcel excelData={farmerData} fileName="farmers" />
            </div>
            <DataTable
              columns={farmers_columns}
              getData={(options = { page: 0, size: 5 }) => {
                getFarmers(options).catch((error) => {
                  console.error(error);
                });
              }}

              isLoading={isLoading}
              data={farmers?.content ?? []}
              first={farmers?.first ?? true}
              last={farmers?.last ?? true}
              pageNumber={farmers?.number ?? 0}
              totalElements={0}
              totalPages={farmers?.totalPages ?? 0}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Index;
