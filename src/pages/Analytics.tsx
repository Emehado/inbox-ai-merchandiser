
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart3, TrendingUp, AlertTriangle, Clock } from "lucide-react";

const Analytics = () => {
  const riskHeatmapData = [
    { supplier: "EverBright Fashions", weeks: [1, 2, 2, 3, 2, 1, 1, 2] },
    { supplier: "TextilePro Co", weeks: [1, 1, 2, 2, 1, 2, 3, 2] },
    { supplier: "GlobalStitch Ltd", weeks: [1, 1, 1, 1, 2, 1, 1, 1] },
    { supplier: "ColorMax Textiles", weeks: [2, 3, 3, 2, 3, 3, 2, 3] },
    { supplier: "KnitWell Ltd", weeks: [1, 2, 1, 2, 2, 2, 1, 2] }
  ];

  const flaggedFields = [
    { field: "Ex-factory Date", count: 23, trend: "+12%" },
    { field: "Unit Cost", count: 18, trend: "+5%" },
    { field: "Carton Weight", count: 15, trend: "-8%" },
    { field: "Fabric Width", count: 12, trend: "+15%" },
    { field: "Payment Terms", count: 9, trend: "-3%" }
  ];

  const accuracyTrend = [
    { period: "Week 1", auto: 87, human: 98 },
    { period: "Week 2", auto: 89, human: 97 },
    { period: "Week 3", auto: 91, human: 98 },
    { period: "Week 4", auto: 93, human: 98 }
  ];

  const getRiskColor = (level: number) => {
    switch (level) {
      case 1: return "bg-green-500";
      case 2: return "bg-yellow-500";
      case 3: return "bg-red-500";
      default: return "bg-gray-300";
    }
  };

  const getRiskLabel = (level: number) => {
    switch (level) {
      case 1: return "Low";
      case 2: return "Medium";
      case 3: return "High";
      default: return "None";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <SidebarTrigger />
          <h1 className="text-3xl font-bold text-gray-900">Analytics & Early Warning</h1>
        </div>
        <div className="flex items-center gap-2">
          <Select defaultValue="30days">
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="90days">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">Export Report</Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Processing Accuracy</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">93.2%</div>
            <p className="text-xs text-green-600">+2.1% from last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High Risk Items</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">7</div>
            <p className="text-xs text-red-600">+3 from yesterday</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Processing Time</CardTitle>
            <Clock className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.2m</div>
            <p className="text-xs text-gray-600">-0.8m from last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Data Quality Score</CardTitle>
            <BarChart3 className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">8.7/10</div>
            <p className="text-xs text-purple-600">+0.3 from last month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Lead-time Risk Heat-map */}
        <Card>
          <CardHeader>
            <CardTitle>Lead-time Risk Heat-map</CardTitle>
            <p className="text-sm text-gray-600">Calendar weeks vs suppliers</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Week headers */}
              <div className="grid grid-cols-9 gap-1 text-xs font-medium text-gray-600">
                <div></div>
                <div className="text-center">W1</div>
                <div className="text-center">W2</div>
                <div className="text-center">W3</div>
                <div className="text-center">W4</div>
                <div className="text-center">W5</div>
                <div className="text-center">W6</div>
                <div className="text-center">W7</div>
                <div className="text-center">W8</div>
              </div>

              {/* Heat-map rows */}
              {riskHeatmapData.map((row, index) => (
                <div key={index} className="grid grid-cols-9 gap-1 items-center">
                  <div className="text-xs font-medium text-gray-700 pr-2 truncate">
                    {row.supplier}
                  </div>
                  {row.weeks.map((level, weekIndex) => (
                    <Button
                      key={weekIndex}
                      variant="outline"
                      size="sm"
                      className={`h-8 w-full ${getRiskColor(level)} border-none hover:opacity-80`}
                      title={`${row.supplier} - Week ${weekIndex + 1}: ${getRiskLabel(level)} Risk`}
                    >
                      <span className="sr-only">{getRiskLabel(level)}</span>
                    </Button>
                  ))}
                </div>
              ))}

              {/* Legend */}
              <div className="flex items-center gap-4 pt-4 border-t">
                <span className="text-xs font-medium">Risk Level:</span>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded"></div>
                  <span className="text-xs">Low</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded"></div>
                  <span className="text-xs">Medium</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded"></div>
                  <span className="text-xs">High</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Extraction Accuracy Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Extraction Accuracy Trend</CardTitle>
            <p className="text-sm text-gray-600">Auto vs human accuracy</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {accuracyTrend.map((period, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{period.period}</span>
                    <div className="flex gap-4">
                      <span className="text-blue-600">Auto: {period.auto}%</span>
                      <span className="text-green-600">Human: {period.human}%</span>
                    </div>
                  </div>
                  <div className="relative">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full relative"
                        style={{width: `${period.auto}%`}}
                      >
                        <div 
                          className="absolute top-0 left-0 bg-green-500 h-2 rounded-full opacity-60"
                          style={{width: `${period.human}%`}}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Most Flagged Fields */}
      <Card>
        <CardHeader>
          <CardTitle>Most Flagged Fields</CardTitle>
          <p className="text-sm text-gray-600">Fields requiring manual intervention</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {flaggedFields.map((field, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-sm font-bold text-blue-600">{index + 1}</span>
                  </div>
                  <div>
                    <p className="font-medium">{field.field}</p>
                    <p className="text-sm text-gray-600">{field.count} issues this month</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Badge 
                    variant={field.trend.startsWith('+') ? 'destructive' : 'secondary'}
                    className={field.trend.startsWith('+') ? '' : 'bg-green-100 text-green-700'}
                  >
                    {field.trend}
                  </Badge>
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full"
                      style={{width: `${(field.count / 30) * 100}%`}}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;
