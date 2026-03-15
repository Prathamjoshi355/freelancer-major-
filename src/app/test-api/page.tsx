'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'

export default function TestAPIPage() {
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const testRegistration = async () => {
    setLoading(true)
    try {
      const response = await fetch('http://localhost:8000/api/accounts/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: `test${Date.now()}@example.com`,
          password: 'TestPass123!',
          company_name: 'Test Company',
          role: 'client',
        }),
      })
      
      const data = await response.json()
      setResult({
        status: response.status,
        data: data,
      })
    } catch (error) {
      setResult({
        error: String(error),
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">API Test</h1>
      <Button onClick={testRegistration} disabled={loading}>
        {loading ? 'Testing...' : 'Test Registration API'}
      </Button>
      {result && (
        <pre className="mt-4 bg-gray-100 p-4 rounded overflow-auto">
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </div>
  )
}
