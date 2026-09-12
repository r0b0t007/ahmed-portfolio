# OFFER_AUDIT.md — ahmedchioua.com, Hormozi rewrite (branch `feat/hormozi-offer-copy`)

Audited with the `audit-offer` skill (alexsmedile/hormozi-skills) against the rendered text of
`dist/index.html`, 2026-09-12. Scores are 1–10 (1–3 critical, 4–6 needs work, 7–8 solid, 9–10 strong).

Standing constraints the audit respects: no client results, no testimonials, no revenue claims
(there are none to make); Bell/BMW/Bayer are "delivered for", never "hired me".

## 1. Offer Summary
- **Who:** non-technical founders who need a site or SaaS launched, not "in progress".
- **Promise:** live in weeks, fixed price, launch date in writing, working link on day 7.
- **How:** scope (free) → build with AI in the loop + weekly architecture review → ship on the
  client's own infrastructure → hand-off stack (repo, infra, docs, 30 days of fixes).
- **Price:** fixed, premium, quoted in the scope call. No number on the page.

> This offer helps non-technical founders get a launch-ready website or SaaS they own, in weeks, at
> a fixed price, using AI-augmented building held to enterprise delivery standards.

## 2. Overall Diagnosis
**Strengths**
- Hero follows the hook formula exactly: WHO (founders) + RESULT (live) + SPEED (weeks / day 7) +
  OBJECTION REMOVAL (fixed price, date in writing).
- Time delay is the best-tuned variable on the page: day 7, weekly, dated launch.
- Proof is honest and checkable in two minutes — a stronger position than unsourced logos.
- Every major objection is answered before the CTA: price, AI quality, no client work, lock-in,
  location, post-launch breakage.

**Weaknesses**
- "Date in writing" has no stated consequence, so it is a promise, not a guarantee.
- The page says "Premium" in the pricing header and "reduced founding-client rates" in the FAQ.
- The value stack has no anchoring: nothing tells the reader what the stack is worth.
- Two copy lines repeat verbatim across sections.

## 3. Value Equation Analysis

### Dream Outcome — 7/10
- **Issues:** the outcome is "launched and owned", which is the honest ceiling given no results to
  cite. The page never paints the after-state in the founder's own life (demoing to investors,
  first users signing in).
- **Fixes:** one line in the hero lead or Process ship step naming the after-state without a
  result claim, e.g. "the link you send investors, not a deck about it". Optional.

### Perceived Likelihood — 7/10
- **Issues:** no testimonials (structural, accepted). "Insurance policy on your capital" is a strong
  claim resting on credentials rather than a mechanism. The Benefits section says what the
  standards are but not how a founder would notice them failing.
- **Fixes:** keep. The Proof section carries this variable; the three standards cards + open source
  are the mechanism. Consider linking "Run it yourself" to the PageSpeed Insights URL for this
  domain so the check is one click.

### Time Delay — 9/10
- **Issues:** "7 days to your first working link" vs the Scope step "Free · 1 week" — a reader can
  read day 7 as counted from first contact and feel misled when it's from kickoff.
- **Fixes:** say "from kickoff" once, in the stat label or the Build step. (Applied.)

### Effort & Sacrifice — 8/10
- **Issues:** hand-off stack is unbundled and concrete. Remaining effort is the founder's weekly
  feedback, which is framed as a benefit, correctly. The stack names four infra vendors; a
  non-technical reader may read that as a decision they have to make.
- **Fixes:** the FAQ or scope call should say "I pick the stack, you own the accounts".

## 4. Market Fit
- **Issues:** audience is specific. The Services footnote (rescue, AI automation) slightly dilutes
  the "founder launch" frame.
- **Fixes:** none needed; the footnote is deliberately secondary.

## 5. Offer Structure
- **Issues:** clean 10-section flow. The landing-page skill wants a CTA immediately after the value
  stack; here the stack (04) is followed by Proof (05) and the next CTA is in Pricing (06).
- **Fixes:** add a small CTA link under the hand-off promise line. Optional.

## 6. Value Stack
- **Issues:** the stack lists components and outcomes but attaches no value. Hormozi's stack ends
  in "total value vs price"; this page cannot, because there is no price on the page.
- **Fixes:** if Ahmed is willing, anchor each stack item to what it costs bought separately (agency
  hand-off docs, a DevOps setup, a 30-day support retainer). Real numbers only — nothing invented.

## 7. Pricing — 6/10
- **Issues:** (a) "Fixed. Premium. Quoted once." and the FAQ's "reduced founding-client rates" are
  in direct tension. (b) No anchor of any kind. (c) The price objection is answered well.
- **Fixes:** choose one. Either drop founding rates everywhere, or reframe them as a trade the
  founder earns ("a case study and a reference buy you the founding rate"), not a discount.

## 8. Messaging — 8/10
- **Issues:** "AI in the loop is why … The weekly review is why it holds" appears twice verbatim
  (Benefits card 01, Process step 02). "Fixed price" / "date in writing" appear ~7 times each —
  deliberate, but the hero, stat row and footer all carry the same three words.
- **Fixes:** dedupe the "why it holds" line (applied). Leave the repetition of the promise.

## 9. Objections & Trust — 6/10
- **Handled:** price, AI quality, no client work, lock-in, timezone, "what if it breaks after
  launch" (30 days).
- **Not handled:** "what happens if the date slips?" (no remedy), "what happens after day 30?"
  (no path named), "what if the day-7 link isn't what I meant?" (implied by "adjust while changes
  are cheap", not stated).
- **Fixes:** three FAQ entries. The first needs Ahmed's decision on the remedy.

## 10. Top Priority Fixes
1. **Give the date a consequence.** Decide what happens when a launch date slips (a stated discount,
   a free week of work, or the balance waived). Until then, keep "in writing"; never say "guaranteed".
2. **Resolve premium vs founding rates.** One story, page-wide (FAQ, llms.txt, scope call).
3. **Add the three missing FAQ answers:** slipped date, after day 30, day-7 disagreement.

## 11. Quick Wins
- Dedupe the "why it holds" line. — applied
- "7 days from kickoff" in the stat label. — applied
- CTA link under the hand-off promise line. — optional
- "Run it yourself" → link to PageSpeed Insights for ahmedchioua.com. — optional
