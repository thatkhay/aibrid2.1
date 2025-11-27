"use client";
import React, { useState } from "react";
import Image from "next/image";

const TourPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    city: "",
  });

  const [status, setStatus] = useState("");

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

  return (
    <div className="w-full">
      {/* Hero Image Section */}
      <section className="relative w-full h-[60vh] md:h-[70vh]">
        <Image
          src="/assets/tour-hero.jpg" // Replace with your actual image path
          alt="AirBrid Music Live Performance"
          fill
          className="object-cover"
          priority
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/40" />
      </section>

      {/* Form Section */}
      <section className="w-full bg-[#E5E5E5] py-20 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-[#2C3640] mb-4">
            Find Out When AirBrid Music Will Play Near You
          </h1>
          <p className="text-lg text-gray-700 mb-12">
            I&apos;ll send you an email when I&apos;m in your city.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Email"
                className="w-full px-6 py-4 bg-white border border-gray-300 rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-[#2C3640] focus:border-transparent transition-all"
              />
            </div>

            {/* City Input */}
            <div>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
                placeholder="City"
                className="w-full px-6 py-4 bg-white border border-gray-300 rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-[#2C3640] focus:border-transparent transition-all"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full bg-[#2C3640] text-white py-4 px-6 rounded-md text-lg font-semibold hover:bg-[#3a4a56] transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === "sending" ? "Submitting..." : "Submit"}
            </button>

            {/* Status Messages */}
            {status === "success" && (
              <div className="bg-green-50 text-green-800 p-4 rounded-md text-center">
                Success! You&apos;ll be notified when I&apos;m performing in
                your city.
              </div>
            )}

            {/* Disclaimer Text */}
            <p className="text-sm text-gray-600 mt-4">
              No spam. Only concerts.
            </p>
          </form>
        </div>
      </section>
    </div>
  );
};

export default TourPage;
