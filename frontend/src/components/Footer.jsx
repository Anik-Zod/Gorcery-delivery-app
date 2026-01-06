import React from "react";
import { motion } from "motion/react";
import { assets } from "../assets/assets";

function Footer() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }}
      className="text-gray-500/80 pt-8 px-6 md:px-16 lg:px-24 xl:px-32 mt-24 bg-primary/10"
    >
      <div className="flex flex-wrap justify-between gap-12 md:gap-6">

        {/* BRAND */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.2 }}
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
          viewport={{ once: true, amount: 0.2 }}
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
        viewport={{ once: true, amount: 0.2 }}
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
  // Facebook
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M22 12a10 10 0 1 0-11.6 9.9v-7h-2v-3h2v-2.3c0-2 1.2-3.2 3.1-3.2.9 0 1.8.1 1.8.1v2h-1c-1 0-1.3.6-1.3 1.2V12h2.6l-.4 3h-2.2v7A10 10 0 0 0 22 12" />
  </svg>,

  // Twitter
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M23 3a10.9 10.9 0 0 1-3.1.9A5.3 5.3 0 0 0 22.4 1a10.6 10.6 0 0 1-3.3 1.3 5.2 5.2 0 0 0-8.9 4.7A14.8 14.8 0 0 1 1.7 1.1 5.2 5.2 0 0 0 3.3 8a5.1 5.1 0 0 1-2.3-.6v.1a5.2 5.2 0 0 0 4.2 5.1 5.2 5.2 0 0 1-2.3.1 5.2 5.2 0 0 0 4.9 3.6A10.5 10.5 0 0 1 0 19a14.8 14.8 0 0 0 8 2.3c9.6 0 14.9-7.9 14.9-14.8v-.7A10.4 10.4 0 0 0 23 3" />
  </svg>,

  // Instagram
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M7 2C4.2 2 2 4.2 2 7v10c0 2.8 2.2 5 5 5h10c2.8 0 5-2.2 5-5V7c0-2.8-2.2-5-5-5H7zm10 2c1.7 0 3 1.3 3 3v10c0 1.7-1.3 3-3 3H7c-1.7 0-3-1.3-3-3V7c0-1.7 1.3-3 3-3h10zm-5 3a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6zm4.5-.9a1.1 1.1 0 1 0 0 2.2 1.1 1.1 0 0 0 0-2.2z" />
  </svg>,

  // GitHub
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-1.7c-2.9.6-3.5-1.4-3.5-1.4-.5-1.1-1.1-1.4-1.1-1.4-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.3 1.1 2.8.8.1-.7.4-1.1.6-1.4-2.3-.3-4.7-1.1-4.7-5a4 4 0 0 1 1.1-2.8 3.7 3.7 0 0 1 .1-2.8s.9-.3 3 .8a10.4 10.4 0 0 1 5.5 0c2.1-1.1 3-.8 3-.8a3.7 3.7 0 0 1 .1 2.8 4 4 0 0 1 1.1 2.8c0 3.9-2.4 4.7-4.7 5 .4.3.7.9.7 1.8v2.6c0 .3.2.6.7.5A10 10 0 0 0 12 2" />
  </svg>,
];


/* FOOTER COLUMN */
function FooterColumn({ title, items, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      viewport={{ once: true, amount: 0.2 }}
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
