"use client"

import * as React from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { Feedback } from "./types"

interface FeedbackDialogProps {
  feedback: Feedback
  onClose: () => void
}

export function FeedbackDialog({ feedback, onClose }: FeedbackDialogProps) {
  const [open, setOpen] = React.useState(true)
  const [response, setResponse] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleOpenChange = (open: boolean) => {
    setOpen(open)
    if (!open) {
      onClose()
    }
  }

  const handleSubmitResponse = async () => {
    if (!response.trim() || !feedback) return

    setIsSubmitting(true)
    try {
      // Fallback for demo purposes
      console.log("Submitting response:", response)
    } catch (error) {
      console.error("Error submitting response:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Feedback Details</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[80vh]">
          <div className="space-y-6">
            {/* User Information */}
            <div className="flex items-start gap-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src={feedback.user.avatar} />
                <AvatarFallback>
                  {feedback.user.name.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <div className="font-medium">{feedback.user.name}</div>
                <div className="text-sm text-muted-foreground">{feedback.user.email}</div>
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  {feedback.user.company && <span>• {feedback.user.company}</span>}
                  {feedback.user.position && <span>• {feedback.user.position}</span>}
                  {feedback.user.industry && <span>• {feedback.user.industry}</span>}
                  {feedback.user.experience && <span>• {feedback.user.experience}</span>}
                </div>
              </div>
            </div>

            <Separator />

            {/* Feedback Content */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Badge variant={feedback.status === "new" ? "default" : feedback.status === "read" ? "secondary" : "success"}>
                  {feedback.status}
                </Badge>
                <Badge variant={feedback.satisfaction === "satisfied" ? "success" : feedback.satisfaction === "neutral" ? "secondary" : "destructive"}>
                  {feedback.satisfaction}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Submitted on {new Date(feedback.submittedAt).toLocaleString()}
              </p>
            </div>

            <Separator />

            <ScrollArea className="h-[200px] rounded-md border p-4">
              <p className="text-sm">{feedback.message}</p>
            </ScrollArea>

            {/* Response Section */}
            {feedback.response ? (
              <>
                <Separator />
                <div className="space-y-4">
                  <div className="space-y-1">
                    <div className="text-sm font-medium">Response</div>
                    <div className="text-sm text-muted-foreground whitespace-pre-wrap">
                      {feedback.response.message}
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Responded by {feedback.response.adminName} on {format(new Date(feedback.response.createdAt), "MMMM d, yyyy 'at' h:mm a")}
                  </div>
                </div>
              </>
            ) : (
              <>
                <Separator />
                <div className="space-y-4">
                  <div className="space-y-1">
                    <div className="text-sm font-medium">Add Response</div>
                    <Textarea
                      placeholder="Type your response here..."
                      value={response}
                      onChange={(e) => setResponse(e.target.value)}
                      className="min-h-[100px]"
                    />
                  </div>
                  <Button 
                    onClick={handleSubmitResponse}
                    disabled={!response.trim() || isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Submit Response"}
                  </Button>
                </div>
              </>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
} 