"use client";

import { useState, useEffect } from "react";
import { SiteMediaConfig, DEFAULT_MEDIA_CONFIG, getStoredMedia } from "./adminStore";

export function useSiteMedia(): SiteMediaConfig {
  const [media, setMedia] = useState<SiteMediaConfig>(DEFAULT_MEDIA_CONFIG);

  useEffect(() => {
    // Initial load from localStorage on client
    setMedia(getStoredMedia());

    const handleUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<SiteMediaConfig>;
      if (customEvent.detail) {
        setMedia(customEvent.detail);
      } else {
        setMedia(getStoredMedia());
      }
    };

    window.addEventListener("br-media-updated", handleUpdate);
    return () => {
      window.removeEventListener("br-media-updated", handleUpdate);
    };
  }, []);

  return media;
}

