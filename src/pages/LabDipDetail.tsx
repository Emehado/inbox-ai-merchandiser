
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ArrowLeft, Calendar, FileText, AlertTriangle, User, Bot, Building2 } from "lucide-react";
import { Link } from "react-router-dom";

const LabDipDetail = () => {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header with Back Navigation */}
      <div className="flex items-center gap-4">
        <SidebarTrigger />
        <Link to="/" className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900">
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Link>
      </div>

      {/* Exception Header */}
      <Card className="border-orange-200 bg-orange-50">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-3">
              <Badge variant="secondary" className="text-base px-4 py-2 bg-orange-500 text-white">
                <AlertTriangle className="h-4 w-4 mr-2" />
                Lab-dip #742 – Missing Data
              </Badge>
              
              <div className="space-y-2">
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-gray-600">Style #:</span>
                  <span className="font-medium">24-SS-189</span>
                  <span className="text-gray-600">Supplier:</span>
                  <span className="font-medium">KnitWell Ltd</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-orange-500" />
                  <span className="text-sm text-gray-600">Missing Field:</span>
                  <span className="text-lg font-bold text-orange-600">Fabric Width</span>
                  <Badge variant="secondary" className="ml-2 bg-orange-100 text-orange-700">Required</Badge>
                </div>
              </div>
            </div>
            
            <div className="text-right text-sm text-gray-500">
              Detected: May 28, 2025 09:32
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Timeline Widget */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Timeline
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
              <div className="flex-1">
                <p className="font-medium text-sm">Lab-dip requested</p>
                <p className="text-xs text-gray-600">2025-05-15</p>
              </div>
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <User className="h-3 w-3" />
                Merchandiser
              </div>
            </div>
            
            <div className="flex items-center gap-4 p-3 bg-blue-50 rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
              <div className="flex-1">
                <p className="font-medium text-sm">Initial submission</p>
                <p className="text-xs text-gray-600">2025-05-27</p>
              </div>
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <Building2 className="h-3 w-3" />
                KnitWell
              </div>
            </div>
            
            <div className="flex items-center gap-4 p-3 bg-orange-50 rounded-lg border border-orange-200">
              <div className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0"></div>
              <div className="flex-1">
                <p className="font-medium text-sm text-orange-700">AI detected missing data</p>
                <p className="text-xs text-orange-600 font-medium">2025-05-28 09:32</p>
              </div>
              <div className="flex items-center gap-1 text-xs text-orange-600">
                <Bot className="h-3 w-3" />
                AI Mailbox
              </div>
            </div>
            
            <div className="flex items-center gap-4 p-3 bg-blue-50 rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
              <div className="flex-1">
                <p className="font-medium text-sm">Follow-up request sent</p>
                <p className="text-xs text-gray-600">2025-05-28 09:45</p>
              </div>
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <Bot className="h-3 w-3" />
                Bot
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Root Cause / Notes */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Root Cause & Notes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <Bot className="h-4 w-4" />
            <AlertDescription>
              <strong>AI Summary:</strong> KnitWell submitted lab-dip #742 with color and construction details but omitted fabric width specification. This is a required field for production planning and costing calculations. Previous communications show supplier typically uses 150cm width for jersey knits.
            </AlertDescription>
          </Alert>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Merchandiser Comments</label>
            <Textarea 
              placeholder="Add your notes about this missing data..."
              className="min-h-[100px]"
              defaultValue="Contacted KnitWell for fabric width confirmation. Assuming 150cm based on previous orders but need formal confirmation for accurate costing."
            />
          </div>
        </CardContent>
      </Card>

      {/* Attachments */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Attachments
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
              <div className="flex items-center gap-3">
                <FileText className="h-8 w-8 text-blue-600" />
                <div>
                  <p className="font-medium">LabDip_742.pdf</p>
                  <p className="text-xs text-gray-500">Color swatch and construction details</p>
                </div>
              </div>
            </div>
            
            <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
              <div className="flex items-center gap-3">
                <FileText className="h-8 w-8 text-orange-600" />
                <div>
                  <p className="font-medium">Email_Thread.eml</p>
                  <p className="text-xs text-gray-500">Original submission missing width spec</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Affected Objects Widget */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Affected Objects</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="cursor-pointer hover:bg-gray-100">
              Cost Sheet #189-REV1
            </Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-gray-100">
              Tech Pack #TP-189
            </Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-gray-100">
              PO #3189 (pending)
            </Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-gray-100">
              Fabric Booking #FB-189
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Sticky Action Bar */}
      <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4 -mx-6">
        <div className="flex justify-center gap-4 max-w-4xl mx-auto">
          <Button variant="default" size="lg">
            Request Data
          </Button>
          <Button variant="outline" size="lg">
            Use Default (150cm)
          </Button>
          <Button variant="destructive" size="lg">
            Flag as Critical
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LabDipDetail;
