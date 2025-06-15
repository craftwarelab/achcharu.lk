import Image from "next/image";

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#181111] text-[#fff8f0] px-4 py-12">
      <div className="max-w-xl w-full bg-[#231313] rounded-lg shadow-lg p-8 border border-[#2d1616]">
        <div className="flex flex-col items-center mb-6">
          <Image src="/spice-logo.png" alt="Achcharu Logo" width={60} height={60} className="rounded-full mb-2" />
          <h1 className="text-3xl font-bold text-orange-400 mb-2">Contact Us</h1>
          <p className="text-orange-200 text-center">We'd love to hear from you! Fill out the form below or reach us directly at <a href="mailto:info@achcharu.com" className="underline hover:text-orange-400">info@achcharu.com</a>.</p>
        </div>
        <form className="flex flex-col gap-4">
          <input type="text" placeholder="Your Name" className="px-4 py-2 rounded bg-[#181111] border border-[#2d1616] text-[#fff8f0] focus:outline-none focus:ring-2 focus:ring-orange-400" required />
          <input type="email" placeholder="Your Email" className="px-4 py-2 rounded bg-[#181111] border border-[#2d1616] text-[#fff8f0] focus:outline-none focus:ring-2 focus:ring-orange-400" required />
          <textarea placeholder="Your Message" rows={5} className="px-4 py-2 rounded bg-[#181111] border border-[#2d1616] text-[#fff8f0] focus:outline-none focus:ring-2 focus:ring-orange-400" required />
          <button type="submit" className="button-accent px-6 py-2 rounded font-bold text-lg mt-2 hover:bg-[#d7263d] transition">Send Message</button>
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
