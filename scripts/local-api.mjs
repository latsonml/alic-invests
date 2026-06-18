import { createServer } from 'node:http'
import { handleInvestHttpRequest } from '../packages/alic/invest-submit/lib.mjs'

const port = Number(process.env.LOCAL_API_PORT || 8787)

const env = {
  RESEND_API_KEY: process.env.RESEND_API_KEY,
  NOTIFY_EMAIL: process.env.NOTIFY_EMAIL || 'michael@aliccapital.com',
  FROM_EMAIL: process.env.FROM_EMAIL || 'Alic <invest@communications.alicinvestments.com>',
  ALLOWED_ORIGINS: process.env.ALLOWED_ORIGINS || 'http://localhost:5173,http://127.0.0.1:5173',
}

createServer(async (req, res) => {
  const origin = req.headers.origin || ''
  const url = new URL(req.url || '/', `http://${req.headers.host}`)

  if (url.pathname !== '/api/alic/invest-submit') {
    res.writeHead(404, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ error: 'Not found' }))
    return
  }

  let body = {}
  if (req.method === 'POST') {
    const chunks = []
    for await (const chunk of req) chunks.push(chunk)
    const raw = Buffer.concat(chunks).toString('utf8')
    body = raw ? JSON.parse(raw) : {}
  }

  try {
    const result = await handleInvestHttpRequest(
      { method: req.method || 'GET', origin, body },
      env,
    )

    res.writeHead(result.statusCode, result.headers)
    res.end(result.body)
  } catch (error) {
    console.error(error)
    res.writeHead(500, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ error: 'Unable to submit your request. Please try again.' }))
  }
}).listen(port, () => {
  console.log(`Local invest API listening on http://localhost:${port}/api/alic/invest-submit`)
})
