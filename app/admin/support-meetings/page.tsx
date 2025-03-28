"use client";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
import { SupportMeetingDialog } from "./support-meeting-dialog";
import { SupportMeeting } from "./types";

const sampleData: SupportMeeting[] = [
  {
    id: "1",
    user: {
      name: "John Doe",
      email: "john@example.com",
      avatar: "https://github.com/shadcn.png",
    },
    status: "scheduled",
    query: "Need help with API integration",
    preferredDate: "2024-03-25",
    preferredTime: "14:00",
    countryCode: "+1",
    phoneNumber: "555-0123",
    submittedAt: "2024-03-20T10:00:00Z",
  },
  {
    id: "2",
    user: {
      name: "Jane Smith",
      email: "jane@example.com",
      avatar: "https://github.com/shadcn.png",
    },
    status: "completed",
    query: "Database optimization consultation",
    preferredDate: "2024-03-24",
    preferredTime: "15:30",
    countryCode: "+1",
    phoneNumber: "555-0124",
    submittedAt: "2024-03-19T15:30:00Z",
  },
  {
    id: "3",
    user: {
      name: "Mike Johnson",
      email: "mike@example.com",
      avatar: "https://github.com/shadcn.png",
    },
    status: "pending",
    query: "Security audit requirements",
    preferredDate: "2024-03-26",
    preferredTime: "09:15",
    countryCode: "+1",
    phoneNumber: "555-0125",
    submittedAt: "2024-03-18T09:15:00Z",
  },
];

export default function SupportMeetingsPage() {
  const [selectedMeeting, setSelectedMeeting] = useState<SupportMeeting | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setSelectedMeeting(null);
  };

  return (
    <div className="container mx-auto py-10 px-4">
        <h2 className="text-2xl font-bold mb-4">Support Meetings</h2>
        <DataTable
          columns={columns}
          data={sampleData}
          onRowClick={(row) => {
            setSelectedMeeting(row);
            setIsDialogOpen(true);
          }}
        />
      {selectedMeeting && (
        <SupportMeetingDialog
          meeting={selectedMeeting}
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          onClose={handleDialogClose}
        />
      )}
    </div>
  );
}