import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Minus, Plus, MessageCircle, ShoppingBag } from 'lucide-react';
import {
  useCart,
  formatPrice,
  buildCartWhatsAppMessage,
  getWhatsAppLink } from
'../data/cartStore';
export function CartPage() {
  const { items, updateQuantity, removeItem, totalPrice } = useCart();
  const handleWhatsAppOrder = () => {
    const message = buildCartWhatsAppMessage(items);
    window.open(getWhatsAppLink(message), '_blank');
  };
  if (items.length === 0) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-[#FDFBF7] px-4 pt-20">
        <div className="mb-6 rounded-full bg-gray-100 p-8">
          <ShoppingBag className="h-16 w-16 text-gray-300" />
        </div>
        <h2 className="mb-2 font-fraunces text-2xl text-[#2B3A55] md:text-3xl">
          Your cart is empty
        </h2>
        <p className="mb-8 font-inter text-gray-500 text-center max-w-md">
          Looks like you haven't added anything to your cart yet. Discover our
          premium collection of Nigerian menswear.
        </p>
        <Link
          to="/shop"
          className="rounded-lg bg-[#2B3A55] px-8 py-4 font-inter font-semibold text-white transition-transform hover:scale-105 active:scale-95">
          
          Continue Shopping
        </Link>
      </main>);

  }
  return (
    <main className="min-h-screen bg-[#FDFBF7] pt-20 pb-40 md:pb-24">
      <div className="mx-auto max-w-7xl px-4 py-8 md:px-8">
        <h1 className="mb-8 font-fraunces text-3xl text-[#2B3A55] md:text-4xl">
          Shopping Cart
        </h1>

        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Cart Items */}
          <div className="flex-1 flex flex-col gap-4">
            {items.map((item) =>
            <div
              key={`${item.product.id}-${item.size}`}
              className="flex gap-4 rounded-xl bg-white p-4 shadow-sm border border-gray-100">
              
                <Link to={`/product/${item.product.id}`} className="shrink-0">
                  <img
                  src={item.product.images[0]}
                  alt={item.product.name}
                  className="h-24 w-20 rounded-lg object-cover md:h-32 md:w-28" />
                
                </Link>

                <div className="flex flex-1 flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <div>
                      <Link to={`/product/${item.product.id}`}>
                        <h3 className="font-fraunces text-lg text-[#2B3A55] line-clamp-1">
                          {item.product.name}
                        </h3>
                      </Link>
                      <p className="font-inter text-sm text-gray-500 mt-1">
                        Size: {item.size}
                      </p>
                    </div>
                    <button
                    onClick={() => removeItem(item.product.id, item.size)}
                    className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                    aria-label="Remove item">
                    
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center rounded-lg border border-gray-200">
                      <button
                      onClick={() =>
                      updateQuantity(
                        item.product.id,
                        item.size,
                        item.quantity - 1
                      )
                      }
                      className="flex h-10 w-10 items-center justify-center text-gray-500 hover:bg-gray-50 active:bg-gray-100"
                      aria-label="Decrease quantity">
                      
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="flex h-10 w-10 items-center justify-center font-inter text-sm font-medium">
                        {item.quantity}
                      </span>
                      <button
                      onClick={() =>
                      updateQuantity(
                        item.product.id,
                        item.size,
                        item.quantity + 1
                      )
                      }
                      className="flex h-10 w-10 items-center justify-center text-gray-500 hover:bg-gray-50 active:bg-gray-100"
                      aria-label="Increase quantity">
                      
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                    <span className="font-inter font-semibold text-[#2B3A55]">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary - Sticky Bottom on Mobile, Sidebar on Desktop */}
          <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-gray-200 bg-white p-4 shadow-[0_-8px_15px_-3px_rgba(0,0,0,0.1)] lg:sticky lg:top-28 lg:h-fit lg:w-96 lg:rounded-xl lg:border lg:p-6 lg:shadow-sm">
            <h2 className="hidden font-fraunces text-xl text-[#2B3A55] lg:block mb-6">
              Order Summary
            </h2>

            <div className="mb-4 flex flex-col gap-3">
              <div className="flex justify-between font-inter text-sm text-gray-600">
                <span>Subtotal</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>
              <div className="flex justify-between font-inter text-sm text-gray-600">
                <span>Shipping</span>
                <span className="text-right">Calculated via WhatsApp</span>
              </div>
              <div className="my-2 h-px w-full bg-gray-200 lg:block hidden" />
              <div className="flex justify-between font-inter text-lg font-semibold text-[#2B3A55]">
                <span>Total</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>
            </div>

            <button
              onClick={handleWhatsAppOrder}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#D4A373] py-4 font-inter font-semibold text-white transition-transform hover:scale-[1.02] active:scale-[0.98]">
              
              <MessageCircle className="h-5 w-5" />
              Order via WhatsApp
            </button>

            <p className="mt-4 text-center font-inter text-xs text-gray-500">
              We process all orders personally via WhatsApp for the best service
              experience and exact shipping calculations.
            </p>
          </div>
        </div>
      </div>
    </main>);

}