
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertTriangle, FileX, Calendar, Download } from "lucide-react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fakeApi } from "../services/fakeApi";
import { useState } from "react";

const Exceptions = () => {
  const [activeTab, setActiveTab] = useState("all");
  
  const { data: exceptions, isLoading } = useQuery({
    queryKey: ['exceptions', activeTab],
    queryFn: () => fakeApi.getExceptions(activeTab === 'all' ? undefined : activeTab),
  });

  if (isLoading) {
    return <div className="p-6">Loading exceptions...</div>;
  }

  const urgentCount = exceptions?.filter(e => e.status === 'urgent').length || 0;
  const pendingCount = exceptions?.filter(e => e.status === 'pending').length || 0;
  const dateSlipCount = exceptions?.filter(e => e.type === 'date_slip').length || 0;
  const missingDataCount = exceptions?.filter(e => e.type === 'missing_data').length || 0;

  const getStatusBadge = (status: string) => {
    if (status === 'urgent') {
      return <Badge variant="destructive">Urgent</Badge>;
    }
    return <Badge variant="secondary">Pending</Badge>;
  };

  const getTypeBadge = (type: string) => {
    if (type === 'date_slip') {
      return (
        <div className="flex items-center gap-1">
          <Calendar className="h-3 w-3" />
          <span className="text-xs">Date Slip</span>
        </div>
      );
    }
    return (
      <div className="flex items-center gap-1">
        <FileX className="h-3 w-3" />
        <span className="text-xs">Missing Data</span>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <SidebarTrigger />
          <h1 className="text-3xl font-bold text-gray-900">Exceptions</h1>
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Export CSV
        </Button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Exceptions</CardTitle>
            <AlertTriangle className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{exceptions?.length || 0}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-red-600">Urgent</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{urgentCount}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Date Slips</CardTitle>
            <Calendar className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dateSlipCount}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Missing Data</CardTitle>
            <FileX className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{missingDataCount}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Table */}
      <Card>
        <CardHeader>
          <CardTitle>Exception Details</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="all">All ({exceptions?.length || 0})</TabsTrigger>
              <TabsTrigger value="urgent">Urgent ({urgentCount})</TabsTrigger>
              <TabsTrigger value="pending">Pending ({pendingCount})</TabsTrigger>
            </TabsList>
            
            <TabsContent value={activeTab} className="mt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>PO Number</TableHead>
                    <TableHead>Style</TableHead>
                    <TableHead>Supplier</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Impact</TableHead>
                    <TableHead>Detected</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {exceptions?.map((exception) => (
                    <TableRow key={exception.id} className="cursor-pointer hover:bg-gray-50">
                      <TableCell className="font-medium">
                        <Link to={`/exception/${exception.id}`} className="text-blue-600 hover:underline">
                          #{exception.poNumber}
                        </Link>
                      </TableCell>
                      <TableCell>{exception.styleNumber}</TableCell>
                      <TableCell>{exception.supplier}</TableCell>
                      <TableCell>{getTypeBadge(exception.type)}</TableCell>
                      <TableCell>{getStatusBadge(exception.status)}</TableCell>
                      <TableCell>{exception.description}</TableCell>
                      <TableCell>
                        {exception.daysAffected ? (
                          <Badge variant="outline" className="text-orange-600">
                            {exception.daysAffected} days
                          </Badge>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </TableCell>
                      <TableCell className="text-gray-500 text-sm">
                        {new Date(exception.detectedAt).toLocaleDateString()} {new Date(exception.detectedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Exceptions;
