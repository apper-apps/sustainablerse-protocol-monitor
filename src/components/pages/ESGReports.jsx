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
    ratingMethodology: "MSCI", // New field for rating methodology focus
    // Environmental Metrics
    carbonEmissions: "",
    energyConsumption: "",
    wasteGenerated: "",
    waterUsage: "",
    renewableEnergy: "",
    // Social Metrics
    totalEmployees: "",
    employeeSatisfaction: "",
    diversityRatio: "",
    safetyIncidents: "",
    communityInvestment: "",
    trainingHours: "",
    // Governance Metrics
    boardIndependence: "",
    ethicsTraining: "",
    complianceViolations: "",
    transparencyScore: "",
    auditFrequency: "",
    stakeholderEngagement: ""
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
        ratingMethodology: "MSCI",
        // Environmental Metrics
        carbonEmissions: "",
        energyConsumption: "",
        wasteGenerated: "",
        waterUsage: "",
        renewableEnergy: "",
        // Social Metrics
        totalEmployees: "",
        employeeSatisfaction: "",
        diversityRatio: "",
        safetyIncidents: "",
        communityInvestment: "",
        trainingHours: "",
        // Governance Metrics
        boardIndependence: "",
        ethicsTraining: "",
        complianceViolations: "",
        transparencyScore: "",
        auditFrequency: "",
        stakeholderEngagement: ""
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
          
