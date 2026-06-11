/** Illustrative growth model — aligned with calculator & performance section */

export const PRINCIPAL = 100_000
export const HORIZON_MONTHS = 9
export const CYCLE_MONTHS = 4 // 16 weeks
export const GROSS_CYCLE_RETURN = 0.5
export const DEFAULT_RATE = 0.15
export const NET_CYCLE_RETURN = GROSS_CYCLE_RETURN * (1 - DEFAULT_RATE) // 42.5%
export const GROSS_CYCLE_RETURN_PCT = GROSS_CYCLE_RETURN * 100 // 50%
export const NET_CYCLE_RETURN_PCT = NET_CYCLE_RETURN * 100 // 42.5%
export const REPAYMENT_PERFORMANCE_PCT = (1 - DEFAULT_RATE) * 100 // 85%
export const BANK_ANNUAL_YIELD = 0.04

export function alicValueAtMonth(month: number): number {
  return PRINCIPAL * Math.pow(1 + NET_CYCLE_RETURN, month / CYCLE_MONTHS)
}

export function bankValueAtMonth(month: number): number {
  return PRINCIPAL * Math.pow(1 + BANK_ANNUAL_YIELD, month / 12)
}

export function formatAxisK(value: number): string {
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)}M`
  return `$${Math.round(value / 1000)}K`
}

export type ChartPoint = { x: number; y: number }

export function buildChartPaths() {
  const plotLeft = 60
  const plotRight = 940
  const plotTop = 40
  const plotBottom = 310
  const plotWidth = plotRight - plotLeft
  const plotHeight = plotBottom - plotTop

  const endValue = alicValueAtMonth(HORIZON_MONTHS)
  const yMax = Math.ceil(endValue / 10_000) * 10_000
  const yMin = PRINCIPAL

  const xAt = (month: number) => plotLeft + (month / HORIZON_MONTHS) * plotWidth
  const yAt = (value: number) => plotBottom - ((value - yMin) / (yMax - yMin)) * plotHeight

  const months = Array.from({ length: HORIZON_MONTHS + 1 }, (_, m) => m)
  const alicPts = months.map((m) => ({ x: xAt(m), y: yAt(alicValueAtMonth(m)) }))
  const bankPts = months.map((m) => ({ x: xAt(m), y: yAt(bankValueAtMonth(m)) }))

  const toLine = (pts: ChartPoint[]) =>
    pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ')

  const alicLine = toLine(alicPts)
  const last = alicPts[alicPts.length - 1]
  const first = alicPts[0]
  const alicFill = `${alicLine} L${last.x.toFixed(1)},${plotBottom} L${first.x.toFixed(1)},${plotBottom} Z`

  const yTicks = [yMin, yMin + (yMax - yMin) * 0.25, yMin + (yMax - yMin) * 0.5, yMin + (yMax - yMin) * 0.75, yMax]

  return {
    alicLine,
    alicFill,
    bankLine: toLine(bankPts),
    yTicks: yTicks.map((v) => ({ value: v, y: yAt(v), label: formatAxisK(v) })),
    xLabels: [
      { x: plotLeft, label: 'MO 0' },
      { x: plotLeft + plotWidth / 2, label: `MO ${Math.round(HORIZON_MONTHS / 2)}` },
      { x: plotRight, label: `MO ${HORIZON_MONTHS}` },
    ],
    endAlic: endValue,
    endBank: bankValueAtMonth(HORIZON_MONTHS),
  }
}
