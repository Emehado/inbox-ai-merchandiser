
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Calendar } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fakeApi } from "../services/fakeApi";

const KnowledgeSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const { data: searchResults = [], isLoading } = useQuery({
    queryKey: ['knowledge-search', searchQuery],
    queryFn: () => fakeApi.searchKnowledge(searchQuery),
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Excel": return "📊";
      case "PDF": return "📄";
      case "Email": return "📧";
      default: return "📄";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <SidebarTrigger />
          <h1 className="text-3xl font-bold text-gray-900">Knowledge Search</h1>
        </div>
      </div>

      {/* Search Interface */}
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            {/* Main Search */}
            <div className="relative">
              <Search className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
              <Input 
                placeholder="Ask anything about your supply chain data..."
                className="pl-12 h-12 text-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button className="absolute right-2 top-2 h-8">Search</Button>
            </div>

            {/* Filters */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-700">Filters:</span>
              </div>
              
              <Select>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="po">PO</SelectItem>
                  <SelectItem value="cost">Cost Sheet</SelectItem>
                  <SelectItem value="bom">BOM</SelectItem>
                  <SelectItem value="labdip">Lab-dip</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Supplier" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Suppliers</SelectItem>
                  <SelectItem value="everbright">EverBright Fashions</SelectItem>
                  <SelectItem value="textilepro">TextilePro Co</SelectItem>
                  <SelectItem value="globalstitch">GlobalStitch Ltd</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Date range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All time</SelectItem>
                  <SelectItem value="week">Past week</SelectItem>
                  <SelectItem value="month">Past month</SelectItem>
                  <SelectItem value="quarter">Past quarter</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Search Results */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Search Results</h2>
          <span className="text-sm text-gray-600">
            {isLoading ? "Searching..." : `${searchResults.length} results found`}
          </span>
        </div>

        {isLoading ? (
          <div className="text-center py-8">Loading results...</div>
        ) : (
          searchResults.map((result) => (
            <Card key={result.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="space-y-4">
                  {/* Answer */}
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900 mb-2">Answer</h3>
                    <p className="text-gray-700 leading-relaxed">{result.answer}</p>
                  </div>

                  {/* Sources */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Sources</h4>
                    <div className="space-y-2">
                      {result.sources.map((source, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors">
                          <div className="flex items-center gap-3">
                            <span className="text-lg">{getTypeIcon(source.type)}</span>
                            <div>
                              <p className="font-medium text-sm">{source.file}</p>
                              <p className="text-xs text-gray-600">{source.location}</p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            View
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Metadata */}
                  <div className="flex items-center justify-between pt-2 border-t">
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {result.timestamp}
                      </div>
                    </div>
                    <Badge variant="secondary" className="bg-green-100 text-green-700">
                      {result.confidence}% confidence
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Quick Searches */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Searches</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Button variant="outline" className="justify-start" onClick={() => setSearchQuery("payment terms")}>
              Payment terms by supplier
            </Button>
            <Button variant="outline" className="justify-start" onClick={() => setSearchQuery("cost sheets")}>
              Latest cost sheets
            </Button>
            <Button variant="outline" className="justify-start" onClick={() => setSearchQuery("lab-dips")}>
              Pending lab-dips
            </Button>
            <Button variant="outline" className="justify-start" onClick={() => setSearchQuery("carton specifications")}>
              Carton specifications
            </Button>
            <Button variant="outline" className="justify-start" onClick={() => setSearchQuery("delays")}>
              Ex-factory delays
            </Button>
            <Button variant="outline" className="justify-start" onClick={() => setSearchQuery("quality")}>
              Quality certificates
            </Button>
            <Button variant="outline" className="justify-start" onClick={() => setSearchQuery("shipping")}>
              Shipping documents
            </Button>
            <Button variant="outline" className="justify-start" onClick={() => setSearchQuery("BOM")}>
              BOM changes
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default KnowledgeSearch;
