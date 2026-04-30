import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, MapPin, Phone, Mail, MessageCircle } from 'lucide-react';
export function Footer() {
  return (
    <footer className="bg-[#2B3A55] text-[#FDFBF7]">
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4 md:gap-8">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <h2 className="font-fraunces text-2xl font-medium tracking-wide">
              FEMOUS FASHION
            </h2>
            <p className="font-inter text-sm text-gray-300">
              Confidently Styled. Unapologetically You. Premium Nigerian
              menswear blending African heritage with modern editorial calm.
            </p>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-4">
            <h3 className="font-fraunces text-lg">Contact Us</h3>
            <ul className="flex flex-col gap-3 font-inter text-sm text-gray-300">
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-[#D4A373]" />
                Nigeria (Worldwide Shipping)
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-[#D4A373]" />
                <a
                  href="tel:+2348104038155"
                  className="hover:text-[#D4A373] transition-colors">
                  
                  08104038155
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-[#D4A373]" />
                <a
                  href="mailto:femousfashion@gmail.com"
                  className="hover:text-[#D4A373] transition-colors">
                  
                  femousfashion@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-4">
            <h3 className="font-fraunces text-lg">Quick Links</h3>
            <ul className="flex flex-col gap-3 font-inter text-sm text-gray-300">
              <li>
                <Link
                  to="/shop"
                  className="hover:text-[#D4A373] transition-colors">
                  
                  Shop Collection
                </Link>
              </li>
              <li>
                <Link
                  to="/shop/native-wears"
                  className="hover:text-[#D4A373] transition-colors">
                  
                  Native Wears
                </Link>
              </li>
              <li>
                <Link
                  to="/shop/corporate-wears"
                  className="hover:text-[#D4A373] transition-colors">
                  
                  Corporate Wears
                </Link>
              </li>
              <li>
                <Link
                  to="/shop/street-wears"
                  className="hover:text-[#D4A373] transition-colors">
                  
                  Street Wears
                </Link>
              </li>
            </ul>
          </div>

          {/* Socials */}
          <div className="flex flex-col gap-4">
            <h3 className="font-fraunces text-lg">Follow Us</h3>
            <div className="flex gap-4">
              <a
                href="https://instagram.com/femous.fashion"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-[#D4A373] transition-colors"
                aria-label="Instagram">
                
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://www.tiktok.com/@femousefashion?_r=1&_t=ZS-95oXXsngIKe"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-[#D4A373] transition-colors"
                aria-label="TikTok">
                
                {/* Custom TikTok Icon since lucide doesn't have one */}
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5">
                  
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                </svg>
              </a>
              <a
                href="https://wa.me/2348104038155"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-[#D4A373] transition-colors"
                aria-label="WhatsApp">
                
                <MessageCircle className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between border-t border-white/10 pt-8 md:flex-row">
          <p className="font-inter text-xs text-gray-400">
            &copy; 2026 Femous Fashion. All rights reserved.
          </p>
          <Link
            to="/admin"
            className="mt-4 font-inter text-xs text-gray-400 hover:text-[#D4A373] transition-colors md:mt-0">
            
            Admin Login
          </Link>
        </div>
      </div>
    </footer>);

}