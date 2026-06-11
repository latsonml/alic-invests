const SAFEGUARDS = [
  {
    id: 'S-01',
    title: 'Diversification by design',
    description:
      'No single business represents more than a fraction of a percent of the book. Your return is the average of hundreds of performing positions, not the outcome of one.',
  },
  {
    id: 'S-02',
    title: 'First-loss reserve',
    description: 'Alic maintains a dedicated reserve that absorbs initial credit losses before investor capital is touched.',
  },
  {
    id: 'S-03',
    title: 'Live cash-flow monitoring',
    description:
      'We watch business bank accounts daily — not quarterly statements. Deterioration is visible in days, and workouts begin immediately.',
  },
  {
    id: 'S-04',
    title: 'Secured and short',
    description:
      'Positions are UCC-secured, average ~16 weeks, and sit at the front of the accounts receivable. Short duration means the book re-prices itself constantly.',
  },
]

export default function Safeguards() {
  return (
    <section id="safeguards">
      <div className="sec-head reveal">
        <span className="mono">05 — The discipline</span>
        <h2>Built to protect the downside</h2>
      </div>
      <div className="safe-list">
        {SAFEGUARDS.map((item) => (
          <div className="safe-row reveal" key={item.id}>
            <span className="mono">{item.id}</span>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
