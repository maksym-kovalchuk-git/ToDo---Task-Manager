import { useState, useEffect } from 'react';
import { BG_PRESETS } from '../constants';

const STORAGE_KEY = 'bg-preset';
const DEFAULT_ID = 'ocean';

function applyBg(background) {
  document.body.style.background = background;
  document.body.style.backgroundAttachment = 'fixed';
}

export function useBgPreset() {
  const [presetId, setPresetId] = useState(
    () => localStorage.getItem(STORAGE_KEY) ?? DEFAULT_ID
  );

  useEffect(() => {
    const preset = BG_PRESETS.find((p) => p.id === presetId) ?? BG_PRESETS[0];
    applyBg(preset.background);
    localStorage.setItem(STORAGE_KEY, presetId);
  }, [presetId]);

  return { presetId, setPresetId };
}
