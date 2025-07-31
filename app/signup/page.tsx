"use client"
import { useActionState, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Eye, EyeOff, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { registerAction } from '../actions/users/register';


let initialState = {
  message: "",
  error: ""
}

export default function SignupForm() {

  const [showPassword, setShowPassword] = useState(false);
  const [state, formAction, isPending] = useActionState(registerAction, initialState);


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formAction(formData);

    initialState = {
      message: "",
      error: "",
    }


  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Link href="/">
          <Button
            variant="ghost"

            className="mb-4 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </Link>


        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-2xl border-0">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
              Create Account
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-300">
              Join TodoFlow and start organizing your tasks
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {state.error && (
                <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800">
                  <p className="text-sm text-red-600 dark:text-red-400">{state.error}</p>
                </div>
              )}
              {state.message && (
                <div className="p-3 rounded-lg bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800">
                  <p className="text-sm text-green-600 dark:text-green-400">{state.message}</p>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="username">username</Label>
                <Input
                  id="username"
                  name='username'
                  type="text"
                  placeholder="Enter username"
                  className="bg-background"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  className="bg-background"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Create a password"
                    className="bg-white dark:bg-gray-700 pr-10"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}

                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-500" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-500" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Confirm your password"
                  className="bg-white dark:bg-gray-700"
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={isPending}
              >
                {isPending ? <span className='flex items-center space-x-2'><Loader2 className="h-4 w-4 mr-2 animate-spin" /> creating..</span> : "Create Account"}

              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Already have an account?{' '}
                <Link href="/login"
                  className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                >
                  login
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </main >
  );
}