import { useAuth } from "../context/AuthContext";

const DashboardTenant = () => {
  const { user } = useAuth();

  // Mock tenant data
  const rent = 1200;
  const paid = 800;
  const balance = rent - paid;
  const utilities = { water: 50, garbage: 20, security: 30 };

  return (
    <div className="p-6 min-h-screen bg-gray-50 dark:bg-black text-black dark:text-white transition-all duration-300">
      <h1 className="text-3xl font-bold mb-4">
        Tenant Dashboard
      </h1>
      <p className="mb-2">Welcome, {user?.email}</p>

      <div className="mb-6">
        <h2 className="text-xl font-semibold">Rent Details</h2>
        <ul className="mt-2 space-y-1">
          <li>Rent Due: ${rent}</li>
          <li>Amount Paid: ${paid}</li>
          <li>Remaining Balance: ${balance}</li>
        </ul>
      </div>

      <div>
        <h2 className="text-xl font-semibold">Utilities</h2>
        <ul className="mt-2 space-y-1">
          <li>Water: ${utilities.water}</li>
          <li>Garbage: ${utilities.garbage}</li>
          <li>Security: ${utilities.security}</li>
        </ul>
      </div>
    </div>
  );
};

export default DashboardTenant;
