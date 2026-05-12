import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export interface SiteSettings {
  heroImage: string;
  categoryImages: {
    'native-wears': string;
    'corporate-wears': string;
    'street-wears': string;
    'casual-wears': string;
    'accessories': string;
    'fabrics': string;
    [key: string]: string; // Index signature for dynamic access
  };
  ourStoryImage: string;
}

export const defaultSettings: SiteSettings = {
  heroImage: '/hero.jpeg',
  categoryImages: {
    'native-wears': '/native.jpeg',
    'corporate-wears': '/story.jpeg',
    'street-wears': '/streetwear.jpeg',
    'casual-wears': '/casual.jpeg',
    'accessories': '/accesories.jpeg',
    'fabrics': '/fabric.jpeg',
  },
  ourStoryImage: '/story.jpeg',
};

let globalSettings: SiteSettings = defaultSettings;
let isLoaded = false;
let isLoading = false;
const subscribers: Set<() => void> = new Set();

const notify = () => subscribers.forEach((cb) => cb());

export function useSettingsStore() {
  const [settings, setSettingsState] = useState(globalSettings);

  useEffect(() => {
    const handleUpdate = () => setSettingsState(globalSettings);
    subscribers.add(handleUpdate);
    return () => {
      subscribers.delete(handleUpdate);
    };
  }, []);

  const fetchSettings = async () => {
    if (isLoaded || isLoading) return;
    isLoading = true;
    try {
      const { data } = supabase.storage.from('product-images').getPublicUrl('settings.json');
      const res = await fetch(`${data.publicUrl}?t=${Date.now()}`);
      if (res.ok) {
        const fetchedSettings = await res.json();
        globalSettings = { ...defaultSettings, ...fetchedSettings };
        isLoaded = true;
        notify();
      }
    } catch (e) {
      console.error('Failed to load settings', e);
    } finally {
      isLoading = false;
    }
  };

  const updateSettings = async (newSettings: SiteSettings) => {
    try {
      const jsonStr = JSON.stringify(newSettings);
      const file = new Blob([jsonStr], { type: 'application/json' });
      
      const { supabaseAdmin } = await import('../lib/supabase');
      
      const { error } = await supabaseAdmin.storage
        .from('product-images')
        .upload('settings.json', file, { upsert: true, contentType: 'application/json' });
        
      if (error) throw error;
      
      globalSettings = newSettings;
      notify();
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  };

  return { settings, fetchSettings, updateSettings };
}
