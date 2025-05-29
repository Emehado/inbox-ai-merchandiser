
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Clock, CheckCircle, AlertTriangle, X } from "lucide-react";
import { useState } from "react";

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

interface ChaseUpDrawerProps {
  chaseUp: ChaseUp | null;
  isOpen: boolean;
  onClose: () => void;
}

const cannedTemplates = [
  "Gentle reminder about the pending information request.",
  "This information is required to proceed with production.",
  "Please prioritize this request to avoid delays.",
  "Could you provide an estimated timeline for this information?"
];

export const ChaseUpDrawer = ({ chaseUp, isOpen, onClose }: ChaseUpDrawerProps) => {
  const [quickReply, setQuickReply] = useState("");

  if (!chaseUp) return null;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "awaiting":
        return <Clock className="h-4 w-4 text-amber-500" />;
      case "replied":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "overdue":
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default:
        return <Mail className="h-4 w-4" />;
    }
  };

  const getStatusBadge = (status: string, repliedHours?: number, overdueHours?: number) => {
    switch (status) {
      case "awaiting":
        return <Badge variant="secondary" className="bg-amber-100 text-amber-700">Awaiting Reply</Badge>;
      case "replied":
        return <Badge variant="secondary" className="bg-green-100 text-green-700">Replied {repliedHours}h ago</Badge>;
      case "overdue":
        return <Badge variant="destructive">Overdue {overdueHours}h</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-[600px] sm:max-w-[600px]">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-3">
            {getStatusIcon(chaseUp.status)}
            <div>
              <div className="text-lg font-semibold">{chaseUp.subject}</div>
              <div className="text-sm text-gray-500 font-normal">{chaseUp.supplier}</div>
            </div>
          </SheetTitle>
        </SheetHeader>

        <div className="space-y-6 mt-6">
          {/* Status and Details */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium">Message Details</CardTitle>
                {getStatusBadge(chaseUp.status, chaseUp.repliedHours, chaseUp.overdueHours)}
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Sent:</span>
                  <div className="font-medium">{new Date(chaseUp.sent).toLocaleString()}</div>
                </div>
                <div>
                  <span className="text-gray-500">SLA:</span>
                  <div className="font-medium">{chaseUp.slaHours} hours</div>
                </div>
                <div>
                  <span className="text-gray-500">To:</span>
                  <div className="font-medium">{chaseUp.email}</div>
                </div>
                <div>
                  <span className="text-gray-500">Reason:</span>
                  <Badge variant="outline" className="text-xs">{chaseUp.reason}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Original Bot Message */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Mail className="h-4 w-4 text-blue-500" />
                Bot Message Sent
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                <pre className="whitespace-pre-wrap text-sm font-sans">{chaseUp.message}</pre>
              </div>
            </CardContent>
          </Card>

          {/* Supplier Reply (if exists) */}
          {chaseUp.reply && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Supplier Reply
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                  <pre className="whitespace-pre-wrap text-sm font-sans">{chaseUp.reply}</pre>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Quick Reply Section */}
          {chaseUp.status !== "replied" && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Quick Reply</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {cannedTemplates.map((template, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="text-xs"
                      onClick={() => setQuickReply(template)}
                    >
                      {template}
                    </Button>
                  ))}
                </div>
                <Textarea
                  placeholder="Type your follow-up message..."
                  value={quickReply}
                  onChange={(e) => setQuickReply(e.target.value)}
                  className="min-h-[100px]"
                />
                <div className="flex gap-2">
                  <Button className="flex-1">Send Follow-up</Button>
                  <Button variant="outline">Save Draft</Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t">
            <Button 
              variant={chaseUp.status === "replied" ? "default" : "outline"}
              className="flex-1"
            >
              Mark Complete
            </Button>
            <Button variant="outline" className="flex-1">
              Extend SLA
            </Button>
            {chaseUp.status === "overdue" && (
              <Button variant="destructive" className="flex-1">
                Escalate
              </Button>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
