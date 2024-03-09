import React from "react";
import { WebsiteTab } from "@entities/Tabs_Components/WebsiteTab";
import { fetchWebsites } from "@shared/lib/hooks/useLoadWebsites";
import { WebsiteItem } from "@shared/lib/types";

export const WebsitesTab = async () => {
  const websites = await fetchWebsites();

  return (
    <section>
      {websites.map((website: WebsiteItem) => (
        <WebsiteTab
          key={website.id}
          text={website.name}
          preview={website.preview}
          userQuantity={website.userQuantity}
        />
      ))}
    </section>
  );
};
