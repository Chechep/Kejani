import { useAuth } from "../context/AuthContext";

const DashboardLandlord = () => {
  const { user } = useAuth();

  // Mock landlord data
  const tenants = [
    { name: "Tenant A", email: "tenantA@kejani.com", balance: 200 },
    { name: "Tenant B", email: "tenantB@kejani.com", balance: 0 },
  ];
  const monthlyIncome = tenants.reduce((sum, t) => sum + (1200 - t.balance), 0);

  return (
    <div className="p-6 min-h-screen bg-gray-50 dark:bg-black text-black dark:text-white transition-all duration-300">
      <h1 className="text-3xl font-bold mb-4">Landlord Dashboard</h1>
      <p className="mb-4">Welcome, {user?.email}</p>

      <div className="mb-6">
        <h2 className="text-xl font-semibold">Tenants Overview</h2>
        <table className="w-full mt-2 border border-gray-300 dark:border-gray-700">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-800">
              <th className="p-2">Name</th>
              <th className="p-2">Email</th>
              <th className="p-2">Outstanding Balance</th>
            </tr>
          </thead>
          <tbody>
            {tenants.map((t, i) => (
              <tr key={i} className="border-t border-gray-300 dark:border-gray-700">
                <td className="p-2">{t.name}</td>
                <td className="p-2">{t.email}</td>
                <td className="p-2">${t.balance}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="font-semibold">Monthly Income: ${monthlyIncome}</p>
    </div>
  );
};

export default DashboardLandlord;