<form onSubmit={handleCreateReport} className="space-y-6">
            {/* Company Information */}
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
                  <option value="MSCI">MSCI ESG Rating</option>
                  <option value="SP">S&P ESG Score</option>
                </select>
              </div>

              {/* Rating Methodology Focus */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rating Methodology Focus
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <select
                  value={formData.ratingMethodology}
                  onChange={(e) => setFormData(prev => ({ ...prev, ratingMethodology: e.target.value }))}
                  className="flex h-10 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required
                >
                  <option value="MSCI">MSCI ESG Rating (AAA to CCC)</option>
                  <option value="SP">S&P Global ESG Score (0-100)</option>
                </select>
              </div>
            </div>

            {/* Environmental Metrics */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2 pb-2 border-b border-gray-200">
                <ApperIcon name="Leaf" size={20} className="text-green-600" />
                <h3 className="text-lg font-semibold text-gray-900">Environmental Metrics</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                
                <Input
                  label="Renewable Energy Percentage (%)"
                  type="number"
                  min="0"
                  max="100"
                  value={formData.renewableEnergy}
                  onChange={(e) => setFormData(prev => ({ ...prev, renewableEnergy: e.target.value }))}
                  required
                />
              </div>
            </div>

            {/* Social Metrics */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2 pb-2 border-b border-gray-200">
                <ApperIcon name="Users" size={20} className="text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900">Social Metrics</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Total Employees"
                  type="number"
                  value={formData.totalEmployees}
                  onChange={(e) => setFormData(prev => ({ ...prev, totalEmployees: e.target.value }))}
                  required
                />
                
                <Input
                  label="Employee Satisfaction Score (1-10)"
                  type="number"
                  min="1"
                  max="10"
                  step="0.1"
                  value={formData.employeeSatisfaction}
                  onChange={(e) => setFormData(prev => ({ ...prev, employeeSatisfaction: e.target.value }))}
                  required
                />
                
                <Input
                  label="Gender Diversity Ratio (%)"
                  type="number"
                  min="0"
                  max="100"
                  value={formData.diversityRatio}
                  onChange={(e) => setFormData(prev => ({ ...prev, diversityRatio: e.target.value }))}
                  required
                />
                
                <Input
                  label="Safety Incidents (per year)"
                  type="number"
                  min="0"
                  value={formData.safetyIncidents}
                  onChange={(e) => setFormData(prev => ({ ...prev, safetyIncidents: e.target.value }))}
                  required
                />
                
                <Input
                  label="Community Investment ($)"
                  type="number"
                  min="0"
                  value={formData.communityInvestment}
                  onChange={(e) => setFormData(prev => ({ ...prev, communityInvestment: e.target.value }))}
                  required
                />
                
                <Input
                  label="Training Hours per Employee"
                  type="number"
                  min="0"
                  step="0.5"
                  value={formData.trainingHours}
                  onChange={(e) => setFormData(prev => ({ ...prev, trainingHours: e.target.value }))}
                  required
                />
              </div>
            </div>

            {/* Governance Metrics */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2 pb-2 border-b border-gray-200">
                <ApperIcon name="Shield" size={20} className="text-purple-600" />
                <h3 className="text-lg font-semibold text-gray-900">Governance Metrics</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Board Independence (%)"
                  type="number"
                  min="0"
                  max="100"
                  value={formData.boardIndependence}
                  onChange={(e) => setFormData(prev => ({ ...prev, boardIndependence: e.target.value }))}
                  required
                />
                
                <Input
                  label="Ethics Training Completion (%)"
                  type="number"
                  min="0"
                  max="100"
                  value={formData.ethicsTraining}
                  onChange={(e) => setFormData(prev => ({ ...prev, ethicsTraining: e.target.value }))}
                  required
                />
                
                <Input
                  label="Compliance Violations (per year)"
                  type="number"
                  min="0"
                  value={formData.complianceViolations}
                  onChange={(e) => setFormData(prev => ({ ...prev, complianceViolations: e.target.value }))}
                  required
                />
                
                <Input
                  label="Transparency Score (1-100)"
                  type="number"
                  min="1"
                  max="100"
                  value={formData.transparencyScore}
                  onChange={(e) => setFormData(prev => ({ ...prev, transparencyScore: e.target.value }))}
                  required
                />
                
                <Input
                  label="Audit Frequency (per year)"
                  type="number"
                  min="1"
                  value={formData.auditFrequency}
                  onChange={(e) => setFormData(prev => ({ ...prev, auditFrequency: e.target.value }))}
                  required
                />
                
                <Input
                  label="Stakeholder Engagement Score (1-10)"
                  type="number"
                  min="1"
                  max="10"
                  step="0.1"
                  value={formData.stakeholderEngagement}
                  onChange={(e) => setFormData(prev => ({ ...prev, stakeholderEngagement: e.target.value }))}
                  required
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
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

      {/* Rating Methodology Info */}
      <Card className="mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <div className="p-6">
          <div className="flex items-center mb-4">
            <ApperIcon name="TrendingUp" className="w-5 h-5 text-blue-600 mr-2" />
            <h3 className="text-lg font-semibold text-blue-900">ESG Rating Methodologies for Green Finance</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg border border-blue-100">
              <h4 className="font-semibold text-blue-800 mb-2">MSCI ESG Rating</h4>
              <p className="text-sm text-gray-600 mb-2">Scale: CCC to AAA (7 levels)</p>
              <p className="text-xs text-gray-500">Widely used by institutional investors for sustainable investment decisions and green bond eligibility.</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-blue-100">
              <h4 className="font-semibold text-blue-800 mb-2">S&P Global ESG Score</h4>
              <p className="text-sm text-gray-600 mb-2">Scale: 0-100 points</p>
              <p className="text-xs text-gray-500">Used by banks and financial institutions for green finance criteria and sustainability-linked loans.</p>
            </div>
          </div>
        </div>
      </Card>

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
                
                {/* Rating Methodology Score */}
                {report.ratingAnalysis && (
                  <div className="flex items-center mb-2">
                    <ApperIcon name="Award" className="w-4 h-4 text-blue-500 mr-2" />
                    <span className="text-gray-600">
                      {report.ratingAnalysis.methodology} Rating: {report.ratingAnalysis.currentRating}
                    </span>
                  </div>
                )}
                
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

              {/* Rating Improvement Recommendations */}
              {report.ratingAnalysis?.recommendations && (
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4 mb-4">
                  <div className="flex items-center mb-3">
                    <ApperIcon name="Lightbulb" className="w-5 h-5 text-green-600 mr-2" />
                    <h4 className="font-semibold text-green-800">Green Finance Rating Recommendations</h4>
                  </div>
                  
                  <div className="mb-3">
                    <p className="text-sm text-gray-700 mb-2">
                      <strong>Current {report.ratingAnalysis.methodology} Rating:</strong> {report.ratingAnalysis.currentRating}
                    </p>
                    <p className="text-sm text-gray-700 mb-3">
                      <strong>Potential Rating with Improvements:</strong> {report.ratingAnalysis.potentialRating}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h5 className="font-medium text-green-800 text-sm">Priority Improvements:</h5>
                    {report.ratingAnalysis.recommendations.map((rec, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <ApperIcon name="ArrowRight" className="w-3 h-3 text-green-600 mt-1 flex-shrink-0" />
                        <p className="text-sm text-gray-700">{rec}</p>
                      </div>
                    ))}
                  </div>
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