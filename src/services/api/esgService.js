import esgReportsData from "@/services/mockData/esgReports.json";
import { addDelay } from "@/services/api/apiUtils";

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
  
  // Calculate rating methodology specific scores and recommendations
  const ratingAnalysis = calculateRatingMethodology(reportData, environmentalScore, socialScore, governanceScore)
  
  const newReport = {
    Id: Math.max(...reports.map(r => r.Id), 0) + 1,
    companyName: reportData.companyName,
    reportType: reportData.reportType,
    timestamp: Date.now(),
    status: "pending",
hash: `0x${Math.random().toString(16).substring(2, 66)}`,
    ratingMethodology: reportData.ratingMethodology || 'MSCI',
    ratingAnalysis,
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
  }
  
  reports.push(newReport)
  return newReport

// Calculate rating methodology specific analysis and recommendations
const calculateRatingMethodology = (reportData, envScore, socialScore, govScore) => {
  const methodology = reportData.ratingMethodology || 'MSCI'
  
  if (methodology === 'MSCI') {
    return calculateMSCIRating(reportData, envScore, socialScore, govScore)
  } else if (methodology === 'SP') {
    return calculateSPRating(reportData, envScore, socialScore, govScore)
  }
  
  return null
}

// MSCI ESG Rating calculation (AAA to CCC scale)
const calculateMSCIRating = (reportData, envScore, socialScore, govScore) => {
  const overallScore = (envScore + socialScore + govScore) / 3
  
  // Convert to MSCI rating scale
  let currentRating = 'CCC'
  if (overallScore >= 85) currentRating = 'AAA'
  else if (overallScore >= 75) currentRating = 'AA'
  else if (overallScore >= 65) currentRating = 'A'
  else if (overallScore >= 50) currentRating = 'BBB'
  else if (overallScore >= 35) currentRating = 'BB'
  else if (overallScore >= 20) currentRating = 'B'
  
  // Generate improvement recommendations
  const recommendations = []
  let potentialScore = overallScore
  
  // Environmental improvements
  if (parseFloat(reportData.renewableEnergy) < 50) {
    recommendations.push('Increase renewable energy usage to 50%+ to improve Environmental pillar score')
    potentialScore += 5
  }
  if (parseFloat(reportData.carbonEmissions) > 50) {
    recommendations.push('Reduce carbon emissions by 20% to enhance climate risk management score')
    potentialScore += 8
  }
  
  // Social improvements
  if (parseFloat(reportData.employeeSatisfaction) < 7) {
    recommendations.push('Improve employee satisfaction scores above 7.0 to strengthen Human Capital pillar')
    potentialScore += 6
  }
  if (parseFloat(reportData.diversityRatio) < 40) {
    recommendations.push('Increase board and workforce diversity to 40%+ for better Social scores')
    potentialScore += 4
  }
  
  // Governance improvements
  if (parseFloat(reportData.boardIndependence) < 75) {
    recommendations.push('Achieve 75%+ board independence to meet MSCI governance standards')
    potentialScore += 7
  }
  if (parseFloat(reportData.transparencyScore) < 80) {
    recommendations.push('Enhance ESG disclosure and transparency reporting to 80+ score')
    potentialScore += 5
  }
  
  // Calculate potential rating
  potentialScore = Math.min(100, potentialScore)
  let potentialRating = 'CCC'
  if (potentialScore >= 85) potentialRating = 'AAA'
  else if (potentialScore >= 75) potentialRating = 'AA'
  else if (potentialScore >= 65) potentialRating = 'A'
  else if (potentialScore >= 50) potentialRating = 'BBB'
  else if (potentialScore >= 35) potentialRating = 'BB'
  else if (potentialScore >= 20) potentialRating = 'B'
  
  return {
    methodology: 'MSCI',
    currentRating,
    potentialRating,
    recommendations: recommendations.slice(0, 4) // Top 4 recommendations
  }
}

// S&P Global ESG Score calculation (0-100 scale)
const calculateSPRating = (reportData, envScore, socialScore, govScore) => {
  const currentRating = Math.round((envScore + socialScore + govScore) / 3)
  
  // Generate improvement recommendations
  const recommendations = []
  let potentialScore = currentRating
  
  // Environmental improvements
  if (parseFloat(reportData.carbonEmissions) > 40) {
    recommendations.push('Implement science-based carbon reduction targets to improve Environmental Dimension score')
    potentialScore += 8
  }
  if (parseFloat(reportData.wasteGenerated) > 30) {
    recommendations.push('Establish circular economy practices to reduce waste generation by 25%')
    potentialScore += 5
  }
  
  // Social improvements
  if (parseFloat(reportData.safetyIncidents) > 5) {
    recommendations.push('Implement comprehensive safety programs to achieve zero incidents target')
    potentialScore += 6
  }
  if (parseFloat(reportData.communityInvestment) < 1) {
    recommendations.push('Increase community investment to 1%+ of revenue for Social Dimension enhancement')
    potentialScore += 4
  }
  
  // Governance improvements
  if (parseInt(reportData.complianceViolations) > 0) {
    recommendations.push('Strengthen compliance systems to achieve zero violations record')
    potentialScore += 7
  }
  if (parseFloat(reportData.ethicsTraining) < 90) {
    recommendations.push('Ensure 90%+ employee completion rate for ethics training programs')
    potentialScore += 3
  }
  
  potentialScore = Math.min(100, potentialScore)
  
  return {
    methodology: 'S&P Global',
    currentRating: `${currentRating}/100`,
    potentialRating: `${potentialScore}/100`,
    recommendations: recommendations.slice(0, 4) // Top 4 recommendations
recommendations: recommendations.slice(0, 4) // Top 4 recommendations
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