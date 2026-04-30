import React, { useState, useRef } from 'react';
import {
  Plus,
  Edit2,
  Trash2,
  X,
  Upload,
  Image as ImageIcon } from
'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { products as initialProducts } from '../../data/products';
import { categories } from '../../data/categories';
import { Product } from '../../types';
import { formatPrice } from '../../data/cartStore';
export function AdminProducts() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  // Form State
  const [formData, setFormData] = useState<Partial<Product>>({
    name: '',
    description: '',
    price: 0,
    category: 'native-wears',
    featured: false,
    inStock: true,
    sizes: ['S', 'M', 'L', 'XL']
  });
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleOpenModal = (product?: Product) => {
    if (product) {
      setEditingProduct(product);
      setFormData(product);
      setImagePreviews(product.images);
      setImageFiles([]);
    } else {
      setEditingProduct(null);
      setFormData({
        name: '',
        description: '',
        price: 0,
        category: 'native-wears',
        featured: false,
        inStock: true,
        sizes: ['S', 'M', 'L', 'XL']
      });
      setImagePreviews([]);
      setImageFiles([]);
    }
    setIsModalOpen(true);
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const validFiles = files.filter((f) => f.size <= 2 * 1024 * 1024); // Max 2MB
      if (validFiles.length !== files.length) {
        toast.error('Some files were skipped because they exceed 2MB');
      }
      const totalFiles = imageFiles.length + validFiles.length;
      if (totalFiles > 10) {
        toast.error('Maximum 10 images allowed');
        return;
      }
      const newFiles = [...imageFiles, ...validFiles];
      setImageFiles(newFiles);
      // Create previews
      const newPreviews = validFiles.map((f) => URL.createObjectURL(f));
      setImagePreviews([...imagePreviews, ...newPreviews]);
    }
  };
  const removeImage = (index: number) => {
    const newPreviews = [...imagePreviews];
    newPreviews.splice(index, 1);
    setImagePreviews(newPreviews);
    // If it's a newly uploaded file, remove it from files array
    // Note: This is a simplified approach. In reality, you'd need to track which preview corresponds to which file/existing URL
  };
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (imagePreviews.length === 0) {
      toast.error('Please add at least one image');
      return;
    }
    const newProduct: Product = {
      id: editingProduct ? editingProduct.id : Date.now().toString(),
      name: formData.name || '',
      description: formData.description || '',
      price: Number(formData.price) || 0,
      category: formData.category as any,
      images: imagePreviews,
      featured: formData.featured || false,
      inStock: formData.inStock ?? true,
      sizes: formData.sizes || [],
      rating: editingProduct ? editingProduct.rating : 0,
      reviewCount: editingProduct ? editingProduct.reviewCount : 0,
      createdAt: editingProduct ?
      editingProduct.createdAt :
      new Date().toISOString()
    };
    if (editingProduct) {
      setProducts(
        products.map((p) => p.id === editingProduct.id ? newProduct : p)
      );
      toast.success('Product updated successfully');
    } else {
      setProducts([newProduct, ...products]);
      toast.success('Product added successfully');
    }
    setIsModalOpen(false);
  };
  const handleDelete = () => {
    if (productToDelete) {
      setProducts(products.filter((p) => p.id !== productToDelete.id));
      toast.success('Product deleted successfully');
      setIsDeleteModalOpen(false);
      setProductToDelete(null);
    }
  };
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="font-fraunces text-2xl text-[#2B3A55] md:text-3xl">
            Products
          </h1>
          <p className="font-inter text-sm text-gray-500 mt-1">
            Manage your store inventory.
          </p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center justify-center gap-2 rounded-lg bg-[#2B3A55] px-6 py-3 font-inter font-semibold text-white transition-transform active:scale-95">
          
          <Plus className="h-5 w-5" />
          Add Product
        </button>
      </div>

      {/* Desktop Table */}
      <div className="hidden rounded-xl border border-gray-200 bg-white shadow-sm md:block overflow-hidden">
        <table className="w-full text-left font-inter text-sm">
          <thead className="bg-gray-50 text-gray-500">
            <tr>
              <th className="p-4 font-medium">Product</th>
              <th className="p-4 font-medium">Category</th>
              <th className="p-4 font-medium">Price</th>
              <th className="p-4 font-medium">Status</th>
              <th className="p-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {products.map((product) =>
            <tr key={product.id} className="hover:bg-gray-50">
                <td className="p-4">
                  <div className="flex items-center gap-4">
                    <img
                    src={product.images[0]}
                    alt=""
                    className="h-12 w-12 rounded object-cover" />
                  
                    <div>
                      <p className="font-medium text-[#2B3A55]">
                        {product.name}
                      </p>
                      {product.featured &&
                    <span className="mt-1 inline-block rounded bg-[#D4A373]/10 px-2 py-0.5 text-[10px] font-bold text-[#D4A373]">
                          FEATURED
                        </span>
                    }
                    </div>
                  </div>
                </td>
                <td className="p-4 text-gray-600 capitalize">
                  {product.category.replace('-', ' ')}
                </td>
                <td className="p-4 font-medium text-[#2B3A55]">
                  {formatPrice(product.price)}
                </td>
                <td className="p-4">
                  <span
                  className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${product.inStock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  
                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                    onClick={() => handleOpenModal(product)}
                    className="p-2 text-gray-400 hover:text-[#2B3A55]">
                    
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button
                    onClick={() => {
                      setProductToDelete(product);
                      setIsDeleteModalOpen(true);
                    }}
                    className="p-2 text-gray-400 hover:text-red-500">
                    
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="flex flex-col gap-4 md:hidden">
        {products.map((product) =>
        <div
          key={product.id}
          className="flex gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          
            <img
            src={product.images[0]}
            alt=""
            className="h-24 w-20 rounded-lg object-cover" />
          
            <div className="flex flex-1 flex-col justify-between">
              <div>
                <div className="flex justify-between items-start">
                  <h3 className="font-fraunces text-lg text-[#2B3A55] line-clamp-1">
                    {product.name}
                  </h3>
                  <div className="flex gap-1">
                    <button
                    onClick={() => handleOpenModal(product)}
                    className="p-1 text-gray-400">
                    
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button
                    onClick={() => {
                      setProductToDelete(product);
                      setIsDeleteModalOpen(true);
                    }}
                    className="p-1 text-gray-400">
                    
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <p className="font-inter text-xs text-gray-500 capitalize">
                  {product.category.replace('-', ' ')}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-inter font-semibold text-[#2B3A55]">
                  {formatPrice(product.price)}
                </span>
                <span
                className={`inline-flex rounded px-1.5 py-0.5 text-[10px] font-bold ${product.inStock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                
                  {product.inStock ? 'IN STOCK' : 'OUT'}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {isModalOpen &&
        <>
            <motion.div
            initial={{
              opacity: 0
            }}
            animate={{
              opacity: 1
            }}
            exit={{
              opacity: 0
            }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)} />
          
            <motion.div
            initial={{
              opacity: 0,
              scale: 0.95,
              y: 20
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0
            }}
            exit={{
              opacity: 0,
              scale: 0.95,
              y: 20
            }}
            className="fixed left-1/2 top-1/2 z-50 max-h-[90vh] w-[95%] max-w-2xl -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-2xl bg-white p-6 shadow-xl">
            
              <div className="mb-6 flex items-center justify-between sticky top-0 bg-white pb-4 border-b border-gray-100 z-10">
                <h2 className="font-fraunces text-2xl text-[#2B3A55]">
                  {editingProduct ? 'Edit Product' : 'Add Product'}
                </h2>
                <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-gray-500 hover:bg-gray-100 rounded-full">
                
                  <X className="h-6 w-6" />
                </button>
              </div>

              <form onSubmit={handleSave} className="flex flex-col gap-6">
                {/* Image Upload */}
                <div>
                  <label className="mb-2 block font-inter text-sm font-medium text-[#2B3A55]">
                    Product Images (Max 10, 2MB each)
                  </label>
                  <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-5">
                    {imagePreviews.map((preview, idx) =>
                  <div
                    key={idx}
                    className="relative aspect-square rounded-lg border border-gray-200 overflow-hidden group">
                    
                        <img
                      src={preview}
                      alt=""
                      className="h-full w-full object-cover" />
                    
                        <button
                      type="button"
                      onClick={() => removeImage(idx)}
                      className="absolute top-1 right-1 bg-white/80 rounded-full p-1 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                      
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                  )}
                    {imagePreviews.length < 10 &&
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex aspect-square flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 text-gray-500 hover:border-[#D4A373] hover:text-[#D4A373] transition-colors">
                    
                        <Upload className="h-6 w-6" />
                        <span className="text-xs font-medium">Upload</span>
                      </button>
                  }
                  </div>
                  <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  multiple
                  accept="image/*"
                  className="hidden" />
                
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <label className="mb-1 block font-inter text-sm font-medium text-[#2B3A55]">
                      Name
                    </label>
                    <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                    setFormData({
                      ...formData,
                      name: e.target.value
                    })
                    }
                    className="w-full rounded-lg border border-gray-300 p-3 font-inter outline-none focus:border-[#D4A373]" />
                  
                  </div>
                  <div>
                    <label className="mb-1 block font-inter text-sm font-medium text-[#2B3A55]">
                      Price (₦)
                    </label>
                    <input
                    type="number"
                    required
                    min="0"
                    value={formData.price}
                    onChange={(e) =>
                    setFormData({
                      ...formData,
                      price: Number(e.target.value)
                    })
                    }
                    className="w-full rounded-lg border border-gray-300 p-3 font-inter outline-none focus:border-[#D4A373]" />
                  
                  </div>
                </div>

                <div>
                  <label className="mb-1 block font-inter text-sm font-medium text-[#2B3A55]">
                    Category
                  </label>
                  <select
                  value={formData.category}
                  onChange={(e) =>
                  setFormData({
                    ...formData,
                    category: e.target.value as any
                  })
                  }
                  className="w-full rounded-lg border border-gray-300 p-3 font-inter outline-none focus:border-[#D4A373] capitalize">
                  
                    {categories.map((c) =>
                  <option key={c.id} value={c.slug}>
                        {c.name}
                      </option>
                  )}
                  </select>
                </div>

                <div>
                  <label className="mb-1 block font-inter text-sm font-medium text-[#2B3A55]">
                    Description
                  </label>
                  <textarea
                  required
                  rows={4}
                  value={formData.description}
                  onChange={(e) =>
                  setFormData({
                    ...formData,
                    description: e.target.value
                  })
                  }
                  className="w-full rounded-lg border border-gray-300 p-3 font-inter outline-none focus:border-[#D4A373]" />
                
                </div>

                <div className="flex gap-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                    type="checkbox"
                    checked={formData.inStock}
                    onChange={(e) =>
                    setFormData({
                      ...formData,
                      inStock: e.target.checked
                    })
                    }
                    className="h-5 w-5 rounded border-gray-300 text-[#D4A373] focus:ring-[#D4A373]" />
                  
                    <span className="font-inter text-sm font-medium text-[#2B3A55]">
                      In Stock
                    </span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) =>
                    setFormData({
                      ...formData,
                      featured: e.target.checked
                    })
                    }
                    className="h-5 w-5 rounded border-gray-300 text-[#D4A373] focus:ring-[#D4A373]" />
                  
                    <span className="font-inter text-sm font-medium text-[#2B3A55]">
                      Featured Product
                    </span>
                  </label>
                </div>

                <div className="mt-4 flex justify-end gap-4 border-t border-gray-100 pt-6">
                  <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-lg px-6 py-3 font-inter font-semibold text-gray-500 hover:bg-gray-100">
                  
                    Cancel
                  </button>
                  <button
                  type="submit"
                  className="rounded-lg bg-[#2B3A55] px-8 py-3 font-inter font-semibold text-white active:scale-95 transition-transform">
                  
                    Save Product
                  </button>
                </div>
              </form>
            </motion.div>
          </>
        }
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {isDeleteModalOpen &&
        <>
            <motion.div
            initial={{
              opacity: 0
            }}
            animate={{
              opacity: 1
            }}
            exit={{
              opacity: 0
            }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsDeleteModalOpen(false)} />
          
            <motion.div
            initial={{
              opacity: 0,
              scale: 0.95
            }}
            animate={{
              opacity: 1,
              scale: 1
            }}
            exit={{
              opacity: 0,
              scale: 0.95
            }}
            className="fixed left-1/2 top-1/2 z-50 w-[90%] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-6 shadow-xl text-center">
            
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                <Trash2 className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="mb-2 font-fraunces text-xl text-[#2B3A55]">
                Delete Product
              </h3>
              <p className="mb-6 font-inter text-sm text-gray-500">
                Are you sure you want to delete "{productToDelete?.name}"? This
                action cannot be undone.
              </p>
              <div className="flex gap-4">
                <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="flex-1 rounded-lg border border-gray-300 py-3 font-inter font-semibold text-gray-700 hover:bg-gray-50">
                
                  Cancel
                </button>
                <button
                onClick={handleDelete}
                className="flex-1 rounded-lg bg-red-600 py-3 font-inter font-semibold text-white hover:bg-red-700">
                
                  Delete
                </button>
              </div>
            </motion.div>
          </>
        }
      </AnimatePresence>
    </div>);

}