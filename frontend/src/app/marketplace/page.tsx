"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Search, Filter, Star, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Agent, AgentCategory } from "@/types";
import agentService from "@/services/agent.service";

export default function MarketplacePage() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [categories, setCategories] = useState<AgentCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("created_at");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [isLoading, setIsLoading] = useState(true);
  const [totalAgents, setTotalAgents] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 9;

  useEffect(() => {
    const fetchCategoriesAndAgents = async () => {
      try {
        setIsLoading(true);
        
        // Fetch categories
        const categoriesData = await agentService.getCategories();
        setCategories(categoriesData);
        
        // Fetch agents with filters
        const response = await agentService.listAgents({
          page: currentPage,
          limit,
          category_id: selectedCategory || undefined,
          search: searchQuery || undefined,
          sort_by: sortBy,
          sort_order: sortOrder,
        });
        
        setAgents(response.data);
        setTotalAgents(response.pagination.total);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategoriesAndAgents();
  }, [selectedCategory, searchQuery, sortBy, sortOrder, currentPage]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1); // Reset to first page when searching
  };

  const handleCategoryClick = (categoryId: string | null) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1); // Reset to first page when changing category
  };

  const handleSortChange = (field: string) => {
    if (field === sortBy) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("desc");
    }
    setCurrentPage(1); // Reset to first page when sorting
  };

  const totalPages = Math.ceil(totalAgents / limit);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">AI Agent Marketplace</h1>
      
      {/* Search and filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <form onSubmit={handleSearch} className="w-full md:w-1/2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              type="search" 
              placeholder="Search agents..." 
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </form>
        <div className="flex gap-2 overflow-x-auto pb-2">
          <Button
            variant={selectedCategory === null ? "default" : "outline"}
            size="sm"
            onClick={() => handleCategoryClick(null)}
          >
            All
          </Button>
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => handleCategoryClick(category.id)}
            >
              {category.name}
            </Button>
          ))}
        </div>
      </div>
      
      {/* Sort controls */}
      <div className="flex justify-between items-center mb-4">
        <p className="text-sm text-muted-foreground">
          {isLoading ? "Loading agents..." : `Showing ${agents.length} of ${totalAgents} agents`}
        </p>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleSortChange("created_at")}
            className="flex items-center gap-1"
          >
            <span>Latest</span>
            {sortBy === "created_at" && (
              <ArrowUpDown className="h-3 w-3" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleSortChange("price")}
            className="flex items-center gap-1"
          >
            <span>Price</span>
            {sortBy === "price" && (
              <ArrowUpDown className="h-3 w-3" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleSortChange("average_rating")}
            className="flex items-center gap-1"
          >
            <span>Rating</span>
            {sortBy === "average_rating" && (
              <ArrowUpDown className="h-3 w-3" />
            )}
          </Button>
        </div>
      </div>
      
      {/* Agents grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-card rounded-lg border shadow animate-pulse">
              <div className="h-40 bg-muted rounded-t-lg"></div>
              <div className="p-4 space-y-3">
                <div className="h-5 bg-muted rounded w-3/4"></div>
                <div className="h-12 bg-muted rounded"></div>
                <div className="flex justify-between">
                  <div className="h-4 bg-muted rounded w-1/4"></div>
                  <div className="h-4 bg-muted rounded w-1/4"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : agents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {agents.map((agent) => (
            <Link href={`/marketplace/${agent.id}`} key={agent.id}>
              <div className="bg-card rounded-lg border shadow hover:shadow-md transition-shadow h-full flex flex-col">
                <div className="h-40 bg-muted rounded-t-lg overflow-hidden">
                  {agent.thumbnail_url ? (
                    <img 
                      src={agent.thumbnail_url} 
                      alt={agent.name} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-r from-gray-200 to-gray-300 flex items-center justify-center">
                      <span className="text-2xl font-bold text-gray-400">{agent.name.charAt(0)}</span>
                    </div>
                  )}
                </div>
                <div className="p-4 flex-1 flex flex-col">
                  <h2 className="text-lg font-semibold mb-2">{agent.name}</h2>
                  <p className="text-sm text-muted-foreground mb-4 flex-1 line-clamp-3">
                    {agent.description}
                  </p>
                  <div className="flex justify-between items-center mt-auto">
                    <span className="font-medium">{agent.price === 0 ? "Free" : `${agent.price} credits`}</span>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>{agent.average_rating.toFixed(1)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-lg mb-4">No agents found</p>
          <p className="text-muted-foreground mb-6">Try adjusting your search or filters</p>
          <Button onClick={() => {
            setSearchQuery("");
            setSelectedCategory(null);
          }}>
            Reset Filters
          </Button>
        </div>
      )}
      
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8">
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            
            {Array.from({ length: totalPages }).map((_, i) => (
              <Button
                key={i}
                variant={currentPage === i + 1 ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </Button>
            ))}
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}