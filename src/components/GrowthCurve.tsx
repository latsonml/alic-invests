import { buildChartPaths, HORIZON_MONTHS, NET_CYCLE_RETURN_PCT, PRINCIPAL } from '../lib/growthModel'

export default function GrowthCurve() {
  const chart = buildChartPaths()
  const endLabel = `$${Math.round(chart.endAlic / 1000)}K`

  return (
    <div className="curve-wrap reveal">
      <div className="curve-head">
        <span className="mono">Growth of $100,000 · illustrative</span>
        <span className="curve-note">
          {HORIZON_MONTHS} months · {NET_CYCLE_RETURN_PCT}% per cycle · returns reinvested
        </span>
      </div>
      <svg
        id="curve"
        viewBox="0 0 1000 380"
        role="img"
        aria-label={`Illustrative chart comparing growth of one hundred thousand dollars in Alic to a bank deposit over ${HORIZON_MONTHS} months. Alic reaches approximately ${endLabel}.`}
      >
        <defs>
          <linearGradient id="curveFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#49C5B6" stopOpacity=".26" />
            <stop offset="100%" stopColor="#49C5B6" stopOpacity="0" />
          </linearGradient>
        </defs>
        {chart.yTicks.map((tick) => (
          <line key={tick.label} className="grid-line" x1="0" y1={tick.y} x2="1000" y2={tick.y} />
        ))}
        {chart.yTicks.map((tick) => (
          <text key={`lbl-${tick.label}`} className="axis-lbl" x="0" y={tick.y - 8}>
            {tick.label}
          </text>
        ))}
        {chart.xLabels.map((lbl) => (
          <text
            key={lbl.label}
            className={`axis-lbl${lbl.label.includes(String(HORIZON_MONTHS)) ? ' end' : ''}`}
            x={lbl.x}
            y="340"
            textAnchor={lbl.label.includes(String(HORIZON_MONTHS)) ? 'end' : 'start'}
          >
            {lbl.label}
          </text>
        ))}
        <path className="c-fill" d={chart.alicFill} />
        <path className="c-alic" d={chart.alicLine} />
        <path className="c-bank" d={chart.bankLine} />
      </svg>
      <div className="curve-legend">
        <span className="k-alic">
          <i />
          Alic, returns reinvested (~{endLabel} @ mo {HORIZON_MONTHS})
        </span>
        <span className="k-bank">
          <i />
          Typical bank deposit (~${Math.round(chart.endBank / 1000)}K)
        </span>
      </div>
      <p className="curve-disc">
        Model: {NET_CYCLE_RETURN_PCT}% per 16-week cycle on ${PRINCIPAL.toLocaleString()}, compounded over{' '}
        {HORIZON_MONTHS} months. Not a guarantee.
      </p>
    </div>
  )
}
