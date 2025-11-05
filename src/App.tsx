import { useState, useEffect } from "react";
import { Authenticated, Unauthenticated } from "convex/react";
import { SignInForm } from "./SignInForm";
import { SignOutButton } from "./SignOutButton";
import { Toaster } from "sonner";
import { ChatInterface } from "./components/ChatInterface";
import { LandingPage } from "./components/LandingPage";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LocationProvider } from "./contexts/LocationContext";
import { ThemeToggle } from "./components/ThemeToggle";

export default function App() {
  const [showLanding, setShowLanding] = useState(true);

  return (
    <ThemeProvider>
      <LocationProvider>
        <div className="min-h-screen transition-colors duration-300 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
          {showLanding ? (
            <LandingPage onEnterChat={() => setShowLanding(false)} />
          ) : (
            <div className="min-h-screen flex flex-col">
              <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 border-b border-white/20 dark:border-gray-700/30">
                <div className="container mx-auto px-4 h-16 flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                      <span className="text-white font-bold text-sm">D</span>
                    </div>
                    <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      Daayre.ai
                    </h1>
                  </div>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setShowLanding(true)}
                      className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      Home
                    </button>
                    <ThemeToggle />
                    <Authenticated>
                      <SignOutButton />
                    </Authenticated>
                  </div>
                </div>
              </header>
              
              <main className="flex-1 flex items-center justify-center p-4">
                <div className="w-full max-w-4xl mx-auto">
                  <Authenticated>
                    <ChatInterface />
                  </Authenticated>
                  <Unauthenticated>
                    <div className="max-w-md mx-auto">
                      <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                          Sign in to continue
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300">
                          Access your legal AI assistant
                        </p>
                      </div>
                      <SignInForm />
                    </div>
                  </Unauthenticated>
                </div>
              </main>
            </div>
          )}
          <Toaster />
        </div>
      </LocationProvider>
    </ThemeProvider>
  );
}
