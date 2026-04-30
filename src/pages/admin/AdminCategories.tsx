import React, { useState, useRef } from 'react';
import { Plus, Edit2, Trash2, X, Upload, GripVertical } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { categories as initialCategories } from '../../data/categories';
import { Category } from '../../types';
export function AdminCategories() {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  // Form State
  const [formData, setFormData] = useState<Partial<Category>>({
    name: '',
    slug: '' as any,
    sortOrder: categories.length + 1
  });
  const [imagePreview, setImagePreview] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleOpenModal = (category?: Category) => {
    if (category) {
      setEditingCategory(category);
      setFormData(category);
      setImagePreview(category.image);
    } else {
      setEditingCategory(null);
      setFormData({
        name: '',
        slug: '' as any,
        sortOrder: categories.length + 1
      });
      setImagePreview('');
    }
    setIsModalOpen(true);
  };
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    const slug = name.
    toLowerCase().
    replace(/[^a-z0-9]+/g, '-').
    replace(/(^-|-$)+/g, '');
    setFormData({
      ...formData,
      name,
      slug: slug as any
    });
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 2 * 1024 * 1024) {
        toast.error('Image exceeds 2MB limit');
        return;
      }
      setImagePreview(URL.createObjectURL(file));
    }
  };
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!imagePreview) {
      toast.error('Please upload a cover image');
      return;
    }
    const newCategory: Category = {
      id: editingCategory ? editingCategory.id : Date.now().toString(),
      name: formData.name || '',
      slug: formData.slug as any,
      image: imagePreview,
      sortOrder: Number(formData.sortOrder) || categories.length + 1
    };
    if (editingCategory) {
      setCategories(
        categories.
        map((c) => c.id === editingCategory.id ? newCategory : c).
        sort((a, b) => a.sortOrder - b.sortOrder)
      );
      toast.success('Category updated successfully');
    } else {
      setCategories(
        [...categories, newCategory].sort((a, b) => a.sortOrder - b.sortOrder)
      );
      toast.success('Category added successfully');
    }
    setIsModalOpen(false);
  };
  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this category?')) {
      setCategories(categories.filter((c) => c.id !== id));
      toast.success('Category deleted successfully');
    }
  };
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="font-fraunces text-2xl text-[#2B3A55] md:text-3xl">
            Categories
          </h1>
          <p className="font-inter text-sm text-gray-500 mt-1">
            Manage product categories and display order.
          </p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center justify-center gap-2 rounded-lg bg-[#2B3A55] px-6 py-3 font-inter font-semibold text-white transition-transform active:scale-95">
          
          <Plus className="h-5 w-5" />
          Add Category
        </button>
      </div>

      <div className="flex flex-col gap-4">
        {categories.map((category) =>
        <div
          key={category.id}
          className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          
            <div className="cursor-grab p-2 text-gray-400 hover:text-[#2B3A55] hidden md:block">
              <GripVertical className="h-5 w-5" />
            </div>
            <img
            src={category.image}
            alt={category.name}
            className="h-16 w-16 rounded-lg object-cover" />
          
            <div className="flex-1">
              <h3 className="font-fraunces text-lg text-[#2B3A55]">
                {category.name}
              </h3>
              <p className="font-inter text-xs text-gray-500">
                /{category.slug}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="hidden md:inline-block rounded-full bg-gray-100 px-3 py-1 font-inter text-xs font-medium text-gray-600 mr-4">
                Order: {category.sortOrder}
              </span>
              <button
              onClick={() => handleOpenModal(category)}
              className="p-2 text-gray-400 hover:text-[#2B3A55]">
              
                <Edit2 className="h-4 w-4" />
              </button>
              <button
              onClick={() => handleDelete(category.id)}
              className="p-2 text-gray-400 hover:text-red-500">
              
                <Trash2 className="h-4 w-4" />
              </button>
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
            className="fixed left-1/2 top-1/2 z-50 w-[95%] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-6 shadow-xl">
            
              <div className="mb-6 flex items-center justify-between">
                <h2 className="font-fraunces text-2xl text-[#2B3A55]">
                  {editingCategory ? 'Edit Category' : 'Add Category'}
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
                    Cover Image (Max 2MB)
                  </label>
                  <div
                  onClick={() => fileInputRef.current?.click()}
                  className="relative flex h-40 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 hover:border-[#D4A373] transition-colors">
                  
                    {imagePreview ?
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="h-full w-full object-cover" /> :


                  <>
                        <Upload className="mb-2 h-8 w-8 text-gray-400" />
                        <span className="font-inter text-sm text-gray-500">
                          Click to upload image
                        </span>
                      </>
                  }
                  </div>
                  <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden" />
                
                </div>

                <div>
                  <label className="mb-1 block font-inter text-sm font-medium text-[#2B3A55]">
                    Name
                  </label>
                  <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleNameChange}
                  className="w-full rounded-lg border border-gray-300 p-3 font-inter outline-none focus:border-[#D4A373]" />
                
                </div>

                <div>
                  <label className="mb-1 block font-inter text-sm font-medium text-[#2B3A55]">
                    Slug (Auto-generated)
                  </label>
                  <input
                  type="text"
                  required
                  value={formData.slug}
                  readOnly
                  className="w-full rounded-lg border border-gray-200 bg-gray-50 p-3 font-inter text-gray-500 outline-none" />
                
                </div>

                <div>
                  <label className="mb-1 block font-inter text-sm font-medium text-[#2B3A55]">
                    Sort Order
                  </label>
                  <input
                  type="number"
                  required
                  min="1"
                  value={formData.sortOrder}
                  onChange={(e) =>
                  setFormData({
                    ...formData,
                    sortOrder: Number(e.target.value)
                  })
                  }
                  className="w-full rounded-lg border border-gray-300 p-3 font-inter outline-none focus:border-[#D4A373]" />
                
                </div>

                <div className="mt-4 flex justify-end gap-4">
                  <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-lg px-6 py-3 font-inter font-semibold text-gray-500 hover:bg-gray-100">
                  
                    Cancel
                  </button>
                  <button
                  type="submit"
                  className="rounded-lg bg-[#2B3A55] px-8 py-3 font-inter font-semibold text-white active:scale-95 transition-transform">
                  
                    Save
                  </button>
                </div>
              </form>
            </motion.div>
          </>
        }
      </AnimatePresence>
    </div>);

}