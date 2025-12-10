import { Clock, Mail, MapPin, Phone, Send } from "lucide-react";
import React from "react";
import FAQSection from "../components/FAQSection";
import { motion } from "motion/react";

function Contact() {
  return (
    <div className="mt-16">
      {/* HERO SECTION */}
      <motion.div
        initial={{ opacity: 0, y: 60, scale: 0.96 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="container rounded-2xl bg-gradient-to-r from-green-800 to-green-500 py-15 text-white 
                   relative overflow-hidden"
      >
        {/* SHIMMER EFFECT */}
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
        />

        <div className="relative flex flex-col gap-10 justify-center items-center">
          <p className="text-5xl font-semibold">Contact Us</p>
          <h1 className="lg:px-60 md:px-19 px-4 text-center md:text-2xl">
            Have questions about our products or need assistance? We'd love to
            hear from you. Our team is here to help.
          </h1>
        </div>
      </motion.div>

      {/* CONTENT */}
      <div className="container flex flex-col justify-center lg:flex-row lg:justify-around mt-10">

        <div className="pt-6 w-full space-y-1">
          <h1 className="px-10 text-3xl font-bold text-green-900 mb-8">
            Contact information
          </h1>

          <InfoCard index={0} icon={<MapPin size={30} />} title="Visit Our Store" desc="123 Shopping Street, Commerce District" color="bg-green-500/20" />
          <InfoCard index={1} icon={<Phone size={30} />} title="Call Us" desc="+880 1996259365" color="bg-orange-500/20" />
          <InfoCard index={2} icon={<Mail size={30} />} title="Email Support" desc="anikdas169@gmail.com" color="bg-red-500/20" />
          <InfoCard index={3} icon={<Clock size={30} />} title="Business Hours" desc="Monday - Friday: 9AM - 6PM" color="bg-blue-500/20" />
        </div>

        <ContactForm />
      </div>

      <FAQSection />
    </div>
  );
}

export default Contact;

const InfoCard = ({ icon, title, desc, color, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.15, duration: 0.6 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.05, y: -5 }}
      className="cursor-pointer flex gap-4 py-5 px-8 rounded-xl hover:shadow-xl transition"
    >
      <motion.div
        whileHover={{ rotate: 8, scale: 1.1 }}
        className={`flex items-center justify-center ${color} px-4 py-3 rounded-xl`}
      >
        {icon}
      </motion.div>

      <div>
        <p className="text-xl font-semibold hover:text-primary">{title}</p>
        <h1 className="text-gray-400">{desc}</h1>
      </div>
    </motion.div>
  );
};

function ContactForm() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
      className="min-h-screen w-full flex justify-center bg-gray-50"
    >
      <div className="bg-white rounded-2xl p-8 w-full max-w-4xl ">
        <h2 className="text-3xl font-bold text-green-900 mb-8">
          Send us a Message
        </h2>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input label="Full Name *" placeholder="Enter your full name" />
          <Input label="Email Address *" placeholder="your.email@example.com" type="email" />
          <Input label="Subject *" placeholder="Brief description" span />
          <Textarea label="Message *" />

          <div className="col-span-1 md:col-span-2 flex justify-end">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-4 px-15 py-3 bg-green-800 text-white rounded-xl 
                         font-semibold shadow-xl hover:bg-green-900 transition w-full"
            >
              <Send />
              Submit
            </motion.button>
          </div>
        </form>
      </div>
    </motion.div>
  );
}

const Input = ({ label, placeholder, type = "text", span }) => (
  <motion.div
    whileFocus={{ scale: 1.03 }}
    className={`flex flex-col ${span ? "md:col-span-2" : ""}`}
  >
    <label className="font-semibold mb-2">{label}</label>
    <input
      type={type}
      placeholder={placeholder}
      className="border rounded-xl p-3 transition-all duration-300
                 focus:scale-[1.02] focus:shadow-lg focus:ring-2 focus:ring-green-700"
    />
  </motion.div>
);

const Textarea = ({ label }) => (
  <motion.div className="flex flex-col md:col-span-2">
    <label className="font-semibold mb-2">{label}</label>
    <textarea
      rows={1}
      placeholder="Please provide detailed information..."
      className="border rounded-xl p-3 transition-all duration-300
                 focus:scale-[1.02] focus:shadow-lg focus:ring-2 focus:ring-green-700"
    ></textarea>
  </motion.div>
);
