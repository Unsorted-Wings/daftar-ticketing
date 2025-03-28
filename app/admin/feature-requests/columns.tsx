"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { FeatureRequest } from "./types";

export const columns: ColumnDef<FeatureRequest>[] = [
  {
    accessorKey: "user.name",
    header: "User",
    enableSorting: true, // Enable sorting by user name
    enableColumnFilter: true, // Enable filtering by user name
  },
  {
    accessorKey: "featureName",
    header: "Feature",
    enableSorting: true, // Enable sorting by feature name
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => {
      const description = row.getValue("description") as string;
      return (
        <div className="max-w-[300px] truncate" title={description}>
          {description}
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <Badge
          variant={
            status === "pending"
              ? "default"
              : status === "in-progress"
              ? "secondary"
              : "success"
          }
          className="px-2 py-1"
        >
          {status === "in-progress"
            ? "In Progress"
            : status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
      );
    },
    enableSorting: true, // Enable sorting by status
  },
  {
    accessorKey: "submittedAt",
    header: "Submitted",
    cell: ({ row }) => {
      return format(new Date(row.getValue("submittedAt")), "MMM d, yyyy");
    },
    enableSorting: true, // Enable sorting by submission date
  },
];