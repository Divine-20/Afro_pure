import jsPDF from "jspdf"
import "jspdf-autotable"
import { format} from "date-fns"
import autoTable from "jspdf-autotable";

export const transferToExportable = (data:any) => {
    const exportable = data.map((item:any) => {
      return {
        "id":item.id,
        "surname":item.surname,
        "otherNames":item.otherNames,
        "phoneNumber":item.phoneNumber,
        "district":item.district,
        "sector":item.sector,
        "village":item.village,
        "language":item.language,
        "hasManyVarieties" :item.hasManyVarieties,
        "hasFuerte":item.hasFuerte,
        "fuerteTrees":item.fuerteTrees,
        "fuerteTreesAge":item.fuerteTreesAge,
        "hasJumbo"  :item.hasJumbo,
        "jumboTrees":item.jumboTrees,
        "jumboTreesAge":item.jumboTreesAge,
        "hasHass":item.hasHass,
        "hassTrees":item.hassTrees,
        "hassTreesAge":item.hassTreesAge,
        "registrationTime":item.registrationTime,
        "registrationDate":format(new Date(item.registrationDate), "dd/MM/yyyy"),
        "farmSize":item.farmSize,
        "farmerCode":  item.farmerCode,
      };
    });
    return exportable;
  };

export const exportPdf = (data:any, filename:any) => {
    const exportable = transferToExportable(data);
    const doc = new jsPDF({
        orientation:"landscape"
    });
    doc.setFontSize(15);
    doc.text(filename, 11, 8);
    doc.setFontSize(11);
    doc.setTextColor(100);

    autoTable(doc, {
        head: [
          [
            "id",
        "surname",
        "otherNames",
        "phoneNumber",
        "district",
        "sector",
        "village",
        "language",
        "hasManyVarieties",
        "hasFuerte",
        "fuerteTrees",
        "fuerteTreesAge",
        "hasJumbo",
        "jumboTrees",
        "jumboTreesAge",
        "hasHass",
        "hassTrees",
        "hassTreesAge",
        "registrationTime",
        "registrationDate",
        "farmSize",
        "farmerCode"
          ],
        ],
        body: exportable.map((item:any) => Object.values(item)),
        margin: { top: 25 },
        headStyles: {
          fillColor: [41, 128, 185],
          cellWidth: "auto",
          minCellWidth: 10,
          overflow: "visible",
        },
      });
      doc.save(`${filename}.pdf`);
    
}