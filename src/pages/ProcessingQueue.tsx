
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Search, Filter, FileText, Download, Eye } from "lucide-react";
import { ReviewDrawer } from "@/components/ReviewDrawer";

const ProcessingQueue = () => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [reviewItem, setReviewItem] = useState<any>(null);
  const [isReviewOpen, setIsReviewOpen] = useState(false);

  const queueItems = [
    {
      id: "1",
      type: "PO",
      supplier: "EverBright Fashions Ltd",
      styleNo: "24-SS-214",
      exFactory: "2025-07-14",
      confidence: 93,
      attachments: ["PO_214.pdf", "Cost_214.xlsx"],
      status: "Needs Review",
      severity: "warning"
    },
    {
      id: "2", 
      type: "Cost Sheet",
      supplier: "TextilePro Co",
      styleNo: "24-AW-089",
      exFactory: "2025-09-22",
      confidence: 87,
      attachments: ["CostSheet_089.xlsx"],
      status: "Needs Review",
      severity: "warning"
    },
    {
      id: "3",
      type: "BOM Update",
      supplier: "GlobalStitch Ltd",
      styleNo: "24-SS-156",
      exFactory: "2025-08-01",
      confidence: 96,
      attachments: ["BOM_156.pdf"],
      status: "Auto-Approved",
      severity: "success"
    },
    {
      id: "4",
      type: "Lab-dip",
      supplier: "ColorMax Textiles",
      styleNo: "24-SS-203",
      exFactory: "2025-06-30",
      confidence: 74,
      attachments: ["Labdip_203.jpg", "Specs_203.pdf"],
      status: "Low Confidence",
      severity: "error"
    }
  ];

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 95) return "bg-green-500";
    if (confidence >= 80) return "bg-yellow-500";
    return "bg-red-500";
  };

  const getStatusBadge = (status: string, severity: string) => {
    if (severity === "success") return <Badge className="bg-green-100 text-green-700">{status}</Badge>;
    if (severity === "warning") return <Badge variant="outline" className="border-orange-300 text-orange-700">{status}</Badge>;
    return <Badge variant="destructive">{status}</Badge>;
  };

  const handleReview = (item: any) => {
    setReviewItem(item);
    setIsReviewOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <SidebarTrigger />
          <h1 className="text-3xl font-bold text-gray-900">Processing Queue</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
          <Button variant="outline" size="sm" disabled={selectedItems.length === 0}>
            Bulk Approve ({selectedItems.length})
          </Button>
          <Button variant="outline" size="sm" disabled={selectedItems.length === 0}>
            Bulk Reject ({selectedItems.length})
          </Button>
        </div>
      </div>

      {/* Search and Stats */}
      <div className="flex items-center justify-between">
        <div className="relative w-96">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input placeholder="Search by supplier, style, or PO..." className="pl-10" />
        </div>
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <span>4 items • 2 need review • 1 low confidence</span>
        </div>
      </div>

      {/* Queue Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b bg-gray-50">
                <tr>
                  <th className="p-4 text-left">
                    <Checkbox />
                  </th>
                  <th className="p-4 text-left font-medium text-gray-700">Type</th>
                  <th className="p-4 text-left font-medium text-gray-700">Supplier</th>
                  <th className="p-4 text-left font-medium text-gray-700">Style #</th>
                  <th className="p-4 text-left font-medium text-gray-700">Ex-factory</th>
                  <th className="p-4 text-left font-medium text-gray-700">Confidence</th>
                  <th className="p-4 text-left font-medium text-gray-700">Attachments</th>
                  <th className="p-4 text-left font-medium text-gray-700">Status</th>
                  <th className="p-4 text-left font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {queueItems.map((item) => (
                  <tr key={item.id} className="border-b hover:bg-gray-50">
                    <td className="p-4">
                      <Checkbox 
                        checked={selectedItems.includes(item.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedItems([...selectedItems, item.id]);
                          } else {
                            setSelectedItems(selectedItems.filter(id => id !== item.id));
                          }
                        }}
                      />
                    </td>
                    <td className="p-4">
                      <Badge variant="secondary">{item.type}</Badge>
                    </td>
                    <td className="p-4">
                      <div>
                        <p className="font-medium text-sm">{item.supplier}</p>
                      </div>
                    </td>
                    <td className="p-4 font-mono text-sm">{item.styleNo}</td>
                    <td className="p-4 text-sm">{item.exFactory}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${getConfidenceColor(item.confidence)}`}
                            style={{width: `${item.confidence}%`}}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">{item.confidence}%</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex flex-wrap gap-1">
                        {item.attachments.map((file, index) => (
                          <div key={index} className="flex items-center gap-1 text-xs bg-gray-100 px-2 py-1 rounded">
                            <FileText className="h-3 w-3" />
                            {file}
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="p-4">
                      {getStatusBadge(item.status, item.severity)}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleReview(item)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        {item.severity !== "success" && (
                          <Button variant="outline" size="sm">
                            Review
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Review Drawer */}
      <Sheet open={isReviewOpen} onOpenChange={setIsReviewOpen}>
        <SheetContent side="right" className="w-[800px] max-w-[90vw]">
          <SheetHeader>
            <SheetTitle>Review Item</SheetTitle>
          </SheetHeader>
          {reviewItem && <ReviewDrawer item={reviewItem} />}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default ProcessingQueue;
