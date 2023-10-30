"use client"
import { ReactNode, useEffect, useState } from "react";
import { PaginationOptionType } from "../types/pagination.type";
import { Model } from "../types/model.type";
import { useRouter } from 'next/navigation'
import { buildQueryString } from "../utils/query.string";
import styled from "styled-components";

const Button = styled.button`
  background-color: #1d5fad;
  border-radius: 4px;
  border: none;
  color: white;
  padding: 0.2rem 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    background: #3b82f6;
  }
`;
export type TableColumn<Entry> = {
  title: string;
  selector?: string;
  cell: (row: Entry, index: number) => ReactNode;
  omit?: boolean;
};

type DataTableProps<Entry> = {
  data: Entry[];
  isLoading: boolean;
  columns: TableColumn<Entry>[];
  last: boolean;
  first: boolean;
  pageNumber: number;
  totalPages: number;
  totalElements: number;
  pageTracker?: any;
  otherParams?: { [key: string]: any };
  getData?: (option?: PaginationOptionType) => void;
};

export const DataTable = <Entry extends Model>(
  props: DataTableProps<Entry>
) => {
  const {
    columns,
    data,
    isLoading = false,
    getData,
    first,
    last,
    pageNumber,
    totalElements,
    totalPages,
    otherParams,
    pageTracker
  } = props;

  const router = useRouter();

  const queryParams = new URLSearchParams();

  // for (const key in router.query) {
  //   if (router.query.hasOwnProperty(key)) {
  //     const value = router.query[key];
  //     if (Array.isArray(value)) {
  //       // Handle arrays of values, if necessary
  //       value.forEach((item) => {
  //         queryParams.append(key, item);
  //       });
  //     } else {
  //       if (value !== undefined) {
  //         queryParams.set(key, value);
  //       }
  //     }
  //   }
  // }

  const [selectAll, setSelectAll] = useState(false);

  const [activePage, setActivePage] = useState<number>(
    Number(queryParams.get("page")) || 0
  );

  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const paginationView = (currentPage: number, pageCount: number) => {
    const delta = 3,
      left = currentPage - delta,
      right = currentPage + delta + 1;

    let result: any[] = [];

    result = Array.from({ length: pageCount }, (v, k) => k).filter(
      (i) => i && i >= left && i < right
    );

    if (result.length > 1) {
      if (result[0] > 1) {
        if (result[0] > 2) {
          result.unshift("...");
        }
        result.unshift(1);
      }

      if (result[result.length - 1] < pageCount) {
        if (result[result.length - 1] !== pageCount - 1) {
          result.push("...");
        }
        result.push(pageCount);
      }
    }

    return result;
  };

  const paginationData = paginationView(activePage, totalPages);

  const handleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);

    if (newSelectAll) {
      setSelectedItems(data.map((item) => item.id));
    } else {
      setSelectedItems([]);
    }
  };

  const handleRowSelect = (itemId: string) => {
    if (selectedItems.includes(itemId)) {
      setSelectedItems(selectedItems.filter((id) => id !== itemId));
    } else {
      setSelectedItems([...selectedItems, itemId]);
    }
  };

  const [paginate, setPaginate] = useState({
    pageNumber: queryParams.get("page") ? Number(queryParams.get("page")) : 0,
    pageSize: queryParams.get("size") ? Number(queryParams.get("size")) : 5
  });

  const updateQueryParams = (params: {
    pageNumber: number;
    pageSize: number;
  }) => {
    const query = buildQueryString({
      page: params.pageNumber.toString(),
      limit: params.pageSize.toString(),
      ...otherParams
    });
    // router.push(`${router.path}?${query}`);
  };

  function onPageSizeChange(e: any) {
    setPaginate((prev: any) => {
      return {
        ...prev,
        pageSize: Number(e.target.value),
        pageNumber: 0
      };
    });
  }

  function onClickNextPage() {
    setActivePage(activePage + 1);
    setPaginate((prev: any) => {
      return {
        ...prev,
        pageNumber: pageNumber + 1
      };
    });
  }

  function onClickPreviousPage() {
    setActivePage(activePage - 1);
    setPaginate((prev: any) => {
      return {
        ...prev,
        pageNumber: pageNumber - 1
      };
    });
  }

  const handleClick = (value: number) => {
    setActivePage(value - 1);
    setPaginate((prev: any) => {
      return {
        ...prev,
        pageNumber: value - 1
      };
    });
  };

  useEffect(() => {
    updateQueryParams({
      pageNumber: paginate.pageNumber,
      pageSize: paginate.pageSize
    });
    if (getData)
      getData({
        size: paginate.pageSize,
        page: paginate.pageNumber,
        ...otherParams
      });
  }, [paginate, otherParams]);

  useEffect(() => {
    setActivePage(0);
    setPaginate((cur) => {
      return { ...cur, pageNumber: 0 };
    });
  }, [pageTracker]);

  return (
    <div className='flex flex-col w-full'>
      <div
        style={{
          width: "100%",
          overflowX: "scroll",
          minHeight: "10rem",
          minWidth: "100%"
        }}
        className='sm-transfers-table-container overflow-x-auto'
      >
        <table className='sm-transfers-table mt-8'>
          <thead className='rounded-sm bg-[#64748B] bg-opacity-10'>
          
          </thead>
          <tbody className=''>
            <tr className=''>
              {isLoading && (
                <td
                  colSpan={columns.length + 2}
                  className='text-light px-2 py-3 text-center text-sm font-normal'
                >
                  One moment please ...
                </td>
              )}

              {!isLoading && data?.length === 0 && (
                <td
                  colSpan={columns.length + 2}
                  className='text-light px-2 py-3 text-center text-sm font-normal'
                >
                  No data found
                </td>
              )}
            </tr>

            {!isLoading &&
              data?.map((element, elementKey) => (
                <tr key={elementKey} className=''>
             
                  <td>
                    {paginate.pageSize * (pageNumber + 1) -
                      paginate.pageSize +
                      elementKey +
                      1}
                  </td>
                  {columns
                    .filter((col) => !col.omit)
                    .map((column, columnKey) => (
                      <td key={columnKey}>
                        {column.cell(element, elementKey)}
                      </td>
                    ))}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      {!isLoading && (
        <div className='table-pagination py-2 min-w-full overflow-auto flex justify-between'>
          <div className='flex items-center justify-between gap-2'>
            <span className='disabled min-w-20 cursor-pointer rounded-md bg-slate-500 p-2 text-slate-100  duration-100 disabled:cursor-default'>
              {data.length
                ? paginate.pageSize * (pageNumber + 1) - paginate.pageSize + 1
                : 0}{" "}
              -{" "}
              {data.length
                ? paginate.pageSize * (pageNumber + 1) -
                  paginate.pageSize +
                  data.length
                : 0}{" "}
              of {isNaN(totalElements) ? 0 : totalElements}
            </span>
            <span className='flex items-center justify-center gap-2'>
              <label className=''>Rows/Page</label>
              <select
                className='text-dark block w-20 appearance-none rounded-md border-0 bg-slate-100 px-3 text-base font-medium capitalize placeholder-gray-500 focus:outline-none focus:ring-0 disabled:bg-slate-500 disabled:text-slate-100'
                onChange={onPageSizeChange}
                value={paginate.pageSize}
                disabled={totalElements <= 5}
              >
                <option value='5'>5</option>
                <option value='10'>10</option>
                <option value='25'>25</option>
                <option value='50'>50</option>
                <option value='100'>100</option>
              </select>
            </span>
          </div>
          <div className='flex justify-center'>
            {paginationData.map((value, index) =>
              value === "..." ? (
                <p className='mx-1 flex items-center' key={index}>
                  {value}
                </p>
              ) : (
                <div
                  key={index}
                  className={`pagination-item ${
                    activePage + 1 === value && "active"
                  }`}
                  onClick={() => {
                    handleClick(value);
                  }}
                >
                  <p>{value}</p>
                </div>
              )
            )}
          </div>
          <div className='flex gap-1 text-sm'>
            <Button disabled={first} onClick={onClickPreviousPage}>
              Previous
            </Button>
            <Button disabled={last} onClick={onClickNextPage}>
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
