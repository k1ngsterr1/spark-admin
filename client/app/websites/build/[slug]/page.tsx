"use client";
import { useFetchPageContent } from "@shared/lib/hooks/useFetchPageContent";
import { useParams } from "next/navigation";

//  Тут будет редактируемая страница
export default function ChangablePageContent() {
  const { slug } = useParams();
  const {htmlContent} = useFetchPageContent(slug)



  return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
}
