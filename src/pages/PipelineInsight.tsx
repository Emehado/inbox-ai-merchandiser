
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ArrowLeft, TrendingDown, TrendingUp, BarChart3, AlertTriangle, Clock, CheckCircle, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fakeApi } from "../services/fakeApi";

const PipelineInsight = () => {
  const { data: metrics, isLoading } = useQuery({
    queryKey: ['pipeline-metrics'],
    queryFn: fakeApi.getPipelineMetrics,
  });

  const { data: processingItems = [] } = useQuery({
    queryKey: ['processing-items'],
    queryFn: fakeApi.getProcessingItems,
  });

  if (isLoading) {
    return <div className="p-6">Loading pipeline insights...</div>;
  }

  const reviewItems = processingItems.filter(item => item.status === 'review').slice(0, 4);
  const errorItems = processingItems.filter(item => item.status === 'error');

  return (
    <div className="space-y-6">
      {/* Header with Back Navigation */}
      <div className="flex items-center gap-4">
        <SidebarTrigger />
        <Link to="/" className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900">
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">Pipeline Insight</h1>
      </div>

      {/* Header KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Mails</CardTitle>
            <Mail className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics?.totalMails}</div>
            <div className="flex items-center gap-1 text-xs">
              <TrendingDown className="h-3 w-3 text-red-500" />
              <span className="text-red-500">-12% vs prev day</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Auto-approved</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{metrics?.autoApproved}</div>
            <p className="text-xs text-gray-600">
              ({Math.round(((metrics?.autoApproved || 0) / (metrics?.totalMails || 1)) * 100)}%)
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Human Reviews</CardTitle>
            <Clock className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">{metrics?.humanReviews}</div>
            <p className="text-xs text-gray-600">
              ({Math.round(((metrics?.humanReviews || 0) / (metrics?.totalMails || 1)) * 100)}%)
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Errors</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{metrics?.errors}</div>
            <p className="text-xs text-gray-600">
              ({Math.round(((metrics?.errors || 0) / (metrics?.totalMails || 1)) * 100 * 10) / 10}%)
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Breakdown Bar */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Message Type Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Stacked Bar */}
            <div className="relative h-8 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="absolute left-0 top-0 h-full bg-blue-500" 
                style={{width: `${((metrics?.breakdown.po || 0) / (metrics?.totalMails || 1)) * 100}%`}}
              ></div>
              <div 
                className="absolute top-0 h-full bg-green-500" 
                style={{
                  left: `${((metrics?.breakdown.po || 0) / (metrics?.totalMails || 1)) * 100}%`,
                  width: `${((metrics?.breakdown.costSheet || 0) / (metrics?.totalMails || 1)) * 100}%`
                }}
              ></div>
              <div 
                className="absolute top-0 h-full bg-purple-500" 
                style={{
                  left: `${(((metrics?.breakdown.po || 0) + (metrics?.breakdown.costSheet || 0)) / (metrics?.totalMails || 1)) * 100}%`,
                  width: `${((metrics?.breakdown.labDip || 0) / (metrics?.totalMails || 1)) * 100}%`
                }}
              ></div>
              <div 
                className="absolute top-0 h-full bg-orange-500" 
                style={{
                  left: `${(((metrics?.breakdown.po || 0) + (metrics?.breakdown.costSheet || 0) + (metrics?.breakdown.labDip || 0)) / (metrics?.totalMails || 1)) * 100}%`,
                  width: `${((metrics?.breakdown.cert || 0) / (metrics?.totalMails || 1)) * 100}%`
                }}
              ></div>
              <div 
                className="absolute top-0 h-full bg-gray-500" 
                style={{
                  left: `${(((metrics?.breakdown.po || 0) + (metrics?.breakdown.costSheet || 0) + (metrics?.breakdown.labDip || 0) + (metrics?.breakdown.cert || 0)) / (metrics?.totalMails || 1)) * 100}%`,
                  width: `${((metrics?.breakdown.noise || 0) / (metrics?.totalMails || 1)) * 100}%`
                }}
              ></div>
            </div>

            {/* Legend */}
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded"></div>
                <span>PO ({metrics?.breakdown.po})</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded"></div>
                <span>Cost ({metrics?.breakdown.costSheet})</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-purple-500 rounded"></div>
                <span>Lab-Dip ({metrics?.breakdown.labDip})</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-orange-500 rounded"></div>
                <span>Cert ({metrics?.breakdown.cert})</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gray-500 rounded"></div>
                <span>Noise ({metrics?.breakdown.noise})</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Confidence Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Confidence Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {metrics?.confidenceDistribution.map((bucket, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="w-16 text-sm font-medium">{bucket.range}</div>
                  <div className="flex-1 relative">
                    <div className="h-6 bg-gray-200 rounded">
                      <div 
                        className="h-6 bg-blue-500 rounded hover:bg-blue-600 cursor-pointer transition-colors"
                        style={{width: `${(bucket.count / (metrics?.totalMails || 1)) * 100}%`}}
                        title={`${bucket.count} items`}
                      ></div>
                    </div>
                  </div>
                  <div className="w-8 text-sm text-gray-600">{bucket.count}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Open Review Table */}
        <Card>
          <CardHeader>
            <CardTitle>Items Needing Review</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {reviewItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors">
                  <div className="flex items-center gap-3">
                    <Badge variant="outline">{item.type}</Badge>
                    <div>
                      <p className="font-medium text-sm">{item.supplier}</p>
                      <p className="text-xs text-gray-600">{item.subject}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant="secondary" className="bg-amber-100 text-amber-700">
                      {item.confidence}%
                    </Badge>
                    <p className="text-xs text-gray-600 mt-1">
                      {new Date(item.received).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
              {reviewItems.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No items need review
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Error Log Panel */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              Error Log
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {errorItems.map((item) => (
                <div key={item.id} className="p-3 bg-red-50 rounded-lg border border-red-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-sm text-red-900">{item.supplier}</p>
                      <p className="text-xs text-red-700">{item.subject}</p>
                    </div>
                    <Badge variant="destructive">OCR Fail</Badge>
                  </div>
                  <p className="text-xs text-gray-600 mt-2">
                    {new Date(item.received).toLocaleString()}
                  </p>
                </div>
              ))}
              {errorItems.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No errors today
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Trend Spark-lines */}
      <Card>
        <CardHeader>
          <CardTitle>7-Day Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Volume Trend */}
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Daily Volume</h4>
              <div className="flex items-end gap-1 h-12">
                {metrics?.trendData.map((day, index) => (
                  <div
                    key={index}
                    className="bg-blue-500 rounded-t flex-1"
                    style={{height: `${(day.volume / 150) * 100}%`}}
                    title={`${day.volume} emails on ${day.date}`}
                  ></div>
                ))}
              </div>
              <div className="flex items-center gap-1 text-xs">
                <TrendingUp className="h-3 w-3 text-green-500" />
                <span className="text-green-500">+8% week over week</span>
              </div>
            </div>

            {/* Confidence Trend */}
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Avg Confidence</h4>
              <div className="flex items-end gap-1 h-12">
                {metrics?.trendData.map((day, index) => (
                  <div
                    key={index}
                    className="bg-green-500 rounded-t flex-1"
                    style={{height: `${day.confidence}%`}}
                    title={`${day.confidence}% confidence on ${day.date}`}
                  ></div>
                ))}
              </div>
              <div className="flex items-center gap-1 text-xs">
                <TrendingUp className="h-3 w-3 text-green-500" />
                <span className="text-green-500">+2% this week</span>
              </div>
            </div>

            {/* Auto-approve Rate */}
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Auto-approve Rate</h4>
              <div className="flex items-end gap-1 h-12">
                {metrics?.trendData.map((day, index) => (
                  <div
                    key={index}
                    className="bg-purple-500 rounded-t flex-1"
                    style={{height: `${day.autoApproveRate}%`}}
                    title={`${day.autoApproveRate}% auto-approved on ${day.date}`}
                  ></div>
                ))}
              </div>
              <div className="flex items-center gap-1 text-xs">
                <TrendingUp className="h-3 w-3 text-green-500" />
                <span className="text-green-500">+5% this week</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PipelineInsight;
