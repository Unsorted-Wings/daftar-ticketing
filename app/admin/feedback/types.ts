export interface User {
  name: string
  email: string
  avatar: string
  company?: string
  position?: string
  industry?: string
  experience?: string
}

export interface Feedback {
  id: string
  user: User
  satisfaction: "satisfied" | "dissatisfied"
  status: "new" | "read" | "responded"
  message: string
  submittedAt: string
  response?: {
    message: string
    createdAt: string
    adminName: string
  }
} 