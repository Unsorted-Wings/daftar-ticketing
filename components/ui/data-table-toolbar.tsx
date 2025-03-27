"use client"

import { Cross2Icon } from "@radix-ui/react-icons"
import { Table } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface DataTableToolbarProps<TData> {
  table: Table<TData>
  filterableColumns?: {
    id: string
    title: string
    options: {
      label: string
      value: string
    }[]
  }[]
}

export function DataTableToolbar<TData>({
  table,
  filterableColumns = [],
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Search..."
          value={(table.getColumn("user.name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("user.name")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {filterableColumns.map((column) => {
          const columnFilter = table.getColumn(column.id)
          return (
            <Select
              key={column.id}
              value={(columnFilter?.getFilterValue() as string) ?? ""}
              onValueChange={(value) => columnFilter?.setFilterValue(value)}
            >
              <SelectTrigger className="h-8 w-[150px]">
                <SelectValue placeholder={column.title} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All</SelectItem>
                {column.options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )
        })}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  )
} 