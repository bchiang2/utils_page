import { Routes, Route, Link } from "react-router-dom"
import { Button } from "@/components/ui/button"

// Home page component
function Home() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center space-y-4">
      <h1 className="text-4xl font-bold">Welcome Home</h1>
      <p className="text-muted-foreground">This is the home page of your app</p>
      <Button>Get Started</Button>
    </div>
  )
}

// About page component
function About() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center space-y-4">
      <h1 className="text-4xl font-bold">About</h1>
      <p className="text-muted-foreground">Learn more about this application</p>
      <Button variant="outline">Learn More</Button>
    </div>
  )
}

// Contact page component
function Contact() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center space-y-4">
      <h1 className="text-4xl font-bold">Contact</h1>
      <p className="text-muted-foreground">Get in touch with us</p>
      <Button variant="secondary">Send Message</Button>
    </div>
  )
}

function App() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold">Utils Page</h1>
            <div className="flex space-x-4">
              <Link to="/" className="text-foreground hover:text-primary transition-colors">
                Home
              </Link>
              <Link to="/about" className="text-foreground hover:text-primary transition-colors">
                About
              </Link>
              <Link to="/contact" className="text-foreground hover:text-primary transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
