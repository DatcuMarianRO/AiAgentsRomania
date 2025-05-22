"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/auth.store";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Sparkles, TrendingUp, MessageSquare, ShoppingCart } from "lucide-react";
import agentService from "@/services/agent.service";
import { Agent } from "@/types";

export default function DashboardPage() {
  const { user } = useAuthStore();
  const [recentAgents, setRecentAgents] = useState<Agent[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const response = await agentService.listAgents({
          limit: 3,
          featured: true,
        });
        setRecentAgents(response.data);
      } catch (error) {
        console.error("Error fetching agents:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAgents();
  }, []);

  return (
    <div className="space-y-8">
      {/* Welcome section */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Welcome back, {user?.first_name || "User"}
        </h1>
        <p className="text-muted-foreground">
          Here's what's happening with your AI agents today.
        </p>
      </div>

      {/* Stats overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border bg-card text-card-foreground shadow">
          <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium">Available Credits</h3>
            <Sparkles className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="p-6 pt-0">
            <div className="text-2xl font-bold">{user?.credits_available || 0}</div>
            <p className="text-xs text-muted-foreground">
              {user?.subscription_tier === 'free' ? 'Free tier' : `${user?.subscription_tier} plan`}
            </p>
          </div>
        </div>
        <div className="rounded-xl border bg-card text-card-foreground shadow">
          <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium">Recent Usage</h3>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="p-6 pt-0">
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">
              agents used this week
            </p>
          </div>
        </div>
        <div className="rounded-xl border bg-card text-card-foreground shadow">
          <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium">My Agents</h3>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="p-6 pt-0">
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">
              agents created
            </p>
          </div>
        </div>
        <div className="rounded-xl border bg-card text-card-foreground shadow">
          <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium">Marketplace</h3>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="p-6 pt-0">
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">
              agents purchased
            </p>
          </div>
        </div>
      </div>

      {/* Featured agents */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Featured Agents</h2>
          <Link href="/marketplace">
            <Button variant="ghost" size="sm">View all</Button>
          </Link>
        </div>
        
        {isLoading ? (
          <div className="grid gap-4 md:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-xl border bg-card text-card-foreground shadow h-48 animate-pulse">
                <div className="p-6">
                  <div className="h-4 w-2/3 bg-muted rounded mb-4"></div>
                  <div className="h-16 bg-muted rounded mb-4"></div>
                  <div className="h-4 w-1/3 bg-muted rounded"></div>
                </div>
              </div>
            ))}
          </div>
        ) : recentAgents.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-3">
            {recentAgents.map((agent) => (
              <Link href={`/marketplace/${agent.id}`} key={agent.id}>
                <div className="rounded-xl border bg-card text-card-foreground shadow hover:shadow-md transition-shadow h-full">
                  <div className="p-6">
                    <h3 className="font-semibold text-lg mb-2">{agent.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                      {agent.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{agent.price} credits</span>
                      <div className="flex items-center space-x-1">
                        <span className="text-sm text-muted-foreground">{agent.average_rating.toFixed(1)}</span>
                        <svg className="h-4 w-4 fill-current text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                          <path d="M12 2l2.4 7.2h7.6l-6 4.8 2.4 7.2-6-4.8-6 4.8 2.4-7.2-6-4.8h7.6z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="rounded-xl border bg-card text-card-foreground shadow">
            <div className="p-6 text-center">
              <p className="text-muted-foreground mb-4">No featured agents available yet.</p>
              <Link href="/marketplace">
                <Button>Browse Marketplace</Button>
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Quick actions */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <Link href="/marketplace">
            <div className="rounded-xl border bg-card text-card-foreground shadow hover:shadow-md transition-shadow p-6">
              <ShoppingCart className="h-6 w-6 mb-4" />
              <h3 className="font-semibold mb-1">Browse Marketplace</h3>
              <p className="text-sm text-muted-foreground">Discover and purchase AI agents</p>
            </div>
          </Link>
          <Link href="/dashboard/agents/create">
            <div className="rounded-xl border bg-card text-card-foreground shadow hover:shadow-md transition-shadow p-6">
              <MessageSquare className="h-6 w-6 mb-4" />
              <h3 className="font-semibold mb-1">Create Agent</h3>
              <p className="text-sm text-muted-foreground">Build your custom AI agent</p>
            </div>
          </Link>
          <Link href="/account/billing">
            <div className="rounded-xl border bg-card text-card-foreground shadow hover:shadow-md transition-shadow p-6">
              <Sparkles className="h-6 w-6 mb-4" />
              <h3 className="font-semibold mb-1">Buy Credits</h3>
              <p className="text-sm text-muted-foreground">Purchase credits to use agents</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}