export interface User {
  name: string
  email: string
  avatar?: string
  company?: string
  position?: string
  industry?: string
  experience?: string
}

export interface FeatureRequest {
  id: string
  user: User
  status: "completed" | "in-progress" | "pending"
  featureName: string
  description: string
  submittedAt: string
  response?: {
    message: string
    createdAt: string
    adminName: string
  }
} 