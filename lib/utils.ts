import { SimplifiedArtist } from "@/types/schema"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function joinArtists (artists: SimplifiedArtist[]) {
  const names = artists.map(artist => artist.name)
  return names.join(", ")
}

export function rgbToHex([r, g, b]: number[]) {
  var rgb = b | (g << 8) | (r << 16);
  return (0x1000000 | rgb).toString(16).substring(1);
}