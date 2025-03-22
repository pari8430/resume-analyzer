// This is a mock authentication module for demonstration purposes
// In a real application, you would use a proper auth provider like NextAuth.js or Clerk

let isAuthenticated = false

export async function getSession() {
  // In a real app, this would check for a valid session
  return isAuthenticated ? { user: { name: "User", email: "user@example.com" } } : null
}

export async function signIn() {
  // In a real app, this would redirect to a sign-in page or open a modal
  console.log("Sign in clicked")
  isAuthenticated = true
  window.location.reload()
}

export async function signOut() {
  // In a real app, this would clear the session
  console.log("Sign out clicked")
  isAuthenticated = false
  window.location.reload()
}

