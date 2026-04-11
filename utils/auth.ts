import { browserClient } from '@/lib/browserClient'
import { redirect } from 'next/navigation'

export const routeGuard = async () => {
  const client = browserClient()
  const data = await client?.auth.getSession()

  if (data?.data.session) {
    return redirect('/')
  }
}
