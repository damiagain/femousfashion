import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Search, ShoppingBag, MessageCircle } from "lucide-react";
import { useCart } from "../data/cartStore";
import { AnimatePresence, motion } from "framer-motion";
import { SearchOverlay } from "./SearchOverlay";
export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const location = useLocation();
  const { totalItems } = useCart();
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);
  const navLinks = [
    {
      name: "Shop All",
      path: "/shop",
    },
    {
      name: "Native Wears",
      path: "/shop/native-wears",
    },
    {
      name: "Corporate",
      path: "/shop/corporate-wears",
    },
    {
      name: "Street",
      path: "/shop/street-wears",
    },
  ];

  const isActive = (path: string) => {
    if (path === "/shop" && location.pathname === "/shop") return true;
    if (path !== "/shop" && location.pathname.includes(path)) return true;
    return false;
  };
  return (
    <>
      <header
        className={`fixed top-0 z-40 w-full transition-all duration-300 ${isScrolled ? "bg-[#FDFBF7]/95 shadow-sm backdrop-blur-md" : "bg-[#FDFBF7]"}`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:h-20 md:px-8">
          {/* Mobile Menu Button */}
          <button
            className="p-2 md:hidden"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6 text-[#2B3A55]" />
          </button>

          {/* Logo (side-by-side on both desktop + mobile) */}
          <Link to="/" className="flex items-center gap-2">
            
              <img
                    src="/sitelogo.png"
                    alt="Femous Fashion"
                    className="h-10 w-auto object-contain md:h-12"
                  />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex md:gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`relative py-2 font-inter text-sm font-medium transition-colors hover:text-[#D4A373] ${isActive(link.path) ? "text-[#D4A373]" : "text-[#2B3A55]"}`}
              >
                {link.name}
                {isActive(link.path) && (
                  <motion.div
                    layoutId="underline"
                    className="absolute bottom-0 left-0 h-0.5 w-full bg-[#D4A373]"
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Icons */}
          <div className="flex items-center gap-2 md:gap-4">
            <button
              className="p-2 text-[#2B3A55] hover:text-[#D4A373] transition-colors md:hidden"
              aria-label="Search"
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsSearchOpen(true);
              }}
            >
              <Search className="h-5 w-5" />
            </button>

            <div className="hidden md:flex items-center relative">
              <Search className="absolute left-3 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="w-48 rounded-full bg-gray-100 py-1.5 pl-9 pr-4 font-inter text-sm outline-none focus:ring-2 focus:ring-[#D4A373]"
              />
            </div>
            <Link
              to="/cart"
              className="relative p-2 text-[#2B3A55] hover:text-[#D4A373] transition-colors"
              aria-label="Cart"
            >
              <ShoppingBag className="h-5 w-5 md:h-6 md:w-6" />
              {totalItems > 0 && (
                <span className="absolute right-0 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-[#D4A373] text-[10px] font-bold text-white md:h-5 md:w-5 md:text-xs">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>
      </header>

      {/* Search Overlay */}
      <SearchOverlay
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            <motion.div
              initial={{
                x: "-100%",
              }}
              animate={{
                x: 0,
              }}
              exit={{
                x: "-100%",
              }}
              transition={{
                type: "spring",
                damping: 25,
                stiffness: 200,
              }}
              className="fixed bottom-0 left-0 top-0 z-50 w-[80%] max-w-sm bg-[#FDFBF7] p-6 shadow-xl"
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2">
                  <img
                    src="/sitelogo.png"
                    alt="Femous Fashion Logo"
                    className="h-7 w-auto object-contain"
                  />
                  <img
                    src="/my logo1.png"
                    alt="Femous Fashion"
                    className="h-7 w-auto object-contain"
                  />
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-[#2B3A55]"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <nav className="flex flex-col gap-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`font-fraunces text-2xl ${isActive(link.path) ? "text-[#D4A373]" : "text-[#2B3A55]"}`}
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>
              <div className="absolute bottom-8 left-6 right-6">
                <div className="h-px w-full bg-gray-200 mb-6" />
                <a
                  href="https://wa.me/2348104038155"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#2B3A55] py-3 font-inter font-semibold text-white"
                >
                  <MessageCircle className="h-5 w-5" />
                  Contact Support
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
