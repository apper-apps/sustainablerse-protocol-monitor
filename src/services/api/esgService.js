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
  
  const newReport = {
    Id: Math.max(...reports.map(r => r.Id), 0) + 1,
    companyName: reportData.companyName,
    reportType: reportData.reportType,
    timestamp: Date.now(),
    status: "pending",
    hash: `0x${Math.random().toString(16).substring(2, 66)}`,
    metrics: {
      esgScore: Math.floor(Math.random() * 20) + 70,
      carbonEmissions: parseFloat(reportData.carbonEmissions),
      energyConsumption: parseFloat(reportData.energyConsumption),
      wasteGenerated: parseFloat(reportData.wasteGenerated),
      waterUsage: parseFloat(reportData.waterUsage),
      renewableEnergy: parseFloat(reportData.renewableEnergy)
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