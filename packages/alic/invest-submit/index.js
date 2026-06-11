import { buildCorsHeaders, handleInvestHttpRequest, parseRequestBody } from './lib.mjs'

export async function main(args) {
  const method = (args.__ow_method || 'GET').toUpperCase()
  const origin = args.__ow_headers?.origin || args.__ow_headers?.Origin || ''

  const env = {
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    NOTIFY_EMAIL: process.env.NOTIFY_EMAIL,
    FROM_EMAIL: process.env.FROM_EMAIL,
    ALLOWED_ORIGINS: process.env.ALLOWED_ORIGINS,
  }

  try {
    const body = method === 'POST' ? parseRequestBody(args) : {}
    return await handleInvestHttpRequest({ method, origin, body }, env)
  } catch (error) {
    console.error('invest-submit error:', error)
    return {
      statusCode: 500,
      headers: buildCorsHeaders(origin, env.ALLOWED_ORIGINS),
      body: JSON.stringify({ error: 'Unable to submit your request. Please try again.' }),
    }
  }
}
