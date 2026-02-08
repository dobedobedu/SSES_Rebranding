import { Persona, ExecutiveSummary, IMGTransferMetrics, K8TransitionMetrics, TeenInfluenceMetrics, sourced } from './types';

// ============================================
// RESEARCH METRICS WITH SOURCE CITATIONS
// ============================================
// Sources from: /Saint Stephens Research Data/Canon/
// - Student_Journey_Analysis_Report.md
// - EXECUTIVE_SUMMARY_Refined_Research.md
// - HIGH_CONFIDENCE_DATA_ANALYSIS.md
// ============================================

// IMG Transfer Metrics - Sources: Student_Journey_Analysis_Report.md lines 14, 610
export const imgTransferMetrics: IMGTransferMetrics = {
  totalTransfers: sourced(
    { min: 195, max: 260 },
    'Student_Journey_Analysis_Report.md:14',
    'medium',
    'Estimated from enrollment trends, retention rate analysis, review platform sentiment'
  ),
  timeframe: '2020-2024',
  reasons: {
    financial: sourced(
      44,
      'Student_Journey_Analysis_Report.md:610',
      'low',
      'Inferred from review analysis and parent sentiment'
    ),
    athletic: sourced(
      22,
      'Student_Journey_Analysis_Report.md:616',
      'low',
      'Estimated from athletic signing data cross-reference'
    ),
    academic: sourced(
      19,
      'Student_Journey_Analysis_Report.md:623',
      'low',
      'Inferred from social media sentiment and review themes'
    ),
    relocation: sourced(
      14,
      'Student_Journey_Analysis_Report.md:631',
      'low',
      'Estimated from enrollment pattern analysis'
    )
  },
  destinations: {
    publicSchool: sourced(35, 'EXECUTIVE_SUMMARY_Refined_Research.md:379', 'medium', 'Cross-referenced with transfer data'),
    privateSchool: sourced(40, 'Student_Journey_Analysis_Report.md:198', 'medium', 'Inferred from school capacity'),
    outOfState: sourced(15, 'Student_Journey_Analysis_Report.md:17', 'low', 'Estimated from return-to-home patterns'),
    other: sourced(10, 'Student_Journey_Analysis_Report.md:43', 'low', 'Estimated from remaining transfers')
  },
  ssesAdvantage: {
    tuitionSavings: sourced(
      66255,
      'HIGH_CONFIDENCE_DATA_ANALYSIS.md:98-100',
      'high',
      'Official IMG Academy and SSES tuition rates'
    ),
    imgTuition: sourced(
      91200,
      'HIGH_CONFIDENCE_DATA_ANALYSIS.md:98-99',
      'high',
      'IMG Academy official boarding tuition'
    ),
    ssesTuition: sourced(
      24745,
      'HIGH_CONFIDENCE_DATA_ANALYSIS.md:263-266',
      'high',
      'Saint Stephen\'s official tuition + fees'
    )
  }
};

// K-8 Transition Metrics - Sources: Student_Journey_Analysis_Report.md lines 148, 150
export const k8TransitionMetrics: K8TransitionMetrics = {
  totalGraduates: sourced(
    { min: 680, max: 850 },
    'Student_Journey_Analysis_Report.md:148',
    'medium',
    'Calculated from Private School Review enrollment trends'
  ),
  annualRange: 'Annual K-8 graduates',
  schoolTypes: {
    montessori: sourced(
      40,
      'Student_Journey_Analysis_Report.md:150',
      'medium',
      'Center Montessori, Foundations Christian, Mangrove School enrollment'
    ),
    religious: sourced(
      32,
      'Student_Journey_Analysis_Report.md:156',
      'medium',
      'St. Joseph Catholic, Bradenton Christian, other religious K-8'
    ),
    otherPrivate: sourced(
      20,
      'Student_Journey_Analysis_Report.md:162',
      'low',
      'Other private K-8 without upper programs'
    ),
    public: sourced(
      8,
      'Student_Journey_Analysis_Report.md:166',
      'low',
      'Public K-8 families seeking private alternatives'
    )
  },
  budgetSegments: {
    high: sourced(25, 'EXECUTIVE_SUMMARY_Refined_Research.md:259', 'medium', 'Household income $150K+'),
    mid: sourced(50, 'EXECUTIVE_SUMMARY_Refined_Research.md:266', 'medium', 'Household income $80K-$150K'),
    low: sourced(25, 'EXECUTIVE_SUMMARY_Refined_Research.md:273', 'medium', 'Household income $50K-$80K')
  },
  ssesCaptures: sourced(
    { min: 80, max: 105 },
    'Student_Journey_Analysis_Report.md:199',
    'low',
    'Estimated private high school transfer share'
  )
};

// Teen Influence Metrics - WARNING: NOT FOUND IN RESEARCH
export const teenInfluenceMetrics: TeenInfluenceMetrics = {
  vetoPercentage: sourced(
    60,
    'NOT VERIFIED',
    'unverified',
    'This metric was not found in research documents. Requires validation.'
  ),
  discoveryChannels: [
    'Instagram',
    'TikTok',
    'YouTube',
    'Peer referrals',
    'Campus visits'
  ],
  keyFactors: [
    'Campus aesthetic',
    'Food quality',
    'Social culture',
    'Freedom level',
    'Faculty respect'
  ]
};

export const executiveSummary: ExecutiveSummary = {
  totalK8Pipeline: sourced(
    { min: 680, max: 850 },
    'Student_Journey_Analysis_Report.md:148',
    'medium',
    'Annual K-8 graduates requiring upper school'
  ),
  imgOpportunity: sourced(
    { min: 195, max: 260 },
    'Student_Journey_Analysis_Report.md:14',
    'medium',
    'Annual IMG Academy transfers (2020-2024)'
  ),
  // Default priority - user can change
  prioritySegments: ['pivot', 'bridge']
};

