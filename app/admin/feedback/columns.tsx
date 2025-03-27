"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Feedback } from "./types"

export const columns: ColumnDef<Feedback>[] = [
  {
    accessorKey: "user.name",
    header: "User",
  },
  {
    accessorKey: "message",
    header: "Message",
    cell: ({ row }) => {
      const message = row.getValue("message") as string
      return (
        <div className="max-w-[300px] truncate">
          {message}
        </div>
      )
    }
  },
  {
    accessorKey: "satisfaction",
    header: "Satisfaction",
    cell: ({ row }) => {
      const satisfaction = row.getValue("satisfaction") as string
      return (
        <Badge variant={
          satisfaction === "satisfied" ? "success" :
          satisfaction === "neutral" ? "secondary" :
          "destructive"
        }>
          {satisfaction.charAt(0).toUpperCase() + satisfaction.slice(1)}
        </Badge>
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
          status === "new" ? "default" :
          status === "read" ? "secondary" :
          "success"
        }>
          {status.charAt(0).toUpperCase() + status.slice(1)}
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