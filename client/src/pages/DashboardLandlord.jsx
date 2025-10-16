import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

const DashboardLandlord = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("tenants");
  const [selectedReport, setSelectedReport] = useState("monthly");

  // Mock data - in real app, this would come from API
  const tenants = [
    { 
      id: "1", 
      name: "John Doe", 
      email: "john@example.com", 
      phone: "+1234567890",
      property: "Golf Heights - Unit 101",
      rentAmount: 1200,
      balance: 200,
      status: "overdue",
      lastPaymentDate: "2024-01-15",
      leaseStart: "2024-01-01",
      leaseEnd: "2024-12-31"
    },
    { 
      id: "2", 
      name: "Jane Smith", 
      email: "jane@example.com", 
      phone: "+1234567891",
      property: "Golf Heights - Unit 102",
      rentAmount: 1100,
      balance: 0,
      status: "paid",
      lastPaymentDate: "2024-02-01",
      leaseStart: "2024-01-15",
      leaseEnd: "2024-12-31"
    },
  ];

  const payments = [
    { id: "1", tenantId: "2", tenantName: "Jane Smith", amount: 1100, date: "2024-02-01", status: "completed", method: "Bank Transfer" },
    { id: "2", tenantId: "1", tenantName: "John Doe", amount: 1000, date: "2024-01-15", status: "completed", method: "Credit Card" },
  ];

  const properties = [
    { id: "1", name: "Golf Heights", address: "123 Main St", totalUnits: 10, occupiedUnits: 8, monthlyRent: 9500, occupancyRate: 80 },
    { id: "2", name: "Sunset Villas", address: "456 Oak Ave", totalUnits: 6, occupiedUnits: 6, monthlyRent: 7800, occupancyRate: 100 },
  ];

  const communications = [
    { id: "1", tenantId: "1", tenantName: "John Doe", type: "email", subject: "Rent Reminder", date: "2024-02-05", status: "sent" },
    { id: "2", tenantId: "2", tenantName: "Jane Smith", type: "sms", subject: "Payment Confirmation", date: "2024-02-01", status: "read" },
  ];

  const monthlyIncome = properties.reduce((sum, prop) => sum + prop.monthlyRent, 0);
  const totalBalance = tenants.reduce((sum, tenant) => sum + tenant.balance, 0);

  // Mock function to simulate real-time notifications
  useEffect(() => {
    const interval = setInterval(() => {
      // In real app, this would check for new payments
      console.log("Checking for new payments...");
    }, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const handleExportReport = () => {
    // Mock export functionality
    alert(`Exporting ${selectedReport} report...`);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "paid": return "bg-green-100 text-green-800";
      case "overdue": return "bg-red-100 text-red-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50 dark:bg-black text-black dark:text-white transition-all duration-300">
      <h1 className="text-3xl font-bold mb-2">Landlord Dashboard</h1>
      <p className="mb-6 text-gray-600 dark:text-gray-400">Welcome, {user?.email}</p>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Monthly Income</h3>
          <p className="text-2xl font-bold">${monthlyIncome}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Outstanding Balance</h3>
          <p className="text-2xl font-bold text-red-600">${totalBalance}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Properties</h3>
          <p className="text-2xl font-bold">{properties.length}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Tenants</h3>
          <p className="text-2xl font-bold">{tenants.length}</p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="mb-6 border-b border-gray-200 dark:border-gray-700">
        <nav className="-mb-px flex space-x-8">
          {["tenants", "payments", "properties", "analytics", "reports", "communications"].map((tab) => (
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

      {/* Tenants Management */}
      {activeTab === "tenants" && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Tenant Management</h2>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
              Add Tenant
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-700">
                  <th className="p-3 text-left text-sm font-medium">Tenant</th>
                  <th className="p-3 text-left text-sm font-medium">Property</th>
                  <th className="p-3 text-left text-sm font-medium">Rent Amount</th>
                  <th className="p-3 text-left text-sm font-medium">Balance</th>
                  <th className="p-3 text-left text-sm font-medium">Status</th>
                  <th className="p-3 text-left text-sm font-medium">Last Payment</th>
                </tr>
              </thead>
              <tbody>
                {tenants.map((tenant) => (
                  <tr key={tenant.id} className="border-t border-gray-200 dark:border-gray-600">
                    <td className="p-3">
                      <div>
                        <p className="font-medium">{tenant.name}</p>
                        <p className="text-sm text-gray-500">{tenant.email}</p>
                      </div>
                    </td>
                    <td className="p-3">{tenant.property}</td>
                    <td className="p-3">${tenant.rentAmount}</td>
                    <td className="p-3">${tenant.balance}</td>
                    <td className="p-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(tenant.status)}`}>
                        {tenant.status}
                      </span>
                    </td>
                    <td className="p-3">{tenant.lastPaymentDate || "No payments"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Payment Tracking */}
      {activeTab === "payments" && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Payment Tracking</h2>
          <div className="space-y-4">
            {payments.map((payment) => (
              <div key={payment.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{payment.tenantName}</p>
                    <p className="text-sm text-gray-500">{payment.date} • {payment.method}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-green-600">${payment.amount}</p>
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                      {payment.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Property Overview */}
      {activeTab === "properties" && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Property Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {properties.map((property) => (
              <div key={property.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                <h3 className="font-semibold text-lg mb-2">{property.name}</h3>
                <p className="text-sm text-gray-500 mb-3">{property.address}</p>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-gray-500">Units</p>
                    <p>{property.occupiedUnits}/{property.totalUnits}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Occupancy</p>
                    <p>{property.occupancyRate}%</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Monthly Rent</p>
                    <p>${property.monthlyRent}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Collection Rate</p>
                    <p>95%</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Revenue Analytics */}
      {activeTab === "analytics" && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Revenue Analytics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-3">Monthly Performance</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500">Total Revenue</p>
                  <p className="text-2xl font-bold">${monthlyIncome}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Average Rent</p>
                  <p className="text-xl">${Math.round(monthlyIncome / tenants.length)}</p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Property Performance</h3>
              {properties.map((property) => (
                <div key={property.id} className="mb-3">
                  <div className="flex justify-between text-sm">
                    <span>{property.name}</span>
                    <span>${property.monthlyRent}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full" 
                      style={{ width: `${property.occupancyRate}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Automated Reports */}
      {activeTab === "reports" && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Automated Reports</h2>
            <div className="flex gap-2">
              <select 
                value={selectedReport}
                onChange={(e) => setSelectedReport(e.target.value)}
                className="border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-gray-700"
              >
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
                <option value="annual">Annual</option>
              </select>
              <button 
                onClick={handleExportReport}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
              >
                Export Report
              </button>
            </div>
          </div>
          <div className="space-y-4">
            <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
              <h3 className="font-semibold">{selectedReport.charAt(0).toUpperCase() + selectedReport.slice(1)} Financial Report</h3>
              <p className="text-sm text-gray-500 mt-2">Includes: Rent collection, expenses, net income, tax summaries</p>
            </div>
          </div>
        </div>
      )}

      {/* Communication History */}
      {activeTab === "communications" && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Communication History</h2>
          <div className="space-y-3">
            {communications.map((comm) => (
              <div key={comm.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">{comm.tenantName}</p>
                    <p className="text-sm text-gray-500">{comm.subject}</p>
                  </div>
                  <div className="text-right">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      comm.type === 'email' ? 'bg-blue-100 text-blue-800' : 
                      comm.type === 'sms' ? 'bg-green-100 text-green-800' : 
                      'bg-purple-100 text-purple-800'
                    }`}>
                      {comm.type}
                    </span>
                    <p className="text-sm text-gray-500 mt-1">{comm.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardLandlord;