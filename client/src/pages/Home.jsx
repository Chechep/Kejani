import { Users, Building2, Wallet, BarChart3, FileText, Bell } from "lucide-react";

const Home = () => {
  const features = [
    {
      title: "Tenant Management",
      description: "Manage all your tenants in one dashboard. Track rent status and communication history.",
      icon: Users,
    },
    {
      title: "Payment Tracking",
      description: "Real-time notifications when rent is paid. View complete payment histories and outstanding balances.",
      icon: Wallet,
    },
    {
      title: "Revenue Analytics",
      description: "Monthly income reports and analytics. Understand your property performance at a glance.",
      icon: BarChart3,
    },
    {
      title: "Property Overview",
      description: "Manage multiple properties from one account. Track occupancy and rent collection rates.",
      icon: Building2,
    },
    {
      title: "Automated Reports",
      description: "Generate and export detailed financial reports. Perfect for tax season and accounting.",
      icon: FileText,
    },
    {
      title: "Instant Confirmations",
      description: "Get notified immediately when tenants make payments. No more chasing payments.",
      icon: Bell,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black text-gray-800 dark:text-gray-100">
      {/* Hero Section */}
      <section className="text-center py-20 px-6">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Built for Everyone</h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto">
          Whether you're renting or managing properties, <span className="font-semibold">RentLink</span> has the tools you need to succeed.
        </p>
      </section>

      {/* Role Section */}
      <section className="py-10 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">For Everyone</h2>
        <div className="flex flex-col md:flex-row justify-center gap-6">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-md p-6 w-full md:w-1/3">
            <h3 className="text-xl font-semibold mb-2">For Tenants</h3>
            <p className="text-gray-600 dark:text-gray-400">
              A smooth renting experience with transparent payments and instant confirmations.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-md p-6 w-full md:w-1/3">
            <h3 className="text-xl font-semibold mb-2">For Landlords</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Manage multiple properties, track payments, and analyze revenue in real-time.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 bg-white dark:bg-gray-900">
        <h2 className="text-3xl font-bold text-center mb-12"> Features</h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-start p-6 bg-gray-50 dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-lg transition"
            >
              <feature.icon className="text-blue-600 dark:text-blue-400 mb-4" size={32} />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
