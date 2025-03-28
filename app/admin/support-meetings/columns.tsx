"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

interface User {
  name: string;
  email: string;
  avatar?: string;
  company?: string;
  position?: string;
  industry?: string;
  experience?: string;
}

// Export the SupportMeeting type
export type SupportMeeting = {
  id: string;
  user: User;
  query: string;
  preferredDate: string;
  preferredTime: string;
  countryCode: string;
  phoneNumber: string;
  status: "pending" | "scheduled" | "completed";
  submittedAt: string;
  response?: {
    message: string;
    createdAt: string;
    adminName: string;
  };
};

export const columns: ColumnDef<SupportMeeting>[] = [
  {
    accessorKey: "user.name",
    header: "User",
    enableSorting: true,
    enableColumnFilter: true,
  },
  {
    accessorKey: "query",
    header: "Query",
    cell: ({ row }) => {
      const query = row.getValue("query") as string;
      return (
        <div className="max-w-[300px] truncate" title={query}>
          {query}
        </div>
      );
    },
  },
  {
    accessorKey: "preferredDate",
    header: "Preferred Date",
    cell: ({ row }) => {
      return format(new Date(row.getValue("preferredDate")), "MMM d, yyyy");
    },
    enableSorting: true,
  },
  {
    accessorKey: "preferredTime",
    header: "Preferred Time",
    cell: ({ row }) => {
      return row.getValue("preferredTime") as string;
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
              : status === "scheduled"
              ? "secondary"
              : "success"
          }
          className="px-2 py-1"
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
      );
    },
    enableSorting: true,
  },
  {
    accessorKey: "submittedAt",
    header: "Submitted",
    cell: ({ row }) => {
      return format(new Date(row.getValue("submittedAt")), "MMM d, yyyy");
    },
    enableSorting: true,
  },
];