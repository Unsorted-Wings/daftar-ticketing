"use client"
import { useState } from "react"
import { Card } from "@/components/ui/card"
import { DataTable } from "@/components/ui/data-table"
import { columns } from "./columns"
import { FeatureDialog } from "./feature-dialog"
import { FeatureRequest } from "./types"

// Sample data
const sampleData: FeatureRequest[] = [
  {
    id: "1",
    user: {
      name: "John Doe",
      email: "john@example.com",
      avatar: "https://github.com/shadcn.png",
    },
    status: "completed" as const,
    featureName: "Dark Mode",
    description: "Add a dark mode theme option for better visibility in low-light conditions.",
    submittedAt: "2024-03-20T10:00:00Z",
  },
  {
    id: "2",
    user: {
      name: "Jane Smith",
      email: "jane@example.com",
      avatar: "https://github.com/shadcn.png",
    },
    status: "in-progress" as const,
    featureName: "Mobile App",
    description: "Develop a mobile application for iOS and Android platforms.",
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
    featureName: "Export Reports",
    description: "Add functionality to export reports in various formats (PDF, Excel, CSV).",
    submittedAt: "2024-03-18T09:15:00Z",
  },
]

const filterableColumns = [
  {
    id: "status",
    title: "Status",
    options: [
      { label: "Completed", value: "completed" },
      { label: "In Progress", value: "in-progress" },
      { label: "Pending", value: "pending" },
    ],
  },
]

export default function FeatureRequestsPage() {
  const [selectedFeature, setSelectedFeature] = useState<FeatureRequest | null>(null)

  return (
    <div className="container mx-auto py-10">
      <Card className="p-6">
        <DataTable
          columns={columns}
          data={sampleData}
          onRowClick={(row) => setSelectedFeature(row)}
        />
      </Card>
      {selectedFeature && (
        <FeatureDialog
          feature={selectedFeature}
          onClose={() => setSelectedFeature(null)}
        />
      )}
    </div>
  )
} 