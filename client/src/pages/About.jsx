import { Building2, Users2, ShieldCheck, TrendingUp } from "lucide-react";

const About = () => {
  return (
    <section className="bg-white dark:bg-black text-gray-800 dark:text-gray-200 min-h-screen pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            About <span className="text-gray-500">KejaLink</span>
          </h1>
          <p className="max-w-2xl mx-auto text-gray-700 dark:text-gray-300">
            KejaLink bridges the gap between tenants, landlords and agents
            making rental management effortless, transparent and efficient for everyone.
          </p>
          <div>
            <p className="mt-4 text-black dark:text-white leading-relaxed">
              With KejaLink, tenants enjoy convenience, landlords gain visibility
              and agents manage properties more effectively.
            </p>
          </div>
        </div>

        {/* Mission Image Section */}
        <div className="md:grid-cols-2 gap-10 mb-16">
          <div className="overflow-hidden rounded-2xl shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
              alt="Modern Apartment Building"
              className="w-full h-[400px] object-cover grayscale hover:grayscale-0 transition duration-700 ease-in-out"
            />
          </div>
        </div>

        {/* Core Values Section */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
            Our Core Values
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <Building2 className="text-blue-600" size={28} />,
                title: "Innovation",
                desc: "We leverage technology to make renting smarter and simpler.",
              },
              {
                icon: <Users2 className="text-green-500" size={28} />,
                title: "Community",
                desc: "We build trust between tenants, landlords, and agents.",
              },
              {
                icon: <ShieldCheck className="text-yellow-500" size={28} />,
                title: "Integrity",
                desc: "We ensure transparent transactions and secure data handling.",
              },
              {
                icon: <TrendingUp className="text-purple-500" size={28} />,
                title: "Growth",
                desc: "We empower users to achieve better property management outcomes.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-gray-50 dark:bg-gray-900 p-6 rounded-xl shadow-md hover:shadow-lg transition-transform transform hover:scale-105"
              >
                <div className="mb-3 flex justify-center">{item.icon}</div>
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            Ready to Experience Smarter Property Management?
          </h2>
          <a
            href="/signup"
            className="bg-gray-500 hover:bg-gray-700 text-white px-6 py-3 rounded-full font-medium shadow-md transition"
          >
            Get Started with KejaLink
          </a>
        </div>
      </div>
    </section>
  );
};

export default About;
