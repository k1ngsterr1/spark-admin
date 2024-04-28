import { StaticImageData } from "next/image";

export interface WebsiteItem {
  id: number;
  name: string;
  preview: StaticImageData;
  userQuantity: number;
}
