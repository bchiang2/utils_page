import { Routes, Route, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import JsonUtilsPage from './pages/JsonUtilsPage';
import { Toaster } from '@/components/ui/sonner';

// Home page component
function Home() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center space-y-4">
      <h1 className="text-4xl font-bold">Welcome Home</h1>
      <p className="text-muted-foreground">This is the home page of your app</p>
      <Button>Get Started</Button>
    </div>
  );
}

function App() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold">Utils</h1>
            <div className="flex space-x-4">
              <Link
                to="/"
                className="text-foreground hover:text-primary transition-colors"
              >
                Home
              </Link>
              <Link
                to="/json-utils"
                className="text-foreground hover:text-primary transition-colors"
              >
                JSON
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/json-utils" element={<JsonUtilsPage />} />
        </Routes>
      </main>

      {/* Toast notifications */}
      <Toaster />
    </div>
  );
}

export default App;
