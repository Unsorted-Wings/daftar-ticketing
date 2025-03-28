"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { DataTable } from "@/components/ui/data-table"
import { columns } from "./columns"
import { FeedbackDialog } from "./feedback-dialog"
import { Feedback } from "./types"

const sampleData: Feedback[] = [
  {
    id: "1",
    user: {
      name: "John Doe",
      email: "john@example.com",
      avatar: "https://github.com/shadcn.png",
      company: "Tech Corp",
      position: "Senior Developer",
      industry: "Technology",
      experience: "5 years",
    },
    satisfaction: "satisfied",
    status: "new" as const,
    message: "Great service! The support team was very helpful.",
    submittedAt: "2024-03-20T10:00:00Z",
  },
  {
    id: "2",
    user: {
      name: "Jane Smith",
      email: "jane@example.com",
      avatar: "https://github.com/shadcn.png",
      company: "Design Studio",
      position: "UI/UX Designer",
      industry: "Design",
      experience: "3 years",
    },
    satisfaction: "dissatisfied",
    status: "read" as const,
    message: "The interface could be more intuitive.",
    submittedAt: "2024-03-19T15:30:00Z",
  },
  {
    id: "3",
    user: {
      name: "Mike Johnson",
      email: "mike@example.com",
      avatar: "https://github.com/shadcn.png",
      company: "Data Solutions",
      position: "Data Analyst",
      industry: "Analytics",
      experience: "4 years",
    },
    satisfaction: "dissatisfied",
    status: "responded" as const,
    message: "Experienced some issues with the latest update.",
    submittedAt: "2024-03-18T09:15:00Z",
    response: {
      message: "Thank you for your feedback. We'll look into the issues you're experiencing.",
      createdAt: "2024-03-18T10:30:00Z",
      adminName: "Support Team",
    },
  },
]

const filterableColumns = [
  {
    id: "status",
    title: "Status",
    options: [
      { label: "New", value: "new" },
      { label: "Read", value: "read" },
      { label: "Responded", value: "responded" },
    ],
  },
  {
    id: "satisfaction",
    title: "Satisfaction",
    options: [
      { label: "Satisfied", value: "satisfied" },
      { label: "Neutral", value: "neutral" },
      { label: "Dissatisfied", value: "dissatisfied" },
    ],
  },
]

export default function FeedbackPage() {
  const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(null);

  return (
    <div className="container mx-auto py-10 px-4">
        <h2 className="text-2xl font-bold mb-4">User Feedback</h2>
        <DataTable
          columns={columns}
          data={sampleData}
          onRowClick={(row) => setSelectedFeedback(row)}
        />
      {selectedFeedback && (
        <FeedbackDialog
          feedback={selectedFeedback}
          onClose={() => setSelectedFeedback(null)}
        />
      )}
    </div>
  );
}