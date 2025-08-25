import { Routes, Route, NavLink } from 'react-router-dom';
import JsonUtilsPage from './pages/JsonUtilsPage';
import NotePage from './pages/NotePage';
import { Toaster } from '@/components/ui/sonner';

function App() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold">Toolkit</h1>
            <div className="flex items-center gap-6">
              <NavLink
                to="/json-utils"
                className={({ isActive }) =>
                  [
                    'relative px-0.5 transition-colors',
                    'text-foreground hover:text-primary',
                    'after:origin-left after:scale-x-0 after:bg-primary after:transition-transform after:duration-200',
                    isActive
                      ? 'text-primary font-semibold after:scale-x-100'
                      : 'hover:after:scale-x-100',
                  ].join(' ')
                }
              >
                JSON
              </NavLink>
              <NavLink
                to="/notes"
                className={({ isActive }) =>
                  [
                    'relative px-0.5 transition-colors',
                    'text-foreground hover:text-primary',
                    'after:content-[""] after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-full',
                    'after:origin-left after:scale-x-0 after:bg-primary after:transition-transform after:duration-200',
                    isActive
                      ? 'text-primary font-semibold after:scale-x-100'
                      : 'hover:after:scale-x-100',
                  ].join(' ')
                }
              >
                Notes
              </NavLink>
            </div>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main>
        <Routes>
          <Route path="/" element={<NotePage />} />
          <Route path="/json-utils" element={<JsonUtilsPage />} />
          <Route path="/notes" element={<NotePage />} />
        </Routes>
      </main>

      {/* Toast notifications */}
      <Toaster />
    </div>
  );
}

export default App;
