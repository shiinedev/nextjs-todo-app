"use client"

import { CheckCircle, LayoutDashboard} from "lucide-react"
import { Button } from "./ui/button"
import { ModeToggle } from "./theme-toggle"
import Link from "next/link"
import { useEffect, useState } from "react"
import { loginUserResponse } from "@/app/types/user"
import { useRouter } from "next/navigation"

const Navbar = () => {
  const [user, setUser] = useState<loginUserResponse | null>(null);
  const router = useRouter();

  useEffect(() => {
    const authUser = localStorage.getItem("todo-auth")
      ? JSON.parse(localStorage.getItem("todo-auth")!)
      : null;
    setUser(authUser);

    // Listen for storage changes (when user logs in/out in other tabs)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "todo-auth") {
        if (e.newValue) {
          setUser(JSON.parse(e.newValue));
        } else {
          setUser(null);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    router.replace("/login");
  };

  return (
    <header className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-8 w-8 text-blue-600" />
            <Link href="/">
              <span className="text-2xl font-bold text-gray-900 dark:text-white hover:text-blue-600 transition-colors">
                TodoFlow
              </span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg p-1">
              <ModeToggle />
            </div>
            
            {user ? (
              <>
                <Button variant="outline" asChild>
                  <Link href="/dashboard">
                  <LayoutDashboard />
                  <span className="hidden sm:block"> Dashboard</span>
                   
                  </Link>
                </Button>
                <Button variant="destructive" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <Button  asChild>
                <Link href="/login">
                  Login
                </Link>
              </Button>
            )}
          </div>
        </div>
      </header>
  )
}

export default Navbar
