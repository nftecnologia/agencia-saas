import { BaseEntity } from './common'

export type AIAgent = {
  id: string
  name: string
  description: string
  category: 'meta_ads' | 'instagram' | 'youtube' | 'blog' | 'whatsapp' | 'crm' | 'feed_stories'
  inputSchema: Record<string, any>
  outputType: 'text' | 'image' | 'both'
  isActive: boolean
}

export type AIGeneration = BaseEntity & {
  agencyId: string
  clientId: string
  projectId?: string
  userId: string
  agentId: string
  title: string
  prompt: string
  response: string
  imageUrl?: string
  metadata: Record<string, any>
  isFavorite: boolean
  tags: string[]
  usedAt?: Date
  performance?: AIPerformance
}

export type AIPerformance = {
  reach?: number
  engagement?: number
  clicks?: number
  conversions?: number
  revenue?: number
  updatedAt: Date
}

export type AITemplate = BaseEntity & {
  agencyId: string
  agentId: string
  name: string
  description?: string
  promptTemplate: string
  defaultValues: Record<string, any>
  isPublic: boolean
  usageCount: number
}

export type AIUsageLimit = {
  agencyId: string
  month: string // YYYY-MM format
  generationsUsed: number
  generationsLimit: number
  imagesUsed: number
  imagesLimit: number
  lastResetAt: Date
}

// Tipos específicos para Feed & Stories
export type FeedStoryGeneration = BaseEntity & {
  agencyId: string
  clientId: string
  projectId?: string
  userId: string
  briefing: FeedStoryBriefing
  result: FeedStoryResult
  status: 'processing' | 'completed' | 'failed'
  isFavorite: boolean
}

export type FeedStoryBriefing = {
  theme: string
  style: 'minimalista' | 'moderno' | 'corporativo' | 'vibrante' | 'elegante'
  colors?: string[]
  targetAudience: string
  callToAction?: string
  includeText: boolean
  textContent?: string
  format: 'feed_square' | 'feed_portrait' | 'story' | 'both'
  brandElements?: {
    logo?: boolean
    brandColors?: boolean
    brandFonts?: boolean
  }
}

export type FeedStoryResult = {
  images: {
    feedSquare?: string // 1080x1080
    feedPortrait?: string // 1080x1350
    story?: string // 1080x1920
  }
  caption: string
  hashtags: string[]
  callToAction?: string
}

// Tipos para agentes específicos
export type MetaAdsAgentInputs = {
  businessType: string
  targetAudience: string
  objective: 'awareness' | 'traffic' | 'engagement' | 'leads' | 'sales'
  tone: 'professional' | 'casual' | 'urgent' | 'emotional'
  productService: string
  keyBenefits: string[]
  budget?: number
}

export type InstagramCaptionInputs = {
  postType: 'photo' | 'carousel' | 'reel' | 'story'
  theme: string
  tone: 'formal' | 'casual' | 'divertido' | 'inspiracional'
  includeHashtags: boolean
  maxLength?: number
  callToAction?: string
}

export type YouTubeScriptInputs = {
  videoType: 'tutorial' | 'review' | 'institucional' | 'educativo' | 'promocional'
  duration: '30s' | '1min' | '3min' | '5min' | '10min+'
  theme: string
  targetAudience: string
  keyPoints: string[]
}

export type CreateAIGenerationData = Omit<AIGeneration, 'id' | 'createdAt' | 'updatedAt' | 'response' | 'agencyId'>
export type UpdateAIGenerationData = Partial<Pick<AIGeneration, 'title' | 'isFavorite' | 'tags' | 'performance'>>
