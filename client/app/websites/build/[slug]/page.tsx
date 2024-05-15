"use client";
import axios from "axios";
import { useParams } from "next/navigation";

//  Тут будет редактируемая страница
export default function DynamicPage() {
  const { slug } = useParams();
  const url = `http://spark-admin-production.up.railway.app/api/page-card/render/${slug}`;

  const response = axios.get(url);
  const htmlContent = response.data;

  console.log("HTML Content:", htmlContent); // This will log the HTML content in your console

  return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
}
