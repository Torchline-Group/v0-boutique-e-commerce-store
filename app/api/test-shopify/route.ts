import { NextResponse } from 'next/server'

export async function GET() {
  const storeDomain = '0mwnma-df.myshopify.com'
  const token = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN
  
  const results: any = {
    storeDomain,
    tokenExists: !!token,
    tokenLength: token?.length || 0,
    tokenPrefix: token?.substring(0, 15) || 'NOT SET',
    apiUrl: `https://${storeDomain}/api/2024-10/graphql.json`,
  }

  if (!token) {
    results.error = 'SHOPIFY_STOREFRONT_ACCESS_TOKEN is not set in environment variables'
    return NextResponse.json(results)
  }

  // Test query
  const query = `{ shop { name } }`

  try {
    const response = await fetch(`https://${storeDomain}/api/2024-10/graphql.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': token,
      },
      body: JSON.stringify({ query }),
    })

    const data = await response.json()
    
    results.status = response.status
    results.response = data
    results.success = response.ok

    if (response.status === 401) {
      results.diagnosis = 'TOKEN_TYPE_WRONG'
      results.hint = 'The token format looks correct, but Shopify rejected it as unauthorized. Make sure you copied the STOREFRONT API token, not the Admin API token (shpat_) or Client Secret (shpss_).'
    }
    
  } catch (error: any) {
    results.fetchError = error.message
  }

  return NextResponse.json(results)
}
