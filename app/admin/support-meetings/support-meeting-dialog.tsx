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
import { SupportMeeting } from "./columns";

interface SupportMeetingDialogProps {
  meeting: SupportMeeting | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmitResponse?: (meetingId: string, response: string) => Promise<void>;
  onClose: () => void;
}

export function SupportMeetingDialog({
  meeting,
  open,
  onOpenChange,
  onSubmitResponse,
  onClose,
}: SupportMeetingDialogProps) {
  const [response, setResponse] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedResponse, setSubmittedResponse] = useState(meeting?.response);

  const handleOpenChangeLocal = (open: boolean) => {
    onOpenChange(open);
    if (!open) {
      onClose();
    }
  };

  const handleSubmitResponse = async () => {
    if (!response.trim() || !meeting) {
      toast.error("Response cannot be empty");
      return;
    }

    setIsSubmitting(true);
    try {
      if (onSubmitResponse) {
        await onSubmitResponse(meeting.id, response);
        const newResponse = {
          message: response,
          createdAt: new Date().toISOString(),
          adminName: "Support Team", // Replace with actual admin name from auth context
        };
        setSubmittedResponse(newResponse);
      } else {
        // Simulate API call for demo purposes
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Mock delay
        const newResponse = {
          message: response,
          createdAt: new Date().toISOString(),
          adminName: "Support Team",
        };
        setSubmittedResponse(newResponse);
      }
      setResponse(""); // Clear textarea after submission
      toast.success("Response submitted successfully");
      onOpenChange(false); // Close dialog on success
    } catch (error) {
      console.error("Error submitting response:", error);
      toast.error("Failed to submit response");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!meeting) return null; // Early return if meeting is null

  return (
    <Dialog open={open} onOpenChange={handleOpenChangeLocal}>
      <DialogContent className="sm:max-w-[600px] max-w-[90vw]">
        <DialogHeader>
          <DialogTitle className="text-xl">Support Meeting Details</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[70vh] pr-4">
          <div className="space-y-6">
            {/* User Information */}
            <div className="flex items-start gap-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src={meeting.user.avatar} alt={meeting.user.name} />
                <AvatarFallback>
                  {meeting.user.name.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <div className="font-semibold text-lg">{meeting.user.name}</div>
                <div className="text-sm text-muted-foreground">{meeting.user.email}</div>
                <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                  {meeting.user.company && <span>{meeting.user.company}</span>}
                  {meeting.user.position && <span>• {meeting.user.position}</span>}
                  {meeting.user.industry && <span>• {meeting.user.industry}</span>}
                  {meeting.user.experience && <span>• {meeting.user.experience}</span>}
                </div>
              </div>
            </div>

            <Separator />

            {/* Meeting Content */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Badge
                  variant={
                    meeting.status === "pending"
                      ? "default"
                      : meeting.status === "scheduled"
                      ? "secondary"
                      : "success"
                  }
                  className="px-2 py-1"
                >
                  {meeting.status.charAt(0).toUpperCase() + meeting.status.slice(1)}
                </Badge>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">Query</Label>
                <div className="rounded-md border p-4 bg-muted/50">
                  <p className="text-sm text-foreground whitespace-pre-wrap">{meeting.query}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Preferred Date</Label>
                  <div className="text-sm text-foreground">
                    {format(new Date(meeting.preferredDate), "MMMM d, yyyy")}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Preferred Time</Label>
                  <div className="text-sm text-foreground">{meeting.preferredTime}</div>
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">Phone Number</Label>
                <div className="text-sm text-foreground">
                  {meeting.countryCode} {meeting.phoneNumber}
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Submitted on {format(new Date(meeting.submittedAt), "MMMM d, yyyy 'at' h:mm a")}
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