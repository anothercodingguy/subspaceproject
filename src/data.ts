export type Pillar =
  | 'UX + Features'
  | 'Competitor Analysis + GTM'
  | 'Features / Services'
  | 'Growth + GTM'
  | 'Potential Collaborations'

export type ImpactLevel = 'High' | 'Strategic'
export type EffortLevel = 'Low' | 'Medium' | 'Long-term'
export type PriorityGroup =
  | 'High Impact + Low Effort'
  | 'High Impact + Medium Effort'
  | 'Strategic Long-Term'

export interface Opportunity {
  id: string
  title: string
  pillar: Pillar
  observed: string
  problem: string
  shipInstead: string[]
  expectedImpact: string[]
  impactLevel: ImpactLevel
  effortLevel: EffortLevel
  priorityGroup: PriorityGroup
}

export interface SwotSection {
  type: 'Strengths' | 'Weaknesses' | 'Opportunities' | 'Threats'
  items: string[]
}

export const executiveSummary =
  'Subspace.money aims to become the operating system for subscriptions, shared expenses, and recurring payments in India. The platform combines subscription management, bill payments, expense splitting, and a subscription marketplace while leveraging AI-powered operations.'

export const positioningRecommendation = "India's Subscription OS"

export const opportunities: Opportunity[] = [
  {
    id: 'trust-onboarding',
    title: 'Improve User Trust During Subscription Detection',
    pillar: 'UX + Features',
    observed:
      'The platform emphasizes automatic detection and management of subscriptions, but new users are not clearly shown how subscriptions are discovered, categorized, and monitored.',
    problem:
      'Financial products require trust. Users may hesitate to connect accounts if they do not understand what data is accessed, how detection works, or how accurate it is.',
    shipInstead: [
      'Interactive subscription detection demo',
      'Detection accuracy statistics',
      'Security and privacy explanations',
      'Example dashboard using sample data',
    ],
    expectedImpact: [
      'Higher onboarding conversion',
      'Increased account linking rates',
      'Improved trust for first-time users',
    ],
    impactLevel: 'High',
    effortLevel: 'Low',
    priorityGroup: 'High Impact + Low Effort',
  },
  {
    id: 'subscription-os-positioning',
    title: 'Differentiate More Aggressively from Expense Tracking Apps',
    pillar: 'Competitor Analysis + GTM',
    observed:
      'The product communicates multiple use cases across subscription management, expense tracking, bill splitting, and group finance.',
    problem:
      'Users may perceive Subspace as another expense tracker instead of understanding its unique subscription-first proposition, increasing acquisition costs.',
    shipInstead: [
      'Reposition messaging around "India\'s Subscription OS"',
      'Focus communication on managing all subscriptions',
      'Show sharing subscriptions with groups',
      'Highlight saving money through negotiation and discovering better plans',
    ],
    expectedImpact: [
      'Stronger differentiation',
      'Better brand recall',
      'Clearer ICP targeting',
    ],
    impactLevel: 'High',
    effortLevel: 'Low',
    priorityGroup: 'High Impact + Low Effort',
  },
  {
    id: 'subscription-health-score',
    title: 'Introduce Subscription Health Score',
    pillar: 'Features / Services',
    observed:
      'The platform tracks subscriptions and recurring payments but does not prominently surface a single actionable metric showing financial optimization.',
    problem:
      'Users often know where money is going but struggle to prioritize what should be canceled, shared, or renegotiated.',
    shipInstead: [
      'Score unused subscriptions',
      'Detect duplicate services',
      'Find sharing opportunities',
      'Estimate potential savings',
      'Flag price increases detected',
    ],
    expectedImpact: [
      'Increased engagement',
      'Higher retention',
      'More opportunities for premium monetization',
    ],
    impactLevel: 'High',
    effortLevel: 'Medium',
    priorityGroup: 'High Impact + Medium Effort',
  },
  {
    id: 'shared-referral-loop',
    title: 'Build a Referral Loop Around Shared Subscriptions',
    pillar: 'Growth + GTM',
    observed:
      'Group subscription sharing exists, but it appears primarily as a utility feature.',
    problem:
      'The strongest growth mechanism is not fully leveraged. Every shared subscription naturally involves inviting additional users.',
    shipInstead: [
      'Invite friends to share subscriptions',
      'Shared savings leaderboard',
      'Group rewards',
      'Cashback for successful referrals',
    ],
    expectedImpact: [
      'Lower customer acquisition cost',
      'Stronger network effects',
      'Viral growth channels',
    ],
    impactLevel: 'High',
    effortLevel: 'Medium',
    priorityGroup: 'High Impact + Medium Effort',
  },
  {
    id: 'university-partnerships',
    title: 'Partner with Universities and Young Professionals',
    pillar: 'Potential Collaborations',
    observed:
      'The product is valuable for students and early-career professionals who frequently split costs for OTT platforms, software tools, cloud services, and memberships.',
    problem:
      'This audience has a high subscription burden but may not actively search for subscription management tools, making customer discovery difficult.',
    shipInstead: [
      'Launch partnerships with universities',
      'Work with student communities',
      'Partner with startup incubators and co-working spaces',
      'Offer student subscription bundles, exclusive discounts, and shared productivity tool plans',
    ],
    expectedImpact: [
      'Faster user acquisition',
      'Stronger community-driven growth',
      'Better long-term retention',
    ],
    impactLevel: 'Strategic',
    effortLevel: 'Long-term',
    priorityGroup: 'Strategic Long-Term',
  },
]

export const swotSections: SwotSection[] = [
  {
    type: 'Strengths',
    items: [
      'Profitable and bootstrapped',
      'Strong AI-driven operations',
      'Subscription-focused differentiation',
      'Growing ARR',
    ],
  },
  {
    type: 'Weaknesses',
    items: [
      'Broad positioning',
      'Trust barrier for financial data access',
      'Network effects still developing',
    ],
  },
  {
    type: 'Opportunities',
    items: [
      'Rapid subscription growth in India',
      'Student and creator economy',
      'SaaS and OTT sharing ecosystem',
    ],
  },
  {
    type: 'Threats',
    items: [
      'Fintech super-apps entering the space',
      'Banking apps adding subscription management',
      'Regulatory changes around financial data access',
    ],
  },
]

export const priorityGroups: PriorityGroup[] = [
  'High Impact + Low Effort',
  'High Impact + Medium Effort',
  'Strategic Long-Term',
]

export const pillars: Pillar[] = [
  'UX + Features',
  'Competitor Analysis + GTM',
  'Features / Services',
  'Growth + GTM',
  'Potential Collaborations',
]

// --- Mock Data for Simulator Features ---

export interface MockSms {
  id: string
  sender: string
  body: string
  date: string
  classification: 'subscription' | 'sensitive' | 'ignored'
  extractedService?: string
  extractedAmount?: number
  reason: string
}

export const mockSmsLogs: MockSms[] = [
  {
    id: 'sms-1',
    sender: 'AD-HDFCBK',
    body: 'ALERT: ₹179.00 spent on Card xx4056 at SPOTIFY INDIA on 29-May-2026. Avail bal ₹43,204.00.',
    date: 'May 29, 2026',
    classification: 'subscription',
    extractedService: 'Spotify',
    extractedAmount: 179,
    reason: 'Identified recurring merchant SPOTIFY and billing amount.',
  },
  {
    id: 'sms-2',
    sender: 'VK-SBIUPI',
    body: 'UPI mandate executed: ₹649.00 debited from A/c ending 1024 towards NETFLIX INDIA. UPI Ref 61502410.',
    date: 'May 28, 2026',
    classification: 'subscription',
    extractedService: 'Netflix Premium',
    extractedAmount: 649,
    reason: 'UPI mandate matching active subscription merchant NETFLIX.',
  },
  {
    id: 'sms-3',
    sender: 'AD-KOTAKB',
    body: 'OTP for transactions at Merchant XYZ is 482910. Valid for 10 mins. Do not share OTP with anyone.',
    date: 'May 28, 2026',
    classification: 'sensitive',
    reason: 'FILTERED: Contains high-security OTP tokens. Discarded immediately at local device layer.',
  },
  {
    id: 'sms-4',
    sender: 'AD-AMAZON',
    body: 'Auto-debit failed for your Amazon Prime renewal of ₹1,499.00. Update payment method at amzn.in/pmt.',
    date: 'May 25, 2026',
    classification: 'subscription',
    extractedService: 'Amazon Prime',
    extractedAmount: 1499,
    reason: 'Identified payment reminder for AMAZON PRIME.',
  },
  {
    id: 'sms-5',
    sender: '+919876543210',
    body: 'Hey Suyash, are we splitting the OTT bill for this month? Ping me.',
    date: 'May 24, 2026',
    classification: 'ignored',
    reason: 'FILTERED: Personal message. Non-financial text ignored completely.',
  },
]

export interface MockSubscription {
  id: string
  name: string
  cost: number
  billingPeriod: 'monthly' | 'yearly'
  category: string
  isUnused: boolean
  isDuplicate: boolean
  isShared: boolean
  sharingOpportunity: boolean
  membersJoined: number
  maxMembers: number
  color: string
}

