import * as FileSaver from "file-saver";
import XLSX from "sheetjs-style";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
const ExportExcel = ({
  excelData,
  fileName,
}: {
  excelData: any;
  fileName: string;
}) => {
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";
  const exportToExcel = async (fileName: string) => {
    const ws = XLSX.utils.json_to_sheet(excelData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };
  return <button className="bg-green-600 text-center px-4 py-[4px] rounded-md text-white" onClick={(e) => exportToExcel(fileName)}>Excel Export</button>;
};
export default ExportExcel;

export const transferToExportable = (data:any) => {
  const exportable = data.map((item:any) => {
    return {
      "Farmers Name": item.name,
      "Phone Number": item.phoneNumber,
      "District From": item.districtFrom,
      "Sector From": item.from?.name,
      "Village From": item.to?.name,
      "Date Requested": item.createdAt,
    };
  });
  return exportable;
};

export const exportPdf = (data:any, filename:any) => {
  const exportable = transferToExportable(data);
  const doc = new jsPDF({
    orientation: "landscape",
  });

  doc.setFontSize(15);
  doc.text(filename, 11, 8);
  doc.setFontSize(11);
  doc.setTextColor(100);
  autoTable(doc, {
    head: [
      [
        "Farmers Name",
        "Phone Number",
        "District From",
        "Sector From",
        "Village From",
        "Date Requested"
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
};
