import { BiCreditCard, BiGlobe, BiHomeAlt } from "react-icons/bi";
import { motion } from "framer-motion";
import { ScrollReveal } from "../../ui/smooth-scroll";

const AboutUs = () => {
  const features = [
    {
      icon: BiHomeAlt,
      title: "Smart City Properties",
      description: "Specializing in modern smart city developments with cutting-edge technology, sustainable design, and future-ready infrastructure for the next generation."
    },
    {
      icon: BiGlobe,
      title: "Bangalore Real Estate Experts",
      description: "Deep local expertise in Bangalore's booming real estate market, connecting you with premium properties in IT corridors and emerging neighborhoods."
    },
    {
      icon: BiCreditCard,
      title: "Investment Solutions",
      description: "Comprehensive investment guidance with transparent pricing, ROI analysis, and flexible financing options tailored for smart property investments."
    }
  ];

  return (
    <section className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-gray-5 dark:bg-gray-900">
      <div className="w-full mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/images/property (16).jpg"
                alt="Modern luxury property exterior"
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="absolute -bottom-8 -right-8 w-48 h-64 sm:w-64 sm:h-80 rounded-2xl overflow-hidden shadow-2xl border-4 border-white dark:border-gray-800"
            >
              <img
                src="/images/property (26).jpg"
                alt="Elegant interior design"
                className="object-cover w-full h-full"
              />
            </motion.div>
          </motion.div>

          {/* Content Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="inline-block text-blue-600 dark:text-blue-400 font-semibold text-sm uppercase tracking-wider"
              >
                About Us
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-tight"
              >
                Your Smart City
                <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Property Partner
                </span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed"
              >
                Leading Bangalore's smart city revolution with premium properties in tech hubs and emerging corridors. We combine local expertise with innovative technology to deliver exceptional real estate solutions for modern living and smart investments.
              </motion.p>
            </div>

            <div className="space-y-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-4 p-4 rounded-xl hover:bg-white/50 dark:hover:bg-gray-800/50 transition-all duration-300"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white shadow-lg">
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              className="pt-6"
            >
              <div className="flex flex-wrap gap-8 text-center">
                <div>
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">250+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Smart Properties</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">500+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Happy Families</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600 dark:text-green-400">15+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Bangalore Locations</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;