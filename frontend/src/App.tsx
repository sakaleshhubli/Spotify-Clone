
import { SignedOut, SignInButton, SignedIn, UserButton } from "@clerk/clerk-react"
import { Button } from "./components/ui/button"
import { useClerkApi } from "./lib/useClerkApi";


function App() {
  const { data, error, loading } = useClerkApi("http://localhost:3000/api/users");

  return (
    <>
      <header>
        <SignedOut>
          <SignInButton>
            <Button>
              Sign In
            </Button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </header>
      <main>
        <h2>Protected API Test</h2>
        {loading && <p>Loading...</p>}
        {error && <p style={{color: 'red'}}>Error: {String(error instanceof Error ? error.message : error)}</p>}
        {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
      </main>
    </>
  );
}

export default App
