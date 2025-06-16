export default function SignupPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-50 text-black px-4">
      <h1 className="text-3xl font-bold text-blue-600 mb-4">Signup Page</h1>
      <p className="text-gray-600 mb-6">This page can be used for custom email/password registration.</p>
      <a
        href="/signin"
        className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700 transition"
      >
        Go to Signin
      </a>
    </div>
  )
}
    