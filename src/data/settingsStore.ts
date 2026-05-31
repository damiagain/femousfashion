import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

export interface SiteSettings {
  heroImage: string;
  categoryImages: {
    "native-wears": string;
    "corporate-wears": string;
    "street-wears": string;
    "casual-wears": string;
    accessories: string;
    fabrics: string;
    [key: string]: string;
  };
  ourStoryImage: string;
}

export const defaultSettings: SiteSettings = {
  heroImage: "/hero.jpeg",
  categoryImages: {
    "native-wears": "/native.jpeg",
    "corporate-wears": "/story.jpeg",
    "street-wears": "/streetwear.jpeg",
    "casual-wears": "/casual.jpeg",
    accessories: "/accesories.jpeg",
    fabrics: "/fabric.jpeg",
  },
  ourStoryImage: "/story.jpeg",
};

let globalSettings: SiteSettings = defaultSettings;
let isLoaded = false;
const subscribers: Set<() => void> = new Set();
const notify = () => subscribers.forEach((cb) => cb());

export function useSettingsStore() {
  const [settings, setSettingsState] = useState(globalSettings);

  useEffect(() => {
    const handleUpdate = () => setSettingsState({ ...globalSettings });
    subscribers.add(handleUpdate);
    return () => {
      subscribers.delete(handleUpdate);
    };
  }, []);

  const fetchSettings = async () => {
    if (isLoaded) return;
    try {
      const { data, error } = await supabase
        .from("site_settings")
        .select("data")
        .eq("id", 1)
        .single();

      if (error) throw error;
      if (data?.data && Object.keys(data.data).length > 0) {
        globalSettings = { ...defaultSettings, ...data.data };
      }
      isLoaded = true;
      notify();
    } catch (e) {
      console.error("Failed to load settings", e);
    }
  };

  const updateSettings = async (newSettings: SiteSettings) => {
    try {
      const { error } = await supabase
        .from("site_settings")
        .update({ data: newSettings, updated_at: new Date().toISOString() })
        .eq("id", 1);

      if (error) throw error;

      globalSettings = newSettings;
      isLoaded = true;
      notify();
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  };

  return { settings, fetchSettings, updateSettings };
}
