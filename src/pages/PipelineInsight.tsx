
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ArrowLeft, TrendingDown, TrendingUp, Mail, CheckCircle, AlertCircle, XCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";

const PipelineInsight = () => {
  const kpiData = [
    {
      title: "Total Mails",
      value: "137",
      change: "-12%",
      trend: "down",
      subtitle: "Last 24 hours"
    },
    {
      title: "Auto-approved",
      value: "88",
      percentage: "71%",
      trend: "up",
      subtitle: "Processed automatically"
    },
    {
      title: "Human Reviews",
      value: "45",
      percentage: "33%",
      trend: "neutral",
      subtitle: "Requiring review"
    },
    {
      title: "Errors",
      value: "4",
      percentage: "2.9%",
      trend: "down",
      subtitle: "Failed extraction"
    }
  ];

  const breakdownData = [
    { type: "PO", count: 62, color: "#3B82F6" },
    { type: "Cost Sheet", count: 30, color: "#10B981" },
    { type: "Noise", count: 27, color: "#6B7280" },
    { type: "Lab-Dip", count: 12, color: "#8B5CF6" },
    { type: "Certs", count: 6, color: "#F59E0B" }
  ];

  const confidenceData = [
    { range: "50-60%", count: 2 },
    { range: "60-70%", count: 8 },
    { range: "70-80%", count: 15 },
    { range: "80-90%", count: 45 },
    { range: "90-100%", count: 67 }
  ];

  const openReviewItems = [
    {
      type: "PO",
      supplier: "EverBright Fashions",
      styleNo: "24-SS-214",
      confidence: 93,
      age: "3h"
    },
    {
      type: "Cost Sheet",
      supplier: "KnitWell Ltd",
      styleNo: "24-AW-014",
      confidence: 88,
      age: "6h"
    },
    {
      type: "Lab-dip",
      supplier: "TextilePro Co",
      styleNo: "24-SS-189",
      confidence: 82,
      age: "8h"
    },
    {
      type: "BOM",
      supplier: "GlobalStitch Ltd",
      styleNo: "24-AW-067",
      confidence: 79,
      age: "12h"
    }
  ];

  const errorLog = [
    {
      id: 1,
      type: "Cost Sheet",
      supplier: "FabricMax Co",
      reason: "Unmapped column",
      time: "2h ago"
    },
    {
      id: 2,
      type: "PO",
      supplier: "QuickStitch Ltd",
      reason: "OCR fail",
      time: "4h ago"
    },
    {
      id: 3,
      type: "Lab-dip",
      supplier: "ColorPro Inc",
      reason: "Missing field",
      time: "6h ago"
    },
    {
      id: 4,
      type: "Certificate",
      supplier: "EcoTextiles",
      reason: "Format error",
      time: "8h ago"
    }
  ];

  const trendData = [
    { day: "Mon", volume: 120, confidence: 89, autoApprove: 68 },
    { day: "Tue", volume: 145, confidence: 91, autoApprove: 72 },
    { day: "Wed", volume: 132, confidence: 88, autoApprove: 69 },
    { day: "Thu", volume: 156, confidence: 92, autoApprove: 75 },
    { day: "Fri", volume: 149, confidence: 90, autoApprove: 73 },
    { day: "Sat", volume: 98, confidence: 93, autoApprove: 78 },
    { day: "Sun", volume: 137, confidence: 91, autoApprove: 71 }
  ];

  const getTrendIcon = (trend: string) => {
    if (trend === "up") return <TrendingUp className="h-4 w-4 text-green-500" />;
    if (trend === "down") return <TrendingDown className="h-4 w-4 text-red-500" />;
    return null;
  };

  const getTypeColor = (type: string) => {
    const colors: { [key: string]: string } = {
      "PO": "bg-blue-100 text-blue-700",
      "Cost Sheet": "bg-green-100 text-green-700",
      "Lab-dip": "bg-purple-100 text-purple-700",
      "BOM": "bg-orange-100 text-orange-700",
      "Certificate": "bg-yellow-100 text-yellow-700"
    };
    return colors[type] || "bg-gray-100 text-gray-700";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <SidebarTrigger />
        <Link to="/" className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900">
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Link>
      </div>

      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Pipeline Insight</h1>
        <div className="text-sm text-gray-500">Last updated: 2 minutes ago</div>
      </div>

      {/* Header KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{kpi.title}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <p className="text-2xl font-bold">{kpi.value}</p>
                    {kpi.percentage && (
                      <span className="text-sm text-gray-500">({kpi.percentage})</span>
                    )}
                  </div>
                  <div className="flex items-center gap-1 mt-1">
                    {getTrendIcon(kpi.trend)}
                    {kpi.change && (
                      <span className={`text-xs ${kpi.trend === 'down' ? 'text-red-600' : 'text-green-600'}`}>
                        {kpi.change}
                      </span>
                    )}
                    <span className="text-xs text-gray-500">{kpi.subtitle}</span>
                  </div>
                </div>
                <Mail className="h-8 w-8 text-gray-400" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Breakdown Bar */}
      <Card>
        <CardHeader>
          <CardTitle>Message Type Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex h-8 w-full rounded-lg overflow-hidden">
              {breakdownData.map((item, index) => (
                <div
                  key={item.type}
                  className="flex items-center justify-center text-white text-xs font-medium cursor-pointer hover:opacity-80 transition-opacity"
                  style={{
                    backgroundColor: item.color,
                    width: `${(item.count / 137) * 100}%`
                  }}
                  title={`${item.type}: ${item.count} (${Math.round((item.count / 137) * 100)}%)`}
                >
                  {item.count > 10 && item.type}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-5 gap-4">
              {breakdownData.map((item) => (
                <div key={item.type} className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <div
                      className="w-3 h-3 rounded"
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span className="text-sm font-medium">{item.count}</span>
                  </div>
                  <p className="text-xs text-gray-600">{item.type}</p>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Confidence Distribution Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Confidence Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={confidenceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="range" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Trend Sparklines */}
        <Card>
          <CardHeader>
            <CardTitle>7-Day Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="volume" stroke="#3B82F6" strokeWidth={2} name="Volume" />
                <Line type="monotone" dataKey="confidence" stroke="#10B981" strokeWidth={2} name="Confidence %" />
                <Line type="monotone" dataKey="autoApprove" stroke="#8B5CF6" strokeWidth={2} name="Auto-approve %" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Open Review Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Items Requiring Review ({openReviewItems.length})</CardTitle>
            <Link to="/processing">
              <Button variant="outline" size="sm">View All</Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b">
                <tr>
                  <th className="text-left p-3 font-medium text-gray-700">Type</th>
                  <th className="text-left p-3 font-medium text-gray-700">Supplier</th>
                  <th className="text-left p-3 font-medium text-gray-700">Style #</th>
                  <th className="text-left p-3 font-medium text-gray-700">Confidence</th>
                  <th className="text-left p-3 font-medium text-gray-700">Age</th>
                </tr>
              </thead>
              <tbody>
                {openReviewItems.map((item, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="p-3">
                      <Badge className={getTypeColor(item.type)}>{item.type}</Badge>
                    </td>
                    <td className="p-3 text-sm">{item.supplier}</td>
                    <td className="p-3 text-sm font-mono">{item.styleNo}</td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <div className="w-12 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-500 h-2 rounded-full"
                            style={{width: `${item.confidence}%`}}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">{item.confidence}%</span>
                      </div>
                    </td>
                    <td className="p-3 text-sm text-gray-600">{item.age}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Error Log Panel */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <XCircle className="h-5 w-5 text-red-500" />
            Error Log ({errorLog.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {errorLog.map((error) => (
              <div key={error.id} className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-100">
                <div className="flex items-center gap-3">
                  <AlertCircle className="h-4 w-4 text-red-500" />
                  <div>
                    <div className="flex items-center gap-2">
                      <Badge className={getTypeColor(error.type)}>{error.type}</Badge>
                      <span className="text-sm font-medium">{error.supplier}</span>
                    </div>
                    <p className="text-xs text-red-700 mt-1">{error.reason}</p>
                  </div>
                </div>
                <span className="text-xs text-gray-500">{error.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PipelineInsight;
