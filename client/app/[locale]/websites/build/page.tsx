import React from "react";
import { Menu } from "@features/Menu";
import { WebsiteBuildScreen } from "@widgets/Screens/WebsiteBuild";

export async function generateMetadata({ params }): Promise<Metadata> {
  return {
    title: "Build Your Own Website | Spark Admin",
    description:
      "Discover the simplicity of creating your own website with Spark Admin. Our platform offers intuitive tools and customizable templates to help you build a professional-looking website effortlessly. Whether you're setting up a business site or a personal blog, Spark Admin provides all the resources you need to go live quickly and with confidence.",
  };
}

const BuildWebsite = () => {
  return (
    <div className="flex">
      <Menu />
      <WebsiteBuildScreen />
    </div>
  );
};

export default BuildWebsite;
