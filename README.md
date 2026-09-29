# Samarth: Connecting Government Challenges with Startup Innovation

> **Maharashtra State Innovation Society (MSInS) | Government of Maharashtra**  
> An end-to-end digital innovation-procurement platform bridging the divide between government operational challenges and startup solutions through controlled funded pilots, milestone-based escrow funding, transparent validation, and Rule 149 GFR Innovation Exemption scale-up.

---

## 🏛️ Platform Overview

Government departments frequently face complex operational pain points (water leakage, traffic congestion, rural healthcare access, waste optimization, agricultural crop diseases) but lack a streamlined legal and operational framework to:
1. Formulate problem statements with measurable KPIs
2. Discover and screen innovative startups (TRL 6+)
3. Execute controlled, milestone-funded municipal field pilots
4. Validate results with third-party technical audits
5. Transition validated innovations directly into state procurement and multi-district scale-up

**Samarth** digitizes this complete 7-stage innovation lifecycle with full transparency and tamper-evident audit logging.

---

## 👥 Demo Roles & Accounts

The platform includes an interactive top navigation role-switcher with pre-configured demo credentials:

| Role | Demo Account | Focus & Capabilities |
| :--- | :--- | :--- |
| **Government Department** | `government@demo.com` | Create challenges (4-step wizard), automated eligibility screening, approve pilots, inspect milestones, release escrow tranches, issue validation decisions, initiate procurement. |
| **Startup (AquaSense)** | `startup@demo.com` | Discover challenges with explainable **Smart Match (94%)**, submit 5-step proposals, track pilots, submit milestone deliverables, view escrow disbursements. |
| **Expert Evaluator** | `expert@demo.com` | Score proposals against the standardized **6-Criterion Rubric** (Innovation 20%, Feasibility 20%, Impact 20%, Cost 15%, Scale 15%, Security 10%), provide technical feedback, recommend pilots. |
| **Platform Administrator** | `admin@demo.com` | Verify startups (DPIIT & MSME check), monitor departments, manage template library, inspect cryptographic audit trails. |
| **Public Visitor** | *Public Portal* | Explore landing page, platform metrics, active challenges marketplace, and GovTech templates. |

---

## 🔄 End-to-End 22-Step Demonstration Journey

1. **Login / Switch to Government Portal** (`government@demo.com`).
2. **Create Innovation Challenge**: Launch the 4-step wizard for *"Smart Water Leakage Detection & Non-Revenue Water Reduction"* (with baseline 48h response time, < 4h target, ₹35L budget).
3. **Publish Challenge**: The challenge is immediately broadcast to the live marketplace.
4. **Switch to Startup** (`startup@demo.com` - AquaSense Technologies).
5. **Discover Challenge**: Observe the **94% Smart Match** badge and click to inspect the explainable breakdown (Domain, Tech, Location, Capability, Eligibility).
6. **Submit Solution**: Fill the 5-step proposal wizard (*AquaHydro Acoustic Leak Hunter & Subsurface IoT Grid*).
7. **Switch to Government**: Open **Startup Solutions** to review the newly submitted proposal.
8. **Automated Eligibility Screening**: Verify the 6-point checklist (DPIIT, TRL 6+, Security, In-State registration).
9. **Approve Eligibility**: Move the proposal to Expert Technical Evaluation.
10. **Switch to Expert Evaluator** (`expert@demo.com` - Dr. Suresh Patil, COEP).
11. **Score Proposal**: Adjust the 6 weighted sliders (total 93/100) and click **"Recommend for Pilot Approval"**.
12. **Switch to Government**: Navigate to **Pilot Management**.
13. **Approve Pilot**: Sanction the pilot in the Pune Swargate & Kothrud 15 km testbed.
14. **Milestone Tracking**: View Milestone 1 (Sensor Deployment - ₹8L), Milestone 2 (Field Pilot - ₹12L), and Milestone 3 (Validation - ₹15L).
15. **Release Payment**: Approve Milestone 1 and click **"Release Payment Tranche"** (Payment status updates to *Paid*).
16. **KPI Analytics**: Compare Before vs After metrics (Response time dropped from 48h to 3.2h; Water loss reduced from 38% to 18.5%).
17. **Validation Decision**: Open **Validation Decisions**, review physical evidence and expert endorsements, click **"Proceed to Procurement"**, and confirm modal.
18. **Procurement Pathway**: Transition to the **Rule 149 GFR Innovation Exemption** pipeline (Compliance Check -> Agreement -> Procurement -> Deployment).
19. **Multi-District Scale-Up**: Open the **Maharashtra Municipal Corporation Expansion Grid** (Pune, Thane, Nashik, Nagpur, Chhatrapati Sambhajinagar) and sanction the multi-district rollout plan.
20. **Audit Trail**: Open **Audit & Transparency** to inspect the immutable cryptographic ledger logging every single actor, timestamp, and hash.

---

## 💻 Tech Stack & Architecture

- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS (Tailwind v3.4), Lucide React icons, Inter typography
- **State Management**: React Context (`AppContext.tsx`) with automatic `localStorage` synchronization across all 4 roles
- **Design System**: Government of Maharashtra / MSInS enterprise blue (`#026ec7`, `#074b84`, `#0d9488`), clean white cards, accessible contrast, responsive drawer & bottom navigation for mobile

---

## 🚀 Running Locally

```bash
# Clone or navigate to project directory
cd /Users/fazil/Desktop/136

# Install dependencies (if not already installed)
npm install

# Start Vite development server
npm run dev

# Open http://localhost:5173 in your browser
```

To build for production:
```bash
npm run build
npm run preview
```
