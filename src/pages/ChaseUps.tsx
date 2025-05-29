
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ChaseUpDrawer } from "@/components/ChaseUpDrawer";
import { ArrowUpDown, Download, Mail, Clock, CheckCircle, AlertTriangle } from "lucide-react";

interface ChaseUp {
  id: string;
  sent: string;
  supplier: string;
  email: string;
  subject: string;
  reason: string;
  slaHours: number;
  status: "awaiting" | "replied" | "overdue";
  repliedHours?: number;
  overdueHours?: number;
  message: string;
  reply?: string;
}

const mockChaseUps: ChaseUp[] = [
  {
    id: "1",
    sent: "2025-05-28 07:20",
    supplier: "EverBright Fashions",
    email: "alice@everbright-fashions.com",
    subject: "Carton size needed – PO #3245",
    reason: "Missing carton L/W/H",
    slaHours: 48,
    status: "awaiting",
    message: "Dear Alice,\n\nWe are missing the carton dimensions for PO #3245. Could you please provide the Length, Width, and Height specifications?\n\nBest regards,\nCentrade AI Bot"
  },
  {
    id: "2",
    sent: "2025-05-27 16:05",
    supplier: "KnitWell Ltd",
    email: "qc@knitwell.com",
    subject: "Lab-dip approval needed",
    reason: "Width missing",
    slaHours: 24,
    status: "replied",
    repliedHours: 5,
    message: "Hello QC Team,\n\nThe fabric width specification is missing from lab-dip #742. Please provide this information for approval.\n\nThank you,\nCentrade AI Bot",
    reply: "Hi, the fabric width is 58 inches. Please find updated specs attached. - QC Team"
  },
  {
    id: "3",
    sent: "2025-05-27 09:52",
    supplier: "Pacific Bags",
    email: "bob@pacific-bags.cn",
    subject: "HS code confirmation",
    reason: "Missing HTS code",
    slaHours: 24,
    status: "overdue",
    overdueHours: 11,
    message: "Dear Bob,\n\nWe need the HS/HTS code for the shipment. This is required for customs clearance.\n\nPlease provide at your earliest convenience.\n\nRegards,\nCentrade AI Bot"
  },
  {
    id: "4",
    sent: "2025-05-26 14:30",
    supplier: "TextilePro Co",
    email: "orders@textilepro.com",
    subject: "Color confirmation needed",
    reason: "Pantone mismatch",
    slaHours: 72,
    status: "awaiting",
    message: "Hello,\n\nThere's a discrepancy in the Pantone color specification. Please confirm the correct color code.\n\nBest,\nCentrade AI Bot"
  },
  {
    id: "5",
    sent: "2025-05-26 11:15",
    supplier: "GlobalStitch Ltd",
    email: "info@globalstitch.com",
    subject: "Size chart approval",
    reason: "Size spec missing",
    slaHours: 48,
    status: "replied",
    repliedHours: 2,
    message: "Dear Team,\n\nThe size chart for style #24-AW-019 is missing specifications for XL and XXL sizes.\n\nKind regards,\nCentrade AI Bot",
    reply: "Updated size chart attached with XL (42-44) and XXL (46-48) measurements. Thanks!"
  }
];

const ChaseUps = () => {
  const [selectedTab, setSelectedTab] = useState("all");
  const [selectedChaseUp, setSelectedChaseUp] = useState<ChaseUp | null>(null);
  const [sortBy, setSortBy] = useState<string>("");

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

  const getFilteredChaseUps = () => {
    if (selectedTab === "all") return mockChaseUps;
    return mockChaseUps.filter(item => item.status === selectedTab);
  };

  const awaitingCount = mockChaseUps.filter(item => item.status === "awaiting").length;
  const overdueCount = mockChaseUps.filter(item => item.status === "overdue").length;
  const repliedCount = mockChaseUps.filter(item => item.status === "replied").length;

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
              <TabsTrigger value="all">All ({mockChaseUps.length})</TabsTrigger>
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
                  {getFilteredChaseUps().map((chaseUp) => (
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
