import { addDelay } from "@/services/api/apiUtils"
import esgReportsData from "@/services/mockData/esgReports.json"

let reports = [...esgReportsData]

export const getESGReports = async () => {
  await addDelay(400)
  return [...reports]
}

export const getESGReportById = async (id) => {
  await addDelay(200)
  const report = reports.find(r => r.Id === parseInt(id))
  if (!report) {
    throw new Error("ESG report not found")
  }
  return { ...report }
}

export const createESGReport = async (reportData) => {
  await addDelay(800)
  
  // Calculate ESG scores based on input data
  const environmentalScore = Math.min(100, Math.max(0, 
    (parseFloat(reportData.renewableEnergy) * 0.4) + 
    (Math.max(0, 100 - (parseFloat(reportData.carbonEmissions) / 100)) * 0.6)
  ))
  
  const socialScore = Math.min(100, Math.max(0,
    (parseFloat(reportData.employeeSatisfaction) * 10 * 0.3) +
    (parseFloat(reportData.diversityRatio) * 0.3) +
    (Math.max(0, 100 - parseFloat(reportData.safetyIncidents)) * 0.4)
  ))
  
  const governanceScore = Math.min(100, Math.max(0,
    (parseFloat(reportData.boardIndependence) * 0.25) +
    (parseFloat(reportData.ethicsTraining) * 0.25) +
    (parseFloat(reportData.transparencyScore) * 0.25) +
    (parseFloat(reportData.stakeholderEngagement) * 10 * 0.25)
  ))
  
  const overallESGScore = Math.round((environmentalScore + socialScore + governanceScore) / 3)
  
  const newReport = {
    Id: Math.max(...reports.map(r => r.Id), 0) + 1,
    companyName: reportData.companyName,
    reportType: reportData.reportType,
    timestamp: Date.now(),
    status: "pending",
    hash: `0x${Math.random().toString(16).substring(2, 66)}`,
    metrics: {
      esgScore: overallESGScore,
      environmentalScore: Math.round(environmentalScore),
      socialScore: Math.round(socialScore),
      governanceScore: Math.round(governanceScore),
      // Environmental metrics
      carbonEmissions: parseFloat(reportData.carbonEmissions),
      energyConsumption: parseFloat(reportData.energyConsumption),
      wasteGenerated: parseFloat(reportData.wasteGenerated),
      waterUsage: parseFloat(reportData.waterUsage),
      renewableEnergy: parseFloat(reportData.renewableEnergy),
      // Social metrics
      totalEmployees: parseInt(reportData.totalEmployees),
      employeeSatisfaction: parseFloat(reportData.employeeSatisfaction),
      diversityRatio: parseFloat(reportData.diversityRatio),
      safetyIncidents: parseInt(reportData.safetyIncidents),
      communityInvestment: parseFloat(reportData.communityInvestment),
      trainingHours: parseFloat(reportData.trainingHours),
      // Governance metrics
      boardIndependence: parseFloat(reportData.boardIndependence),
      ethicsTraining: parseFloat(reportData.ethicsTraining),
      complianceViolations: parseInt(reportData.complianceViolations),
      transparencyScore: parseFloat(reportData.transparencyScore),
      auditFrequency: parseInt(reportData.auditFrequency),
      stakeholderEngagement: parseFloat(reportData.stakeholderEngagement)
    }
  }
  
  reports.unshift(newReport)
  
  // Simulate blockchain verification after a delay
  setTimeout(() => {
    const reportIndex = reports.findIndex(r => r.Id === newReport.Id)
    if (reportIndex !== -1) {
      reports[reportIndex].status = "verified"
    }
  }, 3000)
  
  return { ...newReport }
}

export const updateESGReport = async (id, updateData) => {
  await addDelay(500)
  
  const reportIndex = reports.findIndex(r => r.Id === parseInt(id))
  if (reportIndex === -1) {
    throw new Error("ESG report not found")
  }
  
  reports[reportIndex] = { ...reports[reportIndex], ...updateData }
  return { ...reports[reportIndex] }
}

export const deleteESGReport = async (id) => {
  await addDelay(300)
  
  const reportIndex = reports.findIndex(r => r.Id === parseInt(id))
  if (reportIndex === -1) {
    throw new Error("ESG report not found")
  }
  
  reports.splice(reportIndex, 1)
  return true
}