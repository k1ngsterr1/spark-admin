'use client'
import { Header } from "@features/Header";
import { Menu } from "@features/Menu";
import { WebsiteInner } from "@widgets/Screens/WebsiteInner/ui";
import { useGetWebsitePages } from "@shared/lib/hooks/useGetWebsitePages";
import { useEffect } from "react";
import { useRouter } from "next/router";

const WebsiteEditPage = ({ params }: { params: { slug: string } }) => {
  const router = useRouter();
  const { slug } = router.query; 

  const { getWebsitePages, pageContent } = useGetWebsitePages();

  useEffect(() => {
    if (router.isReady && slug && typeof slug === 'string') {
      getWebsitePages(slug);
    }
  }, [router.isReady, slug]);

  if (!router.isReady || !slug) {
    return <div>Loading...</div>; 
  }


  useEffect(() => {
    // Check if the router is ready and slug is available
    if (router.isReady && slug && typeof slug === 'string') {
      getWebsitePages(slug);
    }
  }, [router.isReady, slug]); // Depend on router.isReady and slug

  return (
    <div className="flex">
      <Menu />
      <main className="flex flex-col w-full">
        <Header />
        <WebsiteInner websiteName={`${params.slug}`} pageType={`${params.slug}`} href={`${params.slug}`} />
      </main>
    </div>
  );
};

export default WebsiteEditPage;
