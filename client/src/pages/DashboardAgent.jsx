import { useAuth } from "../context/AuthContext";

const DashboardAgent = () => {
  const { user } = useAuth();

  // Mock properties and tenants
  const properties = [
    {
      name: "Golf Heights",
      tenants: ["tenantA@kejani.com", "tenantB@kejani.com"],
    },
    {
      name: "Sunset Villas",
      tenants: ["tenantC@kejani.com"],
    },
  ];

  return (
    <div className="p-6 min-h-screen bg-gray-50 dark:bg-black text-black dark:text-white transition-all duration-300">
      <h1 className="text-3xl font-bold mb-4">Agent Dashboard</h1>
      <p className="mb-4">Welcome, {user?.email}</p>

      <div className="space-y-4">
        {properties.map((property, i) => (
          <div
            key={i}
            className="p-4 border rounded-lg bg-white dark:bg-gray-900 shadow-md"
          >
            <h2 className="text-xl font-semibold">{property.name}</h2>
            <p className="mt-2">
              Tenants: {property.tenants.join(", ")}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardAgent;
