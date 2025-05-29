
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ChaseUpDrawer } from "@/components/ChaseUpDrawer";
import { ArrowUpDown, Download, Mail, Clock, CheckCircle, AlertTriangle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fakeApi } from "../services/fakeApi";
import { type ChaseUp } from "../data/mockData";

const ChaseUps = () => {
  const [selectedTab, setSelectedTab] = useState("all");
  const [selectedChaseUp, setSelectedChaseUp] = useState<ChaseUp | null>(null);

  const { data: chaseUps = [], isLoading } = useQuery({
    queryKey: ['chase-ups', selectedTab],
    queryFn: () => fakeApi.getChaseUps(selectedTab),
  });

  const getStatusBadge = (status: string, repliedHours?: number, overdueHours?: number) => {
    switch (status) {
      case "awaiting":
        return <Badge variant="secondary" className="bg-amber-100 text-amber-700">Awaiting Reply</Badge>;
      case "replied":
        return <Badge variant="secondary" className="bg-green-100 text-green-700">Replied {repliedHours}h</Badge>;
      case "overdue":
        return <Badge variant="destructive">Overdue {overdueHours}h</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const awaitingCount = chaseUps.filter(item => item.status === "awaiting").length;
  const overdueCount = chaseUps.filter(item => item.status === "overdue").length;
  const repliedCount = chaseUps.filter(item => item.status === "replied").length;

  if (isLoading) {
    return <div className="p-6">Loading chase-ups...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <SidebarTrigger />
          <h1 className="text-3xl font-bold text-gray-900">Chase-ups Sent</h1>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Download CSV
          </Button>
          <Button variant="destructive" className="gap-2">
            <Mail className="h-4 w-4" />
            Remind All Overdue
          </Button>
        </div>
      </div>

      {/* KPIs Banner */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-amber-500" />
              <span className="text-sm text-gray-600">Awaiting</span>
            </div>
            <div className="text-2xl font-bold text-amber-600">{awaitingCount}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-red-500" />
              <span className="text-sm text-gray-600">Overdue</span>
            </div>
            <div className="text-2xl font-bold text-red-600">{overdueCount}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="text-sm text-gray-600">Avg Response</span>
            </div>
            <div className="text-2xl font-bold">7h</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-blue-500" />
              <span className="text-sm text-gray-600">SLA Hit Rate</span>
            </div>
            <div className="text-2xl font-bold text-blue-600">86%</div>
          </CardContent>
        </Card>
      </div>

      {/* Status Filter Tabs */}
      <Card>
        <CardHeader>
          <CardTitle>Follow-up Messages</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedTab} onValueChange={setSelectedTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="awaiting">Awaiting ({awaitingCount})</TabsTrigger>
              <TabsTrigger value="replied">Replied ({repliedCount})</TabsTrigger>
              <TabsTrigger value="overdue">Overdue ({overdueCount})</TabsTrigger>
              <TabsTrigger value="all">All ({chaseUps.length})</TabsTrigger>
            </TabsList>
            
            <TabsContent value={selectedTab} className="mt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="cursor-pointer hover:bg-gray-50">
                      <div className="flex items-center gap-2">
                        Sent
                        <ArrowUpDown className="h-4 w-4" />
                      </div>
                    </TableHead>
                    <TableHead className="cursor-pointer hover:bg-gray-50">
                      <div className="flex items-center gap-2">
                        Supplier
                        <ArrowUpDown className="h-4 w-4" />
                      </div>
                    </TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead className="cursor-pointer hover:bg-gray-50">
                      <div className="flex items-center gap-2">
                        SLA (h)
                        <ArrowUpDown className="h-4 w-4" />
                      </div>
                    </TableHead>
                    <TableHead className="cursor-pointer hover:bg-gray-50">
                      <div className="flex items-center gap-2">
                        Status
                        <ArrowUpDown className="h-4 w-4" />
                      </div>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {chaseUps.map((chaseUp) => (
                    <TableRow 
                      key={chaseUp.id} 
                      className="cursor-pointer hover:bg-gray-50"
                      onClick={() => setSelectedChaseUp(chaseUp)}
                    >
                      <TableCell className="font-mono text-sm">
                        {new Date(chaseUp.sent).toLocaleDateString()} {new Date(chaseUp.sent).toLocaleTimeString()}
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{chaseUp.supplier}</div>
                          <div className="text-sm text-gray-500">{chaseUp.email}</div>
                        </div>
                      </TableCell>
                      <TableCell className="max-w-xs truncate">{chaseUp.subject}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-xs">{chaseUp.reason}</Badge>
                      </TableCell>
                      <TableCell>{chaseUp.slaHours}</TableCell>
                      <TableCell>
                        {getStatusBadge(chaseUp.status, chaseUp.repliedHours, chaseUp.overdueHours)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Conversation Drawer */}
      <ChaseUpDrawer 
        chaseUp={selectedChaseUp}
        isOpen={!!selectedChaseUp}
        onClose={() => setSelectedChaseUp(null)}
      />
    </div>
  );
};

export default ChaseUps;
