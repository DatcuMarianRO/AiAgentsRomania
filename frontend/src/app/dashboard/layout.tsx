"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/store/auth.store";
import { 
  Home, 
  ShoppingCart, 
  MessageSquare, 
  User, 
  CreditCard, 
  LogOut,
  Menu,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const { user, logout, fetchUserProfile } = useAuthStore();

  useEffect(() => {
    if (!user) {
      fetchUserProfile().catch(console.error);
    }
  }, [user, fetchUserProfile]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Close sidebar on mobile when path changes
  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: Home },
    { name: "Marketplace", href: "/marketplace", icon: ShoppingCart },
    { name: "My Agents", href: "/dashboard/agents", icon: MessageSquare },
    { name: "Account", href: "/account", icon: User },
    { name: "Billing", href: "/account/billing", icon: CreditCard },
  ];

  return (
    <div className="flex min-h-screen">
      {/* Mobile sidebar toggle */}
      <div className="fixed top-4 left-4 z-50 sm:hidden">
        <Button 
          variant="outline" 
          size="icon"
          onClick={toggleSidebar}
          aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
        >
          {sidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </Button>
      </div>

      {/* Sidebar backdrop for mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 sm:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div 
        className={`fixed inset-y-0 left-0 z-40 w-64 transform transition-transform duration-300 ease-in-out bg-background border-r ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full sm:translate-x-0"
        } sm:static sm:z-0`}
      >
        <div className="flex h-16 items-center border-b px-6">
          <Link href="/" className="flex items-center">
            <span className="text-xl font-semibold">AI Agents Romania</span>
          </Link>
        </div>
        <div className="flex flex-col h-[calc(100vh-4rem)] justify-between py-4">
          <nav className="space-y-1 px-4">
            {navigation.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm ${
                    isActive 
                      ? "bg-muted text-foreground font-medium" 
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
          <div className="px-4">
            {user && (
              <div className="border-t pt-4 space-y-4">
                <div className="flex items-center gap-3 px-3">
                  <div className="rounded-full bg-muted h-8 w-8 flex items-center justify-center text-xs font-medium">
                    {user.first_name.charAt(0)}{user.last_name.charAt(0)}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">
                      {user.first_name} {user.last_name}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {user.credits_available} credits
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => logout()}
                  className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
                >
                  <LogOut className="h-4 w-4" />
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1">
        <div className="py-8 px-4 sm:px-8">
          {children}
        </div>
      </div>
    </div>
  );
}