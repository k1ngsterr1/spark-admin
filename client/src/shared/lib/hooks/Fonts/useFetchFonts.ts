import axios from "axios";
import { useState, useEffect } from "react";

const API_KEY = "AIzaSyDMLR_vUpz6_Zs834f6X8G9vfd_Lc0pUQ0";
const GOOGLE_FONTS_API = `https://www.googleapis.com/webfonts/v1/webfonts?key=${API_KEY}`;

export const useFetchFonts = () => {
  const [fonts, setFonts] = useState<{ label: string; value: string }[]>([]);

  useEffect(() => {
    const fetchFonts = async () => {
      try {
        const response = await axios.get(GOOGLE_FONTS_API);
        const fontOptions = response.data.items.map((font: any) => ({
          label: font.family,
          value: font.family,
        }));
        setFonts(fontOptions);
      } catch (error) {
        console.error("Error fetching fonts from Google", error);
      }
    };

    fetchFonts();
  }, []);

  return fonts;
};
