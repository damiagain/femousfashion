import React, { useState, useRef } from 'react';
import { Upload, Save, Image as ImageIcon } from 'lucide-react';
import { toast } from 'sonner';
import { useSettingsStore, SiteSettings } from '../../data/settingsStore';
import { supabaseAdmin } from '../../lib/supabase';

export function AdminSettings() {
  const { settings, updateSettings } = useSettingsStore();
  const [formData, setFormData] = useState<SiteSettings>(settings);
  const [isSaving, setIsSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadTarget, setUploadTarget] = useState<{ type: 'hero' | 'story' | 'category', key?: string } | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0] && uploadTarget) {
      const file = e.target.files[0];
      if (file.size > 2 * 1024 * 1024) {
        toast.error('Image exceeds 2MB limit');
        return;
      }
      
      const toastId = toast.loading('Uploading image...');
      try {
        const fileExt = file.name.split('.').pop();
        const fileName = `settings_${Date.now()}.${fileExt}`;
        
        const { error } = await supabaseAdmin.storage
          .from('product-images')
          .upload(fileName, file);
          
        if (error) throw error;
        
        const { data } = supabaseAdmin.storage
          .from('product-images')
          .getPublicUrl(fileName);
          
        const publicUrl = data.publicUrl;
        
        setFormData(prev => {
          if (uploadTarget.type === 'hero') {
            return { ...prev, heroImage: publicUrl };
          }
          if (uploadTarget.type === 'story') {
            return { ...prev, ourStoryImage: publicUrl };
          }
          if (uploadTarget.type === 'category' && uploadTarget.key) {
            return {
              ...prev,
              categoryImages: {
                ...prev.categoryImages,
                [uploadTarget.key]: publicUrl
              }
            };
          }
          return prev;
        });
        
        toast.success('Image uploaded successfully', { id: toastId });
      } catch (err) {
        console.error(err);
        toast.error('Failed to upload image', { id: toastId });
      } finally {
        setUploadTarget(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
      }
    }
  };

  const triggerUpload = (type: 'hero' | 'story' | 'category', key?: string) => {
    setUploadTarget({ type, key });
    fileInputRef.current?.click();
  };

  const handleSave = async () => {
    setIsSaving(true);
    const success = await updateSettings(formData);
    if (success) {
      toast.success('Settings saved successfully');
    } else {
      toast.error('Failed to save settings');
    }
    setIsSaving(false);
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="font-fraunces text-2xl text-[#2B3A55] md:text-3xl">
            Site Settings
          </h1>
          <p className="font-inter text-sm text-gray-500 mt-1">
            Manage your storefront display images.
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center justify-center gap-2 rounded-lg bg-[#2B3A55] px-6 py-3 font-inter font-semibold text-white transition-transform active:scale-95 disabled:opacity-50">
          <Save className="h-5 w-5" />
          {isSaving ? 'Saving...' : 'Save Settings'}
        </button>
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Main Images */}
        <div className="rounded-xl bg-white p-6 shadow-sm border border-gray-100 flex flex-col gap-6">
          <h2 className="font-fraunces text-xl text-[#2B3A55] border-b border-gray-100 pb-4">
            Main Site Images
          </h2>
          
          <div className="flex flex-col gap-3">
            <label className="font-inter text-sm font-medium text-[#2B3A55]">Hero Banner Image</label>
            <div className="relative h-48 rounded-xl border-2 border-dashed border-gray-300 overflow-hidden group">
              <img src={formData.heroImage} alt="Hero" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button onClick={() => triggerUpload('hero')} className="bg-white text-[#2B3A55] px-4 py-2 rounded-lg font-medium flex items-center gap-2 text-sm">
                  <Upload className="h-4 w-4" /> Change Image
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <label className="font-inter text-sm font-medium text-[#2B3A55]">Our Story Image</label>
            <div className="relative h-48 rounded-xl border-2 border-dashed border-gray-300 overflow-hidden group">
              <img src={formData.ourStoryImage} alt="Our Story" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button onClick={() => triggerUpload('story')} className="bg-white text-[#2B3A55] px-4 py-2 rounded-lg font-medium flex items-center gap-2 text-sm">
                  <Upload className="h-4 w-4" /> Change Image
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Category Images */}
        <div className="rounded-xl bg-white p-6 shadow-sm border border-gray-100 flex flex-col gap-6">
          <h2 className="font-fraunces text-xl text-[#2B3A55] border-b border-gray-100 pb-4">
            Category Images
          </h2>
          
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(formData.categoryImages).map(([key, url]) => (
              <div key={key} className="flex flex-col gap-2">
                <label className="font-inter text-xs font-medium text-[#2B3A55] uppercase tracking-wider">
                  {key.replace('-', ' ')}
                </label>
                <div className="relative aspect-[4/5] rounded-xl border-2 border-dashed border-gray-300 overflow-hidden group">
                  <img src={url} alt={key} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button onClick={() => triggerUpload('category', key)} className="bg-white text-[#2B3A55] p-2 rounded-full">
                      <Upload className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
