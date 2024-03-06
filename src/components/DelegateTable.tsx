"use client"

import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, Spinner } from "@nextui-org/react";
import { useState, useCallback, Key } from "react";
import { type Delegate, rows, columns } from "@/data";

export default function DelegateTable() {
  
	const [page, setPage] = useState(1);

	const renderCell = useCallback((delegate: Delegate, columnKey: Key) => {
    const cellValue = delegate[columnKey as keyof Delegate];
    switch (columnKey) {
      case "key":
        return (
          <>{cellValue}</>
        );
			case "is_current_delegate":
				return (
					<>{cellValue}</>
				);
			case "rank":
				return (
					<>{cellValue}</>
				);
			case "delegate":
				return (
					<>{cellValue}</>
				);
			case "voting_power":
        return (
          <>{cellValue}</>
        );
			case "percent_delegated_supply":
        return (
          <>{cellValue}</>
        );
			case "percent_participation":
				return (
					<>{cellValue}</>
				);
			case "gov_score":
				return (
					<>{cellValue}</>
				);
			case "delegate_button":
        return (
          <>{cellValue}</>
        );
      default:
        return cellValue;
    }
  }, []);

	const rowsPerPage = 10;
	const pages = 3; // placeholder for when data fetching is implemented
	const loadingState = "idle"; // placeholder for when data fetching is implemented

  return (
    <Table
      bottomContent={
        pages > 0 ? (
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="primary"
              page={page}
              total={pages}
              onChange={(page) => setPage(page)}
            />
          </div>
        ) : null
      }
    >
      <TableHeader columns={columns}>
				{(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody
        items={rows ?? []}
        loadingContent={<Spinner />}
        loadingState={loadingState}
      >

				{/* User's current delegate */}

				{/* Spacer */}

				{/* Delegate list */}
        {(item) => (
          <TableRow key={item.key}>
            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}

      </TableBody>
    </Table>
  );
}
