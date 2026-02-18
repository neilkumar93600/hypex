"use client";

import { siteData } from "@/data/siteData";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#0B0B0B] text-white py-12 px-6 md:px-12 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
        {/* Brand */}
        <div className="space-y-4">
          <Link
            href="/"
            className="text-4xl font-black italic tracking-tighter text-white hover:text-[#FFD400] transition-colors"
          >
            {siteData.name}
          </Link>
          <p className="text-sm text-neutral-500 max-w-xs uppercase leading-relaxed">
            {siteData.slogan}
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-wrap gap-8 md:gap-16">
          <div className="space-y-4">
            <h4 className="font-bold text-[#FFD400] text-sm uppercase tracking-widest">
              Connect
            </h4>
            <ul className="space-y-2">
              {siteData.footer.socials.map((social) => (
                <li key={social.name}>
                  <Link
                    href={social.href}
                    className="text-sm text-neutral-400 hover:text-white transition-colors uppercase font-mono"
                  >
                    {social.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-bold text-[#FFD400] text-sm uppercase tracking-widest">
              Explore
            </h4>
            <ul className="space-y-2">
              {siteData.footer.links.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-neutral-400 hover:text-white transition-colors uppercase font-mono"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-12 pt-8 border-t border-neutral-900 flex flex-col md:flex-row justify-between items-center text-xs text-neutral-600 font-mono">
        <p>{siteData.footer.copyright}</p>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <Link href="/privacy" className="hover:text-neutral-400">
            PRIVACY POLICY
          </Link>
          <Link href="/terms" className="hover:text-neutral-400">
            TERMS OF SERVICE
          </Link>
        </div>
      </div>
    </footer>
  );
}
