"use client"
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
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { SupportMeeting } from "./columns"

interface SupportMeetingDialogProps {
  meeting: SupportMeeting | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmitResponse?: (meetingId: string, response: string) => Promise<void>
  onClose: () => void
}

export function SupportMeetingDialog({ meeting, open, onOpenChange, onSubmitResponse, onClose }: SupportMeetingDialogProps) {
  const [response, setResponse] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmitResponse = async () => {
    if (!response.trim() || !meeting) return

    setIsSubmitting(true)
    try {
      if (onSubmitResponse) {
        await onSubmitResponse(meeting.id, response)
      } else {
        // Fallback for demo purposes
        console.log("Submitting response:", response)
      }
      onOpenChange(false)
    } catch (error) {
      console.error("Error submitting response:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleOpenChange = (open: boolean) => {
    onOpenChange(open)
    if (!open) {
      onClose()
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Support Meeting Details</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[80vh]">
          <div className="space-y-6">
            {/* User Information */}
            <div className="flex items-start gap-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src={meeting?.user.avatar} />
                <AvatarFallback>{meeting?.user.name.slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <div className="font-medium">{meeting?.user.name}</div>
                <div className="text-sm text-muted-foreground">{meeting?.user.email}</div>
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  {meeting?.user.company && <span>• {meeting.user.company}</span>}
                  {meeting?.user.position && <span>• {meeting.user.position}</span>}
                  {meeting?.user.industry && <span>• {meeting.user.industry}</span>}
                  {meeting?.user.experience && <span>• {meeting.user.experience}</span>}
                </div>
              </div>
            </div>

            <Separator />

            {/* Meeting Content */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="text-sm font-medium">Status</div>
                  <Badge variant={
                    meeting?.status === "pending" ? "default" :
                    meeting?.status === "scheduled" ? "secondary" :
                    "success"
                  }>
                    {meeting?.status && (meeting.status === "scheduled" ? "Scheduled" : meeting.status.charAt(0).toUpperCase() + meeting.status.slice(1))}
                  </Badge>
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-sm font-medium">Query</div>
                <div className="text-sm text-muted-foreground whitespace-pre-wrap">
                  {meeting?.query}
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-sm font-medium">Preferred Date</div>
                <div className="text-sm text-muted-foreground">
                  {meeting?.preferredDate}
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-sm font-medium">Preferred Time</div>
                <div className="text-sm text-muted-foreground">
                  {meeting?.preferredTime}
                </div>
              </div>

              <div className="text-sm text-muted-foreground">
                Submitted on {meeting?.submittedAt && format(new Date(meeting.submittedAt), "MMMM d, yyyy 'at' h:mm a")}
              </div>
            </div>

            {/* Response Section */}
            {meeting?.response ? (
              <>
                <Separator />
                <div className="space-y-4">
                  <div className="space-y-1">
                    <div className="text-sm font-medium">Response</div>
                    <div className="text-sm text-muted-foreground whitespace-pre-wrap">
                      {meeting.response.message}
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Responded by {meeting.response.adminName} on {format(new Date(meeting.response.createdAt), "MMMM d, yyyy 'at' h:mm a")}
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