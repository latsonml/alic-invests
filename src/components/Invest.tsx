import { useCallback, useState, type FormEvent } from 'react'
import gsap from 'gsap'

const API_URL = import.meta.env.VITE_INVEST_API_URL || '/api/alic/invest-submit'

export default function Invest() {
  const [submitted, setSubmitted] = useState(false)
  const [submittedName, setSubmittedName] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = useCallback(async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    if (!form.checkValidity()) {
      form.reportValidity()
      return
    }

    const data = new FormData(form)
    const payload = {
      name: String(data.get('name') || '').trim(),
      email: String(data.get('email') || '').trim(),
      amount: String(data.get('amount') || '').trim(),
    }

    setSubmitting(true)
    setError(null)

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const result = await res.json().catch(() => ({}))
      if (!res.ok) {
        throw new Error(result.error || 'Unable to submit your request. Please try again.')
      }

      setSubmittedName(payload.name)
      setSubmitted(true)
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const done = document.getElementById('form-done')
      if (done && !prefersReduced) {
        gsap.from(done, { opacity: 0, y: 16, duration: 0.6, ease: 'power2.out' })
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to submit your request. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }, [])

  return (
    <div className="panel invest" id="invest">
      <section>
        <div className="sec-head reveal">
          <span className="mono">06 — Your allocation</span>
          <h2>Start here</h2>
        </div>
        <div className="invest-grid">
          <div className="reveal">
            <h2 className="big">
              Put idle capital on a <em>weekly</em> schedule.
            </h2>
            <p className="invest-sub">
              Tell us a little about yourself and we&apos;ll send the offering documents, the current performance letter, and a calendar link for a call with the portfolio team. No commitment, no pressure.
            </p>
          </div>
          {!submitted && (
            <form id="invest-form" className="reveal" noValidate onSubmit={handleSubmit}>
              <div className="field">
                <label htmlFor="f-name">Full name</label>
                <input id="f-name" name="name" type="text" placeholder="Jordan Ellis" autoComplete="name" required />
              </div>
              <div className="field">
                <label htmlFor="f-email">Email</label>
                <input id="f-email" name="email" type="email" placeholder="you@example.com" autoComplete="email" required />
              </div>
              <div className="field">
                <label htmlFor="f-amount">Intended allocation</label>
                <select id="f-amount" name="amount" required defaultValue="">
                  <option value="" disabled>
                    Select a range
                  </option>
                  <option>$50K – $100K</option>
                  <option>$100K – $250K</option>
                  <option>$250K – $1M</option>
                  <option>$1M+</option>
                </select>
              </div>
              {error && (
                <p className="form-error" role="alert">
                  {error}
                </p>
              )}
              <button className="submit" type="submit" disabled={submitting}>
                {submitting ? 'Submitting…' : 'Request the offering documents'}
                <svg width="16" height="12" viewBox="0 0 16 12" fill="none" aria-hidden="true">
                  <path d="M10 1l5 5-5 5M15 6H1" stroke="currentColor" strokeWidth="1.6" />
                </svg>
              </button>
            </form>
          )}
          {submitted && (
            <div className="form-done" id="form-done" role="status" style={{ display: 'block' }}>
              <div className="form-done-icon" aria-hidden="true">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <path d="M7 14.5l4.5 4.5L21 9.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span className="mono">Request received</span>
              <h3 className="form-done-title">
                {submittedName ? `Thanks, ${submittedName.split(' ')[0]}.` : 'Thank you.'}
              </h3>
              <p className="form-done-lead">
                We&apos;ve received your request. Our team will reach out shortly with the offering documents, the current performance letter, and a link to schedule a call.
              </p>
              <span className="mono form-done-steps-label">Next Steps</span>
              <ul className="form-done-steps">
                <li>Check your inbox for a confirmation email</li>
                <li>Our portfolio team reviews every request personally</li>
                <li>No commitment required at this stage</li>
              </ul>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
