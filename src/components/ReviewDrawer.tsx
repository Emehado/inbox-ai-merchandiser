
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { FileText, Send, Flag, Save } from "lucide-react";

interface ReviewDrawerProps {
  item: any;
}

export const ReviewDrawer = ({ item }: ReviewDrawerProps) => {
  const sampleData = {
    "po_no": "3245",
    "style_no": "24-SS-214", 
    "supplier": "EverBright Fashions Ltd",
    "qty": 12000,
    "ex_factory": "2025-07-14",
    "unit_cost": 8.45,
    "currency": "USD",
    "carton_lwh_cm": [56, 40, 32],
    "pcs_per_carton": 12,
    "carton_weight_kg": 19.2,
    "incoterms": "FOB",
    "port": "Shanghai",
    "payment_terms": "LC 90 days"
  };

  return (
    <div className="space-y-6 mt-6">
      {/* Action Buttons */}
      <div className="flex justify-between items-center">
        <Badge variant="outline" className="border-orange-300 text-orange-700">
          Confidence: {item.confidence}%
        </Badge>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Flag className="h-4 w-4 mr-2" />
            Flag Error
          </Button>
          <Button variant="outline" size="sm">
            <Send className="h-4 w-4 mr-2" />
            Send Follow-up
          </Button>
          <Button size="sm">
            <Save className="h-4 w-4 mr-2" />
            Save
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Left Pane - JSON Preview */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Extracted Data</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="bg-gray-50 p-4 rounded-lg text-sm overflow-auto font-mono">
              {JSON.stringify(sampleData, null, 2)}
            </pre>
          </CardContent>
        </Card>

        {/* Right Pane - Attachment Preview */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Attachment Preview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Attachment Tabs */}
              <div className="flex gap-2">
                {item.attachments.map((file: string, index: number) => (
                  <Button key={index} variant="outline" size="sm">
                    {file}
                  </Button>
                ))}
              </div>

              {/* Mock PDF/Excel Preview */}
              <div className="border rounded-lg p-4 bg-gray-50 min-h-[400px]">
                <div className="text-center text-gray-500 mb-4">
                  <FileText className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                  <p className="font-medium">PO_214.pdf - Page 1 of 3</p>
                </div>
                
                {/* Mock content with highlights */}
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span>PO Number:</span>
                    <span className="bg-yellow-200 px-1 rounded">3245</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Style Number:</span>
                    <span className="bg-yellow-200 px-1 rounded">24-SS-214</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Quantity:</span>
                    <span className="bg-yellow-200 px-1 rounded">12,000 pcs</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Ex-factory Date:</span>
                    <span className="bg-yellow-200 px-1 rounded">July 14, 2025</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Unit Cost:</span>
                    <span className="bg-yellow-200 px-1 rounded">$8.45</span>
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="space-y-2">
                    <p className="font-medium">Carton Specifications:</p>
                    <div className="pl-4 space-y-1">
                      <div className="flex justify-between">
                        <span>Dimensions (L×W×H):</span>
                        <span className="bg-yellow-200 px-1 rounded">56 × 40 × 32 cm</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Pcs per carton:</span>
                        <span className="bg-yellow-200 px-1 rounded">12</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Gross weight:</span>
                        <span className="bg-yellow-200 px-1 rounded">19.2 kg</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Field Validation Status */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Field Validation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <p className="font-medium text-green-700">High Confidence</p>
              <div className="space-y-1 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>PO Number</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Style Number</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Quantity</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <p className="font-medium text-orange-700">Medium Confidence</p>
              <div className="space-y-1 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span>Ex-factory Date</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span>Unit Cost</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <p className="font-medium text-red-700">Low Confidence</p>
              <div className="space-y-1 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span>Carton Weight</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
