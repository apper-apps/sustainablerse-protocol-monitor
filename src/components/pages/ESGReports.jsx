import React, { useState, useEffect } from "react"
import Card from "@/components/atoms/Card"
import Button from "@/components/atoms/Button"
import Badge from "@/components/atoms/Badge"
import Input from "@/components/atoms/Input"
import SearchBar from "@/components/molecules/SearchBar"
import Loading from "@/components/ui/Loading"
import Error from "@/components/ui/Error"
import Empty from "@/components/ui/Empty"
import ApperIcon from "@/components/ApperIcon"
import { getESGReports, createESGReport } from "@/services/api/esgService"
import { format } from "date-fns"
import { toast } from "react-toastify"

const ESGReports = () => {
  const [reports, setReports] = useState([])
  const [filteredReports, setFilteredReports] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [creating, setCreating] = useState(false)
  
  const [formData, setFormData] = useState({
    companyName: "",
    reportType: "GRI",
    carbonEmissions: "",
    energyConsumption: "",
    wasteGenerated: "",
    waterUsage: "",
    renewableEnergy: ""
  })

  const loadReports = async () => {
    try {
      setLoading(true)
      setError("")
      const data = await getESGReports()
      setReports(data)
      setFilteredReports(data)
    } catch (err) {
      setError("Failed to load ESG reports")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadReports()
  }, [])

  useEffect(() => {
    if (searchTerm) {
      const filtered = reports.filter(report =>
        report.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.reportType.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setFilteredReports(filtered)
    } else {
      setFilteredReports(reports)
    }
  }, [searchTerm, reports])

  const handleCreateReport = async (e) => {
    e.preventDefault()
    try {
      setCreating(true)
      const newReport = await createESGReport(formData)
      setReports(prev => [newReport, ...prev])
      setFormData({
        companyName: "",
        reportType: "GRI",
        carbonEmissions: "",
        energyConsumption: "",
        wasteGenerated: "",
        waterUsage: "",
        renewableEnergy: ""
      })
      setShowCreateForm(false)
      toast.success("ESG report created and submitted to blockchain!")
    } catch (err) {
      toast.error("Failed to create report")
    } finally {
      setCreating(false)
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'verified': return 'success'
      case 'pending': return 'warning'
      case 'draft': return 'default'
      default: return 'default'
    }
  }

  if (loading) return <Loading type="cards" />
  if (error) return <Error message={error} onRetry={loadReports} />

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">ESG Reports</h1>
          <p className="text-gray-600">Create and manage your sustainability reports</p>
        </div>
        <Button
          onClick={() => setShowCreateForm(true)}
          icon="Plus"
          variant="primary"
        >
          Create Report
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <SearchBar
            placeholder="Search reports..."
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

      {/* Create Report Form */}
      {showCreateForm && (
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Create New ESG Report</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowCreateForm(false)}
              icon="X"
            />
          </div>
          
          <form onSubmit={handleCreateReport} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Company Name"
                value={formData.companyName}
                onChange={(e) => setFormData(prev => ({ ...prev, companyName: e.target.value }))}
                required
              />
              
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">Report Type</label>
                <select
                  value={formData.reportType}
                  onChange={(e) => setFormData(prev => ({ ...prev, reportType: e.target.value }))}
                  className="flex h-10 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="GRI">GRI Standards</option>
                  <option value="SASB">SASB Standards</option>
                  <option value="TCFD">TCFD Framework</option>
                </select>
              </div>
              
              <Input
                label="Carbon Emissions (tCO2e)"
                type="number"
                value={formData.carbonEmissions}
                onChange={(e) => setFormData(prev => ({ ...prev, carbonEmissions: e.target.value }))}
                required
              />
              
              <Input
                label="Energy Consumption (MWh)"
                type="number"
                value={formData.energyConsumption}
                onChange={(e) => setFormData(prev => ({ ...prev, energyConsumption: e.target.value }))}
                required
              />
              
              <Input
                label="Waste Generated (tons)"
                type="number"
                value={formData.wasteGenerated}
                onChange={(e) => setFormData(prev => ({ ...prev, wasteGenerated: e.target.value }))}
                required
              />
              
              <Input
                label="Water Usage (m³)"
                type="number"
                value={formData.waterUsage}
                onChange={(e) => setFormData(prev => ({ ...prev, waterUsage: e.target.value }))}
                required
              />
            </div>
            
            <Input
              label="Renewable Energy Percentage (%)"
              type="number"
              min="0"
              max="100"
              value={formData.renewableEnergy}
              onChange={(e) => setFormData(prev => ({ ...prev, renewableEnergy: e.target.value }))}
              required
            />
            
            <div className="flex justify-end space-x-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowCreateForm(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                loading={creating}
                icon="FileText"
              >
                Create & Submit to Blockchain
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* Reports Grid */}
      {filteredReports.length === 0 ? (
        <Empty
          title="No ESG reports found"
          description="Create your first sustainability report to get started"
          action={{
            label: "Create Report",
            onClick: () => setShowCreateForm(true),
            icon: "FileText"
          }}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReports.map((report) => (
            <Card key={report.Id} className="hover p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {report.companyName}
                  </h3>
                  <p className="text-sm text-gray-600">{report.reportType} Report</p>
                </div>
                <Badge
                  variant={getStatusColor(report.status)}
                  icon={report.status === 'verified' ? 'CheckCircle' : 'Clock'}
                >
                  {report.status}
                </Badge>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center text-sm">
                  <ApperIcon name="Calendar" className="w-4 h-4 text-gray-400 mr-2" />
                  <span className="text-gray-600">
                    Submitted {format(new Date(report.timestamp), 'MMM dd, yyyy')}
                  </span>
                </div>
                
                <div className="flex items-center text-sm">
                  <ApperIcon name="BarChart3" className="w-4 h-4 text-gray-400 mr-2" />
                  <span className="text-gray-600">ESG Score: {report.metrics.esgScore}</span>
                </div>
                
                <div className="flex items-center text-sm">
                  <ApperIcon name="Zap" className="w-4 h-4 text-gray-400 mr-2" />
                  <span className="text-gray-600">
                    Carbon: {report.metrics.carbonEmissions} tCO2e
                  </span>
                </div>
              </div>

              {report.status === 'verified' && (
                <div className="flex items-center space-x-2 mb-4 p-2 bg-green-50 rounded-lg">
                  <ApperIcon name="Shield" className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium text-green-800">
                    Blockchain Verified
                  </span>
                </div>
              )}

              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="flex-1">
                  View Details
                </Button>
                <Button variant="ghost" size="sm" icon="Download" />
                <Button variant="ghost" size="sm" icon="Share" />
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

export default ESGReports