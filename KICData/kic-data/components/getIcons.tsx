import axios from "axios";
import * as cheerio from "cheerio";

export function getIconUrl(websiteUrl: string): string {
  return `${websiteUrl}/favicon.ico`;
}
