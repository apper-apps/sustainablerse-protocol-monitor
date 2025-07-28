import { addDelay } from "@/services/api/apiUtils"

const generateMockAnalytics = (timeRange) => {
  const dataPoints = timeRange === "1m" ? 30 : timeRange === "3m" ? 90 : timeRange === "6m" ? 180 : 365
  const categories = []
  const environmental = []
  const social = []
  const governance = []
  const carbonData = []
  
  for (let i = 0; i < Math.min(dataPoints, 12); i++) {
    const date = new Date()
    date.setMonth(date.getMonth() - (11 - i))
    categories.push(date.toLocaleDateString('en-US', { month: 'short' }))
    
    environmental.push(Math.floor(Math.random() * 20) + 70)
    social.push(Math.floor(Math.random() * 25) + 65)
    governance.push(Math.floor(Math.random() * 15) + 80)
    carbonData.push(Math.floor(Math.random() * 500) + 1000)
  }
  
  return {
    overallScore: Math.floor(Math.random() * 10) + 85,
    totalEmissions: carbonData[carbonData.length - 1],
    supplyChainScore: Math.floor(Math.random() * 15) + 80,
    verifiedReports: Math.floor(Math.random() * 10) + 20,
    esgTrend: {
      categories,
      environmental,
      social,
      governance
    },
    carbonEmissions: {
      categories,
      data: carbonData
    },
    supplyChainPerformance: [72, 18, 10] // On time, Delayed, Issues
  }
}

export const getAnalyticsData = async (timeRange = "6m") => {
  await addDelay(800)
  return generateMockAnalytics(timeRange)
}

export const getESGTrends = async (timeRange = "6m") => {
  await addDelay(500)
  const data = generateMockAnalytics(timeRange)
  return data.esgTrend
}

export const getCarbonFootprint = async (timeRange = "6m") => {
  await addDelay(400)
  const data = generateMockAnalytics(timeRange)
  return data.carbonEmissions
}

export const getSupplyChainMetrics = async () => {
  await addDelay(300)
  return {
    totalShipments: 156,
    onTimeDelivery: 92,
    averageTransitTime: 4.2,
    carbonReduction: 15.3
  }
}