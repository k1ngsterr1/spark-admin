"use client";
import { Header } from "@features/Header";
import { Menu } from "@features/Menu";
import { WebsiteInner } from "@widgets/Screens/WebsiteInner/ui";
import { useGetWebsitePages } from "@shared/lib/hooks/useGetWebsitePages";

const WebsiteEditPage = ({ params }: { params: { slug: string } }) => {
  const { pageContent, isLoading } = useGetWebsitePages(params.slug);

  return (
    <div className="flex">
      <Menu />
      <main className="flex flex-col w-full">
        <Header />
        <WebsiteInner
          websiteName={pageContent?.name}
          pageType={pageContent?.type}
          href={pageContent?.url}
          isLoading={isLoading}
        />
      </main>
    </div>
  );
};

export default WebsiteEditPage;
