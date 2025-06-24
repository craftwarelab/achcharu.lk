'use client';
import Image from "next/image";
import { addContactMessage } from "../../../lib/database";
import { useState } from "react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("");
    try {
      await addContactMessage({ name, email, message });
      setStatus("Message sent!");
      setName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      setStatus("Failed to send message.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#181111] text-[#fff8f0] px-4 py-12">
      <div className="max-w-xl w-full bg-[#231313] rounded-lg shadow-lg p-8 border border-[#2d1616]">
        <div className="flex flex-col items-center mb-6">
          <Image src="/logo/logo.png" alt="Achcharu.lk" width={60} height={60} className="rounded-full mb-2" />
          <h1 className="text-3xl font-bold text-orange-400 mb-2">Contact Us</h1>
          <p className="text-orange-200 text-center">We'd love to hear from you! Fill out the form below or reach us directly at <a href="mailto:info@achcharu.com" className="underline hover:text-orange-400">info@achcharu.com</a>.</p>
        </div>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Your Name"
            className="px-4 py-2 rounded bg-[#181111] border border-[#2d1616] text-[#fff8f0] focus:outline-none focus:ring-2 focus:ring-orange-400"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Your Email"
            className="px-4 py-2 rounded bg-[#181111] border border-[#2d1616] text-[#fff8f0] focus:outline-none focus:ring-2 focus:ring-orange-400"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <textarea
            placeholder="Your Message"
            rows={5}
            className="px-4 py-2 rounded bg-[#181111] border border-[#2d1616] text-[#fff8f0] focus:outline-none focus:ring-2 focus:ring-orange-400"
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button type="submit" className="button-accent px-6 py-2 rounded font-bold text-lg mt-2 hover:bg-[#d7263d] transition">Send Message</button>
          {status && <div className="text-center text-orange-400 mt-2">{status}</div>}
        </form>
        <div className="mt-8 text-sm text-orange-300 text-center">
          <div>Colombo, Sri Lanka</div>
          <div>Phone: <a href="tel:+94112223344" className="underline hover:text-orange-400">+94 11 222 3344</a></div>
          <div className="mt-2 flex justify-center gap-4">
            <a href="#" className="hover:text-orange-400" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href="#" className="hover:text-orange-400" target="_blank" rel="noopener noreferrer">Facebook</a>
            <a href="#" className="hover:text-orange-400" target="_blank" rel="noopener noreferrer">YouTube</a>
          </div>
        </div>
      </div>
    </div>
  );
}
