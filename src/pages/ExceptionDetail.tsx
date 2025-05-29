
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ArrowLeft, Calendar, FileText, AlertTriangle, User, Bot, Building2 } from "lucide-react";
import { Link } from "react-router-dom";

const ExceptionDetail = () => {
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
      <Card className="border-red-200 bg-red-50">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-3">
              <Badge variant="destructive" className="text-base px-4 py-2 bg-red-600">
                <AlertTriangle className="h-4 w-4 mr-2" />
                PO #3245 – Date Slip
              </Badge>
              
              <div className="space-y-2">
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-gray-600">Style #:</span>
                  <span className="font-medium">24-SS-214</span>
                  <span className="text-gray-600">Supplier:</span>
                  <span className="font-medium">EverBright Fashions</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600">Ex-factory:</span>
                  <span className="line-through text-gray-500">08-Jul-2025</span>
                  <span className="text-lg font-bold text-red-600">→ 14-Jul-2025</span>
                  <Badge variant="destructive" className="ml-2">+6 days</Badge>
                </div>
              </div>
            </div>
            
            <div className="text-right text-sm text-gray-500">
              Detected: May 28, 2025 07:14
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
                <p className="font-medium text-sm">Original PO issued</p>
                <p className="text-xs text-gray-600">2025-05-01</p>
              </div>
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <Building2 className="h-3 w-3" />
                EverBright
              </div>
            </div>
            
            <div className="flex items-center gap-4 p-3 bg-orange-50 rounded-lg">
              <div className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0"></div>
              <div className="flex-1">
                <p className="font-medium text-sm">Revision request</p>
                <p className="text-xs text-gray-600">2025-05-27</p>
              </div>
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <Building2 className="h-3 w-3" />
                EverBright
              </div>
            </div>
            
            <div className="flex items-center gap-4 p-3 bg-red-50 rounded-lg border border-red-200">
              <div className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0"></div>
              <div className="flex-1">
                <p className="font-medium text-sm text-red-700">AI detected slip</p>
                <p className="text-xs text-red-600 font-medium">2025-05-28 07:14</p>
              </div>
              <div className="flex items-center gap-1 text-xs text-red-600">
                <Bot className="h-3 w-3" />
                AI Mailbox
              </div>
            </div>
            
            <div className="flex items-center gap-4 p-3 bg-blue-50 rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
              <div className="flex-1">
                <p className="font-medium text-sm">Follow-up e-mail sent</p>
                <p className="text-xs text-gray-600">2025-05-28 07:20</p>
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
              <strong>AI Summary:</strong> EverBright Fashions requested ex-factory date extension due to fabric delay from their mill. Original fabric shipment delayed by 5 days due to quality control issues. Supplier estimates production can resume by June 2nd, pushing final shipment to July 14th.
            </AlertDescription>
          </Alert>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Merchandiser Comments</label>
            <Textarea 
              placeholder="Add your notes about this exception..."
              className="min-h-[100px]"
              defaultValue="Contacted supplier for mitigation plan. Checking with other vendors for backup options."
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
                <FileText className="h-8 w-8 text-red-600" />
                <div>
                  <p className="font-medium">PO_214.pdf</p>
                  <p className="text-xs text-gray-500">Page 2 - Shipment terms highlighted</p>
                </div>
              </div>
            </div>
            
            <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
              <div className="flex items-center gap-3">
                <FileText className="h-8 w-8 text-green-600" />
                <div>
                  <p className="font-medium">Cost_214.xlsx</p>
                  <p className="text-xs text-gray-500">Sheet "Schedule" - Dates highlighted</p>
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
              Cost Sheet #214-REV2
            </Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-gray-100">
              Lab-dip #742
            </Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-gray-100">
              Carton Spec #CS-214
            </Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-gray-100">
              BOM Update #BOM-214-v3
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Sticky Action Bar */}
      <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4 -mx-6">
        <div className="flex justify-center gap-4 max-w-4xl mx-auto">
          <Button variant="destructive" size="lg">
            Accept Change
          </Button>
          <Button variant="outline" size="lg">
            Negotiate Date
          </Button>
          <Button variant="default" size="lg">
            Escalate
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ExceptionDetail;
