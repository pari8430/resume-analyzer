import { DashboardView } from "@/components/dashboard-view"
import { LandingPage } from "@/components/landing-page"
import { getSession } from "@/lib/auth"

export default async function Home() {
  const session = await getSession()

  // If user is logged in, show dashboard, otherwise show landing page
  if (session) {
    return <DashboardView />
  }

  return <LandingPage />
}

