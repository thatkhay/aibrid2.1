"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

const TourPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    city: "",
  });

  const [status, setStatus] = useState("");

  const formRef = useRef(null);
  const isFormInView = useInView(formRef, { once: true, margin: "-100px" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    // Simulate form submission
    setTimeout(() => {
      setStatus("success");
      setFormData({ email: "", city: "" });
      setTimeout(() => setStatus(""), 3000);
    }, 1000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <div className="w-full">
      {/* Hero Image Section */}
      <section className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden">
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="w-full h-full"
        >
          <Image
            src="/images/image4.jpg"
            alt="AirBrid Music Live Performance"
            fill
            className="object-cover"
            priority
          />
        </motion.div>
        {/* Dark overlay */}
        <motion.div
          className="absolute inset-0 bg-black/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        />
      </section>

      {/* Form Section */}
      <section className="w-full bg-[#1a1a1a] py-20 px-6">
        <div className="max-w-2xl mx-auto text-center" ref={formRef}>
          <motion.h1
            className="text-4xl md:text-5xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: -30 }}
            animate={isFormInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            Find Out When AirBrid Music Will Play Near You
          </motion.h1>

          <motion.p
            className="text-lg text-gray-300 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={isFormInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            I&apos;ll send you an email when I&apos;m in your city.
          </motion.p>

          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            className="space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate={isFormInView ? "visible" : "hidden"}
          >
            {/* Email Input */}
            <motion.div variants={itemVariants}>
              <motion.input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Email"
                className="w-full px-6 py-4 bg-[#2a2a2a] border border-gray-600 rounded-md text-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all"
                whileFocus={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              />
            </motion.div>

            {/* City Input */}
            <motion.div variants={itemVariants}>
              <motion.input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
                placeholder="City"
                className="w-full px-6 py-4 bg-[#2a2a2a] border border-gray-600 rounded-md text-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all"
                whileFocus={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              />
            </motion.div>

            {/* Submit Button */}
            <motion.div variants={itemVariants}>
              <motion.button
                type="submit"
                disabled={status === "sending"}
                className="w-full bg-white text-black py-4 px-6 rounded-md text-lg font-semibold hover:bg-gray-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: status === "sending" ? 1 : 1.02 }}
                whileTap={{ scale: status === "sending" ? 1 : 0.98 }}
                transition={{ duration: 0.2 }}
              >
                {status === "sending" ? "Submitting..." : "Submit"}
              </motion.button>
            </motion.div>

            {/* Status Messages */}
            {status === "success" && (
              <motion.div
                className="bg-green-900/50 border border-green-500 text-green-200 p-4 rounded-md text-center"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                Success! You&apos;ll be notified when I&apos;m performing in
                your city.
              </motion.div>
            )}

            {/* Disclaimer Text */}
            <motion.p
              className="text-sm text-gray-400 mt-4"
              variants={itemVariants}
            >
              No spam. Only concerts.
            </motion.p>
          </motion.form>
        </div>
      </section>
    </div>
  );
};

export default TourPage;
