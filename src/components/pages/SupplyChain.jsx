import React, { useState, useEffect } from "react"
import Card from "@/components/atoms/Card"
import Button from "@/components/atoms/Button"
import Badge from "@/components/atoms/Badge"
import SearchBar from "@/components/molecules/SearchBar"
import Loading from "@/components/ui/Loading"
import Error from "@/components/ui/Error"
import Empty from "@/components/ui/Empty"
import ApperIcon from "@/components/ApperIcon"
import { getSupplyChainData, trackShipment } from "@/services/api/supplyChainService"
import { format } from "date-fns"
import { toast } from "react-toastify"

const SupplyChain = () => {
  const [shipments, setShipments] = useState([])
  const [filteredShipments, setFilteredShipments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedShipment, setSelectedShipment] = useState(null)
  const [tracking, setTracking] = useState(false)

  const loadSupplyChainData = async () => {
    try {
      setLoading(true)
      setError("")
      const data = await getSupplyChainData()
      setShipments(data)
      setFilteredShipments(data)
    } catch (err) {
      setError("Failed to load supply chain data")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadSupplyChainData()
  }, [])

  useEffect(() => {
    if (searchTerm) {
      const filtered = shipments.filter(shipment =>
        shipment.productId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        shipment.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
        shipment.destination.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setFilteredShipments(filtered)
    } else {
      setFilteredShipments(shipments)
    }
  }, [searchTerm, shipments])

  const handleTrackShipment = async (shipmentId) => {
    try {
      setTracking(true)
      const trackingData = await trackShipment(shipmentId)
      setSelectedShipment(trackingData)
      toast.success("Shipment tracking updated from IoT sensors")
    } catch (err) {
      toast.error("Failed to track shipment")
    } finally {
      setTracking(false)
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered': return 'success'
      case 'in_transit': return 'warning'
      case 'departed': return 'secondary'
      case 'pending': return 'default'
      default: return 'default'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered': return 'CheckCircle'
      case 'in_transit': return 'Truck'
      case 'departed': return 'Plane'
      case 'pending': return 'Clock'
      default: return 'Package'
    }
  }

  if (loading) return <Loading type="cards" />
  if (error) return <Error message={error} onRetry={loadSupplyChainData} />

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Supply Chain Tracking</h1>
          <p className="text-gray-600">Monitor shipments with IoT sensors and blockchain verification</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" icon="Map">
            View Map
          </Button>
          <Button variant="primary" icon="Plus">
            Add Shipment
          </Button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <ApperIcon name="Package" className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Shipments</p>
              <p className="text-lg font-bold text-gray-900">{shipments.length}</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <ApperIcon name="Truck" className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">In Transit</p>
              <p className="text-lg font-bold text-gray-900">
                {shipments.filter(s => s.status === 'in_transit').length}
              </p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <ApperIcon name="CheckCircle" className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Delivered</p>
              <p className="text-lg font-bold text-gray-900">
                {shipments.filter(s => s.status === 'delivered').length}
              </p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <ApperIcon name="Shield" className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Verified</p>
              <p className="text-lg font-bold text-gray-900">
                {shipments.filter(s => s.verified).length}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <SearchBar
            placeholder="Search by product ID, origin, or destination..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" icon="Filter">
            Filter
          </Button>
          <Button variant="outline" size="sm" icon="Download">
            Export
          </Button>
        </div>
      </div>

      {/* Shipments List */}
      {filteredShipments.length === 0 ? (
        <Empty
          title="No shipments found"
          description="Start tracking your supply chain by adding a shipment"
          action={{
            label: "Add Shipment",
            onClick: () => toast.info("Add shipment feature coming soon"),
            icon: "Plus"
          }}
        />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredShipments.map((shipment) => (
            <Card key={shipment.Id} className="hover">
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {shipment.productId}
                      </h3>
                      {shipment.verified && (
                        <Badge variant="verified" size="sm" icon="Shield">
                          Verified
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{shipment.productName}</p>
                  </div>
                  <Badge 
                    variant={getStatusColor(shipment.status)}
                    icon={getStatusIcon(shipment.status)}
                  >
                    {shipment.status.replace('_', ' ')}
                  </Badge>
                </div>

                {/* Route */}
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <ApperIcon name="MapPin" className="w-4 h-4 text-gray-400" />
                      <span className="text-sm font-medium text-gray-900">{shipment.origin}</span>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <ApperIcon name="ArrowRight" className="w-4 h-4 text-gray-400" />
                  </div>
                  <div className="flex-1 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <span className="text-sm font-medium text-gray-900">{shipment.destination}</span>
                      <ApperIcon name="MapPin" className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                    <span>Progress</span>
                    <span>{shipment.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${shipment.progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Departure</span>
                    <span className="font-medium">
                      {format(new Date(shipment.departureTime), 'MMM dd, HH:mm')}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Est. Arrival</span>
                    <span className="font-medium">
                      {format(new Date(shipment.estimatedArrival), 'MMM dd, HH:mm')}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Weight</span>
                    <span className="font-medium">{shipment.weight} kg</span>
                  </div>
                </div>

                {/* IoT Sensors */}
                {shipment.sensors && (
                  <div className="bg-gray-50 rounded-lg p-3 mb-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <ApperIcon name="Thermometer" className="w-4 h-4 text-blue-500" />
                      <span className="text-sm font-medium">IoT Sensors</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div className="text-center">
                        <p className="text-gray-600">Temperature</p>
                        <p className="font-medium">{shipment.sensors.temperature}°C</p>
                      </div>
                      <div className="text-center">
                        <p className="text-gray-600">Humidity</p>
                        <p className="font-medium">{shipment.sensors.humidity}%</p>
                      </div>
                      <div className="text-center">
                        <p className="text-gray-600">Location</p>
                        <p className="font-medium text-green-600">Online</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex space-x-2">
                  <Button
                    variant="primary"
                    size="sm"
                    className="flex-1"
                    onClick={() => handleTrackShipment(shipment.Id)}
                    loading={tracking}
                    icon="MapPin"
                  >
                    Track Live
                  </Button>
                  <Button variant="outline" size="sm" icon="QrCode">
                    QR
                  </Button>
                  <Button variant="ghost" size="sm" icon="MoreHorizontal" />
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Selected Shipment Details Modal */}
      {selectedShipment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900">
                  Shipment Details: {selectedShipment.productId}
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedShipment(null)}
                  icon="X"
                />
              </div>
              
              {/* Timeline */}
              <div className="space-y-4">
                <h4 className="text-lg font-medium text-gray-900">Tracking Timeline</h4>
                {selectedShipment.timeline?.map((event, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                      <ApperIcon name="MapPin" className="w-4 h-4 text-primary-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{event.location}</p>
                      <p className="text-sm text-gray-600">{event.description}</p>
                      <p className="text-xs text-gray-500">
                        {format(new Date(event.timestamp), 'MMM dd, yyyy HH:mm')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}

export default SupplyChain