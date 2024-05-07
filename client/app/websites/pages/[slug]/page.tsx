"use client";
import { Header } from "@features/Header";
import { Menu } from "@features/Menu";
import { WebsiteInner } from "@widgets/Screens/WebsiteInner/ui";
import { useGetWebsitePages } from "@shared/lib/hooks/useGetWebsitePages";
import { useEffect } from "react";
import { useRouter } from "next/router";

const WebsiteEditPage = ({ params }: { params: { slug: string } }) => {
  const { pageContent } = useGetWebsitePages(params.slug);

  console.log("page content is here:", pageContent);

  if (!params.slug) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex">
      <Menu />
      <main className="flex flex-col w-full">
        <Header />
        {pageContent ? (
          <WebsiteInner
            websiteName={pageContent.name}
            pageType={pageContent.type}
            href={pageContent.url}
          />
        ) : (
          <div>No content available.</div> // Display this if no content is fetched
        )}
      </main>
    </div>
  );
};

export default WebsiteEditPage;
