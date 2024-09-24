"use client"

import CellAction from "./BillboardCellAction"

/**
 * columns defines the column structure for the billboard table.
 * 
 * This configuration is used by the @tanstack/react-table library to display
 * billboard data in a tabular format. Each column is defined with an 
 * `accessorKey` which maps to the data fields (e.g., `label`, `createdAt`) 
 * and a `header` that provides the display name for the table column.
 * 
 * - **accessorKey**: Specifies the key in the data that this column will access.
 * - **header**: Specifies the display name for the column header.
 * - **cell**: Custom rendering logic for a specific column (in this case, an "action" column).
 */

export const columns = [
  {
    accessorKey: "label", // Maps to the "label" field in the data
    header: "Label",      // Display name for the column
  },
  {
    accessorKey: "createdAt", // Maps to the "createdAt" field in the data
    header: "Date",           // Display name for the column
  },
  {
    id: "action", // Unique identifier for the action column
    cell: ({ row }) => <CellAction billboardData={row.original}/> // Renders a custom component (CellAction) for actions, passing the entire row's data
  },
]