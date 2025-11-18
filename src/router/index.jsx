import React, { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

// Lazy load all page components
const Dashboard = lazy(() => import("@/components/pages/Dashboard"));
const ESGReports = lazy(() => import("@/components/pages/ESGReports"));
const Marketplace = lazy(() => import("@/components/pages/Marketplace"));
const SupplyChain = lazy(() => import("@/components/pages/SupplyChain"));
const Analytics = lazy(() => import("@/components/pages/Analytics"));
const Settings = lazy(() => import("@/components/pages/Settings"));
const NotFound = lazy(() => import("@/components/pages/NotFound"));
const Layout = lazy(() => import("@/components/pages/Layout"));

// Loading fallback component
const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
    <div className="text-center space-y-4">
      <svg className="animate-spin h-12 w-12 text-blue-600 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
      </svg>
    </div>
  </div>
);

// Main routes configuration
const mainRoutes = [
  {
    path: "",
    index: true,
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <Dashboard />
      </Suspense>
    )
  },
  {
    path: "reports",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <ESGReports />
      </Suspense>
    )
  },
  {
    path: "marketplace",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <Marketplace />
      </Suspense>
    )
  },
  {
    path: "supply-chain",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <SupplyChain />
      </Suspense>
    )
  },
  {
    path: "analytics",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <Analytics />
      </Suspense>
    )
  },
  {
    path: "settings",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <Settings />
      </Suspense>
    )
  },
  {
    path: "*",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <NotFound />
      </Suspense>
    )
  }
];

// Router configuration
const routes = [
  {
    path: "/",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <Layout />
      </Suspense>
    ),
    children: [...mainRoutes]
  }
];

export const router = createBrowserRouter(routes);