# Contact Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a `/contact` page focused on wholesale and partnership inquiries that matches the site's existing premium editorial style.

**Architecture:** Add a new App Router page at `app/contact/page.tsx` and keep the implementation self-contained inside a dedicated contact page component. Reuse the existing font, spacing, color, and card language already established by the home page and footer rather than introducing a separate design system.

**Tech Stack:** Next.js App Router, React 19, Tailwind CSS v4, existing shared layout and assets

---

### Task 1: Define route and content structure

**Files:**
- Create: `app/contact/page.tsx`
- Create: `components/contact/ContactPage.tsx`

- [ ] **Step 1: Confirm the red state**

Run: `curl -I http://127.0.0.1:3000/contact`
Expected: `HTTP/1.1 404 Not Found`

- [ ] **Step 2: Add the route entry**

Create `app/contact/page.tsx` as a thin page wrapper that renders the contact page component.

- [ ] **Step 3: Add the contact page UI**

Create `components/contact/ContactPage.tsx` with:
- hero copy for wholesale inquiries
- an editorial image block using existing assets
- partner-benefit cards
- a styled, non-submitting inquiry form
- direct email/contact details

### Task 2: Verify behavior and quality

**Files:**
- Verify: `app/contact/page.tsx`
- Verify: `components/contact/ContactPage.tsx`

- [ ] **Step 1: Verify the green state**

Run: `curl -I http://127.0.0.1:3000/contact`
Expected: `HTTP/1.1 200 OK`

- [ ] **Step 2: Verify page content**

Run: `curl -s http://127.0.0.1:3000/contact | rg "WHOLESALE & PARTNERSHIPS|Let’s bring Blachh to your shelves|wholesale@blach.co"`
Expected: all key strings present

- [ ] **Step 3: Run static verification**

Run: `npm run lint`
Expected: no errors

- [ ] **Step 4: Run production verification**

Run: `npm run build`
Expected: successful Next.js production build
