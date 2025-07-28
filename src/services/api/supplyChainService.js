import { addDelay } from "@/services/api/apiUtils"
import shipmentsData from "@/services/mockData/shipments.json"

let shipments = [...shipmentsData]

export const getSupplyChainData = async () => {
  await addDelay(600)
  return [...shipments]
}

export const getShipmentById = async (id) => {
  await addDelay(200)
  const shipment = shipments.find(s => s.Id === parseInt(id))
  if (!shipment) {
    throw new Error("Shipment not found")
  }
  return { ...shipment }
}

export const trackShipment = async (id) => {
  await addDelay(800)
  
  const shipment = shipments.find(s => s.Id === parseInt(id))
  if (!shipment) {
    throw new Error("Shipment not found")
  }
  
  // Generate mock tracking timeline
  const timeline = [
    {
      location: shipment.origin,
      description: "Package picked up from origin",
      timestamp: shipment.departureTime,
      status: "completed"
    },
    {
      location: "Sorting Facility",
      description: "Package processed at sorting facility",
      timestamp: shipment.departureTime + 2 * 60 * 60 * 1000,
      status: "completed"
    },
    {
      location: "Transit Hub",
      description: "In transit to destination",
      timestamp: shipment.departureTime + 24 * 60 * 60 * 1000,
      status: shipment.status === "delivered" ? "completed" : "current"
    }
  ]
  
  if (shipment.status === "delivered") {
    timeline.push({
      location: shipment.destination,
      description: "Package delivered successfully",
      timestamp: shipment.estimatedArrival,
      status: "completed"
    })
  }
  
  return {
    ...shipment,
    timeline,
    liveLocation: {
      lat: 40.7128,
      lng: -74.0060,
      lastUpdate: Date.now()
    }
  }
}

export const createShipment = async (shipmentData) => {
  await addDelay(700)
  
  const newShipment = {
    Id: Math.max(...shipments.map(s => s.Id), 0) + 1,
    productId: shipmentData.productId,
    productName: shipmentData.productName,
    origin: shipmentData.origin,
    destination: shipmentData.destination,
    departureTime: shipmentData.departureTime || Date.now(),
    estimatedArrival: shipmentData.estimatedArrival || Date.now() + 3 * 24 * 60 * 60 * 1000,
    status: "pending",
    progress: 0,
    weight: shipmentData.weight || 0,
    verified: false,
    sensors: {
      temperature: 22,
      humidity: 45,
      location: "online"
    }
  }
  
  shipments.unshift(newShipment)
  return { ...newShipment }
}

export const updateShipment = async (id, updateData) => {
  await addDelay(500)
  
  const shipmentIndex = shipments.findIndex(s => s.Id === parseInt(id))
  if (shipmentIndex === -1) {
    throw new Error("Shipment not found")
  }
  
  shipments[shipmentIndex] = { ...shipments[shipmentIndex], ...updateData }
  return { ...shipments[shipmentIndex] }
}

export const deleteShipment = async (id) => {
  await addDelay(300)
  
  const shipmentIndex = shipments.findIndex(s => s.Id === parseInt(id))
  if (shipmentIndex === -1) {
    throw new Error("Shipment not found")
  }
  
  shipments.splice(shipmentIndex, 1)
  return true
}