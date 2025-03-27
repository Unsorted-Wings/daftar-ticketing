export interface User {
  name: string
  email: string
  avatar?: string
  company?: string
  position?: string
  industry?: string
  experience?: string
}

export type SupportMeeting = {
  id: string
  user: User
  query: string
  preferredDate: string
  preferredTime: string
  countryCode: string
  phoneNumber: string
  status: "pending" | "scheduled" | "completed"
  submittedAt: string
  response?: {
    message: string
    createdAt: string
    adminName: string
  }
} 