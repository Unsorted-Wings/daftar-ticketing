"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import { FeatureRequest } from "./types"

export const columns: ColumnDef<FeatureRequest>[] = [
  {
    accessorKey: "user.name",
    header: "User",
  },
  {
    accessorKey: "featureName",
    header: "Feature",
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => {
      const description = row.getValue("description") as string
      return (
        <div className="max-w-[300px] truncate">
          {description}
        </div>
      )
    }
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      return (
        <Badge variant={
          status === "pending" ? "default" :
          status === "in-progress" ? "secondary" :
          "success"
        }>
          {status === "in-progress" ? "In Progress" : status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
      )
    }
  },
  {
    accessorKey: "submittedAt",
    header: "Submitted",
    cell: ({ row }) => {
      return format(new Date(row.getValue("submittedAt")), "MMM d, yyyy")
    }
  },
] 