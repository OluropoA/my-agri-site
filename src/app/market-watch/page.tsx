// components/MarketWatch/MarketTable.tsx
import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table'
import React from 'react'

export function MarketTable({ data }) {
  const columns = React.useMemo(() => [
    { header: 'Market', accessorKey: 'market' },
    { header: 'State', accessorKey: 'state' },
    { header: 'Commodity', accessorKey: 'commodity' },
    { header: 'Price', accessorKey: 'price' },
    { header: 'Unit', accessorKey: 'unit' },
    { header: 'Week Start', accessorKey: 'weekStart' },
  ], [])

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <table className="min-w-full border">
      <thead>
        {table.getHeaderGroups().map(headerGroup => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map(header => (
              <th key={header.id} className="px-4 py-2 border-b">
                {flexRender(header.column.columnDef.header, header.getContext())}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map(row => (
          <tr key={row.id}>
            {row.getVisibleCells().map(cell => (
              <td key={cell.id} className="px-4 py-2 border-b">
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
