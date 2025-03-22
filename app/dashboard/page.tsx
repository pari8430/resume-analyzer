import { DashboardView } from "@/components/dashboard-view"
import { redirect } from "next/navigation"
import { getSession } from "@/lib/auth"

export default async function DashboardPage() {
  const session = await getSession()

  // If user is not logged in, redirect to home page
  if (!session) {
    redirect("/")
  }

  return <DashboardView />
}

