import { Model } from "./model.type";

export type FarmerType = Model & {
    id: "3fa85f64-5717-4562-b3fc-2c963f66afa6";
    surname: string,
    otherNames: string,
    phoneNumber: string,
    district: string,
    sector: string,
    village: string,
    language: "KINYARWANDA",
    hasManyVarieties: true,
    hasFuerte: true,
    fuerteTrees: 0,
    fuerteTreesAge: 0,
    hasJumbo: true,
    jumboTrees: 0,
    jumboTreesAge: 0,
    hasHass: true,
    hassTrees: 0,
    hassTreesAge: 0,
    registrationTime: "2023-10-29T16:19:26.643Z",
    registrationDate: "2023-10-29",
    farmSize: string,
    farmerCode: string
};
