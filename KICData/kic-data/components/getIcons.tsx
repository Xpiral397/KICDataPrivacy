import axios from "axios";
import * as cheerio from "cheerio";

async function getIconUrl(websiteUrl: string): Promise<string | null> {
  try {
    // Fetch the HTML of the webpage
    const response = await axios.get(websiteUrl);
    const html = response.data;

    // Use Cheerio to parse the HTML
    const $ = cheerio.load(html);

    // Look for the icon URL in the <link> tags with rel="icon" or rel="shortcut icon"
    const iconUrl = $('link[rel="icon"], link[rel="shortcut icon"]').attr(
      "href"
    );

    if (iconUrl) {
      // If the icon URL is found, resolve the Promise with the full URL
      const absoluteIconUrl = new URL(iconUrl, websiteUrl).href;
      return absoluteIconUrl;
    } else {
      // If no icon URL is found, resolve the Promise with null
      return null;
    }
  } catch (error) {
    // If an error occurs, reject the Promise with the error message
    console.error("Error fetching icon:", error);
    return null;
  }
}
