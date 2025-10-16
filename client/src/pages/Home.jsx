import {
  Users,
  Building2,
  Wallet,
  BarChart3,
  FileText,
  Bell,
  UserPlus,
  ClipboardList,
  LayoutDashboard,
  Wifi,
  ArrowRight,
} from "lucide-react";
import { motion } from "framer-motion";

const Home = () => {
  const features = [
    {
      title: "Tenant Management",
      description:
        "Manage all your tenants in one dashboard. Track rent status and communication history.",
      icon: Users,
    },
    {
      title: "Payment Tracking",
      description:
        "Real-time notifications when rent is paid. View complete payment histories and outstanding balances.",
      icon: Wallet,
    },
    {
      title: "Revenue Analytics",
      description:
        "Monthly income reports and analytics. Understand your property performance at a glance.",
      icon: BarChart3,
    },
    {
      title: "Property Overview",
      description:
        "Manage multiple properties from one account. Track occupancy and rent collection rates.",
      icon: Building2,
    },
    {
      title: "Automated Reports",
      description:
        "Generate and export detailed financial reports. Perfect for tax season and accounting.",
      icon: FileText,
    },
    {
      title: "Instant Confirmations",
      description:
        "Get notified immediately when tenants make payments. No more chasing payments.",
      icon: Bell,
    },
  ];

  const howItWorks = [
    {
      step: "1",
      title: "Sign Up",
      description:
        "Create your free account as a tenant or landlord in under 2 minutes.",
      icon: UserPlus,
    },
    {
      step: "2",
      title: "Set Up Profile",
      description: "Add your property details or connect with your landlord.",
      icon: ClipboardList,
    },
    {
      step: "3",
      title: "Start Managing",
      description:
        "Pay rent, track payments, and manage everything from one dashboard.",
      icon: LayoutDashboard,
    },
    {
      step: "4",
      title: "Stay Connected",
      description:
        "Get real-time notifications and never miss important updates.",
      icon: Wifi,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black text-gray-800 dark:text-gray-100">
      {/* Hero Section */}
      <section className="text-center py-20 px-6">
        <p className="text-lg md:text-xl max-w-2xl mx-auto">
          Whether you're renting or managing properties,{" "}
          <span className="font-bold text-black dark:text-white">
            KejaLink
          </span>{" "}
          has the tools you need to succeed.
        </p>
      </section>

      {/* Role Section */}
      <section className="py-10 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">For Everyone</h2>
        <div className="flex flex-col md:flex-row justify-center gap-6">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-md p-6 w-full md:w-1/3">
            <h3 className="text-xl font-semibold mb-2">For Tenants</h3>
            <p className="text-gray-600 dark:text-gray-400">
              A smooth renting experience with transparent payments and instant
              confirmations.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-md p-6 w-full md:w-1/3">
            <h3 className="text-xl font-semibold mb-2">For Landlords</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Manage multiple properties, track payments, and analyze revenue in
              real-time.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 bg-white dark:bg-gray-900">
        <h2 className="text-3xl font-bold text-center mb-12">Features</h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              className="flex flex-col items-start p-6 bg-gray-50 dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-lg transition-transform"
            >
              <motion.div
                animate={{
                  y: [0, -4, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <feature.icon
                  className="text-black dark:text-white mb-4"
                  size={32}
                />
              </motion.div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-6 bg-gray-50 dark:bg-gray-950 text-center relative">
        <h2 className="text-3xl font-bold mb-4">How It Works</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
          Get started in minutes. No complicated setup or technical knowledge
          required.
        </p>

        <div className="relative max-w-6xl mx-auto">
          {/* Steps */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
            {howItWorks.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.07 }}
                className="flex flex-col items-center text-center bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-md hover:shadow-xl transition-transform relative"
              >
                {/* Animated icon */}
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="flex items-center justify-center bg-gray-300 dark:bg-gray-600 text-black dark:text-blue-200 w-16 h-16 rounded-full mb-4"
                >
                  <step.icon size={32} />
                </motion.div>

                {/* Step text */}
                <h3 className="text-xl font-semibold mb-2">
                  {step.step}. {step.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {step.description}
                </p>

                {/* Arrow connector (hidden on last step and mobile) */}
                {index < howItWorks.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{
                      duration: 0.8,
                      delay: index * 0.2 + 0.5,
                    }}
                    className="hidden lg:flex absolute top-1/2 right-[-24px] transform -translate-y-1/2 text-gray-500 dark:text-gray-300"
                  >
                    <ArrowRight size={32} />
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
