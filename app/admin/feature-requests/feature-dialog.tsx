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
import { FeatureRequest } from "./types"

interface FeatureDialogProps {
  feature: FeatureRequest | null
  onClose: () => void
}

export function FeatureDialog({ feature, onClose }: FeatureDialogProps) {
  const [open, setOpen] = useState(true)
  const [response, setResponse] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleOpenChange = (open: boolean) => {
    setOpen(open)
    if (!open) {
      onClose()
    }
  }

  const handleSubmitResponse = async () => {
    if (!response.trim() || !feature) return

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
          <DialogTitle>Feature Request Details</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[80vh]">
          <div className="space-y-6">
            {/* User Information */}
            <div className="flex items-start gap-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src={feature?.user.avatar} />
                <AvatarFallback>{feature?.user.name.slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <div className="font-medium">{feature?.user.name}</div>
                <div className="text-sm text-muted-foreground">{feature?.user.email}</div>
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  {feature?.user.company && <span>• {feature.user.company}</span>}
                  {feature?.user.position && <span>• {feature.user.position}</span>}
                  {feature?.user.industry && <span>• {feature.user.industry}</span>}
                  {feature?.user.experience && <span>• {feature.user.experience}</span>}
                </div>
              </div>
            </div>

            <Separator />

            {/* Feature Content */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="text-sm font-medium">Status</div>
                  <Badge variant={
                    feature?.status === "pending" ? "default" :
                    feature?.status === "in-progress" ? "secondary" :
                    "success"
                  }>
                    {feature?.status && (feature.status === "in-progress" ? "In Progress" : feature.status.charAt(0).toUpperCase() + feature.status.slice(1))}
                  </Badge>
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-sm font-medium">Feature Name</div>
                <div className="font-medium">{feature?.featureName}</div>
              </div>

              <div className="space-y-1">
                <div className="text-sm font-medium">Description</div>
                <div className="text-sm text-muted-foreground whitespace-pre-wrap">
                  {feature?.description}
                </div>
              </div>

              <div className="text-sm text-muted-foreground">
                Submitted on {feature?.submittedAt && format(new Date(feature.submittedAt), "MMMM d, yyyy 'at' h:mm a")}
              </div>
            </div>

            {/* Response Section */}
            {feature?.response ? (
              <>
                <Separator />
                <div className="space-y-4">
                  <div className="space-y-1">
                    <div className="text-sm font-medium">Response</div>
                    <div className="text-sm text-muted-foreground whitespace-pre-wrap">
                      {feature.response.message}
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Responded by {feature.response.adminName} on {format(new Date(feature.response.createdAt), "MMMM d, yyyy 'at' h:mm a")}
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