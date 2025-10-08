"use client";

import { useState, useMemo } from 'react';
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
  type SortingState,
  type ColumnDef,
  type ColumnFiltersState,
} from '@tanstack/react-table';
import { Download, Filter, ChevronDown, ArrowUpDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Type definitions
export interface PriceEntry {
  id: string;
  market: string;
  state: string;
  commodity: string;
  price: number;
  unit: string;
  weekStart: Date;
  createdAt: Date;
}

interface MarketTableProps {
  priceEntries: PriceEntry[];
  states: string[];
  markets: string[];
  commodities: string[];
  weekStart: Date;
}

const MarketTable: React.FC<MarketTableProps> = ({
  priceEntries,
  states,
  markets,
  commodities,
  weekStart
}) => {
  // State for sorting, filtering and pagination
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [filterMenuOpen, setFilterMenuOpen] = useState<{
    state: boolean;
    market: boolean;
    commodity: boolean;
  }>({
    state: false,
    market: false,
    commodity: false
  });
  
  // Format currency
  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 2
    }).format(price);
  };
  
  // Format date
  const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(new Date(date));
  };
  
  // Define table columns
  const columns = useMemo<ColumnDef<PriceEntry>[]>(
    () => [
      {
        accessorKey: 'commodity',
        header: ({ column }) => (
          <div className="flex items-center justify-between">
            <span>Commodity</span>
            <button
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              className="ml-2 hover:bg-gray-100 p-1 rounded-md"
            >
              <ArrowUpDown className="h-4 w-4" />
            </button>
          </div>
        ),
        cell: ({ row }) => <div className="font-medium">{row.getValue('commodity')}</div>,
      },
      {
        accessorKey: 'market',
        header: ({ column }) => (
          <div className="flex items-center justify-between">
            <span>Market</span>
            <button
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              className="ml-2 hover:bg-gray-100 p-1 rounded-md"
            >
              <ArrowUpDown className="h-4 w-4" />
            </button>
          </div>
        ),
      },
      {
        accessorKey: 'state',
        header: ({ column }) => (
          <div className="flex items-center justify-between">
            <span>State</span>
            <button
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              className="ml-2 hover:bg-gray-100 p-1 rounded-md"
            >
              <ArrowUpDown className="h-4 w-4" />
            </button>
          </div>
        ),
      },
      {
        accessorKey: 'price',
        header: ({ column }) => (
          <div className="flex items-center justify-between">
            <span>Price</span>
            <button
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              className="ml-2 hover:bg-gray-100 p-1 rounded-md"
            >
              <ArrowUpDown className="h-4 w-4" />
            </button>
          </div>
        ),
        cell: ({ row }) => {
          const price = parseFloat(row.getValue('price'));
          return <div className="font-medium">{formatPrice(price)}</div>;
        },
      },
      {
        accessorKey: 'unit',
        header: "Unit",
      }
    ],
    []
  );
  
  // Initialize the table
  const table = useReactTable({
    data: priceEntries,
    columns,
    state: {
      sorting,
      columnFilters,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });
  
  // Handle CSV download
  const downloadCSV = () => {
    const headers = ['Commodity', 'Market', 'State', 'Price (₦)', 'Unit', 'Date'];
    const csvRows = [headers];
    
    priceEntries.forEach((entry) => {
      csvRows.push([
        entry.commodity,
        entry.market,
        entry.state,
        entry.price.toString(),
        entry.unit,
        formatDate(entry.weekStart)
      ]);
    });
    
    const csvContent = csvRows.map(row => row.join(',')).join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    
    const today = new Date().toISOString().split('T')[0];
    link.setAttribute('href', url);
    link.setAttribute('download', `market-prices-${today}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  // Filter toggle handler
  const toggleFilterMenu = (key: keyof typeof filterMenuOpen) => {
    setFilterMenuOpen(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };
  
  // Apply filter handler
  const applyFilter = (key: string, value: string) => {
    table.getColumn(key)?.setFilterValue(value === 'all' ? '' : value);
    toggleFilterMenu(key as keyof typeof filterMenuOpen);
  };
  
  // Get current filter values
  const stateFilter = (table.getColumn('state')?.getFilterValue() as string) || 'all';
  const marketFilter = (table.getColumn('market')?.getFilterValue() as string) || 'all';
  const commodityFilter = (table.getColumn('commodity')?.getFilterValue() as string) || 'all';
  
  return (
    <div className="space-y-4">
      {/* Header with filters */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h3 className="text-xl font-bold text-gray-900">
          Market Prices - Week of {formatDate(weekStart)}
        </h3>
        
        <div className="flex flex-wrap gap-2">
          {/* Filter dropdowns */}
          <div className="relative">
            <button
              onClick={() => toggleFilterMenu('state')}
              className="flex items-center space-x-1 px-3 py-2 border rounded-md bg-white text-gray-700 text-sm hover:bg-gray-50"
            >
              <Filter className="h-4 w-4 mr-1" />
              <span>{stateFilter === 'all' ? 'All States' : stateFilter}</span>
              <ChevronDown className="h-4 w-4" />
            </button>
            
            {filterMenuOpen.state && (
              <div className="absolute left-0 md:right-0 md:left-auto mt-1 z-10 w-48 bg-white border rounded-md shadow-lg">
                <div className="py-1 max-h-60 overflow-auto">
                  <button
                    onClick={() => applyFilter('state', 'all')}
                    className={`block px-4 py-2 text-sm w-full text-left hover:bg-gray-100 ${
                      stateFilter === 'all' ? 'bg-[#2D5016] text-white' : ''
                    }`}
                  >
                    All States
                  </button>
                  {states.map((state) => (
                    <button
                      key={state}
                      onClick={() => applyFilter('state', state)}
                      className={`block px-4 py-2 text-sm w-full text-left hover:bg-gray-100 ${
                        stateFilter === state ? 'bg-[#2D5016] text-white' : ''
                      }`}
                    >
                      {state}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <div className="relative">
            <button
              onClick={() => toggleFilterMenu('market')}
              className="flex items-center space-x-1 px-3 py-2 border rounded-md bg-white text-gray-700 text-sm hover:bg-gray-50"
            >
              <Filter className="h-4 w-4 mr-1" />
              <span>{marketFilter === 'all' ? 'All Markets' : marketFilter}</span>
              <ChevronDown className="h-4 w-4" />
            </button>
            
            {filterMenuOpen.market && (
              <div className="absolute left-0 md:right-0 md:left-auto mt-1 z-10 w-48 bg-white border rounded-md shadow-lg">
                <div className="py-1 max-h-60 overflow-auto">
                  <button
                    onClick={() => applyFilter('market', 'all')}
                    className={`block px-4 py-2 text-sm w-full text-left hover:bg-gray-100 ${
                      marketFilter === 'all' ? 'bg-[#2D5016] text-white' : ''
                    }`}
                  >
                    All Markets
                  </button>
                  {markets.map((market) => (
                    <button
                      key={market}
                      onClick={() => applyFilter('market', market)}
                      className={`block px-4 py-2 text-sm w-full text-left hover:bg-gray-100 ${
                        marketFilter === market ? 'bg-[#2D5016] text-white' : ''
                      }`}
                    >
                      {market}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <div className="relative">
            <button
              onClick={() => toggleFilterMenu('commodity')}
              className="flex items-center space-x-1 px-3 py-2 border rounded-md bg-white text-gray-700 text-sm hover:bg-gray-50"
            >
              <Filter className="h-4 w-4 mr-1" />
              <span>{commodityFilter === 'all' ? 'All Commodities' : commodityFilter}</span>
              <ChevronDown className="h-4 w-4" />
            </button>
            
            {filterMenuOpen.commodity && (
              <div className="absolute left-0 md:right-0 md:left-auto mt-1 z-10 w-48 bg-white border rounded-md shadow-lg">
                <div className="py-1 max-h-60 overflow-auto">
                  <button
                    onClick={() => applyFilter('commodity', 'all')}
                    className={`block px-4 py-2 text-sm w-full text-left hover:bg-gray-100 ${
                      commodityFilter === 'all' ? 'bg-[#2D5016] text-white' : ''
                    }`}
                  >
                    All Commodities
                  </button>
                  {commodities.map((commodity) => (
                    <button
                      key={commodity}
                      onClick={() => applyFilter('commodity', commodity)}
                      className={`block px-4 py-2 text-sm w-full text-left hover:bg-gray-100 ${
                        commodityFilter === commodity ? 'bg-[#2D5016] text-white' : ''
                      }`}
                    >
                      {commodity}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Download button */}
          <Button
            onClick={downloadCSV}
            variant="outline"
            size="sm"
            className="border-[#2D5016] text-[#2D5016]"
          >
            <Download className="h-4 w-4 mr-1" />
            Export CSV
          </Button>
        </div>
      </div>
      
      {/* Table */}
      <div className="rounded-lg border bg-white overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {table.getRowModel().rows.map((row) => (
                <tr 
                  key={row.id}
                  className="hover:bg-gray-50"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-700"
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-500">
          Showing {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1} to{' '}
          {Math.min(
            (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
            table.getFilteredRowModel().rows.length
          )}{' '}
          of {table.getFilteredRowModel().rows.length} entries
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="border-gray-300 text-gray-700"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm text-gray-700">
            Page{' '}
            <strong>
              {table.getState().pagination.pageIndex + 1} of{' '}
              {table.getPageCount()}
            </strong>
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="border-gray-300 text-gray-700"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MarketTable;
