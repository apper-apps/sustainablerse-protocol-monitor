import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import Layout from "@/components/pages/Layout"
import Dashboard from "@/components/pages/Dashboard"
import ESGReports from "@/components/pages/ESGReports"
import Marketplace from "@/components/pages/Marketplace"
import SupplyChain from "@/components/pages/SupplyChain"
import Analytics from "@/components/pages/Analytics"
import Settings from "@/components/pages/Settings"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="reports" element={<ESGReports />} />
          <Route path="marketplace" element={<Marketplace />} />
          <Route path="supply-chain" element={<SupplyChain />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        style={{ zIndex: 9999 }}
      />
    </BrowserRouter>
  )
}

export default App