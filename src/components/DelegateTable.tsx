"use client"

import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, Spinner, User, Button } from "@nextui-org/react";
import { useState, useCallback, Key } from "react";
import { type Delegate, rows, columns } from "@/data";
import { render } from "react-dom";

function formatBigNumber(num: number) {
	const formattedNum = new Intl.NumberFormat().format(num);
	return formattedNum
}

function formatPercentValue(num: number) {
	const formattedNum = new Intl.NumberFormat().format(num);
	return formattedNum.split(".", 2)[1].substring(0,2).concat('%')
}

function getColor(value: number){
	var hue=((1-((10-value)/10))*120).toString(10);
	return ["hsl(",hue,",60%,50%)"].join("");
}

export default function DelegateTable() {
  
	const [page, setPage] = useState(1);

	const renderCell = useCallback((delegate: Delegate, columnKey: Key) => {
    const cellValue = delegate[columnKey as keyof Delegate];
    switch (columnKey) {
			case "is_current_delegate":
				return (
					cellValue ? <small>Current Delegate</small> : null
				);
			case "delegate":
				return (
					<User
						name={cellValue}
						avatarProps={{src: delegate.pfpLink}}
						/>
				);
			case "voting_power":
				if (typeof cellValue !== "number") return <></>
				const formattedBigNum = formatBigNumber(cellValue)
				return (
          <span>{`${formattedBigNum} OP`}</span>
        );
			case "percent_delegated_supply":
        if (typeof cellValue !== "number") return <></>
				const formattedDelegatePercent = formatPercentValue(cellValue)
				return (
          <span>{formattedDelegatePercent}</span>
        );
			case "percent_participation":
				if (typeof cellValue !== "number") return <></>
				const formattedParticipationPercent = formatPercentValue(cellValue)
				return (
					<span>{formattedParticipationPercent}</span>
				);
			case "gov_score":
				if (typeof cellValue !== "number") return <></>
				const col = getColor(cellValue)
				return (
					<span style={{color: col}}>{`${cellValue}/10`}</span>
				);
			case "delegate_button":
        return (
          <Button size="sm" className="delegate-button" color="primary">delegate</Button>
        );
      default:
        return cellValue;
    }
  }, []);

	const rowsPerPage = 11;
	const pages = 3; // placeholder for when data fetching is implemented
	const loadingState = "idle"; // placeholder for when data fetching is implemented

  return (
    <Table
			isCompact
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
			bottomContentPlacement="outside"
    >
      <TableHeader columns={columns}>
				{(column) => (
					<TableColumn 
						key={column.key}
						align="center"
						hideHeader={column.hideHeader ?? false}
					>
						{column.label}
					</TableColumn>
				)}
      </TableHeader>
      <TableBody
        items={rows ?? []}
        loadingContent={<Spinner />}
        loadingState={loadingState}
      >
				{/* Delegate list */}
        {(item) => (
          <TableRow key={item.key} className="table-row">
            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}

      </TableBody>
    </Table>
  );
}
