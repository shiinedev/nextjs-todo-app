
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Plus, Search, Filter} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Link from 'next/link';


export default function Home() {
  const features = [
    {
      icon: Plus,
      title: 'Create Tasks',
      description: 'Quickly add new tasks with priorities and detailed descriptions',
    },
    {
      icon: CheckCircle,
      title: 'Track Progress',
      description: 'Mark tasks as complete and monitor your productivity',
    },
    {
      icon: Search,
      title: 'Smart Search',
      description: 'Find any task instantly with powerful search functionality',
    },
    {
      icon: Filter,
      title: 'Filter & Sort',
      description: 'Organize tasks by status, priority, or creation date',
    },
  ];
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900">
    {/* Header */}
    <Navbar />

    {/* Hero Section */}
    <main className="container mx-auto px-4 py-16">
      <div className="text-center max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
          Organize Your
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {' '}Tasks{' '}
          </span>
          Beautifully
        </h1>
        
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
          The most intuitive way to manage your daily tasks. Create, organize, and complete your todos with a beautiful, modern interface that adapts to your workflow.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
         
          <Button size="lg"  className="text-lg px-8 py-6">
          <Link href="/signup">
            Start Organizing Today
            </Link>
          </Button>
         
         
          <Button size="lg" variant="outline"  className="text-lg px-8 py-6">
          <Link href="/login">
            Sign In to Continue
            </Link>
          </Button>
          
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Demo Preview */}
        <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-8 shadow-2xl max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Beautiful, Intuitive Design
          </h2>
          <div className="space-y-4">
            {[
              { title: 'Complete project proposal', priority: 'high', completed: true },
              { title: 'Review team feedback', priority: 'medium', completed: false },
              { title: 'Plan weekend trip', priority: 'low', completed: false },
            ].map((task, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 bg-white dark:bg-gray-700 rounded-lg shadow-sm">
                <div className={`w-4 h-4 rounded-full border-2 ${
                  task.completed 
                    ? 'bg-green-500 border-green-500' 
                    : 'border-gray-300 dark:border-gray-500'
                }`}>
                  {task.completed && <CheckCircle className="w-4 h-4 text-white" />}
                </div>
                <span className={`flex-1 text-left ${
                  task.completed 
                    ? 'line-through text-gray-500' 
                    : 'text-gray-900 dark:text-white'
                }`}>
                  {task.title}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  task.priority === 'high' 
                    ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                    : task.priority === 'medium'
                    ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                    : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                }`}>
                  {task.priority}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  </div>
  )
}



