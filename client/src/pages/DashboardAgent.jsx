import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Plus, UserPlus, Users, Mail, Copy } from "lucide-react";

const DashboardAgent = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("properties");
  const [showAddTenantModal, setShowAddTenantModal] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState("");
  const [availableTenants, setAvailableTenants] = useState([]);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteLink, setInviteLink] = useState("");

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

  // Mock available tenants (in real app, this would come from your tenant database)
  const mockAvailableTenants = [
    { id: "t1", name: "Alice Brown", email: "alice@example.com", phone: "+254712345678", preferredRent: 1000 },
    { id: "t2", name: "Bob Wilson", email: "bob@example.com", phone: "+254723456789", preferredRent: 1200 },
    { id: "t3", name: "Carol Davis", email: "carol@example.com", phone: "+254734567890", preferredRent: 1500 },
  ];

  const totalProperties = properties.length;
  const totalTenants = properties.reduce((sum, prop) => sum + prop.tenants.length, 0);
  const totalMonthlyRent = properties.reduce((sum, prop) => sum + prop.monthlyRent, 0);
  const totalManagementFees = properties.reduce((sum, prop) => sum + prop.managementFee, 0);

  // Function to open add tenant modal
  const handleAddTenant = (propertyId = "") => {
    setSelectedProperty(propertyId);
    setAvailableTenants(mockAvailableTenants);
    setShowAddTenantModal(true);
  };

  // Function to assign tenant to property
  const handleAssignTenant = (tenant) => {
    alert(`Assigning ${tenant.name} to property ${selectedProperty}`);
    setShowAddTenantModal(false);
    setSelectedProperty("");
  };

  // Function to generate invite
  const handleGenerateInvite = () => {
    const baseUrl = window.location.origin;
    const inviteCode = `INV${Date.now()}`;
    const link = `${baseUrl}/tenant-onboarding?invite=${inviteCode}&property=${selectedProperty}`;
    setInviteLink(link);
    setShowInviteModal(true);
  };

  // Function to send invite via email
  const handleSendInvite = () => {
    if (!inviteEmail) {
      alert("Please enter an email address");
      return;
    }
    // In real app, this would send an email with the invite link
    alert(`Invite sent to ${inviteEmail}`);
    setInviteEmail("");
    setShowInviteModal(false);
  };

  // Function to copy invite link
  const copyToClipboard = () => {
    navigator.clipboard.writeText(inviteLink);
    alert("Invite link copied to clipboard!");
  };

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
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Managed Properties</h2>
            <div className="flex gap-2">
              <button 
                onClick={() => handleAddTenant()}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
              >
                <UserPlus size={20} />
                Add Tenant
              </button>
              <button 
                onClick={handleGenerateInvite}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
              >
                <Mail size={20} />
                Invite Tenant
              </button>
            </div>
          </div>
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
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-semibold">Current Tenants</h4>
                  <button 
                    onClick={() => handleAddTenant(property.id)}
                    className="text-blue-500 hover:text-blue-600 text-sm flex items-center gap-1"
                  >
                    <Plus size={16} />
                    Add to this property
                  </button>
                </div>
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
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">All Tenants</h2>
            <div className="flex gap-2">
              <button 
                onClick={() => handleAddTenant()}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
              >
                <UserPlus size={20} />
                Add Tenant
              </button>
              <button 
                onClick={handleGenerateInvite}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
              >
                <Mail size={20} />
                Invite Tenant
              </button>
            </div>
          </div>
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

      {/* Add Tenant Modal */}
      {showAddTenantModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <Users size={24} />
                  Add Tenant from Tenant Dashboard
                </h3>
                <button 
                  onClick={() => setShowAddTenantModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>

              {selectedProperty && (
                <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900 rounded-lg">
                  <p className="text-sm">
                    Adding tenant to: <strong>{properties.find(p => p.id === selectedProperty)?.name}</strong>
                  </p>
                </div>
              )}

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Select Property</label>
                    <select 
                      value={selectedProperty}
                      onChange={(e) => setSelectedProperty(e.target.value)}
                      className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700"
                    >
                      <option value="">Select a property</option>
                      {properties.map(property => (
                        <option key={property.id} value={property.id}>
                          {property.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Search Tenants</label>
                    <input 
                      type="text" 
                      placeholder="Search by name or email..."
                      className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700"
                    />
                  </div>
                </div>

                <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
                  <h4 className="font-semibold mb-3">Available Tenants</h4>
                  <div className="space-y-3">
                    {availableTenants.map(tenant => (
                      <div key={tenant.id} className="flex justify-between items-center p-3 border border-gray-200 dark:border-gray-600 rounded-lg">
                        <div>
                          <p className="font-medium">{tenant.name}</p>
                          <p className="text-sm text-gray-500">{tenant.email} • {tenant.phone}</p>
                          <p className="text-sm text-blue-500">Preferred Rent: ${tenant.preferredRent}</p>
                        </div>
                        <button
                          onClick={() => handleAssignTenant(tenant)}
                          disabled={!selectedProperty}
                          className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                            selectedProperty 
                              ? 'bg-blue-500 hover:bg-blue-600 text-white' 
                              : 'bg-gray-300 dark:bg-gray-600 text-gray-500 cursor-not-allowed'
                          }`}
                        >
                          <UserPlus size={16} />
                          Assign
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end gap-3 mt-6">
                  <button
                    onClick={() => setShowAddTenantModal(false)}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      // In real app, this would open a form to create new tenant
                      alert("Open new tenant registration form");
                    }}
                    className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg flex items-center gap-2"
                  >
                    <Plus size={16} />
                    Register New Tenant
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Invite Tenant Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <Mail size={24} />
                  Invite Tenant
                </h3>
                <button 
                  onClick={() => setShowInviteModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Tenant Email</label>
                  <input 
                    type="email" 
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    placeholder="Enter tenant email address"
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700"
                  />
                </div>

                {inviteLink && (
                  <div>
                    <label className="block text-sm font-medium mb-2">Invite Link</label>
                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        value={inviteLink}
                        readOnly
                        className="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-600 text-sm"
                      />
                      <button
                        onClick={copyToClipboard}
                        className="px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded flex items-center gap-1"
                      >
                        <Copy size={16} />
                      </button>
                    </div>
                  </div>
                )}

                <div className="flex justify-end gap-3 mt-6">
                  <button
                    onClick={() => setShowInviteModal(false)}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSendInvite}
                    className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg flex items-center gap-2"
                  >
                    <Mail size={16} />
                    Send Invite
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardAgent;