import {
  AlertCircle,
  ArrowUpRight,
  BadgeIndianRupee,
  BarChart3,
  Check,
  Filter,
  Link2,
  Lock,
  LockKeyhole,
  Network,
  Play,
  RotateCcw,
  Shield,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
} from 'lucide-react'
import { useMemo, useState } from 'react'
import './App.css'
import {
  desktopHotspots,
  executiveSummary,
  mobileHotspots,
  mockSmsLogs,
  mockSubscriptionsList,
  opportunities,
  pillars,
  positioningRecommendation,
  priorityGroups,
  swotSections,
  type Hotspot,
  type MockSubscription,
  type Opportunity,
  type Pillar,
  type PriorityGroup,
} from './data'

type PillarFilter = 'All pillars' | Pillar
type PriorityFilter = 'All priorities' | PriorityGroup

const opportunityIcons: Record<string, typeof LockKeyhole> = {
  'trust-onboarding': LockKeyhole,
  'subscription-os-positioning': Target,
  'subscription-health-score': BarChart3,
  'shared-referral-loop': Network,
  'university-partnerships': Users,
}

function filterOpportunities(
  nextPillarFilter: PillarFilter,
  nextPriorityFilter: PriorityFilter,
) {
  return opportunities.filter((opportunity) => {
    const pillarMatches =
      nextPillarFilter === 'All pillars' ||
      opportunity.pillar === nextPillarFilter
    const priorityMatches =
      nextPriorityFilter === 'All priorities' ||
      opportunity.priorityGroup === nextPriorityFilter

    return pillarMatches && priorityMatches
  })
}

const bundleOptionsList = [
  { id: 'youtube-student', name: 'YouTube Premium', normalPrice: 129, studentPrice: 79 },
  { id: 'spotify-student', name: 'Spotify Premium', normalPrice: 119, studentPrice: 59 },
  { id: 'notion-student', name: 'Notion Plus', normalPrice: 400, studentPrice: 0 },
  { id: 'github-student', name: 'GitHub Copilot', normalPrice: 820, studentPrice: 0 },
]

function App() {
  // Navigation & Primary Filter state
  const [selectedId, setSelectedId] = useState(opportunities[0].id)
  const [pillarFilter, setPillarFilter] = useState<PillarFilter>('All pillars')
  const [priorityFilter, setPriorityFilter] =
    useState<PriorityFilter>('All priorities')
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    if (newTheme === 'dark') {
      document.documentElement.classList.add('theme-dark')
    } else {
      document.documentElement.classList.remove('theme-dark')
    }
  }

  // Visual Audit tab and Hotspot states
  const [auditTab, setAuditTab] = useState<'desktop' | 'mobile'>('desktop')
  const [selectedHotspot, setSelectedHotspot] = useState<Hotspot | null>(
    desktopHotspots[0],
  )

  // Simulation Lab states
  const [activeSimTab, setActiveSimTab] = useState<string>('trust-onboarding')

  // Trust Simulator states
  const [trustStep, setTrustStep] = useState<0 | 1 | 2 | 3>(0) // 0: Idle, 1: Scanning, 2: Displaying SMS, 3: Completed
  const [visibleSmsCount, setVisibleSmsCount] = useState<number>(0)

  // Health Score states
  const [subsList, setSubsList] = useState<MockSubscription[]>(mockSubscriptionsList)

  // Rebranding copy toggle
  const [positioningState, setPositioningState] = useState<'old' | 'new'>('new')

  // Referral Calculator states
  const [refPlansCount, setRefPlansCount] = useState<number>(2)
  const [refFriendsCount, setRefFriendsCount] = useState<number>(3)

  // Bundle Builder states
  const [selectedBundles, setSelectedBundles] = useState<string[]>([
    'spotify-student',
    'notion-student',
  ])
  const [groupSize, setGroupSize] = useState<number>(3)

  const selectedOpportunity =
    opportunities.find((opportunity) => opportunity.id === selectedId) ??
    opportunities[0]

  const filteredOpportunities = useMemo(() => {
    return filterOpportunities(pillarFilter, priorityFilter)
  }, [pillarFilter, priorityFilter])

  const updateSelectionForFilters = (matches: Opportunity[]) => {
    if (
      matches.length > 0 &&
      !matches.some((opportunity) => opportunity.id === selectedId)
    ) {
      setSelectedId(matches[0].id)
    }
  }

  const handlePillarFilter = (value: PillarFilter) => {
    setPillarFilter(value)
    updateSelectionForFilters(filterOpportunities(value, priorityFilter))
  }

  const handlePriorityFilter = (value: PriorityFilter) => {
    setPriorityFilter(value)
    updateSelectionForFilters(filterOpportunities(pillarFilter, value))
  }

  // Trust Onboarding SMS Animation triggers
  const startTrustSimulation = () => {
    setTrustStep(1)
    setVisibleSmsCount(0)
    setTimeout(() => {
      setTrustStep(2)
      // Reveal bubbles sequentially
      let count = 0
      const interval = setInterval(() => {
        count += 1
        setVisibleSmsCount(count)
        if (count >= mockSmsLogs.length) {
          clearInterval(interval)
          setTimeout(() => {
            setTrustStep(3)
          }, 1200)
        }
      }, 900)
    }, 1500)
  }

  const resetTrustSimulation = () => {
    setTrustStep(0)
    setVisibleSmsCount(0)
  }

  // Health Score dynamic calculations
  const calculatedHealthScore = useMemo(() => {
    let score = 100
    subsList.forEach((sub) => {
      if (sub.isUnused) {
        score -= 18 // Big deduction for unused subscriptions
      }
      if (sub.isDuplicate) {
        score -= 12 // Medium deduction for duplicates
      }
      if (sub.sharingOpportunity && !sub.isShared) {
        score -= 8 // Small deduction for missing sharing opportunities
      }
    })
    return Math.max(10, score) // Floor at 10
  }, [subsList])

  const calculatedMonthlySavings = useMemo(() => {
    let savings = 0
    subsList.forEach((sub) => {
      if (sub.isUnused) {
        savings += sub.cost
      }
      if (sub.isDuplicate) {
        savings += sub.cost // Suggest canceling the duplicate instance
      }
      if (sub.sharingOpportunity && !sub.isShared) {
        // If we split it with members (e.g. Netflix Premium split 4 ways: save 75% of cost)
        const members = sub.maxMembers > 1 ? sub.maxMembers : 3
        savings += Math.round(sub.cost * ((members - 1) / members))
      }
    })
    return savings
  }, [subsList])

  const toggleSubFlag = (id: string, flag: 'isUnused' | 'isDuplicate' | 'isShared') => {
    setSubsList(
      subsList.map((sub) => {
        if (sub.id === id) {
          const updated = { ...sub, [flag]: !sub[flag] }
          // If marked as shared, it fulfills the sharing opportunity
          if (flag === 'isShared' && updated.isShared) {
            updated.membersJoined = updated.maxMembers
          } else if (flag === 'isShared' && !updated.isShared) {
            updated.membersJoined = 1
          }
          return updated
        }
        return sub
      }),
    )
  }

  const resetHealthScore = () => {
    setSubsList(mockSubscriptionsList)
  }

  // Referral Calculator calculations
  const referralSavingsPerMonth = useMemo(() => {
    // Average plan cost split: ₹400/month split among friends
    // savings = cost - (cost / friends)
    const costPerPlan = 400
    const averageIndividualCost = costPerPlan
    const groupMemberCost = costPerPlan / (refFriendsCount + 1)
    const monthlySavings = (averageIndividualCost - groupMemberCost) * refPlansCount
    return Math.round(monthlySavings)
  }, [refPlansCount, refFriendsCount])

  const referralNetworkGrowth = refPlansCount * refFriendsCount
  const referralCashback = referralNetworkGrowth * 50 // ₹50 cashback per invited user

  // Bundle builder calculations

  const toggleBundleSelection = (id: string) => {
    if (selectedBundles.includes(id)) {
      setSelectedBundles(selectedBundles.filter((b) => b !== id))
    } else {
      setSelectedBundles([...selectedBundles, id])
    }
  }

  const bundleCalculations = useMemo(() => {
    let normalTotal = 0
    let studentTotal = 0

    bundleOptionsList.forEach((option) => {
      if (selectedBundles.includes(option.id)) {
        normalTotal += option.normalPrice
        studentTotal += option.studentPrice
      }
    })

    const groupNormalTotal = normalTotal * groupSize
    const groupStudentTotal = studentTotal * groupSize
    const totalGroupSavings = groupNormalTotal - groupStudentTotal

    return {
      individualNormal: normalTotal,
      individualStudent: studentTotal,
      groupNormal: groupNormalTotal,
      groupStudent: groupStudentTotal,
      groupSavings: totalGroupSavings,
      perMemberPrice: studentTotal,
    }
  }, [selectedBundles, groupSize])

  const priorityCounts = priorityGroups.map((group) => ({
    group,
    count: opportunities.filter((opportunity) => opportunity.priorityGroup === group)
      .length,
  }))

  const handleAuditTabChange = (tab: 'desktop' | 'mobile') => {
    setAuditTab(tab)
    setSelectedHotspot(tab === 'desktop' ? desktopHotspots[0] : mobileHotspots[0])
  }

  const triggerScrollToOpportunities = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    document.getElementById('opportunities')?.scrollIntoView({ behavior: 'smooth' })
  }

  const triggerScrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <main>
      <section className="hero-section" id="overview">
        <nav className="topbar" aria-label="Dashboard navigation">
          <a className="brand" href="#overview" aria-label="Subspace teardown home">
            <span className="brand-mark">S</span>
            <span>Subspace.money Teardown</span>
          </a>
          <div className="nav-links">
            <a href="#opportunities" onClick={(e) => triggerScrollToSection(e, 'opportunities')}>Opportunities</a>
            <a href="#sandbox" onClick={(e) => triggerScrollToSection(e, 'sandbox')}>Simulation Lab</a>
            <a href="#visual-audit" onClick={(e) => triggerScrollToSection(e, 'visual-audit')}>Visual Audit</a>
            <a href="#matrix" onClick={(e) => triggerScrollToSection(e, 'matrix')}>Matrix & Roadmap</a>
            <button
              onClick={toggleTheme}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--ink)',
                cursor: 'pointer',
                fontSize: '0.88rem',
                fontWeight: '700',
                padding: '8px 12px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                borderRadius: '8px',
              }}
              title="Toggle Color Theme"
            >
              {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
            </button>
          </div>
        </nav>

        <div className="hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">Interactive Case Study</p>
            <h1 aria-label="Subspace.money Product Teardown">
              <span>Subspace.money</span>
              <span>Product Teardown</span>
            </h1>
            <p className="summary">{executiveSummary}</p>
            <div className="hero-actions" aria-label="Primary recommendations">
              <a className="primary-link" href="#opportunities" onClick={triggerScrollToOpportunities}>
                Explore recommendations <ArrowUpRight size={16} />
              </a>
              <span className="positioning-pill">
                Core positioning: <strong>{positioningRecommendation}</strong> ⚡️
              </span>
            </div>
          </div>

          <aside className="command-panel" aria-label="Teardown summary metrics">
            <div className="panel-header">
              <span>Opportunity Control Room</span>
              <span className="header-accent">
                <ShieldCheck size={18} aria-hidden="true" />
                <span>Verified Insights</span>
              </span>
            </div>
            <div className="metric-grid">
              <Metric label="Core Moves" value="5" />
              <Metric label="Low Effort Wins" value="2" />
              <Metric label="Growth Loops" value="1" />
              <Metric label="High Impact Focus" value="4" />
            </div>
            <div className="priority-stack">
              {priorityCounts.map((item) => (
                <div className="priority-row" key={item.group}>
                  <span>{item.group}</span>
                  <strong>{item.count}</strong>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      {/* SECTION 1: Opportunities Explorer */}
      <section className="section-shell" id="opportunities">
        <SectionHeader
          eyebrow="Opportunity Explorer"
          title="Filter and compare key product opportunities"
          icon={Filter}
        />

        <div className="filter-row" aria-label="Opportunity filters">
          <FilterGroup
            label="Pillar"
            options={['All pillars', ...pillars]}
            selected={pillarFilter}
            onSelect={(value) => handlePillarFilter(value as PillarFilter)}
          />
          <FilterGroup
            label="Priority"
            options={['All priorities', ...priorityGroups]}
            selected={priorityFilter}
            onSelect={(value) => handlePriorityFilter(value as PriorityFilter)}
          />
        </div>

        <div className="opportunity-layout">
          <div className="opportunity-list" aria-label="Filtered opportunities">
            {filteredOpportunities.length > 0 ? (
              filteredOpportunities.map((opportunity) => (
                <OpportunityButton
                  key={opportunity.id}
                  opportunity={opportunity}
                  isSelected={selectedOpportunity.id === opportunity.id}
                  onSelect={() => {
                    setSelectedId(opportunity.id)
                    setActiveSimTab(opportunity.id) // Sync tab with simulation playground!
                  }}
                />
              ))
            ) : (
              <div className="empty-state">
                No recommendations match this filter combination.
              </div>
            )}
          </div>

          {filteredOpportunities.length > 0 ? (
            <OpportunityDetail opportunity={selectedOpportunity} />
          ) : (
            <div className="detail-panel empty-detail">
              Reset filters to view teardown opportunities.
            </div>
          )}
        </div>
      </section>

      {/* SECTION 2: Product Opportunity Lab (Simulators) */}
      <section className="section-shell" id="sandbox" style={{ background: 'rgba(16, 185, 129, 0.01)' }}>
        <SectionHeader
          eyebrow="Product Opportunity Lab"
          title="Interact with live prototypes of the proposed features"
          icon={Sparkles}
        />

        {/* Tab Selection */}
        <div className="sandbox-tabs">
          {opportunities.map((opt) => {
            const Icon = opportunityIcons[opt.id]
            return (
              <button
                key={opt.id}
                type="button"
                className={`sandbox-tab ${activeSimTab === opt.id ? 'active' : ''}`}
                onClick={() => {
                  setActiveSimTab(opt.id)
                  setSelectedId(opt.id) // Sync back to opportunities selector
                }}
              >
                <span className="tab-icon">
                  <Icon size={16} />
                </span>
                <span className="tab-meta">
                  <strong>Recommendation 0{opportunities.indexOf(opt) + 1}</strong>
                  <small>{opt.pillar.split(' ')[0]}</small>
                </span>
              </button>
            )
          })}
        </div>

        {/* Simulation Sandbox Panel */}
        <div className="prototype-box">
          {activeSimTab === 'trust-onboarding' && (
            <div className="sandbox-panel">
              <div className="sandbox-simulation">
                <div className="phone-simulator">
                  <div className="phone-header">
                    <span>10:42 AM</span>
                    <span style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                      <Lock size={10} /> 5G LTE
                    </span>
                  </div>

                  <div className="phone-screen">
                    <div className="phone-screen-title">
                      <span>Subspace Secure Parser</span>
                      <span className="sms-status-pill success">Local Sandbox</span>
                    </div>
                    <span className="phone-screen-subtitle">
                      Simulate parsing SMS logs to detect subscriptions securely in-app without cloud upload.
                    </span>

                    <div className="sms-list">
                      {trustStep === 0 && (
                        <div className="empty-state" style={{ margin: '40px 0', fontSize: '0.8rem' }}>
                          Tap "Read SMS Inbox" to simulate local, zero-knowledge parsing.
                        </div>
                      )}

                      {trustStep === 1 && (
                        <div style={{ margin: '40px 0', textAlign: 'center' }}>
                          <div style={{ display: 'inline-block', width: '24px', height: '24px', border: '3px solid var(--green)', borderTopColor: 'transparent', borderRadius: '50%', animation: 'pulse-ring 1s infinite linear' }} />
                          <p style={{ fontSize: '0.75rem', marginTop: '12px', color: '#888' }}>
                            Locally filtering OTPs & personal messages...
                          </p>
                        </div>
                      )}

                      {trustStep >= 2 &&
                        mockSmsLogs.slice(0, visibleSmsCount).map((sms) => (
                          <div
                            key={sms.id}
                            className={`sms-bubble ${
                              sms.classification === 'subscription'
                                ? 'incoming'
                                : sms.classification === 'sensitive'
                                  ? 'filtered'
                                  : 'ignored'
                            }`}
                          >
                            <div className="sms-sender">
                              <span>{sms.sender}</span>
                              <span className="sms-date">{sms.date}</span>
                            </div>
                            <div className="sms-body">{sms.body}</div>
                            <div>
                              {sms.classification === 'subscription' && (
                                <span className="sms-status-pill success">
                                  Detect: {sms.extractedService} (₹{sms.extractedAmount})
                                </span>
                              )}
                              {sms.classification === 'sensitive' && (
                                <span className="sms-status-pill filtered">
                                  Blocked: OTP Shielded
                                </span>
                              )}
                              {sms.classification === 'ignored' && (
                                <span className="sms-status-pill ignored">
                                  Ignored: Personal Chat
                                </span>
                              )}
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>

                  <div className="phone-control-bar">
                    <button
                      type="button"
                      className="phone-btn reset"
                      onClick={resetTrustSimulation}
                      disabled={trustStep === 0}
                    >
                      <RotateCcw size={12} style={{ marginRight: '4px' }} /> Reset
                    </button>
                    <button
                      type="button"
                      className="phone-btn"
                      onClick={startTrustSimulation}
                      disabled={trustStep !== 0}
                    >
                      <Play size={12} style={{ marginRight: '4px' }} /> Read SMS Inbox
                    </button>
                  </div>
                </div>

                {trustStep === 3 && (
                  <div className="trust-status-panel">
                    <ShieldCheck size={18} />
                    <span>
                      <strong>Simulation Complete</strong>: 3 subscriptions matched locally. Zero login credentials stored. All OTPs discarded.
                    </span>
                  </div>
                )}
              </div>

              <div className="sandbox-theory">
                <div className="theory-header">
                  <span>UX + TRUST ONBOARDING</span>
                  <h3>Guided Trust Onboarding Flow</h3>
                </div>

                <div className="theory-body">
                  <div className="theory-section">
                    <h4>Why it matters:</h4>
                    <p>
                      Users are paranoid about linking financial details or granting SMS permissions. By showing them an interactive simulator in-app, we build conceptual security models:
                    </p>
                    <ul className="theory-bullets">
                      <li>
                        <Check size={14} />
                        <span><strong>Local Regex Parsing:</strong> All scan functions execute locally. Sensitive bank logins are never requested.</span>
                      </li>
                      <li>
                        <Check size={14} />
                        <span><strong>OTP Shielding:</strong> We explicitly showcase that transactional OTPs and general text logs are blocked and discarded.</span>
                      </li>
                      <li>
                        <Check size={14} />
                        <span><strong>98.7% Accuracy Benchmark:</strong> Display trust stats showing detection rates for major Indian merchants.</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="theory-footer">
                  <div className="stat">
                    <strong>+38%</strong>
                    <span>Est. Account Linking Rate</span>
                  </div>
                  <div className="stat">
                    <strong>Local</strong>
                    <span>Processing Layer</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSimTab === 'subscription-os-positioning' && (
            <div className="sandbox-panel">
              <div className="sandbox-simulation">
                <div className="rebrand-simulator">
                  <div className="rebrand-toggle">
                    <button
                      type="button"
                      className={positioningState === 'old' ? 'active' : ''}
                      onClick={() => setPositioningState('old')}
                    >
                      Generic Expense Tracker Copy
                    </button>
                    <button
                      type="button"
                      className={positioningState === 'new' ? 'active' : ''}
                      onClick={() => setPositioningState('new')}
                    >
                      India's Subscription OS Copy
                    </button>
                  </div>

                  <div className="preview-card">
                    {positioningState === 'old' ? (
                      <div className="old-content">
                        <span className="preview-badge old">Generic Competitor Position</span>
                        <h5>Expense Split & Log</h5>
                        <h4>Split bills, track daily expenses & manage group finances</h4>
                        <p>
                          Subspace helps you write down your lunches, coordinate hostel rent, log movie tickets, and split utility balances among friends.
                        </p>
                      </div>
                    ) : (
                      <div className="new-content">
                        <span className="preview-badge new">Proposed Subscription OS</span>
                        <h5>India's subscription control centre</h5>
                        <h4>Your Subscriptions, <span>Fully Optimized.</span></h4>
                        <p>
                          Auto-detect recurring bills, co-own plans with split groups, prevent accidental renewals, and negotiate student packages.
                        </p>
                        <div className="new-features">
                          <span>🔒 Auto-Detect</span>
                          <span>👥 Shared Co-pay</span>
                          <span>📈 Savings Score</span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="trust-status-panel" style={{ background: 'rgba(255,255,255,0.01)' }}>
                    <AlertCircle size={16} />
                    <span>
                      {positioningState === 'old'
                        ? 'Overlap with Splitwise, Walnut, and Fold increases CAC by making the app feel like a utility tracker.'
                        : 'Focused subscription messaging aligns with a unique high-value ICP and establishes market leadership in India.'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="sandbox-theory">
                <div className="theory-header">
                  <span>POSITIONING + GTM</span>
                  <h3>Subscription OS vs Generic Tracker</h3>
                </div>

                <div className="theory-body">
                  <div className="theory-section">
                    <h4>Core Strategic Rationale:</h4>
                    <p>
                      India's digital subscription market is expanding at a 25% CAGR. Expense splitting is a race to the bottom, whereas managing OTT/Software/SaaS stacks is a high-value niche:
                    </p>
                    <ul className="theory-bullets">
                      <li>
                        <Check size={14} />
                        <span><strong>Subscription-First UI:</strong> Design centers around billing dates, plans, and sharing models.</span>
                      </li>
                      <li>
                        <Check size={14} />
                        <span><strong>Monetization Hook:</strong> Enables subscription marketplace purchases, negotiation commissions, and premium co-pay plans.</span>
                      </li>
                      <li>
                        <Check size={14} />
                        <span><strong>Clearer ICP Targeting:</strong> Direct focus on creators, students, developers, and young corporate professionals.</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="theory-footer">
                  <div className="stat">
                    <strong>-35%</strong>
                    <span>Target CAC Reduction</span>
                  </div>
                  <div className="stat">
                    <strong>High</strong>
                    <span>Brand Differentiation</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSimTab === 'subscription-health-score' && (
            <div className="sandbox-panel">
              <div className="sandbox-simulation">
                <div className="health-sim-container">
                  <div className="health-gauge-box">
                    <div className="radial-gauge">
                      <svg className="gauge-svg">
                        <circle cx="50" cy="50" r="40" className="gauge-bg" />
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          className="gauge-fill"
                          stroke={
                            calculatedHealthScore > 80
                              ? '#10b981'
                              : calculatedHealthScore > 50
                                ? '#f59e0b'
                                : '#ef4444'
                          }
                          strokeDasharray="251.2"
                          strokeDashoffset={251.2 - (251.2 * calculatedHealthScore) / 100}
                        />
                      </svg>
                      <div className="gauge-value">
                        <strong>{calculatedHealthScore}</strong>
                        <span>Health</span>
                      </div>
                    </div>

                    <div className="gauge-info">
                      <h4>Subscription Health</h4>
                      <p>
                        Your index indicates active optimization level based on duplicates, unused plans, and split efficiency.
                      </p>
                    </div>
                  </div>

                  <div className="health-subs-list">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                      <span style={{ fontSize: '0.78rem', fontWeight: 800 }}>Manage Simulated Accounts</span>
                      <button type="button" className="sub-btn-toggle" style={{ padding: '2px 8px' }} onClick={resetHealthScore}>
                        Reset
                      </button>
                    </div>

                    {subsList.map((sub) => (
                      <div className="health-sub-row" key={sub.id}>
                        <div
                          className="sub-avatar"
                          style={{ backgroundColor: sub.color, boxShadow: `0 0 10px ${sub.color}33` }}
                        >
                          {sub.name[0]}
                        </div>
                        <div className="sub-meta">
                          <strong>{sub.name}</strong>
                          <span>₹{sub.cost}/{sub.billingPeriod === 'monthly' ? 'mo' : 'yr'}</span>
                        </div>
                        <div className="sub-controls">
                          {sub.isUnused !== undefined && (
                            <button
                              type="button"
                              className={`sub-btn-toggle ${sub.isUnused ? 'active-flag' : ''}`}
                              onClick={() => toggleSubFlag(sub.id, 'isUnused')}
                              title="Toggle if subscription is unused"
                            >
                              {sub.isUnused ? '🚫 Unused' : 'Active'}
                            </button>
                          )}
                          {sub.isDuplicate !== undefined && (
                            <button
                              type="button"
                              className={`sub-btn-toggle ${sub.isDuplicate ? 'active-flag' : ''}`}
                              onClick={() => toggleSubFlag(sub.id, 'isDuplicate')}
                              title="Toggle if duplicate account exists"
                            >
                              {sub.isDuplicate ? '👯 Duplicate' : 'Unique'}
                            </button>
                          )}
                          {sub.sharingOpportunity && (
                            <button
                              type="button"
                              className={`sub-btn-toggle ${sub.isShared ? 'active-flag' : ''}`}
                              style={{ color: sub.isShared ? '#34d399' : '', borderColor: sub.isShared ? 'rgba(16, 185, 129, 0.3)' : '' }}
                              onClick={() => toggleSubFlag(sub.id, 'isShared')}
                              title="Toggle if plan is shared with friends"
                            >
                              {sub.isShared ? '👥 Split (4)' : 'Split?'}
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {calculatedMonthlySavings > 0 && (
                    <div className="health-savings-panel">
                      <Sparkles size={16} />
                      <span>
                        Optimization Opportunity: Cancel or split flagged apps to save <strong>₹{calculatedMonthlySavings}/mo</strong>!
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="sandbox-theory">
                <div className="theory-header">
                  <span>PRODUCT FEATURE</span>
                  <h3>Subscription Health Score</h3>
                </div>

                <div className="theory-body">
                  <div className="theory-section">
                    <h4>Why it drives engagement:</h4>
                    <p>
                      Users love direct benchmarks. A single gamified number (0–100) prompts active cleanups:
                    </p>
                    <ul className="theory-bullets">
                      <li>
                        <Check size={14} />
                        <span><strong>Actionable Triggers:</strong> Tells them exactly what to cancel ("You haven't opened Canva in 60 days. Save ₹399").</span>
                      </li>
                      <li>
                        <Check size={14} />
                        <span><strong>Duplicate Warnings:</strong> Highlights credit card auto-debits that overlap with UPI group splits.</span>
                      </li>
                      <li>
                        <Check size={14} />
                        <span><strong>Premium Upgrades:</strong> Monopolize users by offering auto-cancellation features as a premium utility.</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="theory-footer">
                  <div className="stat">
                    <strong>₹6,800/yr</strong>
                    <span>Avg. User Saving Pot.</span>
                  </div>
                  <div className="stat">
                    <strong>2.4x</strong>
                    <span>Retention Uplift</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSimTab === 'shared-referral-loop' && (
            <div className="sandbox-panel">
              <div className="sandbox-simulation">
                <div className="referral-sim-container">
                  <div className="slider-group">
                    <div className="slider-label">
                      <span>Shared subscriptions managed:</span>
                      <strong>{refPlansCount} Plans</strong>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="5"
                      className="ref-slider"
                      value={refPlansCount}
                      onChange={(e) => setRefPlansCount(Number(e.target.value))}
                    />
                  </div>

                  <div className="slider-group">
                    <div className="slider-label">
                      <span>Friends invited to split each plan:</span>
                      <strong>{refFriendsCount} Friends</strong>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="5"
                      className="ref-slider"
                      value={refFriendsCount}
                      onChange={(e) => setRefFriendsCount(Number(e.target.value))}
                    />
                  </div>

                  <div className="loop-math-panel">
                    <div className="math-cell">
                      <span>Group monthly savings</span>
                      <strong>₹{referralSavingsPerMonth}</strong>
                    </div>
                    <div className="math-cell">
                      <span>Viral users generated</span>
                      <strong>{referralNetworkGrowth} Members</strong>
                    </div>
                    <div className="math-cell" style={{ gridColumn: 'span 2', background: 'rgba(245, 158, 11, 0.03)' }}>
                      <span>Estimated Referral Cashback</span>
                      <strong style={{ color: 'var(--accent-gold)' }}>₹{referralCashback}</strong>
                    </div>
                  </div>

                  <div className="leaderboard-preview">
                    <span className="leaderboard-title">🏆 Group Savings Leaderboard</span>
                    <div className="leaderboard-row">
                      <div className="leaderboard-user">
                        <span className="rank">1</span>
                        <span>Your Crew (Suyash)</span>
                      </div>
                      <span className="leaderboard-save">₹{referralSavingsPerMonth}/mo</span>
                    </div>
                    <div className="leaderboard-row">
                      <div className="leaderboard-user">
                        <span className="rank">2</span>
                        <span>Rahul's flatmates</span>
                      </div>
                      <span className="leaderboard-save">₹1,200/mo</span>
                    </div>
                    <div className="leaderboard-row">
                      <div className="leaderboard-user">
                        <span className="rank">3</span>
                        <span>Design Cohort</span>
                      </div>
                      <span className="leaderboard-save">₹640/mo</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="sandbox-theory">
                <div className="theory-header">
                  <span>GROWTH + VIRALITY</span>
                  <h3>Viral Loop Referral System</h3>
                </div>

                <div className="theory-body">
                  <div className="theory-section">
                    <h4>Leveraging Co-ownership:</h4>
                    <p>
                      Every time a user sets up a shared subscription, they must invite group members to co-pay. This creates a natural K-factor growth mechanism:
                    </p>
                    <ul className="theory-bullets">
                      <li>
                        <Check size={14} />
                        <span><strong>Frictionless Invites:</strong> Share links via WhatsApp to split Netflix/Spotify in 2 taps.</span>
                      </li>
                      <li>
                        <Check size={14} />
                        <span><strong>Savings Gamification:</strong> Show leaderboards highlighting which group has saved the most.</span>
                      </li>
                      <li>
                        <Check size={14} />
                        <span><strong>Double-sided rewards:</strong> Cashback given to referrer and referred when checking accounts.</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="theory-footer">
                  <div className="stat">
                    <strong>&gt; 1.2</strong>
                    <span>Est. K-Factor Viral Ratio</span>
                  </div>
                  <div className="stat">
                    <strong>Zero</strong>
                    <span>Paid Ad Spend Focus</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSimTab === 'university-partnerships' && (
            <div className="sandbox-panel">
              <div className="sandbox-simulation">
                <div className="bundle-sim-container">
                  <div style={{ fontSize: '0.78rem', fontWeight: 800, marginBottom: '2px' }}>
                    Select Student Academic Bundle items:
                  </div>

                  <div className="bundle-options">
                    {bundleOptionsList.map((opt) => (
                      <div
                        key={opt.id}
                        className={`bundle-option-card ${selectedBundles.includes(opt.id) ? 'selected' : ''}`}
                        onClick={() => toggleBundleSelection(opt.id)}
                      >
                        <strong>{opt.name[0] + opt.name.slice(1, 10)}</strong>
                        <span>₹{opt.studentPrice}/mo</span>
                        <div style={{ fontSize: '0.62rem', color: '#e11d48', textDecoration: 'line-through', marginTop: '2px' }}>
                          ₹{opt.normalPrice}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="group-size-selector">
                    <span>Group co-buyers size:</span>
                    <div className="group-btn-wrap">
                      <button
                        type="button"
                        onClick={() => setGroupSize(Math.max(1, groupSize - 1))}
                      >
                        -
                      </button>
                      <span>{groupSize}</span>
                      <button
                        type="button"
                        onClick={() => setGroupSize(Math.min(5, groupSize + 1))}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="bundle-receipt">
                    <div className="receipt-row">
                      <span>Normal individual stack total:</span>
                      <span>₹{bundleCalculations.individualNormal}/mo</span>
                    </div>
                    <div className="receipt-row">
                      <span>Student discount stack total:</span>
                      <span className="receipt-saving">₹{bundleCalculations.individualStudent}/mo</span>
                    </div>
                    <div className="receipt-row">
                      <span>Group size multiplier:</span>
                      <span>x{groupSize} members</span>
                    </div>
                    <div className="receipt-row">
                      <span>Total shared group bill:</span>
                      <span>₹{bundleCalculations.groupStudent}/mo</span>
                    </div>
                    <div className="receipt-row">
                      <span>Monthly cost per member:</span>
                      <span style={{ color: '#fff' }}>₹{bundleCalculations.perMemberPrice}/mo</span>
                    </div>
                    <div className="receipt-row">
                      <span>Group monthly savings:</span>
                      <span className="receipt-saving">₹{bundleCalculations.groupSavings}/mo</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="sandbox-theory">
                <div className="theory-header">
                  <span>PARTNERSHIPS + GTM</span>
                  <h3>University Community Bundles</h3>
                </div>

                <div className="theory-body">
                  <div className="theory-section">
                    <h4>Direct Distribution Levers:</h4>
                    <p>
                      Instead of marketing to individuals, we partner with campus societies, startup incubators, and co-working groups:
                    </p>
                    <ul className="theory-bullets">
                      <li>
                        <Check size={14} />
                        <span><strong>Pre-negotiated Bundles:</strong> Combine productivity tools (Notion, GitHub) with OTT platforms.</span>
                      </li>
                      <li>
                        <Check size={14} />
                        <span><strong>Campus Rep Referral Program:</strong> Assign student leads to earn commission on linked portfolios.</span>
                      </li>
                      <li>
                        <Check size={14} />
                        <span><strong>Developer Co-op Packs:</strong> Group purchase SaaS subscriptions (Claude, Vercel, Figma) for college project teams.</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="theory-footer">
                  <div className="stat">
                    <strong>10k+</strong>
                    <span>Projected Student Signups</span>
                  </div>
                  <div className="stat">
                    <strong>Low</strong>
                    <span>Acquisition Friction</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* SECTION 3: Visual Audit Screen Showcase */}
      <section className="section-shell" id="visual-audit">
        <SectionHeader
          eyebrow="Visual Audit"
          title="Interactive screen walkthrough of proposed dashboard changes"
          icon={Link2}
        />

        <div className="audit-toggles" aria-label="Visual Audit screens selection">
          <button
            type="button"
            className={auditTab === 'desktop' ? 'active' : ''}
            onClick={() => handleAuditTabChange('desktop')}
          >
            Desktop Dashboard
          </button>
          <button
            type="button"
            className={auditTab === 'mobile' ? 'active' : ''}
            onClick={() => handleAuditTabChange('mobile')}
          >
            Mobile Dashboard
          </button>
        </div>

        <div className="audit-layout">
          {/* Screenshot container with coordinates */}
          <div className="screenshot-container">
            {auditTab === 'desktop' ? (
              <>
                <img
                  src="/subspace-dashboard-desktop.png"
                  alt="Subspace Desktop Dashboard Visual"
                  className="screenshot-img"
                />
                {desktopHotspots.map((spot) => (
                  <button
                    key={spot.id}
                    type="button"
                    className={`hotspot-dot ${selectedHotspot?.id === spot.id ? 'active' : ''}`}
                    style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                    onClick={() => setSelectedHotspot(spot)}
                  >
                    <span>{desktopHotspots.indexOf(spot) + 1}</span>
                  </button>
                ))}
              </>
            ) : (
              <>
                <img
                  src="/subspace-dashboard-mobile.png"
                  alt="Subspace Mobile Dashboard Visual"
                  className="screenshot-img"
                  style={{ maxWidth: '380px', margin: '0 auto' }}
                />
                {mobileHotspots.map((spot) => (
                  <button
                    key={spot.id}
                    type="button"
                    className={`hotspot-dot ${selectedHotspot?.id === spot.id ? 'active' : ''}`}
                    style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                    onClick={() => setSelectedHotspot(spot)}
                  >
                    <span>{mobileHotspots.indexOf(spot) + 1}</span>
                  </button>
                ))}
            </>
          )}
        </div>

        {/* Detailed hotspot panel */}
        <div className="audit-details-panel">
          {selectedHotspot ? (
            <>
              <div className="audit-details-header">
                <h4>
                  <Sparkles size={16} style={{ color: 'var(--green)' }} />
                  {selectedHotspot.title}
                </h4>
                <span>Proposed Change</span>
              </div>
              <div className="audit-details-desc">
                {selectedHotspot.description}
              </div>
              <div className="audit-details-action">
                <div className="section-icon" style={{ width: '32px', height: '32px', borderRadius: '6px' }}>
                  {(() => {
                    const linkedOpt = opportunities.find((o) => o.id === selectedHotspot.recommendationId)
                    const IconComp = linkedOpt ? opportunityIcons[linkedOpt.id] : Target
                    return <IconComp size={14} />
                  })()}
                </div>
                <span>
                  Corresponds to: <strong>{opportunities.find((o) => o.id === selectedHotspot.recommendationId)?.title}</strong>
                </span>
              </div>
              <button
                type="button"
                className="phone-btn"
                style={{ marginTop: '16px', display: 'flex', width: '100%', justifyContent: 'center' }}
                onClick={() => {
                  setActiveSimTab(selectedHotspot.recommendationId)
                  document.getElementById('sandbox')?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                Go to simulation lab →
              </button>
            </>
          ) : (
            <div className="audit-details-empty">
              Click on any pulsing number hotspot directly on the screenshot to inspect the proposed changes.
            </div>
          )}
        </div>
      </div>
      </section>

      {/* SECTION 4: Prioritization Matrix */}
      <section className="section-shell" id="matrix">
        <SectionHeader
          eyebrow="Prioritization Matrix"
          title="Mapping high-impact wins by effort level"
          icon={BadgeIndianRupee}
        />

        <div className="matrix-container">
          <div className="matrix">
            <div className="axis axis-impact">Impact</div>
            <div className="axis axis-effort">Effort</div>
            {opportunities.map((opportunity, index) => (
              <button
                type="button"
                className={`matrix-item ${
                  opportunity.effortLevel === 'Low'
                    ? 'matrix-low'
                    : opportunity.effortLevel === 'Medium'
                      ? 'matrix-medium'
                      : 'matrix-long'
                } ${
                  opportunity.impactLevel === 'High' ? 'matrix-high' : 'matrix-strategic'
                } ${selectedOpportunity.id === opportunity.id ? 'is-selected' : ''}`}
                key={opportunity.id}
                onClick={() => {
                  setSelectedId(opportunity.id)
                  setActiveSimTab(opportunity.id) // Sync tab too
                }}
              >
                <span>{index + 1}</span>
                {opportunity.title}
              </button>
            ))}
            <div className="matrix-label low">Low</div>
            <div className="matrix-label medium">Medium</div>
            <div className="matrix-label long">Long-term</div>
            <div className="matrix-label high">High</div>
            <div className="matrix-label strategic">Strategic</div>
          </div>
        </div>
      </section>

      {/* SECTION 5: SWOT Analysis */}
      <section className="section-shell swot-section" id="swot">
        <SectionHeader
          eyebrow="Strategic Context"
          title="SWOT Analysis: Operating Landscape"
          icon={Link2}
        />
        <div className="swot-grid">
          {swotSections.map((section) => (
            <article className={`swot-card ${section.type.toLowerCase()}`} key={section.type}>
              <h3>
                {section.type === 'Strengths' && <ShieldCheck size={18} />}
                {section.type === 'Weaknesses' && <AlertCircle size={18} />}
                {section.type === 'Opportunities' && <Sparkles size={18} />}
                {section.type === 'Threats' && <Shield size={18} />}
                {section.type}
              </h3>
              <ul>
                {section.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      {/* SECTION 6: Shipping Sequence Timeline */}
      <section className="section-shell roadmap-section">
        <SectionHeader
          eyebrow="Recommended Shipping Sequence"
          title="Phase-by-phase implementation roadmap"
          icon={ArrowUpRight}
        />
        <div className="timeline">
          {priorityGroups.map((group, index) => (
            <article className="timeline-step" key={group}>
              <span>Phase 0{index + 1}</span>
              <h3>{group}</h3>
              <p>
                {opportunities
                  .filter((opportunity) => opportunity.priorityGroup === group)
                  .map((opportunity) => opportunity.title)
                  .join(' and ')}
              </p>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="metric">
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  )
}

function SectionHeader({
  eyebrow,
  title,
  icon: Icon,
}: {
  eyebrow: string
  title: string
  icon: typeof Filter
}) {
  return (
    <div className="section-header">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
      </div>
      <span className="section-icon">
        <Icon size={20} aria-hidden="true" />
      </span>
    </div>
  )
}

function FilterGroup({
  label,
  options,
  selected,
  onSelect,
}: {
  label: string
  options: string[]
  selected: string
  onSelect: (value: string) => void
}) {
  return (
    <div className="filter-group">
      <span>{label}</span>
      <div>
        {options.map((option) => (
          <button
            className={selected === option ? 'active' : ''}
            key={option}
            onClick={() => onSelect(option)}
            type="button"
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  )
}

function OpportunityButton({
  opportunity,
  isSelected,
  onSelect,
}: {
  opportunity: Opportunity
  isSelected: boolean
  onSelect: () => void
}) {
  const Icon = opportunityIcons[opportunity.id]

  return (
    <button
      type="button"
      className={`opportunity-button ${isSelected ? 'active' : ''}`}
      onClick={onSelect}
    >
      <span className="opportunity-icon">
        <Icon size={18} aria-hidden="true" />
      </span>
      <span>
        <strong>{opportunity.title}</strong>
        <small>{opportunity.priorityGroup}</small>
      </span>
    </button>
  )
}

function OpportunityDetail({ opportunity }: { opportunity: Opportunity }) {
  return (
    <article className="detail-panel">
      <div className="detail-heading">
        <div>
          <p>{opportunity.pillar}</p>
          <h3>{opportunity.title}</h3>
        </div>
        <span>{opportunity.effortLevel} effort</span>
      </div>

      <div className="detail-grid">
        <InsightBlock label="Observed Product Gap" text={opportunity.observed} />
        <InsightBlock label="Problem & Friction" text={opportunity.problem} />
      </div>

      <div className="action-columns">
        <div>
          <h4>Ship Instead Plan</h4>
          <ul>
            {opportunity.shipInstead.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <h4>Expected Financial & Growth Impact</h4>
          <ul>
            {opportunity.expectedImpact.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  )
}

function InsightBlock({ label, text }: { label: string; text: string }) {
  return (
    <div className="insight-block">
      <span>{label}</span>
      <p>{text}</p>
    </div>
  )
}

export default App
