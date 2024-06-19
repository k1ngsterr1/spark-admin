import React from "react";
import { WebsiteAdminDashboard } from "@widgets/WebsiteAdminDashboard";

import styles from "./styles.module.scss";

export async function generateMetadata({ params }): Promise<Metadata> {
  return {
    title: "Your Website | Spark Admin",
    description: "Your Website",
  };
}

export default function WebsitePage() {
  return (
    <div className={`flex flex-col ${styles.page}`}>
      <WebsiteAdminDashboard />
    </div>
  );
}
