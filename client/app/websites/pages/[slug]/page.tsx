'use client'

import { Header } from "@features/Header";
import { Menu } from "@features/Menu";
import { WebsiteInner } from "@widgets/Screens/WebsiteInner/ui";
import { useGetWebsitePages } from "@shared/lib/hooks/useGetWebsitePages";

const WebsiteEditPage = ({ params }: { params: { slug: string } }) => {
    
  const getWebsitePages = useGetWebsitePages

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
