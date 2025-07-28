import { addDelay } from "@/services/api/apiUtils"
import carbonCreditsData from "@/services/mockData/carbonCredits.json"

let credits = [...carbonCreditsData]

export const getCarbonCredits = async () => {
  await addDelay(500)
  return [...credits]
}

export const getCarbonCreditById = async (id) => {
  await addDelay(200)
  const credit = credits.find(c => c.Id === parseInt(id))
  if (!credit) {
    throw new Error("Carbon credit not found")
  }
  return { ...credit }
}

export const buyCarbonCredit = async (id) => {
  await addDelay(1000)
  
  const creditIndex = credits.findIndex(c => c.Id === parseInt(id))
  if (creditIndex === -1) {
    throw new Error("Carbon credit not found")
  }
  
  const credit = credits[creditIndex]
  if (credit.amount <= 0) {
    throw new Error("Insufficient carbon credits available")
  }
  
  // Simulate purchase by reducing available amount
  credits[creditIndex] = {
    ...credit,
    amount: Math.max(0, credit.amount - 1)
  }
  
  return {
    transactionId: `tx_${Math.random().toString(36).substring(2, 15)}`,
    creditId: id,
    amount: 1,
    price: credit.price,
    timestamp: Date.now()
  }
}

export const sellCarbonCredit = async (creditData) => {
  await addDelay(800)
  
  const newCredit = {
    Id: Math.max(...credits.map(c => c.Id), 0) + 1,
    projectName: creditData.projectName,
    projectType: creditData.projectType,
    country: creditData.country,
    vintage: creditData.vintage,
    amount: creditData.amount,
    price: creditData.price,
    seller: creditData.seller,
    verified: false,
    registry: creditData.registry || "VCS",
    methodology: creditData.methodology,
    developer: creditData.developer,
    listedDate: Date.now()
  }
  
  credits.unshift(newCredit)
  return { ...newCredit }
}

export const updateCarbonCredit = async (id, updateData) => {
  await addDelay(400)
  
  const creditIndex = credits.findIndex(c => c.Id === parseInt(id))
  if (creditIndex === -1) {
    throw new Error("Carbon credit not found")
  }
  
  credits[creditIndex] = { ...credits[creditIndex], ...updateData }
  return { ...credits[creditIndex] }
}

export const deleteCarbonCredit = async (id) => {
  await addDelay(300)
  
  const creditIndex = credits.findIndex(c => c.Id === parseInt(id))
  if (creditIndex === -1) {
    throw new Error("Carbon credit not found")
  }
  
  credits.splice(creditIndex, 1)
  return true
}