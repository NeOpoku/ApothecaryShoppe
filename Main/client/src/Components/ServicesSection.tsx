import Aos from "aos";
import { useEffect } from "react";

const services = [
    {
      title: "Herbal Remedies",
      description: "Discover the power of nature with our curated herbal selections.",
      icon: "🌿",
    },
    {
      title: "Custom Compounding",
      description: "Personalized herbal blends tailored to your unique needs.",
      icon: "🧪",
    },
    {
      title: "Consultation Services",
      description: "Expert advice for your health and holistic wellness journey.",
      icon: "💬",
    },
    {
      title: "Wellness Products",
      description: "Explore our range of natural, eco-friendly wellness products.",
      icon: "🛍️",
    },
  ];
  
  const ServicesSection = () => {
    useEffect(() => {
      Aos.init({
        duration: 1000, // animation duration in ms
        once: true, // only animate once
      });
    }, []);
    
    return (
      <section className="py-16 px-6 bg-green-50">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-12">
            Our Services
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {services.map((service) => (
              <div
                key={service.title}
                className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition duration-300 flex flex-col items-center text-center"
              >
                <div className="text-5xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold text-green-700 mb-2">{service.title}</h3>
                <p className="text-green-600 text-sm">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };
  
  export default ServicesSection;
  