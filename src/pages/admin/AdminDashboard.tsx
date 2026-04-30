import React from 'react';
import { Link } from 'react-router-dom';
import {
  Package,
  Tags,
  MessageSquare,
  Star,
  Plus,
  Settings } from
'lucide-react';
import { useProductsStore } from '../../data/productStore';
import { categories } from '../../data/categories';
import { testimonials } from '../../data/testimonials';
export function AdminDashboard() {
  const { products } = useProductsStore();
  const stats = [
  {
    name: 'Total Products',
    value: products.length,
    icon: Package,
    color: 'bg-blue-100 text-blue-600'
  },
  {
    name: 'Categories',
    value: categories.length,
    icon: Tags,
    color: 'bg-green-100 text-green-600'
  },
  {
    name: 'Reviews',
    value: testimonials.length,
    icon: MessageSquare,
    color: 'bg-purple-100 text-purple-600'
  },
  {
    name: 'Featured Items',
    value: products.filter((p) => p.featured).length,
    icon: Star,
    color: 'bg-yellow-100 text-yellow-600'
  }];

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-fraunces text-2xl text-[#2B3A55] md:text-3xl">
          Dashboard
        </h1>
        <p className="font-inter text-sm text-gray-500 mt-1">
          Welcome back to Femous Fashion admin.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.name}
              className="rounded-xl bg-white p-6 shadow-sm border border-gray-100">
              
              <div className={`mb-4 inline-flex rounded-lg p-3 ${stat.color}`}>
                <Icon className="h-6 w-6" />
              </div>
              <p className="font-inter text-sm font-medium text-gray-500">
                {stat.name}
              </p>
              <p className="mt-1 font-inter text-2xl font-bold text-[#2B3A55]">
                {stat.value}
              </p>
            </div>);

        })}
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Quick Actions */}
        <div className="rounded-xl bg-white p-6 shadow-sm border border-gray-100">
          <h2 className="mb-6 font-fraunces text-xl text-[#2B3A55]">
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <Link
              to="/admin/products"
              className="flex flex-col items-center justify-center gap-3 rounded-lg border border-gray-200 p-6 transition-colors hover:border-[#D4A373] hover:bg-[#FDFBF7]">
              
              <div className="rounded-full bg-[#2B3A55]/10 p-3">
                <Plus className="h-6 w-6 text-[#2B3A55]" />
              </div>
              <span className="font-inter text-sm font-medium text-[#2B3A55]">
                Add Product
              </span>
            </Link>
            <Link
              to="/admin/categories"
              className="flex flex-col items-center justify-center gap-3 rounded-lg border border-gray-200 p-6 transition-colors hover:border-[#D4A373] hover:bg-[#FDFBF7]">
              
              <div className="rounded-full bg-[#2B3A55]/10 p-3">
                <Tags className="h-6 w-6 text-[#2B3A55]" />
              </div>
              <span className="font-inter text-sm font-medium text-[#2B3A55]">
                Manage Categories
              </span>
            </Link>
          </div>
        </div>

        {/* Store Info */}
        <div className="rounded-xl bg-white p-6 shadow-sm border border-gray-100">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="font-fraunces text-xl text-[#2B3A55]">Store Info</h2>
            <button className="p-2 text-gray-400 hover:text-[#2B3A55]">
              <Settings className="h-5 w-5" />
            </button>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between border-b border-gray-100 pb-4">
              <span className="font-inter text-sm text-gray-500">
                Store Name
              </span>
              <span className="font-inter text-sm font-medium text-[#2B3A55]">
                Femous Fashion
              </span>
            </div>
            <div className="flex justify-between border-b border-gray-100 pb-4">
              <span className="font-inter text-sm text-gray-500">
                WhatsApp Number
              </span>
              <span className="font-inter text-sm font-medium text-[#2B3A55]">
                +234 810 403 8155
              </span>
            </div>
            <div className="flex justify-between border-b border-gray-100 pb-4">
              <span className="font-inter text-sm text-gray-500">Email</span>
              <span className="font-inter text-sm font-medium text-[#2B3A55]">
                femousfashion@gmail.com
              </span>
            </div>
            <div className="flex justify-between pb-2">
              <span className="font-inter text-sm text-gray-500">Currency</span>
              <span className="font-inter text-sm font-medium text-[#2B3A55]">
                NGN (₦)
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>);

}