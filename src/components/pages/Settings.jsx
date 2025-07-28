import React, { useState } from "react"
import Card from "@/components/atoms/Card"
import Button from "@/components/atoms/Button"
import Input from "@/components/atoms/Input"
import Badge from "@/components/atoms/Badge"
import ApperIcon from "@/components/ApperIcon"
import { toast } from "react-toastify"

const Settings = () => {
  const [activeTab, setActiveTab] = useState("general")
  const [saving, setSaving] = useState(false)
  
  const [generalSettings, setGeneralSettings] = useState({
    companyName: "Sustainable Corp",
    industry: "Manufacturing",
    reportingStandard: "GRI",
    timezone: "UTC",
    currency: "USD"
  })

  const [notificationSettings, setNotificationSettings] = useState({
    emailReports: true,
    blockchainUpdates: true,
    marketplaceAlerts: false,
    supplyChainUpdates: true,
    performanceAlerts: true
  })

  const [apiSettings, setApiSettings] = useState({
    solanaNetwork: "mainnet",
    iotIntegration: true,
    autoVerification: false,
    webhookUrl: ""
  })

  const tabs = [
    { id: "general", name: "General", icon: "Settings" },
    { id: "notifications", name: "Notifications", icon: "Bell" },
    { id: "api", name: "API & Integrations", icon: "Code" },
    { id: "security", name: "Security", icon: "Shield" }
  ]

  const handleSaveSettings = async (settingsType) => {
    try {
      setSaving(true)
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      toast.success(`${settingsType} settings saved successfully!`)
    } catch (error) {
      toast.error("Failed to save settings")
    } finally {
      setSaving(false)
    }
  }

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Company Name"
          value={generalSettings.companyName}
          onChange={(e) => setGeneralSettings(prev => ({ ...prev, companyName: e.target.value }))}
        />
        
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">Industry</label>
          <select
            value={generalSettings.industry}
            onChange={(e) => setGeneralSettings(prev => ({ ...prev, industry: e.target.value }))}
            className="flex h-10 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="Manufacturing">Manufacturing</option>
            <option value="Technology">Technology</option>
            <option value="Energy">Energy</option>
            <option value="Agriculture">Agriculture</option>
            <option value="Transportation">Transportation</option>
          </select>
        </div>
        
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">Reporting Standard</label>
          <select
            value={generalSettings.reportingStandard}
            onChange={(e) => setGeneralSettings(prev => ({ ...prev, reportingStandard: e.target.value }))}
            className="flex h-10 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="GRI">GRI Standards</option>
            <option value="SASB">SASB Standards</option>
            <option value="TCFD">TCFD Framework</option>
            <option value="CDP">CDP</option>
          </select>
        </div>
        
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">Timezone</label>
          <select
            value={generalSettings.timezone}
            onChange={(e) => setGeneralSettings(prev => ({ ...prev, timezone: e.target.value }))}
            className="flex h-10 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="UTC">UTC</option>
            <option value="EST">Eastern Time</option>
            <option value="PST">Pacific Time</option>
            <option value="CET">Central European Time</option>
          </select>
        </div>
      </div>
      
      <Button
        onClick={() => handleSaveSettings("General")}
        loading={saving}
        icon="Save"
      >
        Save Changes
      </Button>
    </div>
  )

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        {Object.entries(notificationSettings).map(([key, value]) => (
          <div key={key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h4 className="text-sm font-medium text-gray-900 capitalize">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </h4>
              <p className="text-sm text-gray-600">
                {key === 'emailReports' && 'Receive monthly ESG reports via email'}
                {key === 'blockchainUpdates' && 'Get notified when transactions are verified'}
                {key === 'marketplaceAlerts' && 'Alerts for new carbon credit opportunities'}
                {key === 'supplyChainUpdates' && 'Real-time shipment and IoT sensor updates'}
                {key === 'performanceAlerts' && 'Notifications for performance milestones'}
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={value}
                onChange={(e) => setNotificationSettings(prev => ({ ...prev, [key]: e.target.checked }))}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
            </label>
          </div>
        ))}
      </div>
      
      <Button
        onClick={() => handleSaveSettings("Notification")}
        loading={saving}
        icon="Save"
      >
        Save Preferences
      </Button>
    </div>
  )

  const renderApiSettings = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">Solana Network</label>
          <select
            value={apiSettings.solanaNetwork}
            onChange={(e) => setApiSettings(prev => ({ ...prev, solanaNetwork: e.target.value }))}
            className="flex h-10 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="mainnet">Mainnet</option>
            <option value="devnet">Devnet</option>
            <option value="testnet">Testnet</option>
          </select>
        </div>
        
        <Input
          label="Webhook URL"
          placeholder="https://your-api.com/webhook"
          value={apiSettings.webhookUrl}
          onChange={(e) => setApiSettings(prev => ({ ...prev, webhookUrl: e.target.value }))}
        />
        
        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h4 className="text-sm font-medium text-gray-900">IoT Integration</h4>
              <p className="text-sm text-gray-600">Enable real-time sensor data collection</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={apiSettings.iotIntegration}
                onChange={(e) => setApiSettings(prev => ({ ...prev, iotIntegration: e.target.checked }))}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h4 className="text-sm font-medium text-gray-900">Auto Verification</h4>
              <p className="text-sm text-gray-600">Automatically verify reports on blockchain</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={apiSettings.autoVerification}
                onChange={(e) => setApiSettings(prev => ({ ...prev, autoVerification: e.target.checked }))}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
            </label>
          </div>
        </div>
      </div>
      
      <Button
        onClick={() => handleSaveSettings("API")}
        loading={saving}
        icon="Save"
      >
        Save Configuration
      </Button>
    </div>
  )

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-4">
          <div className="flex items-center space-x-3 mb-3">
            <ApperIcon name="Wallet" className="w-5 h-5 text-blue-600" />
            <h4 className="text-sm font-medium text-gray-900">Wallet Connection</h4>
          </div>
          <p className="text-sm text-gray-600 mb-3">9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM</p>
          <Badge variant="success" size="sm" icon="CheckCircle">
            Connected
          </Badge>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center space-x-3 mb-3">
            <ApperIcon name="Shield" className="w-5 h-5 text-green-600" />
            <h4 className="text-sm font-medium text-gray-900">Two-Factor Auth</h4>
          </div>
          <p className="text-sm text-gray-600 mb-3">Add extra security to your account</p>
          <Button variant="outline" size="sm">
            Enable 2FA
          </Button>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center space-x-3 mb-3">
            <ApperIcon name="Key" className="w-5 h-5 text-purple-600" />
            <h4 className="text-sm font-medium text-gray-900">API Keys</h4>
          </div>
          <p className="text-sm text-gray-600 mb-3">Manage your API access keys</p>
          <Button variant="outline" size="sm" icon="Plus">
            Generate Key
          </Button>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center space-x-3 mb-3">
            <ApperIcon name="History" className="w-5 h-5 text-orange-600" />
            <h4 className="text-sm font-medium text-gray-900">Activity Log</h4>
          </div>
          <p className="text-sm text-gray-600 mb-3">View your recent activity</p>
          <Button variant="outline" size="sm" icon="Eye">
            View Log
          </Button>
        </Card>
      </div>
      
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <ApperIcon name="AlertTriangle" className="w-5 h-5 text-red-600 mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-red-800">Danger Zone</h4>
            <p className="text-sm text-red-700 mt-1">
              These actions are irreversible. Please proceed with caution.
            </p>
            <div className="mt-3 space-x-2">
              <Button variant="danger" size="sm">
                Reset Settings
              </Button>
              <Button variant="outline" size="sm">
                Export Data
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600">Manage your account and platform preferences</p>
      </div>

      {/* Settings Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1">
          <Card className="p-2">
            <nav className="space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                    activeTab === tab.id
                      ? "bg-primary-500 text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <ApperIcon name={tab.icon} className="w-4 h-4" />
                  <span>{tab.name}</span>
                </button>
              ))}
            </nav>
          </Card>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3">
          <Card className="p-6">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                {tabs.find(tab => tab.id === activeTab)?.name}
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                {activeTab === "general" && "Configure your basic account and company information"}
                {activeTab === "notifications" && "Manage how you receive updates and alerts"}
                {activeTab === "api" && "Configure integrations and API access"}
                {activeTab === "security" && "Manage security settings and access controls"}
              </p>
            </div>

            {activeTab === "general" && renderGeneralSettings()}
            {activeTab === "notifications" && renderNotificationSettings()}
            {activeTab === "api" && renderApiSettings()}
            {activeTab === "security" && renderSecuritySettings()}
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Settings