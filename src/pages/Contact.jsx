import React, { useState } from "react";
import { BiLogoTelegram } from "react-icons/bi";
import { RiPhoneFill } from "react-icons/ri";
import { TiMail } from "react-icons/ti";
import { PiArrowCircleRightThin } from "react-icons/pi";

export default function ContactSection() {
  const baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:3000/api/enquiries';
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    note: "",
  });

  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${baseUrl}/api/enquiries`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormData({ name: "", phone: "", email: "", note: "" });
        setSuccess(true);
        setTimeout(() => setSuccess(false), 4000);
      } else {
        const errorText = await response.text();
        console.error("Response error text:", errorText);
        alert("Failed to send enquiry.");
      }
    } catch (error) {
      alert("Error sending enquiry.");
      console.error("Error:", error);
    }
  };

  return (
    <section className="w-full h-full bg-[#141414] text-white pt-28">
      <div
        className="w-full h-[120px] md:h-[200px] bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('./asset/contact-banner.webp')` }}
      ></div>

      <div className="w-full md:px-[5rem] md:py-14 p-5 flex flex-col md:flex-row justify-between gap-14">
        {/* Form */}
        <div className="w-full md:w-[30%] bg-[#1a1a1a] p-6 rounded-2xl">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center gap-5 font-[Gothic] text-sm"
          >
            <input
              name="name"
              type="text"
              placeholder="Name"
              required
              minLength={2}
              maxLength={50}
              pattern="^[a-zA-Z\s]+$"
              title="Name should only contain letters and spaces."
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-[#2b2b2b] p-2 rounded-lg outline-none text-white"
            />

            <input
              name="phone"
              type="tel"
              placeholder="Contact No."
              required
              pattern="^\+?[0-9\s\-]{9,11}$"
              title="Please enter a valid phone number (7 to 15 digits, spaces, dashes allowed)."
              value={formData.phone}
              onChange={handleChange}
              className="w-full bg-[#2b2b2b] p-2 rounded-lg outline-none text-white"
            />

            <input
              name="email"
              type="email"
              placeholder="Email ID"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-[#2b2b2b] p-2 rounded-lg outline-none text-white"
            />

            <textarea
              name="note"
              placeholder="Add Note"
              maxLength={500}
              value={formData.note}
              onChange={handleChange}
              className="w-full bg-[#2b2b2b] p-2 rounded-lg h-24 outline-none text-white"
            ></textarea>

            <button
              type="submit"
              className="flex items-center justify-center gap-3 bg-transparent border border-white px-4 py-2 rounded-full w-[70%] sm:w-1/2"
            >
              <span className="text-sm">
                <BiLogoTelegram />
              </span>
              Enquire Now
            </button>

            {/* ✅ Success message */}
            {success && (
              <div className="flex items-center gap-2 text-green-500 mt-2 text-sm">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-white">Enquiry sent successfully!</span>
              </div>
            )}
          </form>
        </div>

        {/* Contact Info */}
        <div className="w-full md:w-[30%] h-[350px] flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-semibold mb-5 font-[FrieghtNeo]">
              CONTACT <br /> US{" "}
              <span className="border-b border-white inline-block w-[75%] sm:w-[80%] ml-5"></span>
            </h2>
            <div className="flex flex-col gap-7 font-[Gothic]">
              <div className="flex gap-5">
                <span className="w-[26px] h-[26px] flex items-center justify-center rounded-full border-[1.5px] border-white text-white text-[0.8rem]">
                  <RiPhoneFill />
                </span>
                <a href="tel:+91 20 2453 0461 /62/ 63">+91 20 2453 0461 /62/ 63</a>
              </div>
              <div className="flex gap-5">
                <span className="w-[26px] h-[26px] flex items-center justify-center rounded-full border-[1.5px] border-white text-white text-[1.1rem]">
                  <TiMail />
                </span>
                <a href="mailto:info@dasnurkar.in">info@dasnurkar.in</a>
              </div>
              <div className="flex gap-5">
                <img src="/location.jpg" alt="Location Icon" className="w-[32px] h-[28px] rounded-full" />
                <a
                  href="https://www.google.com/maps/place/Laxmi+Park+Colony,+Sadashiv+Peth,+Pune,+Maharashtra+411030/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  35, Laxmi Park Colony, Sadashiv Peth, Pune, Maharashtra 411030, India
                </a>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <a
              className="text-sm font-[Gothic] sm:flex flex-row w-[40%]"
              href="https://www.google.com/maps/place/Laxmi+Park+Colony,+Sadashiv+Peth,+Pune,+Maharashtra+411030/"
              target="_blank"
              rel="noopener noreferrer"
            >
              GET DIRECTIONS
            </a>
            <hr className="w-[39%] sm:w-[80%]" />
            <a
              className=""
              href="https://www.google.com/maps/place/Laxmi+Park+Colony,+Sadashiv+Peth,+Pune,+Maharashtra+411030/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <PiArrowCircleRightThin className="text-white text-[3rem]" />
            </a>
          </div>
        </div>

        {/* Map */}
        <div className="w-full md:w-[30%] rounded overflow-hidden">
          <iframe
            title="map"
            className="w-full md:h-[350px] h-[250px] rounded-xl"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.649849765613!2d73.84181277507983!3d18.543330882564776!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c0783c370b17%3A0x4b3f4766a6b0601e!2sLaxmi%20Park%20Colony%2C%20Sadashiv%20Peth%2C%20Pune%2C%20Maharashtra%20411030!5e0!3m2!1sen!2sin!4v1717320000000!5m2!1sen!2sin"
          ></iframe>
        </div>
      </div>
    </section>
  );
}
