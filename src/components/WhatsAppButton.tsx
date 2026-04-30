import React from 'react';
import { MessageCircle } from 'lucide-react';
export function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/2348104038155"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#2B3A55] text-white shadow-lg transition-transform hover:scale-105 active:scale-95"
      aria-label="Chat on WhatsApp">
      
      <MessageCircle className="h-7 w-7" />
    </a>);

}