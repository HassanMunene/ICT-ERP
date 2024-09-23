"use client"

/**
 * columns defines the column structure for the billboard table.
 * 
 * This configuration is used by the @tanstack/react-table library to display
 * billboard data in a tabular format. Each column is defined with an 
 * `accessorKey` which maps to the data fields (e.g., `label`, `createdAt`) 
 * and a `header` that provides the display name for the table column.
 *
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
]