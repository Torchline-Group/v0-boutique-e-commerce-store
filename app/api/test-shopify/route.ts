import { NextResponse } from 'next/server'

export async function GET() {
  const storeDomain = '0mwnma-df.myshopify.com'
  const token = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN
  
  const results: Record<string, any> = {
    storeDomain,
    tokenExists: !!token,
    tokenLength: token?.length || 0,
    tokenPrefix: token?.substring(0, 10) || 'NOT SET',
  }

  // Simple query to test the API
  const query = `
    {
      shop {
        name
      }
    }
  `

  try {
    const response = await fetch(`https://${storeDomain}/api/2024-10/graphql.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': token || '',
      },
      body: JSON.stringify({ query }),
    })

    const responseText = await response.text()
    
    results.httpStatus = response.status
    results.httpStatusText = response.statusText
    
    try {
      results.responseBody = JSON.parse(responseText)
    } catch {
      results.responseBody = responseText.substring(0, 500)
    }

    // Check if it's a Storefront API vs Admin API token issue
    if (response.status === 401) {
      results.diagnosis = 'WRONG_TOKEN_TYPE'
      results.explanation = 'The token you provided is likely an Admin API token (shpat_) or Client Secret (shpss_). You need a STOREFRONT API access token which is a different thing entirely.'
      results.howToFix = [
        '1. Go to Shopify Admin > Settings > Apps and sales channels > Develop apps',
        '2. Click your app (or create a new one)',
        '3. Click "Configure Storefront API scopes"',
        '4. Check: unauthenticated_read_product_listings',
        '5. Click Save, then Install app',
        '6. Look for "Storefront API access token" - it\'s a 32-character hex string',
        '7. Copy THAT token (not the Admin token) and paste in v0'
      ]
    }
    
  } catch (error: any) {
    results.error = error.message
  }

  return NextResponse.json(results, { status: 200 })
}
