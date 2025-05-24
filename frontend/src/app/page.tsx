import Link from 'next/link';
import { Button } from '@/components/ui/button';
import InteractiveRobot from '@/components/InteractiveRobot';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 max-w-screen-2xl items-center">
          <div className="mr-4 flex">
            <Link href="/" className="flex items-center space-x-2">
              <span className="font-bold text-xl">AI Agents Romania</span>
            </Link>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-2">
            <nav className="flex items-center space-x-6 text-sm font-medium">
              <Link href="/marketplace" className="transition-colors hover:text-foreground/80">
                Marketplace
              </Link>
              <Link href="/pricing" className="transition-colors hover:text-foreground/80">
                Pricing
              </Link>
              <Link href="/docs" className="transition-colors hover:text-foreground/80">
                Docs
              </Link>
              <Link href="/invent-evolution" className="transition-colors hover:text-foreground/80 text-blue-500 font-semibold">
                INVENT EVOLUTION
              </Link>
            </nav>
            <div className="hidden sm:flex space-x-2">
              <Link href="/auth/login">
                <Button variant="ghost" size="sm">Login</Button>
              </Link>
              <Link href="/auth/register">
                <Button size="sm">Sign Up</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="container grid items-center pb-8 pt-6 md:py-10 gap-4 md:gap-10">
          <div className="flex flex-col items-center gap-4 text-center">
            {/* Interactive Robot Animation - Hero Section */}
            <div className="mb-8">
              <InteractiveRobot className="mx-auto" />
            </div>
            
            <div className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 px-4 py-2 rounded-full text-sm font-medium mb-2 animate-pulse">
              AI-Agents-Romania este LIVE!
            </div>
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold">
              Premium AI Agents Marketplace
            </h1>
            <p className="max-w-[42rem] text-muted-foreground sm:text-xl">
              Browse, purchase, and use the best AI agents on the market.
              Create and sell your own custom agents powered by OpenRouter.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/marketplace">
                <Button size="lg">Browse Agents</Button>
              </Link>
              <Link href="/auth/register">
                <Button variant="outline" size="lg">Create Your Agent</Button>
              </Link>
            </div>
          </div>
        </section>
        
        <section className="container py-8 md:py-12 lg:py-16">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
              Features
            </h2>
            <p className="max-w-[85%] text-muted-foreground">
              Our platform provides everything you need to harness the power of AI agents.
            </p>
          </div>
          <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-8 pt-8">
            {/* Feature 1 */}
            <div className="bg-muted p-6 rounded-lg">
              <h3 className="text-xl font-bold">Ready-to-Use Agents</h3>
              <p className="text-muted-foreground mt-2">
                Choose from a wide selection of pre-built AI agents for any task.
              </p>
            </div>
            {/* Feature 2 */}
            <div className="bg-muted p-6 rounded-lg">
              <h3 className="text-xl font-bold">Custom Creation</h3>
              <p className="text-muted-foreground mt-2">
                Build and customize your own AI agents with our intuitive interface.
              </p>
            </div>
            {/* Feature 3 */}
            <div className="bg-muted p-6 rounded-lg">
              <h3 className="text-xl font-bold">Marketplace</h3>
              <p className="text-muted-foreground mt-2">
                Sell your AI agents and earn passive income from your creations.
              </p>
            </div>
            {/* Feature 4 */}
            <div className="bg-muted p-6 rounded-lg">
              <h3 className="text-xl font-bold">OpenRouter Integration</h3>
              <p className="text-muted-foreground mt-2">
                Access multiple AI models through a single unified API.
              </p>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} AI Agents Romania by Invent Evolution SRL. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="/terms" className="text-sm text-muted-foreground hover:underline">
              Terms
            </Link>
            <Link href="/privacy" className="text-sm text-muted-foreground hover:underline">
              Privacy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}