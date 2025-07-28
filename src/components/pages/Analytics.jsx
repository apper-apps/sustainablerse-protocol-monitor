import React, { useState, useEffect } from "react"
import Card from "@/components/atoms/Card"
import Button from "@/components/atoms/Button"
import Badge from "@/components/atoms/Badge"
import Loading from "@/components/ui/Loading"
import Error from "@/components/ui/Error"
import ApperIcon from "@/components/ApperIcon"
import { getAnalyticsData } from "@/services/api/analyticsService"
import Chart from "react-apexcharts"

const Analytics = () => {
  const [analyticsData, setAnalyticsData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [timeRange, setTimeRange] = useState("6m")

  const loadAnalyticsData = async () => {
    try {
      setLoading(true)
      setError("")
      const data = await getAnalyticsData(timeRange)
      setAnalyticsData(data)
    } catch (err) {
      setError("Failed to load analytics data")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadAnalyticsData()
  }, [timeRange])

  if (loading) return <Loading />
  if (error) return <Error message={error} onRetry={loadAnalyticsData} />
  if (!analyticsData) return null

  // ESG Score Chart
  const esgScoreOptions = {
    chart: { type: 'line', height: 300, toolbar: { show: false } },
    colors: ['#2E7D32', '#1565C0', '#FF6F00'],
    stroke: { curve: 'smooth', width: 3 },
    dataLabels: { enabled: false },
    xaxis: {
      categories: analyticsData.esgTrend.categories,
      labels: { style: { colors: '#64748B' } }
    },
    yaxis: {
      min: 0,
      max: 100,
      labels: { style: { colors: '#64748B' } }
    },
    grid: { borderColor: '#E2E8F0', strokeDashArray: 4 },
    legend: { position: 'top' },
    tooltip: {
      theme: 'light',
      style: { fontSize: '12px' }
    }
  }

  const esgScoreSeries = [
    { name: 'Environmental', data: analyticsData.esgTrend.environmental },
    { name: 'Social', data: analyticsData.esgTrend.social },
    { name: 'Governance', data: analyticsData.esgTrend.governance }
  ]

  // Carbon Emissions Chart
  const carbonOptions = {
    chart: { type: 'bar', height: 300, toolbar: { show: false } },
    colors: ['#2E7D32'],
    plotOptions: {
      bar: { horizontal: false, columnWidth: '70%', borderRadius: 4 }
    },
    dataLabels: { enabled: false },
    xaxis: {
      categories: analyticsData.carbonEmissions.categories,
      labels: { style: { colors: '#64748B' } }
    },
    yaxis: { labels: { style: { colors: '#64748B' } } },
    grid: { borderColor: '#E2E8F0', strokeDashArray: 4 }
  }

  const carbonSeries = [{
    name: 'Carbon Emissions (tCO2e)',
    data: analyticsData.carbonEmissions.data
  }]

  // Supply Chain Performance Chart
  const supplyChainOptions = {
    chart: { type: 'donut', height: 300 },
    colors: ['#4CAF50', '#FF9800', '#F44336'],
    labels: ['On Time', 'Delayed', 'Issues'],
    legend: { position: 'bottom' },
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return Math.round(val) + "%"
      }
    }
  }

  const supplyChainSeries = analyticsData.supplyChainPerformance

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="text-gray-600">Monitor your sustainability performance and trends</p>
        </div>
        <div className="flex space-x-2">
          {["1m", "3m", "6m", "1y"].map((range) => (
            <Button
              key={range}
              variant={timeRange === range ? "primary" : "outline"}
              size="sm"
              onClick={() => setTimeRange(range)}
            >
              {range}
            </Button>
          ))}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Overall ESG Score</p>
              <p className="text-3xl font-bold gradient-text mt-1">
                {analyticsData.overallScore}
              </p>
              <div className="flex items-center mt-2">
                <ApperIcon name="TrendingUp" className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600">+5.2% from last month</span>
              </div>
            </div>
            <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-lg">
              <ApperIcon name="BarChart3" className="w-6 h-6 text-primary-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Carbon Footprint</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {analyticsData.totalEmissions} tCO2e
              </p>
              <div className="flex items-center mt-2">
                <ApperIcon name="TrendingDown" className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600">-12% reduction</span>
              </div>
            </div>
            <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-green-100 to-emerald-100 rounded-lg">
              <ApperIcon name="Leaf" className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Supply Chain Score</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {analyticsData.supplyChainScore}%
              </p>
              <div className="flex items-center mt-2">
                <ApperIcon name="TrendingUp" className="w-4 h-4 text-blue-500 mr-1" />
                <span className="text-sm text-blue-600">+8% improvement</span>
              </div>
            </div>
            <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg">
              <ApperIcon name="Truck" className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Reports Verified</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {analyticsData.verifiedReports}
              </p>
              <div className="flex items-center mt-2">
                <Badge variant="verified" size="sm" icon="Shield">
                  Blockchain
                </Badge>
              </div>
            </div>
            <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg">
              <ApperIcon name="Shield" className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ESG Score Trend */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">ESG Score Trend</h3>
              <p className="text-sm text-gray-600">Track your Environmental, Social, and Governance scores</p>
            </div>
            <Button variant="ghost" size="sm" icon="Download" />
          </div>
          <Chart
            options={esgScoreOptions}
            series={esgScoreSeries}
            type="line"
            height={300}
          />
        </Card>

        {/* Carbon Emissions */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Carbon Emissions</h3>
              <p className="text-sm text-gray-600">Monthly carbon footprint tracking</p>
            </div>
            <Button variant="ghost" size="sm" icon="Download" />
          </div>
          <Chart
            options={carbonOptions}
            series={carbonSeries}
            type="bar"
            height={300}
          />
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Supply Chain Performance */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Supply Chain</h3>
              <p className="text-sm text-gray-600">Delivery performance overview</p>
            </div>
          </div>
          <Chart
            options={supplyChainOptions}
            series={supplyChainSeries}
            type="donut"
            height={250}
          />
        </Card>

        {/* Top Metrics */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Achievements</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <ApperIcon name="Award" className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Carbon Neutral</p>
                <p className="text-xs text-gray-600">Achieved this quarter</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <ApperIcon name="Target" className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">ESG Goals Met</p>
                <p className="text-xs text-gray-600">85% of annual targets</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <ApperIcon name="CheckCircle" className="w-4 h-4 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Verified Reports</p>
                <p className="text-xs text-gray-600">100% blockchain verified</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Recommendations */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommendations</h3>
          <div className="space-y-3">
            <div className="p-3 bg-yellow-50 rounded-lg">
              <div className="flex items-start space-x-2">
                <ApperIcon name="Lightbulb" className="w-4 h-4 text-yellow-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-yellow-800">Energy Efficiency</p>
                  <p className="text-xs text-yellow-700">Consider renewable energy sources to reduce emissions by 20%</p>
                </div>
              </div>
            </div>
            
            <div className="p-3 bg-blue-50 rounded-lg">
              <div className="flex items-start space-x-2">
                <ApperIcon name="TrendingUp" className="w-4 h-4 text-blue-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-blue-800">Supply Chain</p>
                  <p className="text-xs text-blue-700">Optimize logistics routes to improve efficiency by 15%</p>
                </div>
              </div>
            </div>
            
            <div className="p-3 bg-green-50 rounded-lg">
              <div className="flex items-start space-x-2">
                <ApperIcon name="Recycle" className="w-4 h-4 text-green-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-green-800">Waste Reduction</p>
                  <p className="text-xs text-green-700">Implement circular economy practices</p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default Analytics