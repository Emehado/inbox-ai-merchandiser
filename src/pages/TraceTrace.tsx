
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Search, Download, AlertCircle, CheckCircle, Calendar } from "lucide-react";

const TraceTrace = () => {
  const certificates = [
    {
      styleNo: "24-SS-214",
      certificate: "GRS-Cert-897",
      type: "Global Recycled Standard",
      supplier: "EverBright Fashions",
      issueDate: "2023-04-01",
      expiryDate: "2026-03-31",
      status: "valid",
      daysToExpiry: 456
    },
    {
      styleNo: "24-AW-014", 
      certificate: "Oeko-Tex 4311",
      type: "Standard 100",
      supplier: "KnitWell Ltd",
      issueDate: "2023-11-15",
      expiryDate: "2025-11-12",
      status: "warning",
      daysToExpiry: 90
    },
    {
      styleNo: "24-SS-156",
      certificate: "GOTS-2024-789",
      type: "Global Organic Textile Standard",
      supplier: "GlobalStitch Ltd",
      issueDate: "2024-01-10",
      expiryDate: "2027-01-09",
      status: "valid",
      daysToExpiry: 712
    },
    {
      styleNo: "24-AW-032",
      certificate: "BCI-REG-456",
      type: "Better Cotton Initiative",
      supplier: "ColorMax Textiles",
      issueDate: "2022-06-20",
      expiryDate: "2024-06-19",
      status: "expired",
      daysToExpiry: -162
    },
    {
      styleNo: "24-SS-203",
      certificate: "Cradle2Cradle-C2C",
      type: "Cradle to Cradle Certified",
      supplier: "EcoFiber Mills",
      issueDate: "2023-09-05",
      expiryDate: "2025-09-04",
      status: "valid",
      daysToExpiry: 285
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "valid":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "warning":
        return <AlertCircle className="h-4 w-4 text-orange-500" />;
      case "expired":
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string, daysToExpiry: number) => {
    switch (status) {
      case "valid":
        return <Badge className="bg-green-100 text-green-700">✅ Valid</Badge>;
      case "warning":
        return <Badge variant="outline" className="border-orange-300 text-orange-700">⚠️ {daysToExpiry}d</Badge>;
      case "expired":
        return <Badge variant="destructive">❌ Expired</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const validCount = certificates.filter(c => c.status === "valid").length;
  const warningCount = certificates.filter(c => c.status === "warning").length;
  const expiredCount = certificates.filter(c => c.status === "expired").length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <SidebarTrigger />
          <h1 className="text-3xl font-bold text-gray-900">Trace & Trace</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Compliance Report
          </Button>
        </div>
      </div>

      {/* Search and Stats */}
      <div className="flex items-center justify-between">
        <div className="relative w-96">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input placeholder="Search by style, certificate, or supplier..." className="pl-10" />
        </div>
        <div className="flex items-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span>{validCount} Valid</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
            <span>{warningCount} Expiring Soon</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span>{expiredCount} Expired</span>
          </div>
        </div>
      </div>

      {/* Compliance Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-700">Valid Certificates</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{validCount}</div>
            <p className="text-xs text-green-600">All requirements met</p>
          </CardContent>
        </Card>

        <Card className="border-orange-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-700">Expiring Soon</CardTitle>
            <AlertCircle className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{warningCount}</div>
            <p className="text-xs text-orange-600">Within 90 days</p>
          </CardContent>
        </Card>

        <Card className="border-red-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-red-700">Expired</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{expiredCount}</div>
            <p className="text-xs text-red-600">Immediate attention required</p>
          </CardContent>
        </Card>
      </div>

      {/* Certificates Table */}
      <Card>
        <CardHeader>
          <CardTitle>Certificate Tracking</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b bg-gray-50">
                <tr>
                  <th className="p-4 text-left font-medium text-gray-700">Style #</th>
                  <th className="p-4 text-left font-medium text-gray-700">Certificate</th>
                  <th className="p-4 text-left font-medium text-gray-700">Type</th>
                  <th className="p-4 text-left font-medium text-gray-700">Supplier</th>
                  <th className="p-4 text-left font-medium text-gray-700">Issue Date</th>
                  <th className="p-4 text-left font-medium text-gray-700">Expiry Date</th>
                  <th className="p-4 text-left font-medium text-gray-700">Status</th>
                  <th className="p-4 text-left font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {certificates.map((cert, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="p-4 font-mono text-sm">{cert.styleNo}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(cert.status)}
                        <span className="font-medium text-sm">{cert.certificate}</span>
                      </div>
                    </td>
                    <td className="p-4 text-sm">{cert.type}</td>
                    <td className="p-4 text-sm">{cert.supplier}</td>
                    <td className="p-4 text-sm">{cert.issueDate}</td>
                    <td className="p-4 text-sm">{cert.expiryDate}</td>
                    <td className="p-4">
                      {getStatusBadge(cert.status, cert.daysToExpiry)}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                        {cert.status === "warning" || cert.status === "expired" ? (
                          <Button variant="outline" size="sm" className="text-orange-600">
                            Renew
                          </Button>
                        ) : null}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Renewals */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Upcoming Renewals
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {certificates
              .filter(cert => cert.status === "warning")
              .map((cert, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-orange-50 rounded-lg border border-orange-100">
                  <div className="flex items-center gap-3">
                    <AlertCircle className="h-5 w-5 text-orange-500" />
                    <div>
                      <p className="font-medium text-sm">{cert.certificate} - {cert.styleNo}</p>
                      <p className="text-xs text-gray-600">{cert.supplier} • Expires {cert.expiryDate}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="border-orange-300 text-orange-700">
                      {cert.daysToExpiry} days
                    </Badge>
                    <Button size="sm" variant="outline">
                      Set Reminder
                    </Button>
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TraceTrace;
