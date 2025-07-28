import { addDelay } from "@/services/api/apiUtils"

// Mock data
const mockOverviewData = [
  {
    title: "ESG Score",
    value: "85",
    change: "+5.2% from last month",
    icon: "BarChart3",
    trend: "up",
    verified: true
  },
  {
    title: "Carbon Credits",
    value: "1,247",
    change: "+12.3% this quarter",
    icon: "Leaf",
    trend: "up",
    verified: true
  },
  {
    title: "Supply Chain Items",
    value: "3,456",
    change: "+8.1% this month",
    icon: "Package",
    trend: "up",
    verified: false
  },
  {
    title: "Reports Verified",
    value: "23",
    change: "2 pending verification",
    icon: "FileText",
    trend: "neutral",
    verified: true
  }
]

const mockRecentActivity = [
  {
    Id: 1,
    type: "report",
    title: "ESG Report Q3 2024",
    description: "Sustainability report submitted and verified on blockchain",
    timestamp: Date.now() - 2 * 60 * 60 * 1000,
    status: "completed"
  },
  {
    Id: 2,
    type: "trade",
    title: "Carbon Credit Purchase",
    description: "Purchased 100 tCO2e from Renewable Energy Project",
    timestamp: Date.now() - 4 * 60 * 60 * 1000,
    status: "completed"
  },
  {
    Id: 3,
    type: "shipment",
    title: "Supply Chain Update",
    description: "Shipment SH-2024-001 delivered to final destination",
    timestamp: Date.now() - 6 * 60 * 60 * 1000,
    status: "completed"
  },
  {
    Id: 4,
    type: "report",
    title: "Carbon Footprint Analysis",
    description: "Monthly carbon emissions report generated",
    timestamp: Date.now() - 12 * 60 * 60 * 1000,
    status: "pending"
  },
  {
    Id: 5,
    type: "trade",
    title: "REC Certificate Sale",
    description: "Sold 50 RECs to verified buyer",
    timestamp: Date.now() - 24 * 60 * 60 * 1000,
    status: "completed"
  }
]

export const getOverviewData = async () => {
  await addDelay(300)
  return [...mockOverviewData]
}

export const getRecentActivity = async () => {
  await addDelay(400)
  return [...mockRecentActivity]
}