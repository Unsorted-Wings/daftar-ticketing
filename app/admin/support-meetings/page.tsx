"use client"
import { useState } from "react"
import { Card } from "@/components/ui/card"
import { DataTable } from "@/components/ui/data-table"
import { columns } from "./columns"
import { SupportMeetingDialog } from "./support-meeting-dialog"
import { SupportMeeting } from "./types"

const sampleData: SupportMeeting[] = [
  {
    id: "1",
    user: {
      name: "John Doe",
      email: "john@example.com",
      avatar: "https://github.com/shadcn.png",
    },
    status: "scheduled" as const,
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
    status: "completed" as const,
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
    status: "pending" as const,
    query: "Security audit requirements",
    preferredDate: "2024-03-26",
    preferredTime: "09:15",
    countryCode: "+1",
    phoneNumber: "555-0125",
    submittedAt: "2024-03-18T09:15:00Z",
  },
]

const filterableColumns = [
  {
    id: "status",
    title: "Status",
    options: [
      { label: "Scheduled", value: "scheduled" },
      { label: "Completed", value: "completed" },
      { label: "Pending", value: "pending" },
    ],
  },
]

export default function SupportMeetingsPage() {
  const [selectedMeeting, setSelectedMeeting] = useState<SupportMeeting | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleDialogClose = () => {
    setIsDialogOpen(false)
    setSelectedMeeting(null)
  }

  return (
    <div className="container mx-auto py-10">
      <Card className="p-6">
        <DataTable
          columns={columns}
          data={sampleData}
          onRowClick={(row) => {
            setSelectedMeeting(row)
            setIsDialogOpen(true)
          }}
        />
      </Card>
      {selectedMeeting && (
        <SupportMeetingDialog
          meeting={selectedMeeting}
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          onClose={handleDialogClose}
        />
      )}
    </div>
  )
} 