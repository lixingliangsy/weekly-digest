export interface InputField {
  key: string
  label: string
  type: 'input' | 'textarea' | 'select'
  placeholder?: string
  options?: string[]
}

export const PRODUCT = {
  name: "WeekNote",
  slug: "weekly-digest",
  tagline: "Bullet notes to a weekly report",
  description: "Paste your raw week notes; get a clean status report - done, in progress, blocked, next. For founders updating advisors or just themselves.",
  toolTitle: "Write report",
  resultLabel: "Your report",
  ctaLabel: "Generate",
  features: [
  "Auto-bucket",
  "Done / WIP / Blocked",
  "Next steps",
  "Copy-ready"
],
  inputs: [
  {
    "key": "notes",
    "label": "Raw week notes (one per line)",
    "type": "textarea",
    "placeholder": "shipped the new pricing page\nworking on onboarding flow\nblocked on Stripe verification"
  },
  {
    "key": "audience",
    "label": "Audience",
    "type": "select",
    "options": [
      "Yourself",
      "Advisor",
      "Team"
    ]
  }
] as InputField[],
  systemPrompt: "You are an exec-assistant. Given raw week notes and an audience, sort them into Done / In Progress / Blocked / Next and write a tight status report appropriate for that audience.",
  pricing: [
  {
    "tier": "Free",
    "price": "$0",
    "desc": "Unlimited"
  },
  {
    "tier": "Pro",
    "price": "$9/mo",
    "desc": "Templates, save"
  },
  {
    "tier": "Team",
    "price": "$24/mo",
    "desc": "Shared, API"
  }
],
  mock: (inputs: Record<string, string>): string => {
  const notes = (inputs['notes'] || '').split(/\n/).map(s => s.trim()).filter(Boolean)
  const aud = inputs['audience'] || 'Yourself'
  const strip = (l) => l.replace(/^(done|did|finished|shipped|launched|merged|working on|in progress|doing|building|blocked|stuck|waiting|need)[:\s-]*/i, '')
  const pick = (re, label) => { const f = notes.filter(l => re.test(l)); return f.length ? label + ':\n' + f.map(l => '  - ' + strip(l)).join('\n') : '' }
  let out = 'WEEKLY REPORT (' + aud + ')\n\n'
  out += (pick(/(done|shipped|finished|launched|merged)/i, 'DONE') || 'DONE:\n  (none)') + '\n\n'
  out += (pick(/(in progress|working on|doing|building)/i, 'IN PROGRESS') || 'IN PROGRESS:\n  (none)') + '\n\n'
  out += (pick(/(blocked|stuck|waiting|need)/i, 'BLOCKED') || 'BLOCKED:\n  (none)') + '\n\n'
  out += 'NEXT:\n  (carry the IN PROGRESS items forward)'
  return out + '\n\n--- (Mock sort. Add OPENAI_API_KEY for blurry-line classification.)'
}
}
