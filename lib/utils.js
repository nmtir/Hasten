import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const isLocationMatch = (targetLocation, locationName) => {
  return (
    locationName === targetLocation ||
    locationName.startsWith(`${targetLocation}/`)
  );
};

export function hslToHex(hsl) {
  // Remove "hsla(" and ")" from the HSL string
  hsl = hsl.replace("hsla(", "").replace(")", "");

  // Split the HSL string into an array of H, S, and L values
  const [h, s, l] = hsl.split(" ").map((value) => {
    if (value.endsWith("%")) {
      // Remove the "%" sign and parse as a float
      return parseFloat(value.slice(0, -1));
    } else {
      // Parse as an integer
      return parseInt(value);
    }
  });

  // Function to convert HSL to RGB
  function hslToRgb(h, s, l) {
    h /= 360;
    s /= 100;
    l /= 100;

    let r, g, b;

    if (s === 0) {
      r = g = b = l;
    } else {
      const hue2rgb = (p, q, t) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      };

      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }

    // Convert RGB values to integers
    const rInt = Math.round(r * 255);
    const gInt = Math.round(g * 255);
    const bInt = Math.round(b * 255);

    // Convert RGB values to a hex color code
    const rgbToHex = (value) => {
      const hex = value.toString(16);
      return hex.length === 1 ? "0" + hex : hex;
    };

    return `#${rgbToHex(rInt)}${rgbToHex(gInt)}${rgbToHex(bInt)}`;
  }

  // Call the hslToRgb function and return the hex color code
  return hslToRgb(h, s, l);
}

export const hexToRGB = (hex, alpha) => {
  const r = parseInt(hex.slice(1, 3), 16),
    g = parseInt(hex.slice(3, 5), 16),
    b = parseInt(hex.slice(5, 7), 16);

  if (alpha) {
    return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
  } else {
    return "rgb(" + r + ", " + g + ", " + b + ")";
  }
};

export const formatTime = (time) => {
  if (!time) return "";

  const date = new Date(time);
  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true, // Add this option to display AM/PM
  });
};

export const formatDate = (date) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(date).toLocaleDateString("en-US", options);
};

// for path name
export function getDynamicPath(pathname) {
  const prefixes = ["en", "bn", "ar"];

  for (const prefix of prefixes) {
    if (pathname.startsWith(`/${prefix}/`)) {
      return `/${pathname.slice(prefix.length + 2)}`;
    }
  }

  return pathname;
}

// translate

export const translate = (title, trans) => {
  const lowercaseTitle = title.toLowerCase();

  if (trans?.hasOwnProperty(lowercaseTitle)) {
    return trans[lowercaseTitle];
  }

  return title;
};
