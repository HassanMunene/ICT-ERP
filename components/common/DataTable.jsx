'use client';

import { 
    flexRender, 
    getCoreRowModel, 
    getFilteredRowModel, 
    getPaginationRowModel, 
    useReactTable 
} from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Button } from "../ui/button";
import { useState } from "react";
import { Input } from "../ui/input";

/**
 * DataTable component
 * 
 * This component renders a searchable, filterable, and paginated data table using the 
 * @tanstack/react-table library. It takes `columns` and `data` as props to display in the table, 
 * and adds a search bar for filtering, as well as pagination controls for navigating between pages.
 * 
 * Features:
 * - **Search**: Allows filtering the data by a specific column.
 * - **Pagination**: Provides "Previous" and "Next" buttons for paginated data navigation.
 * - **Dynamic Table Rendering**: Renders the table's headers, rows, and cells dynamically based on the provided data and column definitions.
 */

export function DataTable({ searchKey, columns, data }) {
    // State to manage column filters
    const [columnFilters, setColumnFilters] = useState([]);

    // Initialize the table using useReactTable with filters, pagination, and core row models
    const table = useReactTable({
        data: data, // The data to be displayed in the table
        columns: columns, // Column configuration
        getCoreRowModel: getCoreRowModel(), // Core row model for basic row rendering
        getPaginationRowModel: getPaginationRowModel(), // Row model for pagination
        onColumnFiltersChange: setColumnFilters, // Update the filter state when filters change
        getFilteredRowModel: getFilteredRowModel(), // Row model for filtering
        state: { columnFilters }, // Pass column filters to the table's state
    });

    return (
        <div>
            {/* Search bar for filtering the data by the searchKey column */}
            <div className="flex items-center py-4">
                <Input 
                    placeholder="Search..." // Placeholder text for the search input
                    value={(table.getColumn(searchKey)?.getFilterValue()) ?? ""} // Get the current filter value for the search column
                    onChange={(event) => table.getColumn(searchKey)?.setFilterValue(event.target.value)} // Set the filter value when the input changes
                    className="max-w-sm" // Apply styling
                />
            </div>

            {/* Render the table with dynamic headers and rows */}
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination controls */}
            <div className="flex items-center justify-end space-x-2 py-4">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.previousPage()} // Go to the previous page
                    disabled={!table.getCanPreviousPage()} // Disable button if there's no previous page
                >
                    Previous
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.nextPage()} // Go to the next page
                    disabled={!table.getCanNextPage()} // Disable button if there's no next page
                >
                    Next
                </Button>
            </div>
        </div>
    )
}