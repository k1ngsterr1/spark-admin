import React from "react";
import { Button } from "@shared/ui/Buttons";
import Heading from "@shared/ui/Heading/index";
import { WebsiteTab } from "@entities/WebsiteTab";
import { WebsiteItem } from "@shared/lib/types";

import image from "@assets/example.png";

import styles from "./styles.module.scss";

// interface DashboardProps {
//   websites: WebsiteItem[];
// }

export const Dashboard = () => {
  return (
    <div className="flex flex-col">
      <div className="flex w-[90%] justify-between items-center m-auto ">
        <Heading text="Ваши Сайты" />
        <Button text="Добавить сайт" buttonType="regular--small" />
      </div>
      <section className={styles.sites_section}>
        {/* {websites.map((website) => (
          <WebsiteTab
            key={website.id}
            text={website.name}
            preview={website.preview}
            userQuantity={website.userQuantity}
          />
        ))} */}
      </section>
    </div>
  );
};
