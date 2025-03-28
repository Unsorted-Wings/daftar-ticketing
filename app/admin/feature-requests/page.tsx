"use client";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
import { FeatureDialog } from "./feature-dialog";
import { FeatureRequest } from "./types";

const sampleData: FeatureRequest[] = [
  {
    id: "1",
    user: {
      name: "John Doe",
      email: "john@example.com",
      avatar: "https://github.com/shadcn.png",
    },
    status: "completed",
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
    status: "in-progress",
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
    status: "pending",
    featureName: "Export Reports",
    description: "Add functionality to export reports in various formats (PDF, Excel, CSV).",
    submittedAt: "2024-03-18T09:15:00Z",
  },
];

export default function FeatureRequestsPage() {
  const [selectedFeature, setSelectedFeature] = useState<FeatureRequest | null>(null);

  return (
    <div className="container mx-auto py-10 px-4">
        <h2 className="text-2xl font-bold mb-4">Feature Requests</h2>
        <DataTable
          columns={columns}
          data={sampleData}
          onRowClick={(row) => setSelectedFeature(row)}
        />
      {selectedFeature && (
        <FeatureDialog
          feature={selectedFeature}
          onClose={() => setSelectedFeature(null)}
        />
      )}
    </div>
  );
}