import React from "react";
import { motion } from "motion/react";
import { assets } from "../assets/assets";

function Footer() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: false, amount: 0.2 }}
      className="text-gray-500/80 pt-8 px-6 md:px-16 lg:px-24 xl:px-32 mt-24 bg-primary/10"
    >
      <div className="flex flex-wrap justify-between gap-12 md:gap-6">

        {/* BRAND */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false, amount: 0.2 }}
          className="max-w-90"
        >
          <motion.img
            src={assets.coin_icon}
            alt="logo"
            className="mb-4 h-8 md:h-9"
            whileHover={{ scale: 1.08 }}
            transition={{ type: "spring", stiffness: 200 }}
          />

          <p>
            This app is designed and developed by{" "}
            <span className="text-primary font-semibold">Anik Das</span>.
            Built to practice modern web development skills. Powered by React,
            Redux, and lots of coffee! Thank you for visiting and supporting my work.
          </p>

          {/* SOCIAL */}
          <div className="flex items-center gap-3 mt-4">
            {socialIcons.map((icon, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.2, y: -4, rotate: 6 }}
                transition={{ type: "spring", stiffness: 250 }}
                className="cursor-pointer"
              >
                {icon}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* COMPANY */}
        <FooterColumn
          index={0}
          title="COMPANY"
          items={[
            "+880 1996259365",
            "Careers",
            "Press",
            "Blog",
            "Partners",
          ]}
        />

        {/* SUPPORT */}
        <FooterColumn
          index={1}
          title="SUPPORT"
          items={[
            "anikdas169@gmail.com",
            "Safety Information",
            "Cancellation Options",
            "Contact Us",
            "Accessibility",
          ]}
        />

        {/* NEWSLETTER */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false, amount: 0.2 }}
          className="max-w-80"
        >
          <p className="text-lg text-gray-800">STAY UPDATED</p>
          <p className="mt-3 text-sm">
            Subscribe to our newsletter for inspiration and special offers.
          </p>

          <div className="flex items-center mt-4">
            <motion.input
              whileFocus={{ scale: 1.03 }}
              type="text"
              className="bg-white rounded-l border border-gray-300 h-9 px-3 outline-none"
              placeholder="Your email"
            />
            <motion.button
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center bg-black h-9 w-9 rounded-r"
            >
              <svg
                className="w-4 h-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 12H5m14 0-4 4m4-4-4-4"
                />
              </svg>
            </motion.button>
          </div>
        </motion.div>
      </div>

      <hr className="border-gray-300 mt-8" />

      {/* BOTTOM BAR */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: false, amount: 0.2 }}
        className="flex flex-col md:flex-row gap-2 items-center justify-between py-5 text-black"
      >
        <p>© {new Date().getFullYear()} Brand. All rights reserved.</p>

        <ul className="flex items-center gap-4">
          {["Privacy", "Terms", "Sitemap"].map((item, i) => (
            <motion.li
              key={i}
              whileHover={{ scale: 1.1, color: "#22c55e" }}
              className="cursor-pointer"
            >
              {item}
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  );
}

export default Footer;

/* ICONS */
const socialIcons = [
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M7.75..." /></svg>,
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M13.5..." /></svg>,
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M22..." /></svg>,
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M4.98..." /></svg>,
];

/* FOOTER COLUMN */
function FooterColumn({ title, items, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      viewport={{ once: false, amount: 0.2 }}
    >
      <p className="text-lg text-gray-800">{title}</p>
      <ul className="mt-3 flex flex-col gap-2 text-sm">
        {items.map((i, idx) => (
          <motion.li
            key={idx}
            whileHover={{ x: 6, color: "#22c55e" }}
            transition={{ type: "spring", stiffness: 200 }}
            className="cursor-pointer"
          >
            {i}
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}
