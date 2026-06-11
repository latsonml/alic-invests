import { NET_CYCLE_RETURN_PCT, REPAYMENT_PERFORMANCE_PCT } from '../lib/growthModel'

const TICKER_ITEMS: [string, string][] = [
  ['Target return', `${NET_CYCLE_RETURN_PCT}% / cycle`],
  ['Avg. duration', '16 weeks'],
  ['Active positions', '640+'],
  ['Repayment performance', `${REPAYMENT_PERFORMANCE_PCT}%`],
  ['Security', 'UCC-1 + personal guarantee'],
  ['Reserve', 'First-loss, funded'],
  ['Minimum', '$50,000'],
]

export default function Ticker() {
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS]

  return (
    <div className="ticker" aria-hidden="true">
      <div className="ticker-track" id="ticker-track">
        {items.map(([label, value], i) => (
          <span className="ticker-item" key={i}>
            {label} <b>{value}</b>
          </span>
        ))}
      </div>
    </div>
  )
}