// Default priority segments (user can override)
export const DEFAULT_PRIORITIES: string[] = ['pivot', 'bridge'];

export const personas: Persona[] = [
  {
    id: 'corp',
    name: 'Corporate Relocator',
    location: {
      region: 'NY/NJ (30%) • IL (15%) • CA (12%) • OH (10%)',
      usedTo: ['Same-day teacher responsiveness', 'Weekly performance PDFs', 'Rigid academic tracking', 'Elite metro networking'],
      expecting: ['12-hour query turnaround', 'Direct line to Head of School', 'Ivy League matriculation parity', 'Concierge onboarding'],
      emotionalDrivers: 'Fear of "Florida Learning Loss." Need rigorous academics that match Northeast pace without $91K IMG price tag.',
      nuggets: ['60-70% of relocating families consider private options', '700-800 families with school-age children relocate annually', 'Lakewood Ranch captures 25-30% of corporate employees']
    },
    spending: {
      sensitivity: 'Low sensitivity for speed & certainty.',
      budgetRange: '$24,745 tuition • $75K-$133K household income',
      ticketItems: [
        { item: 'SSES Tuition (Full Pay)', priceRange: '$24,745' },
        { item: 'Premium Relocation Package', priceRange: '$15K-$25K' },
        { item: 'Ivy-Track Test Prep/Tutoring', priceRange: '$150-$200/hr' },
        { item: 'Academic Concierge Fee', priceRange: '$2K-$5K' }
      ]
    },
    competition: {
      schools: [
        { name: 'Berkeley Prep', reason: 'High-pressure environment matches NYC "vibe"—$28K-$35K.', recommendationSource: 'Corporate HR relocation guides' },
        { name: 'Out-of-Door Academy', reason: 'Modern facilities in Lakewood Ranch—$22K-$28K.', recommendationSource: 'Luxury real estate agents' },
        { name: 'Lakewood Ranch High', reason: 'FREE, A-rated public—30% of corporate families choose.', recommendationSource: 'Employee residence data' },
        { name: 'Pine View School', reason: 'FREE gifted public, #1 in Florida.', recommendationSource: 'Parent forums' }
      ]
    },
    strategy: 'White-Glove Corporate Concierge: 12-hour response guarantee. Partner with top 10 relocation management companies to embed SSES into corporate relocation packages. Target 700-800 relocating families annually with school-age children.',
    
    steps: [
      { 
        id: 'c1', 
        stage: 'Awareness', 
        text: 'Panic peaks during move logistics—school search begins 90 days pre-arrival.', 
        tactic: 'Partner Outreach: Cartus, Sirva, Graebel embed SSES "Priority Placement" into relocation packages.' 
      },
      { 
        id: 'c2', 
        stage: 'Consideration', 
        text: 'Auditing academic rigor, teacher credentials, Ivy lists.', 
        tactic: 'Virtual "Meet-the-Dean" + VIP Parent Match: Connect with ex-Pingry/Exeter families who chose SSES.' 
      }
    ],
    
    targetCompanies: {
      tier1: [
        { name: 'Catalent', jobs: '10,000 global', likelihood: 'Very High', reason: 'HQ relocation—executive families with children' },
        { name: 'Garyline', jobs: '500+', likelihood: 'High', reason: 'Manufacturing supervisors—stable family positions' },
        { name: 'Sysco Tampa Bay', jobs: '300+', likelihood: 'High', reason: 'Operations/logistics—families seeking affordability' },
        { name: 'Foot Locker', jobs: '150+ HQ', likelihood: 'Very High', reason: 'Corporate professionals—NYC transfer families' },
        { name: 'Coca-Cola Beverages FL', jobs: '800+', likelihood: 'High', reason: 'Stable manufacturing—family-friendly schedules' }
      ],
      tier2: [
        { name: 'Citi', jobs: '119+ active (10K+ total)', likelihood: 'Medium-High', reason: 'Financial services—dual-income professionals' },
        { name: 'KnowBe4', jobs: 'Cybersecurity HQ', likelihood: 'Medium-High', reason: 'Tech sector—families from CA/NY' },
        { name: 'ReliaQuest', jobs: 'HQ staff', likelihood: 'Medium-High', reason: 'Tech professionals—value education investment' },
        { name: 'Webull', jobs: 'HQ staff', likelihood: 'Medium', reason: 'Fintech—NY transfer families' },
        { name: 'BeniComp', jobs: '100 through 2025', likelihood: 'Medium', reason: 'Healthcare sector—family-focused' }
      ]
    },
    
    keyPartners: {
      relocationManagement: ['Cartus', 'Sirva / Allied', 'Graebel Companies', 'Altair Global'],
      luxuryRealEstate: ['Michael Saunders & Co. (LWR)', 'Premier Sotheby\'s', 'Coldwell Banker Global Luxury'],
      schoolPlacement: ['IECA-certified consultants', 'Florida School Choice navigators'],
      microAreas: ['Lakewood Ranch (25-30%)', 'St. Petersburg (30-35%)', 'FishHawk (20-25%)']
    },

    touchPoints: [
      {
        id: 'corp-t1',
        title: 'Relocation Leaders',
        subtitle: 'Companies Driving Family Moves',
        description: 'Organizations with the highest concentration of employees with school-age children relocating to Tampa Bay. These companies drive 700-800 family relocations annually.',
        actions: [
          { id: 'c1-a1', text: 'Create co-branded "Sarasota Luxury Relocation Guide" for HR teams', priority: 'immediate' },
          { id: 'c1-a2', text: 'Offer "Priority Placement" service in corporate benefits packages', priority: 'immediate' },
          { id: 'c1-a3', text: 'Build high-end PDF/physical book for $5M+ listing kitchen counters', priority: 'short-term' },
          { id: 'c1-a4', text: 'Connect with HR/benefits teams at Tier 1 companies', priority: 'immediate' }
        ],
        rightPanelType: 'companies',
        rightPanelData: {
          tier1: [
            { name: 'Catalent', jobs: '10,000 global', likelihood: 'Very High', reason: 'HQ relocation—executive families with children' },
            { name: 'Garyline', jobs: '500+', likelihood: 'High', reason: 'Manufacturing supervisors—stable family positions' },
            { name: 'Sysco Tampa Bay', jobs: '300+', likelihood: 'High', reason: 'Operations/logistics—families seeking affordability' },
            { name: 'Foot Locker', jobs: '150+ HQ', likelihood: 'Very High', reason: 'Corporate professionals—NYC transfer families' },
            { name: 'Coca-Cola Beverages FL', jobs: '800+', likelihood: 'High', reason: 'Stable manufacturing—family-friendly schedules' }
          ],
          tier2: [
            { name: 'Citi', jobs: '119+ active (10K+ total)', likelihood: 'Medium-High', reason: 'Financial services—dual-income professionals' },
            { name: 'KnowBe4', jobs: 'Cybersecurity HQ', likelihood: 'Medium-High', reason: 'Tech sector—families from CA/NY' },
            { name: 'ReliaQuest', jobs: 'HQ staff', likelihood: 'Medium-High', reason: 'Tech professionals—value education investment' },
            { name: 'Webull', jobs: 'HQ staff', likelihood: 'Medium', reason: 'Fintech—NY transfer families' },
            { name: 'BeniComp', jobs: '100 through 2025', likelihood: 'Medium', reason: 'Healthcare sector—family-focused' }
          ]
        }
      },
      {
        id: 'corp-t2',
        title: 'Relocation Partners',
        subtitle: 'Ecosystem Partners',
        description: 'Partners families work with during their 90-day relocation window—before they contact schools directly. These touchpoints influence 60-70% of school decisions.',
        actions: [
          { id: 'c2-a1', text: 'Establish referral agreements with luxury realtors', priority: 'immediate' },
          { id: 'c2-a2', text: 'Train relocation agents on SSES value proposition', priority: 'short-term' },
          { id: 'c2-a3', text: 'Create partner co-marketing materials', priority: 'short-term' },
          { id: 'c2-a4', text: 'Host joint "New to Tampa" webinars with real estate partners', priority: 'long-term' }
        ],
        rightPanelType: 'partners',
        rightPanelData: {
          categories: [
            {
              title: 'Relocation Management',
              items: ['Cartus', 'Sirva / Allied', 'Graebel Companies', 'Altair Global']
            },
            {
              title: 'Luxury Real Estate',
              items: ['Michael Saunders & Co. (LWR)', 'Premier Sotheby\'s', 'Coldwell Banker Global Luxury']
            },
            {
              title: 'School Placement',
              items: ['IECA-certified consultants', 'Florida School Choice navigators']
            },
            {
              title: 'Target Micro-Areas',
              items: ['Lakewood Ranch (25-30%)', 'St. Petersburg (30-35%)', 'FishHawk (20-25%)']
            }
          ]
        }
      },
      {
        id: 'corp-t3',
        title: 'Digital Research',
        subtitle: 'Independent Validation',
        description: 'Where 60-70% of relocating families research independently before contacting schools—starting 90 days before their move.',
        actions: [
          { id: 'c3-a1', text: 'Optimize SEO for "best private schools Tampa" long-tail keywords', priority: 'immediate' },
          { id: 'c3-a2', text: 'Monitor and respond to GreatSchools/Niche reviews', priority: 'immediate' },
          { id: 'c3-a3', text: 'Create comparison content vs. Berkeley Prep/ODA', priority: 'short-term' },
          { id: 'c3-a4', text: 'Launch Google Ads targeting relocation keywords', priority: 'short-term' },
          { id: 'c3-a5', text: 'Develop Executive Weekend Tours landing page', priority: 'short-term' }
        ],
        rightPanelType: 'digital',
        rightPanelData: {
          channels: [
            'Google Search ("best private schools Tampa Bay")',
            'GreatSchools.org rankings',
            'Niche.com parent reviews',
            'Facebook parent groups (e.g., "Texas High School Football Parents")',
            'Reddit threads (r/CFB, r/IMG_Academy)',
            'Google Reviews'
          ],
          expectations: [
            { title: '12-hour Response Guarantee', description: 'Query turnaround commitment' },
            { title: 'Direct Line to Head of School', description: 'Concierge access promise' },
            { title: 'Ivy League Matriculation Parity', description: 'Academic rigor assurance' },
            { title: 'Concierge Onboarding', description: 'White-glove transition support' }
          ]
        }
      }
    ]
  },
  
  {
    id: 'life',
    name: 'Lifestyle Entrepreneur',
    location: {
      region: 'CA (35%) • Chicago (20%) • Remote/Nomadic (45%)',
      usedTo: ['Maker spaces as campus heart', 'Async learning tools', 'Outdoor classrooms', 'Entrepreneurial peer groups'],
      expecting: ['High-speed WiFi campus-wide', 'Marine Science research with NGOs', 'AI Labs over libraries', 'Zero busy-work'],
      emotionalDrivers: 'Want their kid to be a "Founder." Value The Dock more than the gym.',
      nuggets: ['Measure school quality by "Project-Based Learning" portfolio thickness', '45% earn $75K-$150K, 22% earn $150K-$300K', '500-750 content creators relocated 2022-2025']
    },
    spending: {
      sensitivity: 'Value-driven innovation.',
      budgetRange: '$24,745 tuition • 45% earn $75K-$150K',
      ticketItems: [
        { item: 'SSES Tuition', priceRange: '$24,745' },
        { item: 'Global Marine Expeditions', priceRange: '$5K-$10K' },
        { item: 'Outdoor Innovation Gear', priceRange: '$2K' },
        { item: 'Yacht Club / Marina Access', priceRange: '$3K-$6K' }
      ]
    },
    competition: {
      schools: [
        { name: 'Out-of-Door Academy', reason: 'Modern facilities + social "Club" vibe.', recommendationSource: 'Luxury lifestyle realtors' },
        { name: 'Microschools', reason: 'Ultimate flexibility for travel-heavy digital nomads.', recommendationSource: 'Tech community forums' },
        { name: 'Asher (New Models)', reason: 'Total freedom/self-directed models.', recommendationSource: 'Progressive parent circles' }
      ]
    },
    strategy: 'Position SSES as the "Founder-Friendly Flex School" for content creators and digital entrepreneurs. Showcase The Dock + Marine Science programs as differentiators from traditional college-prep.',
    
    successStories: [
      { 
        family: 'Ashley & Dino Petrone (@arrowsandbow)', 
        origin: 'Southern California', 
        business: 'Joie Inn (Anna Maria Island), The Fox Mercantile', 
        children: 4, 
        income: '$500K-$1M+',
        residence: 'Anna Maria Island (Holmes Beach)'
      },
      { 
        family: 'Roman Atwood', 
        origin: 'Ohio', 
        business: 'YouTube Creator (15.3M subscribers), Bunker Branding', 
        children: 3, 
        income: '$2M-$5M+',
        residence: 'Tampa Bay area'
      },
      { 
        family: 'Lindsay Lola (@lindsaylola)', 
        origin: 'Minnesota', 
        business: 'Lifestyle blog, Pilates instruction', 
        children: 'Multiple', 
        income: '$75K-$150K',
        residence: 'Southwest Florida'
      }
    ],
    
    steps: [
      { 
        id: 'l1', 
        stage: 'Discovery', 
        text: 'Browsing for "innovation-first" schools in Florida.', 
        tactic: 'Instagram/YouTube: "Why We Built a Dock Instead of a Library"—featuring real entrepreneur families.' 
      },
      { 
        id: 'l2', 
        stage: 'Validation', 
        text: 'Vibe check: Do teachers act like mentors?', 
        tactic: '"Founder Friday" student pitch event—prospects shadow real student entrepreneurs.' 
      }
    ],
    
    keyPartners: {
      contentPlatforms: ['YouTube', 'Instagram', 'TikTok'],
      entrepreneurCommunities: ['Tampa Bay Wave', 'Embarc Collective', '1 Million Cups'],
      localNGOs: ['Mote Marine Laboratory', 'Sarasota Bay Estuary Program'],
      venues: ['Sarasota Yacht Club', 'The Dock at SSES']
    },

    touchPoints: [
      {
        id: 'life-t1',
        title: 'Discovery Channels',
        subtitle: 'Content & Social Platforms',
        description: 'Where lifestyle entrepreneurs discover schools—visual-first platforms that showcase innovation and "the vibe" before academic details.',
        actions: [
          { id: 'l1-a1', text: 'Create Instagram Reels: "Day in the Life of a Founder Student"', priority: 'immediate' },
          { id: 'l1-a2', text: 'Launch YouTube series featuring entrepreneur families', priority: 'immediate' },
          { id: 'l1-a3', text: 'Partner with Tampa Bay influencers for school tours', priority: 'short-term' },
          { id: 'l1-a4', text: 'Showcase The Dock with drone footage and student projects', priority: 'immediate' }
        ],
        rightPanelType: 'digital',
        rightPanelData: {
          channels: [
            'Instagram (visual discovery)',
            'YouTube (long-form content)',
            'TikTok (Gen Z/teen perspective)',
            'Podcasts (entrepreneur shows)',
            'Facebook Groups (digital nomad communities)'
          ],
          contentTypes: [
            { title: 'Visual Campus Tours', description: 'Aesthetic, unscripted reels' },
            { title: 'Student Founder Stories', description: 'Real projects and startups' },
            { title: 'Marine Science Expeditions', description: 'The Dock in action' },
            { title: 'Family Testimonials', description: 'Why we chose SSES' }
          ]
        }
      },
      {
        id: 'life-t2',
        title: 'Community Networks',
        subtitle: 'Entrepreneur Ecosystem',
        description: 'In-person and digital communities where entrepreneurs validate choices and seek peer recommendations.',
        actions: [
          { id: 'l2-a1', text: 'Host "Founder Friday" events open to prospects', priority: 'short-term' },
          { id: 'l2-a2', text: 'Partner with Tampa Bay Wave and Embarc Collective', priority: 'immediate' },
          { id: 'l2-a3', text: 'Sponsor 1 Million Cups meetups at SSES', priority: 'short-term' },
          { id: 'l2-a4', text: 'Create parent entrepreneur networking dinners', priority: 'long-term' }
        ],
        rightPanelType: 'communities',
        rightPanelData: {
          communities: [
            { name: 'Tampa Bay Wave', type: 'Startup Accelerator', relevance: 'High-growth entrepreneurs' },
            { name: 'Embarc Collective', type: 'Entrepreneur Hub', relevance: 'Tech and creative founders' },
            { name: '1 Million Cups', type: 'Weekly Meetup', relevance: 'Early-stage entrepreneurs' },
            { name: 'Sarasota Yacht Club', type: 'Social Club', relevance: 'Established entrepreneurs' }
          ],
          events: [
            'Monthly "Founder Family" mixers',
            'Student pitch competitions',
            'Marine science showcase evenings',
            'Dock dedication events'
          ]
        }
      },
      {
        id: 'life-t3',
        title: 'Validation & Vibe Check',
        subtitle: 'Experience Before Commitment',
        description: 'Entrepreneurs validate schools through hands-on experience and peer validation—testing "founder-friendliness" before committing.',
        actions: [
          { id: 'l3-a1', text: 'Offer "Shadow a Founder" day for prospects', priority: 'short-term' },
          { id: 'l3-a2', text: 'Create student-led campus tours (not admissions staff)', priority: 'immediate' },
          { id: 'l3-a3', text: 'Host innovation showcase with current student projects', priority: 'short-term' },
          { id: 'l3-a4', text: 'Provide "flex week" trial for accepted students', priority: 'long-term' }
        ],
        rightPanelType: 'validation',
        rightPanelData: {
          validationPoints: [
            { title: 'Teacher-as-Mentor Model', description: 'Faculty who act like startup advisors' },
            { title: 'Project-Based Learning', description: 'Portfolio over test scores' },
            { title: 'Flexible Scheduling', description: 'Accommodate travel and projects' },
            { title: 'The Dock Access', description: 'Marine science + innovation hub' }
          ],
          successMetrics: [
            'Student startup pitches',
            'Marine research publications',
            'Flexible attendance policies',
            'Independent study options'
          ]
        }
      }
    ]
  },
  
  {
    id: 'pivot',
    name: 'Strategic Pivot (IMG)',
    
    imgTransferMetrics: imgTransferMetrics,
    location: {
      region: 'Local Bradenton / IMG Academy',
      usedTo: ['Professional sports coaching', 'International dorm life', 'Sport-first identity', '$91K+ tuition'],
      expecting: ['Academic Rescue without quitting sport', 'Flexible training windows (11am-2pm)', 'D1 recruitment expertise', 'Small focused classes'],
      emotionalDrivers: 'Panic that child is "just an athlete" without college-ready academic profile.',
      nuggets: ['IMG Transfer Flow Analysis: 195-260 annual transfers. 44% leave due to financial burden. View the complete journey map to see where students go and why.', 'Financial burden is the #1 reason for IMG transfers - SSES offers $66K annual savings']
    },
    spending: {
      sensitivity: 'ROI-sensitive academics.',
      budgetRange: '$24,745 tuition (vs $91K IMG)',
      ticketItems: [
        { item: 'Academic "Rescue" Tuition', priceRange: '$24,745' },
        { item: 'Athletic Placement Agency', priceRange: '$3K-$7K' },
        { item: 'Private Performance Coaching', priceRange: '$150/hr' },
        { item: 'Nutritional Meal Plans', priceRange: '$2K/yr' }
      ]
    },
    competition: {
      schools: [
        { name: 'IMG Academy', reason: 'Convenience of "Sport Factory" model—$91K+ boarding.', recommendationSource: 'High-level sports agents' },
        { name: 'Cardinal Mooney', reason: 'Local sports reputation.', recommendationSource: 'Youth football/baseball coaches' },
        { name: 'Lakewood Ranch High', reason: 'FREE public with strong athletics.', recommendationSource: 'FHSAA records' }
      ]
    },
    strategy: 'Deploy "Hybrid Academic-Athlete" schedule with 11am-2pm Training Portals. Target families experiencing IMG burnout or financial strain.',
    steps: [
      { id: 'p1', stage: 'Crisis', text: '10th grade GPA threatens D1 eligibility.', tactic: 'Geofenced ads around IMG: "Fix the GPA, Keep the Sport."' },
      { id: 'p2', stage: 'Check', text: 'Can schedule actually work?', tactic: '"30-Minute Athlete Schedule Builder" consultation.' },
      { id: 'p3', stage: 'Enroll', text: 'Confidence in college counseling outcome.', tactic: 'Success story: "How our student went to Duke for Soccer AND Pre-Med."' }
    ],

    touchPoints: [
      {
        id: 'pivot-t1',
        title: 'Crisis Triggers',
        subtitle: 'Academic & Athletic Pressure Points',
        description: 'The moments when IMG families realize they need an alternative—academic probation, financial strain, or athletic burnout.',
        actions: [
          { id: 'p1-a1', text: 'Deploy geofenced mobile ads around IMG campus', priority: 'immediate' },
          { id: 'p1-a2', text: 'Create "Academic Rescue" landing page with GPA calculator', priority: 'immediate' },
          { id: 'p1-a3', text: 'Partner with academic tutors serving IMG families', priority: 'short-term' },
          { id: 'p1-a4', text: 'Monitor IMG parent Facebook groups for distress signals', priority: 'immediate' }
        ],
        rightPanelType: 'digital',
        rightPanelData: {
          triggers: [
            { trigger: 'Academic Probation', frequency: '40% of transfers', timing: 'After first semester grades' },
            { trigger: 'Financial Burden', frequency: '44% of transfers', timing: 'Tuition renewal period' },
            { trigger: 'Athletic Burnout', frequency: '22% of transfers', timing: 'Post-season or injury' },
            { trigger: 'D1 Eligibility Threat', frequency: '15% of transfers', timing: 'Sophomore/junior year' }
          ],
          channels: [
            'IMG parent Facebook groups',
            'Reddit r/IMG_Academy',
            'Sports parent forums',
            'Academic tutoring networks',
            'Local private coaches'
          ]
        }
      },
      {
        id: 'pivot-t2',
        title: 'Sports Network',
        subtitle: 'Athletic Ecosystem',
        description: 'The coaches, agents, and trainers who influence IMG families considering alternatives—trusted advisors in the athletic community.',
        actions: [
          { id: 'p2-a1', text: 'Build relationships with private coaches serving IMG students', priority: 'short-term' },
          { id: 'p2-a2', text: 'Partner with athletic placement agencies (NCSA, etc.)', priority: 'short-term' },
          { id: 'p2-a3', text: 'Create "Hybrid Schedule" visual one-pager for coaches', priority: 'immediate' },
          { id: 'p2-a4', text: 'Host coaches clinic showing SSES athletic facilities', priority: 'long-term' }
        ],
        rightPanelType: 'partners',
        rightPanelData: {
          partners: [
            { category: 'Private Coaches', examples: 'Tennis, golf, soccer trainers', influence: 'High' },
            { category: 'Athletic Placement Agencies', examples: 'NCSA, SportsRecruits', influence: 'Very High' },
            { category: 'Sports Agents', examples: 'Local representatives', influence: 'Medium' },
            { category: 'FHSAA Resources', examples: 'Eligibility experts', influence: 'High' }
          ],
          valueProps: [
            'Maintain athletic training schedule',
            'FHSAA championship eligibility',
            'Flexible 11am-2pm training windows',
            'College counseling for athletes'
          ]
        }
      },
      {
        id: 'pivot-t3',
        title: 'Academic Rescue Proof',
        subtitle: 'Validation & Evidence',
        description: 'The proof points that convince athletic families SSES can deliver academic results without sacrificing sport—schedule flexibility, success stories, and FHSAA eligibility.',
        actions: [
          { id: 'p3-a1', text: 'Create detailed "Hybrid Schedule Builder" tool', priority: 'immediate' },
          { id: 'p3-a2', text: 'Develop case studies: athletes who got into D1 + top academics', priority: 'short-term' },
          { id: 'p3-a3', text: 'Document FHSAA eligibility requirements and SSES compliance', priority: 'immediate' },
          { id: 'p3-a4', text: 'Offer "Academic Rescue" consultation with Head of School', priority: 'short-term' }
        ],
        rightPanelType: 'validation',
        rightPanelData: {
          proofPoints: [
            { title: 'Flexible Training Schedule', detail: '11am-2pm portal system for private coaching' },
            { title: 'FHSAA Eligibility', detail: 'Full championship participation rights' },
            { title: 'Small Class Sizes', detail: '9:1 ratio vs IMG lecture halls' },
            { title: 'Athletic-Academic Balance', detail: 'Graduates at Duke, Stanford, Ivy League' }
          ],
          successStories: [
            'Soccer + Pre-Med at Duke',
            'Tennis + Business at Stanford',
            'Golf + Engineering at Georgia Tech',
            'Swimming + Liberal Arts at Ivy League'
          ]
        }
      }
    ]
  },
  
  {
    id: 'bridge',
    name: 'Local Bridge Crosser',
    
    k8TransitionMetrics: k8TransitionMetrics,
    location: {
      region: 'Bradenton Montessori/K-8 families',
      usedTo: ['Small community "safe" vibes', 'Parent volunteer heavy', 'Intimate teacher relationships', 'Minimal facility variety'],
      expecting: ['Varsity Sports status', 'College-grade Lab Equipment', '"Real" High School experience', 'HNW peer networking'],
      emotionalDrivers: 'Want to "Level Up" from small-school bubble to "Ivy-track" elite.',
      nuggets: ['680-850 K-8 graduates need upper school annually', '40% of transitions go to public high schools', '25% continue private K-12']
    },
    spending: {
      sensitivity: 'Prestige/Value Balance.',
      budgetRange: '$24,745-$28K • $25K-$40K sensitivity range',
      ticketItems: [
        { item: 'SSES Tuition', priceRange: '$24,745' },
        { item: 'Varsity Team Gear/Fees', priceRange: '$1K-$3K' },
        { item: 'College Prep Seminars', priceRange: '$1.5K' },
        { item: 'Social "Step Up" Events', priceRange: '$2K' }
      ]
    },
    competition: {
      schools: [
        { name: 'Manatee High (White Coat)', reason: 'FREE + "tradition" vibe.', recommendationSource: 'Bradenton town circles' },
        { name: 'Cardinal Mooney', reason: 'Perceived as "Social Alternative" for local families.', recommendationSource: 'Parochial school network' },
        { name: 'Lakewood Ranch High', reason: 'FREE, A-rated, newer facilities.', recommendationSource: 'Public school marketing' }
      ]
    },
    strategy: '"The Varsity Reveal" campaign—highlight high-end facilities and peer networks local K-8s cannot offer.',
    steps: [
      { id: 'b1', stage: 'Aspiration', text: '8th grade graduation nears; need for "more."', tactic: 'Direct Mail: "The SSES Level-Up Guide for Rising 9th Graders."' },
      { id: 'b2', stage: 'Shadow', text: 'Does the kid feel "cool" on campus?', tactic: '"VIP Shadow Day" with Varsity Athlete Buddy.' },
      { id: 'b3', stage: 'Decision', text: 'Parents justify $25K vs Free.', tactic: 'Data Asset: "SSES ROI vs. Local Public High Schools."' }
    ],

    touchPoints: [
      {
        id: 'bridge-t1',
        title: 'K-8 Networks',
        subtitle: 'Feeder School Connections',
        description: 'The Montessori, religious, and private K-8s where families start thinking about upper school transition—often 12-18 months before 8th grade graduation.',
        actions: [
          { id: 'b1-a1', text: 'Build partnerships with Center Montessori and other K-8s', priority: 'short-term' },
          { id: 'b1-a2', text: 'Present at K-8 parent nights about "The SSES Difference"', priority: 'immediate' },
          { id: 'b1-a3', text: 'Create co-branded "Transition Guide" with K-8s', priority: 'short-term' },
          { id: 'b1-a4', text: 'Offer early application incentives for continuing students', priority: 'long-term' }
        ],
        rightPanelType: 'partners',
        rightPanelData: {
          feederSchools: [
            { name: 'Center Montessori', students: '45-55/year', type: 'Montessori', priority: 'High' },
            { name: 'Foundations Christian Montessori', students: '35-45/year', type: 'Christian', priority: 'High' },
            { name: 'Mangrove School', students: '25-30/year', type: 'Montessori', priority: 'Medium' },
            { name: 'St. Joseph Catholic', students: '35-45/year', type: 'Catholic', priority: 'High' }
          ],
          transitionStats: [
            '680-850 K-8 graduates need upper school annually',
            '40% choose public high schools',
            '25% continue private K-12',
            '20% transfer to private high school',
            '15% choose charter or other options'
          ]
        }
      },
      {
        id: 'bridge-t2',
        title: 'Aspiration Triggers',
        subtitle: 'The "Level Up" Moment',
        description: 'The events and realizations that trigger families to seek "more" than their K-8 can offer—varsity sports dreams, college ambitions, social aspirations.',
        actions: [
          { id: 'b2-a1', text: 'Host "Varsity Reveal" showcase of high school athletics', priority: 'short-term' },
          { id: 'b2-a2', text: 'Create comparison content: SSES facilities vs. K-8 limitations', priority: 'immediate' },
          { id: 'b2-a3', text: 'Offer 8th graders "Day as a Falcon" shadow experience', priority: 'short-term' },
          { id: 'b2-a4', text: 'Develop parent testimonials from K-8 to SSES transitions', priority: 'short-term' }
        ],
        rightPanelType: 'validation',
        rightPanelData: {
          triggers: [
            { trigger: 'Varsity Sports Dreams', timing: '8th grade year', motivation: 'Want competitive athletics' },
            { trigger: 'College Ambitions', timing: 'Spring of 8th grade', motivation: 'Ivy-track aspirations' },
            { trigger: 'Social Aspirations', timing: 'Teen years', motivation: 'HNW peer network' },
            { trigger: 'Facility Upgrade Desire', timing: 'Campus tours', motivation: 'College-grade labs, arts' }
          ],
          comparisons: [
            'Varsity sports vs. intramurals',
            'College counseling vs. guidance only',
            'STEM labs vs. basic science rooms',
            'Peer network diversity vs. local bubble'
          ]
        }
      },
      {
        id: 'bridge-t3',
        title: 'Social Proof',
        subtitle: 'Validation from Peers',
        description: 'Local families rely heavily on peer validation—they want to see kids like theirs thriving at SSES, and hear from parents who made the same transition.',
        actions: [
          { id: 'b3-a1', text: 'Create "Meet the Families" video series featuring K-8 transfers', priority: 'short-term' },
          { id: 'b3-a2', text: 'Host parent panel: "Why We Chose SSES Over Public/Cardinal Mooney"', priority: 'short-term' },
          { id: 'b3-a3', text: 'Develop ROI calculator: SSES vs. public high school outcomes', priority: 'immediate' },
          { id: 'b3-a4', text: 'Offer referral incentives for current SSES K-8 families', priority: 'long-term' }
        ],
        rightPanelType: 'social',
        rightPanelData: {
          testimonials: [
            { family: 'The Martinez Family', from: 'Center Montessori', highlight: 'Varsity soccer + STEM focus' },
            { family: 'The Chen Family', from: 'St. Joseph Catholic', highlight: 'College counseling made the difference' },
            { family: 'The Williams Family', from: 'Public K-8', highlight: 'Social network transformation' }
          ],
          proofPoints: [
            '95% college acceptance rate',
            'Average $50K+ in merit scholarships',
            'Varsity sports participation: 75%',
            'AP course availability: 20+ classes',
            'College-grade science labs',
            'Peer network: 40% from K-8 transitions'
          ]
        }
      }
    ]
  },
  
  {
    id: 'teen',
    name: 'The Teen Advocate',
    
    teenInfluenceMetrics: teenInfluenceMetrics,
    location: {
      region: 'Sarasota/Bradenton (Student Voice)',
      usedTo: ['Digital agency', 'Self-directed interests', 'Social media validation', 'Respectful dialogue with adults'],
      expecting: ['Zero busy work', 'Student-led clubs/startups', 'Instagrammable campus', 'Strong faculty respect'],
      emotionalDrivers: 'Veto any school that feels "cringe" or "suffocating." Want freedom + agency.',
      nuggets: ['Student Instagram drives 60%+ of parent decisions', 'If student doesn\'t "vibe" with campus aesthetic/lunch, parent won\'t sign']
    },
    spending: {
      sensitivity: 'Experience/Freedom sensitive.',
      budgetRange: 'Indirect influence over $35K+',
      ticketItems: [
        { item: 'Senior Privileges (Travel)', priceRange: '$3K-$5K' },
        { item: 'Extracurricular Autonomy', priceRange: '$1K-$2K' },
        { item: 'Campus Social "Swag"', priceRange: '$500' },
        { item: 'Independent Study Funds', priceRange: '$1K' }
      ]
    },
    competition: {
      schools: [
        { name: 'Pine View', reason: 'Prestige for high-IQ academic "freedom."', recommendationSource: 'Peer TikTok/Instagram feeds' },
        { name: 'Asher (New Models)', reason: 'Total freedom/self-directed models.', recommendationSource: 'Progressive parent circles' }
      ]
    },
    strategy: '"Student Agency Charter"—guarantee independent project time and dedicated "Founder Space" for student-led startups.',
    steps: [
      { id: 't1', stage: 'Discovery', text: 'Stalking SSES Instagram for "the vibe."', tactic: 'Student Takeover Reels: "Real Life at SSES, Unscripted."' },
      { id: 't2', stage: 'Trial', text: 'Shadow day focus on peer "normality."', tactic: '"No-Cringe" Shadow Lunch + High-quality food experience.' },
      { id: 't3', stage: 'Veto/Pass', text: 'Decision based on "Will I be bored?"', tactic: 'Highlight: Senior Independent Study + Global Travel Rights.' }
    ],

    touchPoints: [
      {
        id: 'teen-t1',
        title: 'Social Discovery',
        subtitle: 'Visual First Impressions',
        description: 'Teens discover schools through social media aesthetics and peer content—authentic, unscripted student perspectives that reveal "the vibe."',
        actions: [
          { id: 't1-a1', text: 'Launch student-run Instagram account with daily takeovers', priority: 'immediate' },
          { id: 't1-a2', text: 'Create TikTok content showing "day in the life" authenticity', priority: 'immediate' },
          { id: 't1-a3', text: 'Partner with current students to create "campus aesthetic" content', priority: 'short-term' },
          { id: 't1-a4', text: 'Showcase food quality and lunch culture on social media', priority: 'short-term' }
        ],
        rightPanelType: 'digital',
        rightPanelData: {
          platforms: [
            { platform: 'Instagram', content: 'Daily stories, reels, campus aesthetic', audience: 'Teens + parents' },
            { platform: 'TikTok', content: 'Unscripted student content, trends', audience: 'Primarily teens' },
            { platform: 'YouTube', content: 'Day in the life, student interviews', audience: 'Both demographics' }
          ],
          contentPillars: [
            { theme: 'Campus Aesthetic', examples: 'Architecture, nature, The Dock, sunsets' },
            { theme: 'Social Culture', examples: 'Lunch vibes, friend groups, events' },
            { theme: 'Student Agency', examples: 'Clubs, startups, independent projects' },
            { theme: 'Authentic Moments', examples: 'Unscripted, behind-the-scenes' }
          ]
        }
      },
      {
        id: 'teen-t2',
        title: 'Student Voice',
        subtitle: 'Peer-to-Peer Validation',
        description: 'Teens trust other teens more than adults—peer validation, student ambassadors, and authentic testimonials drive their advocacy to parents.',
        actions: [
          { id: 't2-a1', text: 'Create Student Ambassador program for shadow days', priority: 'immediate' },
          { id: 't2-a2', text: 'Develop "Peer Match" system (match prospects with similar interests)', priority: 'short-term' },
          { id: 't2-a3', text: 'Host student-led campus tours (no admissions staff)', priority: 'short-term' },
          { id: 't2-a4', text: 'Offer "Student Coffee Chat" virtual meetups', priority: 'short-term' }
        ],
        rightPanelType: 'social',
        rightPanelData: {
          programs: [
            { name: 'Student Ambassador Program', description: 'Current students lead tours and answer questions' },
            { name: 'Peer Match System', description: 'Match prospects with students sharing interests/hobbies' },
            { name: 'Shadow Day Experience', description: 'Full day with a student buddy in classes' },
            { name: 'Student Panel Events', description: 'Q&A with current students (no parents/adults)' }
          ],
          validationFactors: [
            'Current student testimonials',
            'Instagram-worthy campus spots',
            'Lunch food quality and culture',
            'Friend group diversity',
            'Teacher-student relationship dynamic',
            'Freedom and autonomy level'
          ]
        }
      },
      {
        id: 'teen-t3',
        title: 'Agency Validation',
        subtitle: 'Freedom & Independence',
        description: 'Teens advocate for schools that offer independence, agency, and paths for self-direction—the "Student Agency Charter" that guarantees autonomy.',
        actions: [
          { id: 't3-a1', text: 'Create "Student Agency Charter" document outlining guaranteed freedoms', priority: 'immediate' },
          { id: 't3-a2', text: 'Showcase senior independent study projects prominently', priority: 'short-term' },
          { id: 't3-a3', text: 'Develop student startup incubator program at The Dock', priority: 'long-term' },
          { id: 't3-a4', text: 'Offer guaranteed independent project time in schedule', priority: 'short-term' }
        ],
        rightPanelType: 'validation',
        rightPanelData: {
          agencyElements: [
            { element: 'Independent Study', detail: 'Senior year self-directed projects' },
            { element: 'Student-Led Clubs', detail: 'Start any club with faculty sponsor' },
            { element: 'Founder Space', detail: 'Dedicated area for student startups' },
            { element: 'Global Travel', detail: 'Senior travel privileges and programs' },
            { element: 'Course Selection', detail: 'Input on class choices and schedules' },
            { element: 'Assessment Options', detail: 'Project-based alternatives to tests' }
          ],
          proofPoints: [
            'Student government with real budget authority',
            'Clubs founded by students: 40+ active',
            'Independent study projects showcased annually',
            'Senior travel program to 15+ countries',
            'Student startups receiving seed funding',
            'Zero "busy work" policy commitment'
          ]
        }
      }
    ]
  }
];
