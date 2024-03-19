import axios from "axios";
import * as cheerio from "cheerio";

export function ensureHttps(url: string): string {
  if (!url.startsWith("https://") || !url.startsWith("http://")) {
    return "https://" + url;
  }
  return url;
}
export function getIconUrl(websiteUrl: string): string {
  return ensureHttps(`${websiteUrl}/favicon.ico`);
}
