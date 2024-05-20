"use client";

import { useState } from "react";
import {
  ColumnDef,
  SortingState,
  VisibilityState,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useAccount, useReadContract } from "wagmi";
import { OP_TOKEN_ADDRESS } from "@/config/config";
import { opTokenAbi } from "@/config/op-token-abi";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([
    { id: "gov_score", desc: true },
  ]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    metadata__address: false,
    pct_voting_power: false,
  });
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [filterCheck, setFilterCheck] = useState(true);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    enableSortingRemoval: false,
    onColumnVisibilityChange: setColumnVisibility,
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnVisibility,
      columnFilters,
    },
  });

  const { isConnected, address } = useAccount();
  const { data: delegateAddress } = useReadContract({
    address: OP_TOKEN_ADDRESS,
    abi: opTokenAbi,
    functionName: "delegates",
    args: [address ?? "0x"],
    chainId: 10,
  });

  return (
    <div className="mx-auto md:w-min">
      {/* Search & Filters */}
      <div className="flex flex-wrap items-center gap-4 pb-4">
        <Input
          placeholder="Filter delegates..."
          type="search"
          value={
            (table.getColumn("delegate")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("delegate")?.setFilterValue(event.target.value)
          }
          className="max-w-sm shadow-sm"
        />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              Edit Columns
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    onSelect={(e) => e.preventDefault()}
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id.replaceAll("_", " ").replaceAll("metadata", "")}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="delegate_filter"
            disabled={!isConnected && filterCheck}
            onCheckedChange={(val) => {
              setFilterCheck(!val);
              table
                .getColumn("metadata__address")
                ?.setFilterValue(val ? delegateAddress : "");
            }}
          />
          <label
            htmlFor="delegate_filter"
            className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:line-through peer-disabled:opacity-50"
          >
            {"My Delegate"}
          </label>
        </div>
      </div>

      {/* Table */}
      <div className="relative w-full rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className={`text-center ${header.id === "delegate" ? `min-w-[${header.getSize()}px]` : ""}`}
                    >
                      {header.isPlaceholder ? null : (
                        <>
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                        </>
                      )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="mt-3 flex justify-center px-2 text-sm md:justify-between">
        <div className="hidden w-40 text-muted-foreground md:block">
          Rows per page: {table.getRowCount() <= 10 ? table.getRowCount() : 10}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => table.firstPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {"<<"}
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {"<"}
          </Button>
          <div>
            {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount().toLocaleString()}
          </div>
          <Button
            size="sm"
            variant="outline"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            {">"}
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => table.lastPage()}
            disabled={!table.getCanNextPage()}
          >
            {">>"}
          </Button>
        </div>
        <div className="hidden w-40 text-right text-muted-foreground md:block">
          Total: {table.getRowCount()}
        </div>
      </div>
      <div className="mb-12 mt-3 flex items-center justify-center space-x-2 text-sm">
        <div>{"Go to page: "}</div>
        <Input
          type="text"
          inputMode="numeric"
          placeholder="1"
          onChange={(e) => {
            const page = e.target.value ? Number(e.target.value) - 1 : 0;
            if (page >= 0 && page < table.getPageCount()) {
              table.setPageIndex(page);
            }
          }}
          className="w-10 text-center"
        />
      </div>
    </div>
  );
}