export const mockSubscriptionsList: MockSubscription[] = [
  {
    id: 'sub-netflix',
    name: 'Netflix Premium',
    cost: 649,
    billingPeriod: 'monthly',
    category: 'Entertainment',
    isUnused: true,
    isDuplicate: false,
    isShared: false,
    sharingOpportunity: true,
    membersJoined: 1,
    maxMembers: 4,
    color: '#E50914',
  },
  {
    id: 'sub-spotify',
    name: 'Spotify Premium',
    cost: 179,
    billingPeriod: 'monthly',
    category: 'Music',
    isUnused: false,
    isDuplicate: true,
    isShared: false,
    sharingOpportunity: false,
    membersJoined: 1,
    maxMembers: 1,
    color: '#1DB954',
  },
  {
    id: 'sub-spotify-family',
    name: 'Spotify Family (Card Auto-debit)',
    cost: 179,
    billingPeriod: 'monthly',
    category: 'Music',
    isUnused: false,
    isDuplicate: true,
    isShared: true,
    sharingOpportunity: false,
    membersJoined: 4,
    maxMembers: 6,
    color: '#1ED760',
  },
  {
    id: 'sub-notion',
    name: 'Notion Plus',
    cost: 820, // Approx ₹820 (10 USD)
    billingPeriod: 'monthly',
    category: 'Productivity',
    isUnused: false,
    isDuplicate: false,
    isShared: false,
    sharingOpportunity: true,
    membersJoined: 1,
    maxMembers: 5,
    color: '#000000',
  },
  {
    id: 'sub-canva',
    name: 'Canva Pro',
    cost: 399,
    billingPeriod: 'monthly',
    category: 'Design',
    isUnused: true,
    isDuplicate: false,
    isShared: false,
    sharingOpportunity: false,
    membersJoined: 1,
    maxMembers: 1,
    color: '#00C4CC',
  },
  {
    id: 'sub-amazon',
    name: 'Amazon Prime',
    cost: 1499,
    billingPeriod: 'yearly',
    category: 'Shopping/Video',
    isUnused: false,
    isDuplicate: false,
    isShared: true,
    sharingOpportunity: false,
    membersJoined: 2,
    maxMembers: 4,
    color: '#FF9900',
  },
]

export interface Hotspot {
  id: string
  x: number // percent from left
  y: number // percent from top
  title: string
  description: string
  recommendationId: string
}

export const desktopHotspots: Hotspot[] = [
  {
    id: 'h-d1',
    x: 8.5,
    y: 28.5,
    title: 'Subscription Detection Engine & Trust Flow',
    description: 'Integrate the interactive SMS/Email reading trust slider directly here on onboarding, showing exactly what data is read locally and what is ignored.',
    recommendationId: 'trust-onboarding',
  },
  {
    id: 'h-d2',
    x: 48.0,
    y: 19.5,
    title: 'Introduce Subscription Health Score Widget',
    description: 'Place the single actionable Health Score indicator in the primary metrics panel to give users a benchmark of their optimization (unused, duplicate, shared ratio).',
    recommendationId: 'subscription-health-score',
  },
  {
    id: 'h-d3',
    x: 82.0,
    y: 42.0,
    title: 'Shared Plans Referral Trigger',
    description: 'Turn the basic "Split Bill" actions into a viral growth loop. Add group invitations and progress trackers showing how much can be saved by inviting one more roommate.',
    recommendationId: 'shared-referral-loop',
  },
  {
    id: 'h-d4',
    x: 54.0,
    y: 81.5,
    title: 'Subscription Rebranding to "Subscription OS"',
    description: 'Realign the product copy from "Split bills and track expenses" to "Your Subscriptions Operating System," focusing UI widgets on subscription management rather than generic expenses.',
    recommendationId: 'subscription-os-positioning',
  },
]

export const mobileHotspots: Hotspot[] = [
  {
    id: 'h-m1',
    x: 45.0,
    y: 18.0,
    title: 'Subscription Health Score Dashboard Widget',
    description: 'A swipeable top card displaying the Subscription Health Score (e.g., 68/100) with quick actions to cancel or share duplicate accounts.',
    recommendationId: 'subscription-health-score',
  },
  {
    id: 'h-m2',
    x: 50.0,
    y: 48.0,
    title: 'Shared Subscription Viral Invite Trigger',
    description: 'Provide an instant "Invite to Split" WhatsApp shortcut on the details page of popular OTT and software apps to fuel viral user acquisition.',
    recommendationId: 'shared-referral-loop',
  },
]
