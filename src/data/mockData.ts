// Centralized mock data store
export interface ChaseUp {
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

export interface Exception {
  id: string;
  type: "date_slip" | "missing_data";
  poNumber: string;
  styleNumber: string;
  supplier: string;
  status: "urgent" | "pending" | "warning";
  description: string;
  daysAffected?: number;
  detectedAt: string;
}

export interface ProcessingItem {
  id: string;
  type: "PO" | "Cost Sheet" | "Lab-dip" | "BOM" | "Certificate";
  supplier: string;
  subject: string;
  received: string;
  confidence: number;
  status: "review" | "auto" | "error";
  attachments: string[];
}

export interface SearchResult {
  id: number;
  question: string;
  answer: string;
  sources: Array<{
    file: string;
    location: string;
    type: string;
  }>;
  timestamp: string;
  confidence: number;
}

export interface PipelineMetrics {
  totalMails: number;
  autoApproved: number;
  humanReviews: number;
  errors: number;
  breakdown: {
    po: number;
    costSheet: number;
    labDip: number;
    cert: number;
    noise: number;
  };
  confidenceDistribution: Array<{
    range: string;
    count: number;
  }>;
  trendData: Array<{
    date: string;
    volume: number;
    confidence: number;
    autoApproveRate: number;
  }>;
}

// Mock data
export const mockChaseUps: ChaseUp[] = [
  {
    id: "1",
    sent: "2025-05-28 07:20",
    supplier: "EverBright Fashions",
    email: "alice@everbright-fashions.com",
    subject: "Carton size needed – PO #3245",
    reason: "Missing carton L/W/H",
    slaHours: 48,
    status: "awaiting",
    message: "Dear Alice,\n\nWe are missing the carton dimensions for PO #3245. Could you please provide the Length, Width, and Height specifications?\n\nBest regards,\nCentrade AI Bot"
  },
  {
    id: "2",
    sent: "2025-05-27 16:05",
    supplier: "KnitWell Ltd",
    email: "qc@knitwell.com",
    subject: "Lab-dip approval needed",
    reason: "Width missing",
    slaHours: 24,
    status: "replied",
    repliedHours: 5,
    message: "Hello QC Team,\n\nThe fabric width specification is missing from lab-dip #742. Please provide this information for approval.\n\nThank you,\nCentrade AI Bot",
    reply: "Hi, the fabric width is 58 inches. Please find updated specs attached. - QC Team"
  },
  {
    id: "3",
    sent: "2025-05-27 09:52",
    supplier: "Pacific Bags",
    email: "bob@pacific-bags.cn",
    subject: "HS code confirmation",
    reason: "Missing HTS code",
    slaHours: 24,
    status: "overdue",
    overdueHours: 11,
    message: "Dear Bob,\n\nWe need the HS/HTS code for the shipment. This is required for customs clearance.\n\nPlease provide at your earliest convenience.\n\nRegards,\nCentrade AI Bot"
  },
  {
    id: "4",
    sent: "2025-05-26 14:30",
    supplier: "TextilePro Co",
    email: "orders@textilepro.com",
    subject: "Color confirmation needed",
    reason: "Pantone mismatch",
    slaHours: 72,
    status: "awaiting",
    message: "Hello,\n\nThere's a discrepancy in the Pantone color specification. Please confirm the correct color code.\n\nBest,\nCentrade AI Bot"
  },
  {
    id: "5",
    sent: "2025-05-26 11:15",
    supplier: "GlobalStitch Ltd",
    email: "info@globalstitch.com",
    subject: "Size chart approval",
    reason: "Size spec missing",
    slaHours: 48,
    status: "replied",
    repliedHours: 2,
    message: "Dear Team,\n\nThe size chart for style #24-AW-019 is missing specifications for XL and XXL sizes.\n\nKind regards,\nCentrade AI Bot",
    reply: "Updated size chart attached with XL (42-44) and XXL (46-48) measurements. Thanks!"
  }
];

export const mockExceptions: Exception[] = [
  {
    id: "3245",
    type: "date_slip",
    poNumber: "3245",
    styleNumber: "24-SS-214",
    supplier: "EverBright Fashions",
    status: "urgent",
    description: "Ex-factory slipped",
    daysAffected: 6,
    detectedAt: "2025-05-28 07:14"
  },
  {
    id: "742",
    type: "missing_data",
    poNumber: "742",
    styleNumber: "24-SS-742",
    supplier: "KnitWell Ltd",
    status: "urgent",
    description: "Fabric width missing",
    detectedAt: "2025-05-28 06:30"
  },
  {
    id: "1024",
    type: "date_slip",
    poNumber: "1024",
    styleNumber: "24-AW-089",
    supplier: "TextilePro Co",
    status: "pending",
    description: "Lab-dip approval delayed",
    daysAffected: 2,
    detectedAt: "2025-05-27 14:22"
  },
  {
    id: "2156",
    type: "missing_data",
    poNumber: "2156",
    styleNumber: "24-SS-301",
    supplier: "GlobalStitch Ltd",
    status: "pending",
    description: "Size chart incomplete",
    detectedAt: "2025-05-27 11:15"
  },
  {
    id: "3847",
    type: "date_slip",
    poNumber: "3847",
    styleNumber: "24-AW-145",
    supplier: "Pacific Bags",
    status: "urgent",
    description: "Shipping delay due to material shortage",
    daysAffected: 8,
    detectedAt: "2025-05-26 16:45"
  },
  {
    id: "4921",
    type: "missing_data",
    poNumber: "4921",
    styleNumber: "24-SS-476",
    supplier: "EverBright Fashions",
    status: "pending",
    description: "Color specifications unclear",
    detectedAt: "2025-05-26 09:30"
  }
];

export const mockProcessingItems: ProcessingItem[] = [
  {
    id: "1",
    type: "PO",
    supplier: "EverBright Fashions",
    subject: "PO Update #3247",
    received: "2025-05-29 14:35",
    confidence: 95,
    status: "review",
    attachments: ["PO_3247.pdf", "Cost_214.xlsx"]
  },
  {
    id: "2",
    type: "Cost Sheet",
    supplier: "TextilePro Co",
    subject: "Cost revision for style 24-AW-015",
    received: "2025-05-29 13:22",
    confidence: 88,
    status: "review",
    attachments: ["Cost_AW015_rev2.xlsx"]
  },
  {
    id: "3",
    type: "Lab-dip",
    supplier: "KnitWell Ltd",
    subject: "Lab-dip submission #758",
    received: "2025-05-29 12:15",
    confidence: 92,
    status: "auto",
    attachments: ["Labdip_758.pdf", "Color_spec.jpg"]
  },
  {
    id: "4",
    type: "BOM",
    supplier: "GlobalStitch Ltd",
    subject: "BOM update for winter collection",
    received: "2025-05-29 11:48",
    confidence: 78,
    status: "error",
    attachments: ["BOM_Winter_2024.xlsx"]
  }
];

export const mockSearchResults: SearchResult[] = [
  {
    id: 1,
    question: "Latest carton spec for 24-SS-214",
    answer: "Latest carton spec for 24-SS-214: 56 × 40 × 32 cm, 12 pcs/carton, 19.2 kg.",
    sources: [
      { file: "Cost_214.xlsx", location: "cell D12", type: "Excel" },
      { file: "PO_214.pdf", location: "page 2", type: "PDF" }
    ],
    timestamp: "2024-01-15",
    confidence: 96
  },
  {
    id: 2,
    question: "EverBright payment terms",
    answer: "EverBright Fashions Ltd standard payment terms: LC 90 days from B/L date. Alternative T/T 30% deposit, 70% before shipment for orders >$50K.",
    sources: [
      { file: "Contract_EB_2024.pdf", location: "page 5, clause 8.2", type: "PDF" },
      { file: "Payment_Terms_EB.xlsx", location: "sheet 1", type: "Excel" }
    ],
    timestamp: "2024-01-12",
    confidence: 98
  },
  {
    id: 3,
    question: "Lab-dip approval status for summer collection",
    answer: "Summer 2024 collection lab-dip status: 23 approved, 4 pending revision (742, 758, 771, 803), 2 rejected (756, 792).",
    sources: [
      { file: "Labdip_Status_SS24.xlsx", location: "summary tab", type: "Excel" },
      { file: "Email_Labdip_Update.pdf", location: "body", type: "Email" }
    ],
    timestamp: "2024-01-10",
    confidence: 92
  }
];

export const mockPipelineMetrics: PipelineMetrics = {
  totalMails: 137,
  autoApproved: 88,
  humanReviews: 45,
  errors: 4,
  breakdown: {
    po: 62,
    costSheet: 30,
    labDip: 12,
    cert: 6,
    noise: 27
  },
  confidenceDistribution: [
    { range: "50-60%", count: 3 },
    { range: "60-70%", count: 8 },
    { range: "70-80%", count: 15 },
    { range: "80-90%", count: 42 },
    { range: "90-100%", count: 69 }
  ],
  trendData: [
    { date: "2025-05-22", volume: 98, confidence: 89, autoApproveRate: 68 },
    { date: "2025-05-23", volume: 112, confidence: 91, autoApproveRate: 72 },
    { date: "2025-05-24", volume: 134, confidence: 88, autoApproveRate: 69 },
    { date: "2025-05-25", volume: 128, confidence: 92, autoApproveRate: 75 },
    { date: "2025-05-26", volume: 145, confidence: 90, autoApproveRate: 71 },
    { date: "2025-05-27", volume: 149, confidence: 93, autoApproveRate: 77 },
    { date: "2025-05-28", volume: 137, confidence: 91, autoApproveRate: 73 }
  ]
};
