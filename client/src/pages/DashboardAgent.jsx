import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const DashboardAgent = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("properties");

  // Mock data
  const properties = [
    {
      id: "1",
      name: "Golf Heights",
      address: "123 Main Street, Nairobi",
      owner: "David Kimani",
      totalUnits: 10,
      occupiedUnits: 8,
      monthlyRent: 12000,
      managementFee: 1200,
      tenants: [
        { id: "1", name: "John Doe", email: "john@example.com", unit: "Unit 101", rent: 1200, status: "current", leaseEnd: "2024-12-31" },
        { id: "2", name: "Jane Smith", email: "jane@example.com", unit: "Unit 102", rent: 1100, status: "current", leaseEnd: "2024-11-30" },
      ]
    },
    {
      id: "2",
      name: "Sunset Villas",
      address: "456 Oak Avenue, Nairobi",
      owner: "Sarah Johnson",
      totalUnits: 6,
      occupiedUnits: 6,
      monthlyRent: 9000,
      managementFee: 900,
      tenants: [
        { id: "3", name: "Mike Johnson", email: "mike@example.com", unit: "Villa A", rent: 1500, status: "current", leaseEnd: "2024-10-31" },
      ]
    },
  ];

  const totalProperties = properties.length;
  const totalTenants = properties.reduce((sum, prop) => sum + prop.tenants.length, 0);
  const totalMonthlyRent = properties.reduce((sum, prop) => sum + prop.monthlyRent, 0);
  const totalManagementFees = properties.reduce((sum, prop) => sum + prop.managementFee, 0);

  return (
    <div className="p-6 min-h-screen bg-gray-50 dark:bg-black text-black dark:text-white transition-all duration-300">
      <h1 className="text-3xl font-bold mb-2">Agent Dashboard</h1>
      <p className="mb-6 text-gray-600 dark:text-gray-400">Welcome, {user?.email}</p>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Managed Properties</h3>
          <p className="text-2xl font-bold">{totalProperties}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Tenants</h3>
          <p className="text-2xl font-bold">{totalTenants}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Monthly Rent</h3>
          <p className="text-2xl font-bold">${totalMonthlyRent}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Management Fees</h3>
          <p className="text-2xl font-bold">${totalManagementFees}</p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="mb-6 border-b border-gray-200 dark:border-gray-700">
        <nav className="-mb-px flex space-x-8">
          {["properties", "tenants", "reports"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-2 px-1 border-b-2 font-medium text-sm capitalize ${
                activeTab === tab
                  ? "border-blue-500 text-blue-600 dark:text-blue-400"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      {/* Properties Management */}
      {activeTab === "properties" && (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Managed Properties</h2>
          {properties.map((property) => (
            <div key={property.id} className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold">{property.name}</h3>
                  <p className="text-gray-500 dark:text-gray-400">{property.address}</p>
                  <p className="text-sm text-gray-500">Owner: {property.owner}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold">${property.monthlyRent}</p>
                  <p className="text-sm text-gray-500">Monthly Rent</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="text-center">
                  <p className="text-2xl font-bold">{property.occupiedUnits}/{property.totalUnits}</p>
                  <p className="text-sm text-gray-500">Units Occupied</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold">{Math.round((property.occupiedUnits / property.totalUnits) * 100)}%</p>
                  <p className="text-sm text-gray-500">Occupancy Rate</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold">${property.managementFee}</p>
                  <p className="text-sm text-gray-500">Management Fee</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">95%</p>
                  <p className="text-sm text-gray-500">Collection Rate</p>
                </div>
              </div>

              <div className="mt-4">
                <h4 className="font-semibold mb-2">Current Tenants</h4>
                <div className="space-y-2">
                  {property.tenants.map((tenant) => (
                    <div key={tenant.id} className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                      <div>
                        <p className="font-medium">{tenant.name}</p>
                        <p className="text-sm text-gray-500">{tenant.unit} • {tenant.email}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">${tenant.rent}</p>
                        <p className="text-sm text-gray-500">Lease ends: {tenant.leaseEnd}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* All Tenants View */}
      {activeTab === "tenants" && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">All Tenants</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-700">
                  <th className="p-3 text-left text-sm font-medium">Tenant</th>
                  <th className="p-3 text-left text-sm font-medium">Property</th>
                  <th className="p-3 text-left text-sm font-medium">Unit</th>
                  <th className="p-3 text-left text-sm font-medium">Rent</th>
                  <th className="p-3 text-left text-sm font-medium">Status</th>
                  <th className="p-3 text-left text-sm font-medium">Lease End</th>
                </tr>
              </thead>
              <tbody>
                {properties.flatMap(property => 
                  property.tenants.map(tenant => (
                    <tr key={tenant.id} className="border-t border-gray-200 dark:border-gray-600">
                      <td className="p-3">
                        <div>
                          <p className="font-medium">{tenant.name}</p>
                          <p className="text-sm text-gray-500">{tenant.email}</p>
                        </div>
                      </td>
                      <td className="p-3">{property.name}</td>
                      <td className="p-3">{tenant.unit}</td>
                      <td className="p-3">${tenant.rent}</td>
                      <td className="p-3">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          tenant.status === 'current' ? 'bg-green-100 text-green-800' :
                          tenant.status === 'moving' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {tenant.status}
                        </span>
                      </td>
                      <td className="p-3">{tenant.leaseEnd}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Reports */}
      {activeTab === "reports" && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Management Reports</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
              <h3 className="font-semibold mb-2">Property Performance</h3>
              <p className="text-sm text-gray-500 mb-3">Overview of all managed properties</p>
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded text-sm">
                Generate Report
              </button>
            </div>
            <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
              <h3 className="font-semibold mb-2">Commission Statement</h3>
              <p className="text-sm text-gray-500 mb-3">Monthly management fees and commissions</p>
              <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded text-sm">
                Generate Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardAgent;