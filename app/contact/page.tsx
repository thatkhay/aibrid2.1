"use client";
import React, { useRef, useState } from "react";
import { FaInstagram, FaYoutube, FaSpotify, FaEnvelope } from "react-icons/fa";
import Link from "next/link";
import { motion, useInView } from "framer-motion";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const headerRef = useRef(null);
  const formRef = useRef(null);
  const infoRef = useRef(null);

  const isHeaderInView = useInView(headerRef, { once: true, margin: "-50px" });
  const isFormInView = useInView(formRef, { once: true, margin: "-100px" });
  const isInfoInView = useInView(infoRef, { once: true, margin: "-100px" });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setStatus(""), 3000);
    }, 1000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut" as const,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <section className="w-full bg-[#1a1a1a] py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16" ref={headerRef}>
          <motion.h1
            className="text-5xl md:text-6xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: -30 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            Get In Touch
          </motion.h1>
          <motion.p
            className="text-xl text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Looking to collaborate, book a session, or just want to connect?
            Drop me a message and let&lsquo;s create something amazing together.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            className="bg-[#2a2a2a] p-8 rounded-lg shadow-lg"
            ref={formRef}
            initial={{ opacity: 0, x: -30 }}
            animate={isFormInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-white mb-6">
              Send a Message
            </h2>

            <motion.form
              onSubmit={handleSubmit}
              className="space-y-6"
              variants={containerVariants}
              initial="hidden"
              animate={isFormInView ? "visible" : "hidden"}
            >
              {/* Name */}
              <motion.div variants={itemVariants}>
                <label
                  htmlFor="name"
                  className="block text-sm font-semibold text-gray-300 mb-2"
                >
                  Name *
                </label>
                <motion.input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-[#1a1a1a] border border-gray-600 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all"
                  placeholder="Your name"
                  whileFocus={{ scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                />
              </motion.div>

              {/* Email */}
              <motion.div variants={itemVariants}>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-gray-300 mb-2"
                >
                  Email *
                </label>
                <motion.input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-[#1a1a1a] border border-gray-600 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all"
                  placeholder="your.email@example.com"
                  whileFocus={{ scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                />
              </motion.div>

              {/* Subject */}
              <motion.div variants={itemVariants}>
                <label
                  htmlFor="subject"
                  className="block text-sm font-semibold text-gray-300 mb-2"
                >
                  Subject *
                </label>
                <motion.input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-[#1a1a1a] border border-gray-600 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all"
                  placeholder="What's this about?"
                  whileFocus={{ scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                />
              </motion.div>

              {/* Message */}
              <motion.div variants={itemVariants}>
                <label
                  htmlFor="message"
                  className="block text-sm font-semibold text-gray-300 mb-2"
                >
                  Message *
                </label>
                <motion.textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-[#1a1a1a] border border-gray-600 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all resize-none"
                  placeholder="Tell me about your project or inquiry..."
                  whileFocus={{ scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                />
              </motion.div>

              {/* Submit Button */}
              <motion.div variants={itemVariants}>
                <motion.button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full bg-white text-black py-3 px-6 rounded-md font-semibold hover:bg-gray-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: status === "sending" ? 1 : 1.02 }}
                  whileTap={{ scale: status === "sending" ? 1 : 0.98 }}
                  transition={{ duration: 0.2 }}
                >
                  {status === "sending" ? "Sending..." : "Send Message"}
                </motion.button>
              </motion.div>

              {/* Status Message */}
              {status === "success" && (
                <motion.div
                  className="bg-green-900/50 border border-green-500 text-green-200 p-4 rounded-md text-center"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  Message sent successfully! I&lsquo;ll get back to you soon.
                </motion.div>
              )}
            </motion.form>
          </motion.div>

          {/* Contact Info & Social */}
          <div className="space-y-8" ref={infoRef}>
            {/* Contact Info Cards */}
            <motion.div
              className="bg-[#2a2a2a] text-white p-8 rounded-lg shadow-lg"
              variants={cardVariants}
              initial="hidden"
              animate={isInfoInView ? "visible" : "hidden"}
            >
              <h2 className="text-3xl font-bold mb-6">Let&lsquo;s Connect</h2>

              <motion.div
                className="space-y-6"
                variants={containerVariants}
                initial="hidden"
                animate={isInfoInView ? "visible" : "hidden"}
              >
                {/* Email */}
                <motion.div
                  className="flex items-start gap-4"
                  variants={itemVariants}
                >
                  <FaEnvelope className="text-2xl mt-1 shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Email</h3>
                    <a
                      href="mailto:contact@airbridmusic.com"
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      contact@airbridmusic.com
                    </a>
                  </div>
                </motion.div>

                {/* Location */}
                <motion.div
                  className="flex items-start gap-4"
                  variants={itemVariants}
                >
                  <svg
                    className="w-6 h-6 mt-1 shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Location</h3>
                    <p className="text-gray-300">Lagos, Nigeria</p>
                  </div>
                </motion.div>

                {/* Response Time */}
                <motion.div
                  className="flex items-start gap-4"
                  variants={itemVariants}
                >
                  <svg
                    className="w-6 h-6 mt-1 shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">
                      Response Time
                    </h3>
                    <p className="text-gray-300">Usually within 24-48 hours</p>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Social Media */}
            <motion.div
              className="bg-[#2a2a2a] p-8 rounded-lg shadow-lg"
              initial={{ opacity: 0, x: 30 }}
              animate={isInfoInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="text-3xl font-bold text-white mb-6">
                Follow the Journey
              </h2>
              <p className="text-gray-300 mb-6">
                Stay updated with my latest beats, collaborations, and
                behind-the-scenes content.
              </p>

              <motion.div
                className="flex gap-4"
                variants={containerVariants}
                initial="hidden"
                animate={isInfoInView ? "visible" : "hidden"}
              >
                <motion.div variants={itemVariants}>
                  <Link
                    href="https://www.instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-12 h-12 bg-white text-black rounded-full hover:bg-gray-200 transition-all"
                    aria-label="Instagram"
                  >
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                      transition={{ duration: 0.2 }}
                    >
                      <FaInstagram className="text-xl" />
                    </motion.div>
                  </Link>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Link
                    href="https://www.youtube.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-12 h-12 bg-white text-black rounded-full hover:bg-gray-200 transition-all"
                    aria-label="YouTube"
                  >
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                      transition={{ duration: 0.2 }}
                    >
                      <FaYoutube className="text-xl" />
                    </motion.div>
                  </Link>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Link
                    href="https://www.spotify.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-12 h-12 bg-white text-black rounded-full hover:bg-gray-200 transition-all"
                    aria-label="Spotify"
                  >
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                      transition={{ duration: 0.2 }}
                    >
                      <FaSpotify className="text-xl" />
                    </motion.div>
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Collaboration Note */}
            <motion.div
              className="bg-linear-to-br from-[#2a2a2a] to-[#3a3a3a] text-white p-6 rounded-lg"
              initial={{ opacity: 0, y: 30 }}
              animate={isInfoInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h3 className="font-bold text-xl mb-2">
                Open for Collaborations
              </h3>
              <p className="text-gray-300">
                Whether you&lsquo;re an artist looking for beats, a producer
                wanting to collaborate, or a brand seeking custom music
                production, let&lsquo;s create something unique together.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;
