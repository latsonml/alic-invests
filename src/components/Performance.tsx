import GrowthCurve from './GrowthCurve'
import { NET_CYCLE_RETURN_PCT, REPAYMENT_PERFORMANCE_PCT } from '../lib/growthModel'

const FIGURES = [
  {
    target: NET_CYCLE_RETURN_PCT,
    decimals: 1,
    suffix: '%',
    label: 'Target return per 16-week cycle',
  },
  {
    target: REPAYMENT_PERFORMANCE_PCT,
    decimals: 0,
    suffix: '%',
    label: 'Repayment performance across the active book',
  },
  { target: 1400, decimals: 0, suffix: '+', label: 'Small businesses funded since inception' },
  {
    target: 16,
    decimals: 0,
    suffix: 'wks',
    suffixSpace: true,
    label: 'Average position duration — your capital recycles fast',
  },
] as const

export default function Performance() {
  return (
    <div className="panel dark" id="performance">
      <canvas id="contours" aria-hidden="true" />
      <section>
        <div className="sec-head reveal">
          <span className="mono">03 — The numbers</span>
          <h2>Performance, in plain figures</h2>
        </div>
        <div className="figures">
          {FIGURES.map((fig) => (
            <div className="fig reveal" key={fig.label}>
              <div className="num">
                <span className="count" data-target={fig.target} data-decimals={fig.decimals}>
                  {fig.decimals > 0 ? '0.0' : '0'}
                </span>
                <small>
                  {'suffixSpace' in fig && fig.suffixSpace ? '\u00a0' : ''}
                  {fig.suffix}
                </small>
              </div>
              <div className="lbl">{fig.label}</div>
            </div>
          ))}
        </div>
        <GrowthCurve />
      </section>
    </div>
  )
}
