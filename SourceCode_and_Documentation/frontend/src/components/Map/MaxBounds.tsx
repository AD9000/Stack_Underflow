import React from "react";
import { useMapEvent } from "react-leaflet";

/**
 * Assuming that a map bound is set, enforces it
 * without being able to drag beyond the edges with animation
 * @returns null
 */
const MaxBounds = () => {
  const map = useMapEvent("drag", () => {
    const bounds = map.options.maxBounds;
    if (!bounds) {
      return;
    }
    map.panInsideBounds(bounds, { animate: false });
  });

  return null;
};

export { MaxBounds };
