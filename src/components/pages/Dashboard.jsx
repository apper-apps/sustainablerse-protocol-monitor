import React, { useState, useEffect } from "react"
import StatCard from "@/components/molecules/StatCard"
import Card from "@/components/atoms/Card"
import Button from "@/components/atoms/Button"
import Badge from "@/components/atoms/Badge"
import Loading from "@/components/ui/Loading"
import Error from "@/components/ui/Error"
import Empty from "@/components/ui/Empty"
import ApperIcon from "@/components/ApperIcon"
import { getOverviewData, getRecentActivity } from "@/services/api/dashboardService"
import { format } from "date-fns"
import Chart from "react-apexcharts"

const Dashboard = () => {
  const [overviewData, setOverviewData] = useState([])
  const [recentActivity, setRecentActivity] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const loadDashboardData = async () => {
    try {
      setLoading(true)
      setError("")
      const [overview, activity] = await Promise.all([
        getOverviewData(),
        getRecentActivity()
      ])
      setOverviewData(overview)
      setRecentActivity(activity)
    } catch (err) {
      setError("Failed to load dashboard data")
    } finally {
      setLoading(false)
    }
  }

useEffect(() => {
  loadDashboardData()
}, [])

  if (loading) return <Loading type="cards" />
  if (error) return <Error message={error} onRetry={loadDashboardData} />

  const chartOptions = {
    chart: {
      type: 'area',
      height: 350,
    },
    colors: ['#2E7D32', '#1565C0', '#FF6F00'],
    dataLabels: { enabled: false },
    stroke: {
      curve: 'smooth',
      width: 3
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.2,
        stops: [0, 90, 100]
      }
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      labels: { style: { colors: '#64748B' } }
    },
    yaxis: {
      labels: { style: { colors: '#64748B' } }
    },
    grid: {
      borderColor: '#E2E8F0',
      strokeDashArray: 4
    },
    legend: {
      position: 'top',
      horizontalAlign: 'right'
    }
  }

  const chartSeries = [
    {
      name: 'Carbon Credits',
      data: [30, 40, 35, 50, 49, 60]
    },
    {
      name: 'ESG Score',
      data: [65, 70, 75, 80, 85, 88]
    },
    {
      name: 'Supply Chain Items',
      data: [100, 120, 115, 140, 135, 160]
    }
  ]

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {overviewData.map((stat, index) => (
          <StatCard
            key={index}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            icon={stat.icon}
            trend={stat.trend}
            verified={stat.verified}
          />
        ))}
      </div>

      {/* Charts and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Chart */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Performance Overview</h3>
              <p className="text-sm text-gray-600">Track your sustainability metrics</p>
            </div>
            <Badge variant="success" icon="TrendingUp">
              +12% this month
            </Badge>
          </div>
          <Chart
            options={chartOptions}
            series={chartSeries}
            type="area"
            height={300}
          />
        </Card>

        {/* Recent Activity */}
        <Card>
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
              <Button variant="ghost" size="sm" icon="MoreHorizontal" />
            </div>
          </div>
          
          {recentActivity.length === 0 ? (
            <Empty 
              title="No recent activity"
              description="Your recent transactions and reports will appear here"
              icon="Activity"
            />
          ) : (
            <div className="divide-y divide-gray-100 max-h-80 overflow-y-auto">
              {recentActivity.map((activity) => (
                <div key={activity.Id} className="p-6 hover:bg-gray-50 transition-colors duration-200">
                  <div className="flex items-start space-x-4">
                    <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                      activity.type === 'report' ? 'bg-blue-100' :
                      activity.type === 'trade' ? 'bg-green-100' : 'bg-purple-100'
                    }`}>
                      <ApperIcon 
                        name={
                          activity.type === 'report' ? 'FileText' :
                          activity.type === 'trade' ? 'ArrowRightLeft' : 'Package'
                        } 
                        className={`w-5 h-5 ${
                          activity.type === 'report' ? 'text-blue-600' :
                          activity.type === 'trade' ? 'text-green-600' : 'text-purple-600'
                        }`} 
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">
                        {activity.title}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        {activity.description}
                      </p>
                      <div className="flex items-center space-x-2 mt-2">
                        <span className="text-xs text-gray-500">
                          {format(new Date(activity.timestamp), 'MMM dd, yyyy HH:mm')}
                        </span>
                        <Badge 
                          variant={activity.status === 'completed' ? 'success' : 'warning'}
                          size="sm"
                        >
                          {activity.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
<Button
          variant="primary"
          icon="FileText"
          className="justify-start h-auto p-4"
          onClick={() => window.location.href = '/reports'}
        >
          <div className="text-left">
            <div className="font-medium">Create ESG Report</div>
            <div className="text-sm opacity-90">Submit new sustainability data</div>
          </div>
        </Button>
        
        <Button
          variant="secondary"
          icon="Store"
          className="justify-start h-auto p-4"
          onClick={() => window.location.href = '/marketplace'}
        >
          <div className="text-left">
            <div className="font-medium">Browse Marketplace</div>
            <div className="text-sm opacity-90">Buy or sell carbon credits</div>
          </div>
        </Button>
        
        <Button
          variant="accent"
          icon="Package"
          className="justify-start h-auto p-4"
          onClick={() => window.location.href = '/supply-chain'}
        >
          <div className="text-left">
            <div className="font-medium">Track Shipment</div>
            <div className="text-sm opacity-90">Monitor supply chain</div>
          </div>
        </Button>
        </div>
      </Card>
    </div>
  )
}

export default Dashboard