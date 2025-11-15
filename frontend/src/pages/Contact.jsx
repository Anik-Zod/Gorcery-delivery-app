
import { Clock, Mail, MapPin, Phone, Send } from "lucide-react";
import React from "react";
import FAQSection from "../components/FAQSection";

function Contact() {
  return (
    <div>
        <div className=" bg-gradient-to-r from-green-800 to-primary py-15 text-white">
            <div className="flex flex-col gap-10 justify-center items-center">
            <p className="text-5xl font-semibold ">Contact Us</p>
            <h1 className="lg:px-60 md:px-19 px-4 text-center  md:text-2xl">Have questions about our products or need assistance? We'd love to hear from you. Our team is here to help with any inquiries you may have.</h1>
            </div>
        </div>
      <div className="container flex flex-col justify-center  lg:flex-row lg:justify-between mt-16 ">
        <div className=" pt-6">
            <h1 className="px-10 text-3xl font-bold text-green-900 mb-8">Contact information</h1>
            <InfoCard icon={<MapPin size={30}/>} title="Visit Our Store" desc="123 Shopping Street, Commerce District" color="bg-green-500/20"/>
            <InfoCard icon={<Phone size={30}/>} title="Call Us" desc="+880 1996259365" color="bg-orange-500/20"/>
            <InfoCard icon={<Mail size={30}/>} title="Email Support" desc="anikdas169@gmail.com" color="bg-red-500/20"/>
            <InfoCard icon={<Clock size={30}/>} title="Business Hours" desc="Monday - Friday: 9AM - 6PM" color="bg-blue-500/20"/>
        </div>
        <div>
           <ContactForm/>
        </div>
      </div>
      <FAQSection/>
    </div>
  );
}

export default Contact;

const InfoCard = ({icon,title,desc,color})=>{
    return(
       <div className=" cursor-pointer flex gap-4 py-4 px-8 ">
          <div className={`flex hover:scale-105 hover:rotate-5 items-center justify-center ${color} px-3 rounded-xl `}>{icon}</div>
          <div>
            <p className="hover:text-primary text-xl font-semibold">{title}</p>
            <h1 className="text-gray-400">{desc}</h1>
          </div>
       </div>
    )
}



function ContactForm() {
  return (
    <div className="min-h-screen flex justify-center  bg-gray-50">
      <div className="bg-white  rounded-2xl p-8 w-full max-w-4xl">
        <h2 className="text-3xl font-bold text-green-900 mb-8">Send us a Message</h2>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Full Name */}
          <div className="flex flex-col col-span-1">
            <label className="font-semibold mb-2">Full Name *</label>
            <input
              type="text"
              placeholder="Enter your full name"
              className="border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-green-700"
            />
          </div>

          {/* Email Address */}
          <div className="flex flex-col col-span-1">
            <label className="font-semibold mb-2">Email Address *</label>
            <input
              type="email"
              placeholder="your.email@example.com"
              className="border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-green-700"
            />
          </div>

          {/* Subject */}
          <div className="flex flex-col col-span-1 md:col-span-2">
            <label className="font-semibold mb-2">Subject *</label>
            <input
              type="text"
              placeholder="Brief description of your inquiry"
              className="border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-green-700"
            />
          </div>

          {/* Message */}
          <div className="flex flex-col col-span-1 md:col-span-2">
            <label className="font-semibold mb-2">Message *</label>
            <textarea
              rows={5}
              placeholder="Please provide detailed information about your inquiry..."
              className="border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-green-700"
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="col-span-1 md:col-span-2 flex justify-end">
            <button
              type="submit"
              className=" flex gap-5 px-15 py-3 cursor-pointer bg-green-800 text-white rounded-xl font-semibold shadow hover:bg-green-900 transition"
            >
                <Send/>
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
