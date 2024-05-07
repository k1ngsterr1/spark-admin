'use client'
import { useRouter } from 'next/router';
import { Header } from "@features/Header";
import { Menu } from "@features/Menu";
import { WebsiteInner } from "@widgets/Screens/WebsiteInner/ui";
import { useGetWebsitePages } from "@shared/lib/hooks/useGetWebsitePages";
import { useEffect } from "react";

const WebsiteEditPage = ({ params }: { params: { slug: string } }) => {
    console.log(params)

//   const {getWebsitePages} = useGetWebsitePages()
//  useEffect(() => {
//     if (slug && typeof slug === 'string') {
//       getWebsitePages(slug);
//     }
//   }, [slug]);

  return (
    <div className="flex">
      <Menu />
      <main className="flex flex-col w-full">
        <Header />
        <WebsiteInner websiteName={`${params.slug}`} />
      </main>
    </div>
  );
};

export default WebsiteEditPage;
