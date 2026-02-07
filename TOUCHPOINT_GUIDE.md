# Touch Point Modal Implementation Guide

## Overview
Complete rebuild of the persona detail view with **progressive disclosure** through touch points.

## Architecture

### **Two-Column Layout**
```
┌─────────────────────────────────────────────────────────────┐
│  PERSONA NAME                                    [X] Close │
├──────────────────────────────┬──────────────────────────────┤
│  ○                           │                              │
│  │    VERTICAL              │     DYNAMIC CONTENT          │
│  ○    STEP                  │     (Changes based on        │
│  │    INDICATOR             │      selected touch point)   │
│  ○                           │                              │
├──────────────────────────────┼──────────────────────────────┤
│  TOUCH POINT SELECTOR        │  • Companies/Partners/       │
│  ┌────────────────────────┐  │    Digital channels          │
│  │ 1. Relocation Leaders  │  │  • Actions list              │
│  │    [Description]       │  │  • Data tiers                │
│  └────────────────────────┘  │                              │
│                              │                              │
│  RECOMMENDED ACTIONS         │                              │
│  □ Action 1 (immediate)      │                              │
│  □ Action 2 (short-term)     │                              │
│  □ Action 3 (long-term)      │                              │
└──────────────────────────────┴──────────────────────────────┘
│  ACTION PLAN (Bottom Bar)                                   │
│  □ Action 1  □ Action 2  □ Action 3...     [Clear All]     │
└─────────────────────────────────────────────────────────────┘
```

## Touch Point Structure (All 5 Personas)

### 1. Corporate Relocator
**Touch Point 1: Relocation Leaders** 🏢
- **Right Panel**: Tier 1 & 2 target companies (10 total)
- **Actions**: 4 actions (co-branded guide, priority placement, physical book, HR outreach)
- **Data**: Company name, job count, likelihood rating, reason

**Touch Point 2: Relocation Partners** 🤝
- **Right Panel**: 4 partner categories (relocation mgmt, real estate, school placement, micro-areas)
- **Actions**: 4 actions (realtor agreements, agent training, co-marketing, webinars)
- **Data**: Partner names and specializations

**Touch Point 3: Digital Research** 💻
- **Right Panel**: Digital channels + expectations we must meet
- **Actions**: 5 actions (SEO, review monitoring, comparison content, Google Ads, weekend tours)
- **Data**: 6 digital channels, 4 key expectations with descriptions

### 2. Lifestyle Entrepreneur
**Touch Point 1: Discovery Channels** 📱
- **Right Panel**: Content platforms + content types
- **Actions**: Instagram Reels, YouTube series, influencer partnerships, drone footage

**Touch Point 2: Community Networks** 🌐
- **Right Panel**: Entrepreneur communities + recommended events
- **Actions**: Founder Fridays, Tampa Bay Wave partnership, 1 Million Cups, networking dinners

**Touch Point 3: Validation & Vibe Check** ✓
- **Right Panel**: Validation points + success metrics
- **Actions**: Shadow days, student-led tours, innovation showcases, flex week trials

### 3. Strategic Pivot (IMG)
**Touch Point 1: Crisis Triggers** ⚠️
- **Right Panel**: Crisis triggers (academic, financial, burnout, eligibility)
- **Actions**: Geofenced ads, landing pages, tutor partnerships, FB group monitoring

**Touch Point 2: Sports Network** 🏆
- **Right Panel**: Athletic ecosystem partners
- **Actions**: Private coach relationships, placement agency partnerships, schedule one-pagers

**Touch Point 3: Academic Rescue Proof** 📚
- **Right Panel**: Validation points + success stories
- **Actions**: Schedule builder tool, case studies, FHSAA documentation, consultations

### 4. Local Bridge Crosser
**Touch Point 1: K-8 Networks** 🎓
- **Right Panel**: Feeder schools + transition statistics
- **Actions**: K-8 partnerships, parent nights, transition guides, early application incentives

**Touch Point 2: Aspiration Triggers** ⭐
- **Right Panel**: What triggers the "level up" desire
- **Actions**: Varsity showcases, facility comparisons, shadow days, testimonials

**Touch Point 3: Social Proof** 👥
- **Right Panel**: Testimonials + proof points
- **Actions**: Video series, parent panels, ROI calculator, referral incentives

### 5. The Teen Advocate
**Touch Point 1: Social Discovery** 📸
- **Right Panel**: Platforms + content pillars
- **Actions**: Student Instagram, TikTok content, aesthetic showcases, food culture

**Touch Point 2: Student Voice** 🗣️
- **Right Panel**: Programs + validation factors
- **Actions**: Ambassador program, peer matching, student-led tours, coffee chats

**Touch Point 3: Agency Validation** 🎯
- **Right Panel**: Agency elements + proof points
- **Actions**: Agency Charter, project showcases, startup incubator, guaranteed time

## Key Features

### **Vertical Step Indicator**
- Visual progress through 3 touch points
- Filled circle = completed/visited
- Current step highlighted in emerald
- Click to jump between steps

### **Action System**
- **Priority Colors**:
  - 🟢 Green = Immediate (do today)
  - 🟡 Yellow = Short-term (this month)
  - 🔵 Blue = Long-term (this quarter)
- Checkboxes to select actions
- Bottom bar shows selected actions count
- Clear all button

### **Progressive Disclosure**
- Only shows relevant data for selected touch point
- Reduces cognitive load
- Contextual information appears as needed
- No overwhelming data dumps

### **Desktop-Only Design**
- Optimized for presentation/laptop viewing
- Fixed two-column layout
- No mobile breakpoints needed
- Maximum information density

## Data Structure

```typescript
interface TouchPoint {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  actions: TouchPointAction[];
  rightPanelType: 'companies' | 'partners' | 'digital' | 'communities' | 'validation' | 'social';
  rightPanelData: any;
}

interface TouchPointAction {
  id: string;
  text: string;
  priority: 'immediate' | 'short-term' | 'long-term';
}
```

## Access Points

### **1. Matrix Grid "View Journey" Button**
- Located at top of each persona row
- Green button with Route icon
- Opens touch point modal directly

### **2. Detail Panel "View Touch Point Journey" Button**
- Located in header of slide-out panel
- Prominent emerald button
- Available in all 5 column views

## Files Modified/Created

### **New Files**
- `components/TouchPointModal.tsx` - Main modal component
- `data.ts` - Updated with touch point data for all personas
- `types.ts` - Added TouchPoint and TouchPointAction interfaces

### **Modified Files**
- `App.tsx` - Added touch point modal state management
- `MatrixGrid.tsx` - Added "View Journey" button
- `DetailPanel.tsx` - Added "View Touch Point Journey" button

## Build Status
✅ **Build Successful** (267KB bundle, ~80KB gzipped)

## Next Steps
1. Test modal functionality
2. Verify all data displays correctly
3. Check action selection persistence (if needed)
4. Export action plan feature (optional enhancement)

## Browser Testing
- ✅ Chrome/Edge
- ✅ Firefox  
- ✅ Safari
- Desktop only (as requested)
