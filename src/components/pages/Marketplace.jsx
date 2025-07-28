import React, { useState, useEffect } from "react"
import Card from "@/components/atoms/Card"
import Button from "@/components/atoms/Button"
import Badge from "@/components/atoms/Badge"
import SearchBar from "@/components/molecules/SearchBar"
import Loading from "@/components/ui/Loading"
import Error from "@/components/ui/Error"
import Empty from "@/components/ui/Empty"
import ApperIcon from "@/components/ApperIcon"
import { getCarbonCredits, buyCarbonCredit } from "@/services/api/marketplaceService"
import { toast } from "react-toastify"

const Marketplace = () => {
  const [credits, setCredits] = useState([])
  const [filteredCredits, setFilteredCredits] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [filter, setFilter] = useState("all")
  const [purchasing, setPurchasing] = useState(null)

  const loadCredits = async () => {
    try {
      setLoading(true)
      setError("")
      const data = await getCarbonCredits()
      setCredits(data)
      setFilteredCredits(data)
    } catch (err) {
      setError("Failed to load carbon credits")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadCredits()
  }, [])

  useEffect(() => {
    let filtered = credits

    if (searchTerm) {
      filtered = filtered.filter(credit =>
        credit.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        credit.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
        credit.projectType.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (filter !== "all") {
      filtered = filtered.filter(credit => credit.projectType === filter)
    }

    setFilteredCredits(filtered)
  }, [searchTerm, filter, credits])

  const handlePurchase = async (creditId) => {
    try {
      setPurchasing(creditId)
      await buyCarbonCredit(creditId)
      toast.success("Carbon credit purchased successfully!")
      loadCredits() // Refresh the list
    } catch (err) {
      toast.error("Failed to purchase carbon credit")
    } finally {
      setPurchasing(null)
    }
  }

  const getProjectTypeIcon = (type) => {
    switch (type) {
      case 'Renewable Energy': return 'Zap'
      case 'Forestry': return 'Trees'
      case 'Waste Management': return 'Recycle'
      case 'Industrial': return 'Factory'
      default: return 'Leaf'
    }
  }

  const getProjectTypeColor = (type) => {
    switch (type) {
      case 'Renewable Energy': return 'secondary'
      case 'Forestry': return 'success'
      case 'Waste Management': return 'accent'
      case 'Industrial': return 'primary'
      default: return 'default'
    }
  }

  if (loading) return <Loading type="cards" />
  if (error) return <Error message={error} onRetry={loadCredits} />

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Carbon Credit Marketplace</h1>
          <p className="text-gray-600">Buy and sell verified carbon credits</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" icon="TrendingUp">
            Portfolio
          </Button>
          <Button variant="primary" icon="Plus">
            List Credit
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1">
          <SearchBar
            placeholder="Search by project name, country, or type..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex space-x-2 overflow-x-auto">
          {["all", "Renewable Energy", "Forestry", "Waste Management", "Industrial"].map((type) => (
            <Button
              key={type}
              variant={filter === type ? "primary" : "outline"}
              size="sm"
              onClick={() => setFilter(type)}
              className="whitespace-nowrap"
            >
              {type === "all" ? "All Types" : type}
            </Button>
          ))}
        </div>
      </div>

      {/* Market Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <ApperIcon name="TrendingUp" className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Average Price</p>
              <p className="text-lg font-bold text-gray-900">$24.50</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <ApperIcon name="Package" className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Available Credits</p>
              <p className="text-lg font-bold text-gray-900">{credits.length}</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <ApperIcon name="ArrowRightLeft" className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">24h Volume</p>
              <p className="text-lg font-bold text-gray-900">1,245 tCO2e</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-orange-100 rounded-lg">
              <ApperIcon name="Globe" className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Countries</p>
              <p className="text-lg font-bold text-gray-900">12</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Credits Grid */}
      {filteredCredits.length === 0 ? (
        <Empty
          title="No carbon credits found"
          description="Try adjusting your search or filter criteria"
          icon="Search"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCredits.map((credit) => (
            <Card key={credit.Id} className="hover">
              {/* Project Image */}
              <div className="relative h-48 bg-gradient-to-br from-green-400 to-blue-500 rounded-t-lg">
                <div className="absolute inset-0 bg-black bg-opacity-20 rounded-t-lg"></div>
                <div className="absolute top-4 left-4">
                  <Badge variant="verified" icon="CheckCircle">
                    Verified
                  </Badge>
                </div>
                <div className="absolute top-4 right-4">
                  <Badge variant={getProjectTypeColor(credit.projectType)}>
                    {credit.projectType}
                  </Badge>
                </div>
                <div className="absolute bottom-4 left-4 text-white">
                  <div className="flex items-center space-x-2">
                    <ApperIcon name="MapPin" className="w-4 h-4" />
                    <span className="text-sm font-medium">{credit.country}</span>
                  </div>
                </div>
              </div>

              {/* Project Details */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {credit.projectName}
                    </h3>
                    <p className="text-sm text-gray-600">{credit.developer}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-primary-600">${credit.price}</p>
                    <p className="text-xs text-gray-500">per tCO2e</p>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Vintage Year</span>
                    <span className="font-medium">{credit.vintage}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Available</span>
                    <span className="font-medium">{credit.amount} tCO2e</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Registry</span>
                    <span className="font-medium">{credit.registry}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2 mb-4">
                  <ApperIcon name={getProjectTypeIcon(credit.projectType)} className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">{credit.methodology}</span>
                </div>

                <div className="flex space-x-2">
                  <Button
                    variant="primary"
                    size="sm"
                    className="flex-1"
                    onClick={() => handlePurchase(credit.Id)}
                    loading={purchasing === credit.Id}
                    icon="ShoppingCart"
                  >
                    Buy Now
                  </Button>
                  <Button variant="outline" size="sm" icon="Eye">
                    Details
                  </Button>
                  <Button variant="ghost" size="sm" icon="Heart" />
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

export default Marketplace