"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner"; // Import Sonner for toast notifications
import { FeatureRequest } from "./types";

interface FeatureDialogProps {
  feature: FeatureRequest | null;
  onClose: () => void;
}

export function FeatureDialog({ feature, onClose }: FeatureDialogProps) {
  const [open, setOpen] = useState(true);
  const [response, setResponse] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedResponse, setSubmittedResponse] = useState(feature?.response);

  const handleOpenChange = (open: boolean) => {
    setOpen(open);
    if (!open) {
      onClose();
    }
  };

  const handleSubmitResponse = async () => {
    if (!response.trim() || !feature) {
      toast.error("Response cannot be empty");
      return;
    }

    setIsSubmitting(true);
    try {
      // Simulate API call (replace with real endpoint later)
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Mock delay
      const newResponse = {
        message: response,
        createdAt: new Date().toISOString(),
        adminName: "Support Team", // Replace with actual admin name from auth context
      };
      setSubmittedResponse(newResponse);
      setResponse(""); // Clear textarea after submission
      toast.success("Response submitted successfully");
    } catch (error) {
      console.error("Error submitting response:", error);
      toast.error("Failed to submit response");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!feature) return null; // Early return if feature is null

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-w-[90vw]">
        <DialogHeader>
          <DialogTitle className="text-xl">Feature Request Details</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[70vh] pr-4">
          <div className="space-y-6">
            {/* User Information */}
            <div className="flex items-start gap-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src={feature.user.avatar} alt={feature.user.name} />
                <AvatarFallback>
                  {feature.user.name.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <div className="font-semibold text-lg">{feature.user.name}</div>
                <div className="text-sm text-muted-foreground">{feature.user.email}</div>
                <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                  {feature.user.company && <span>{feature.user.company}</span>}
                  {feature.user.position && <span>• {feature.user.position}</span>}
                  {feature.user.industry && <span>• {feature.user.industry}</span>}
                  {feature.user.experience && <span>• {feature.user.experience}</span>}
                </div>
              </div>
            </div>

            <Separator />

            {/* Feature Content */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Badge
                  variant={
                    feature.status === "pending"
                      ? "default"
                      : feature.status === "in-progress"
                      ? "secondary"
                      : "success"
                  }
                  className="px-2 py-1"
                >
                  {feature.status === "in-progress"
                    ? "In Progress"
                    : feature.status.charAt(0).toUpperCase() + feature.status.slice(1)}
                </Badge>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">Feature Name</Label>
                <div className="font-medium text-foreground">{feature.featureName}</div>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">Description</Label>
                <div className="rounded-md border p-4 bg-muted/50">
                  <p className="text-sm text-foreground whitespace-pre-wrap">
                    {feature.description}
                  </p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Submitted on {format(new Date(feature.submittedAt), "MMMM d, yyyy 'at' h:mm a")}
              </p>
            </div>

            {/* Response Section */}
            {submittedResponse ? (
              <div className="space-y-4">
                <Separator />
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Response</Label>
                  <div className="rounded-md border p-4 bg-background">
                    <p className="text-sm text-foreground whitespace-pre-wrap">
                      {submittedResponse.message}
                    </p>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Responded by {submittedResponse.adminName} on{" "}
                    {format(new Date(submittedResponse.createdAt), "MMMM d, yyyy 'at' h:mm a")}
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <Separator />
                <div className="space-y-2">
                  <Label htmlFor="response" className="text-sm font-medium">
                    Add Response
                  </Label>
                  <Textarea
                    id="response"
                    placeholder="Type your response here..."
                    value={response}
                    onChange={(e) => setResponse(e.target.value)}
                    className="min-h-[100px]"
                    disabled={isSubmitting}
                  />
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Footer with Submit Button */}
        {!submittedResponse && (
          <DialogFooter className="mt-4">
            <Button
              onClick={handleSubmitResponse}
              disabled={!response.trim() || isSubmitting}
              className="w-full sm:w-auto"
            >
              {isSubmitting ? "Submitting..." : "Submit Response"}
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}