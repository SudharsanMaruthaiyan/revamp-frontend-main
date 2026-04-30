"use client";

import Link from "next/link";
import Image from "next/image";

const quickLinks = [
  { label: "About Us", href: "/about" },
  { label: "Courses", href: "/course" },
  { label: "Home", href: "/" },
];

const courseLinks = [
  { label: "UI/UX Mastering Figma", href: "/course" },
  { label: "Flutter Development", href: "/course" },
  { label: "Mern Full Stack Development", href: "/course" },
];

const supportLinks = [
  { label: "Refund/Cancellation Policy", href: "/refund-policy" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms and Condition", href: "/terms" },
  { label: "Contact Us", href: "/contact" },
];

export function Footbar() {
  return (
    <footer className="bg-[#0a0a0a] mt-auto">
      <div className="container mx-auto max-w-7xl px-6 md:px-8 lg:px-12 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div>
          <h3 className="font-bold mb-5 text-white text-base tracking-tight">Quick Link</h3>
          <ul className="space-y-3.5 text-sm">
            {quickLinks.map(({ label, href }) => (
              <li key={label}>
                <Link href={href} className="text-gray-400 hover:text-white transition-colors">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-bold mb-5 text-white text-base tracking-tight">Courses</h3>
          <ul className="space-y-3.5 text-sm">
            {courseLinks.map(({ label, href }) => (
              <li key={label}>
                <Link href={href} className="text-gray-400 hover:text-white transition-colors">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-bold mb-5 text-white text-base tracking-tight">Support</h3>
          <ul className="space-y-3.5 text-sm">
            {supportLinks.map(({ label, href }) => (
              <li key={label}>
                <Link href={href} className="text-gray-400 hover:text-white transition-colors">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-bold mb-5 text-white text-base tracking-tight">Address</h3>
          <p className="text-sm text-gray-400 leading-relaxed">
            70 Kaliamman Kovil Street
            <br />
            Palanganatham Pasumpon Nagar
            <br />
            Madurai-625003
          </p>
        </div>
      </div>

      <div className="border-t border-gray-800/50 py-6">
        <div className="container mx-auto max-w-7xl px-6 md:px-8 lg:px-12 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full border-2 border-white/30 flex items-center justify-center overflow-hidden bg-transparent group-hover:border-white/60 transition-colors">
              <Image
                src="/icon.ico"
                alt="Revamp Academy"
                width={40}
                height={40}
                className="w-6 h-6 object-contain invert"
              />
            </div>
          </Link>
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} All Reserved by{" "}
            <Link href="/" className="text-blue-500 hover:text-blue-400 font-medium transition-colors">
              Revamp
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
