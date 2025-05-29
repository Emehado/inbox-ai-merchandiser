
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Search, AlertTriangle, Inbox, Send, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fakeApi } from "../services/fakeApi";

const Dashboard = () => {
  const { data: dashboardData, isLoading } = useQuery({
    queryKey: ['dashboard-summary'],
    queryFn: fakeApi.getDashboardSummary,
  });

  if (isLoading) {
    return <div className="p-6">Loading dashboard...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <SidebarTrigger />
          <h1 className="text-3xl font-bold text-gray-900">Today Dashboard</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input 
              placeholder="Global search..." 
              className="pl-10 w-80"
            />
          </div>
          <Button variant="outline">⌘K</Button>
        </div>
      </div>

      {/* Widget Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Urgent Exceptions */}
        <Card className="border-red-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-red-600">
              Urgent Exceptions
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600 mb-4">
              {dashboardData?.urgentExceptions?.length || 0}
            </div>
            <div className="space-y-3">
              {dashboardData?.urgentExceptions?.map((exception) => (
                <Link key={exception.id} to={`/exception/${exception.id}`} className="block">
                  <div className="p-3 bg-red-50 rounded-lg border border-red-100 hover:bg-red-100 transition-colors cursor-pointer">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-sm">PO #{exception.poNumber}</p>
                        <p className="text-xs text-gray-600">{exception.supplier}</p>
                      </div>
                      {exception.daysAffected && (
                        <Badge variant="destructive" className="text-xs">
                          {exception.daysAffected} days
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-red-700 mt-1">{exception.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Inbox Pipeline */}
        <Link to="/pipeline-insight" className="block">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Inbox Pipeline</CardTitle>
              <Inbox className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold mb-4">
                {dashboardData?.pipelineStats?.total || 0}
              </div>
              <div className="text-xs text-gray-500 mb-3">Last 24 hours</div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">PO Updates</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">
                      {dashboardData?.pipelineStats?.poUpdates || 0}
                    </span>
                    <Badge variant="outline" className="text-xs">3 review</Badge>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Cost Sheets</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">
                      {dashboardData?.pipelineStats?.costSheets || 0}
                    </span>
                    <Badge variant="destructive" className="text-xs">1 error</Badge>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Noise/Other</span>
                  <span className="text-sm font-medium">
                    {dashboardData?.pipelineStats?.noise || 0}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        {/* Chase-ups */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Chase-ups Sent</CardTitle>
            <Send className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mb-4">
              {dashboardData?.chaseUpStats?.total || 0}
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Replied</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-green-600">
                    {dashboardData?.chaseUpStats?.replied || 0}
                  </span>
                  <div className="w-16 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full" 
                      style={{
                        width: `${dashboardData?.chaseUpStats?.total ? 
                          (dashboardData.chaseUpStats.replied / dashboardData.chaseUpStats.total) * 100 : 0}%`
                      }}
                    ></div>
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Pending</span>
                <span className="text-sm font-medium text-orange-600">
                  {dashboardData?.chaseUpStats?.awaiting || 0}
                </span>
              </div>
            </div>
            <Link to="/chaseups">
              <Button variant="outline" size="sm" className="w-full mt-3">
                Send Follow-ups
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Processing Time */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Processing Time</CardTitle>
            <Clock className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mb-4">
              {dashboardData?.processingTime || "4.2m"}
            </div>
            <div className="text-xs text-gray-500 mb-3">Avg per message</div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">Auto-processed</span>
                <Badge variant="secondary" className="text-xs bg-green-100 text-green-700">
                  89%
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Manual review</span>
                <Badge variant="secondary" className="text-xs">11%</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div>
                  <p className="font-medium text-sm">PO #3247 processed successfully</p>
                  <p className="text-xs text-gray-600">EverBright Fashions • 2 minutes ago</p>
                </div>
              </div>
              <Badge variant="secondary" className="bg-green-100 text-green-700">Auto</Badge>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <div>
                  <p className="font-medium text-sm">Cost sheet requires review</p>
                  <p className="text-xs text-gray-600">TextilePro Co • 5 minutes ago</p>
                </div>
              </div>
              <Badge variant="outline">Review</Badge>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div>
                  <p className="font-medium text-sm">BOM update received</p>
                  <p className="text-xs text-gray-600">GlobalStitch Ltd • 8 minutes ago</p>
                </div>
              </div>
              <Badge variant="secondary" className="bg-blue-100 text-blue-700">Auto</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
