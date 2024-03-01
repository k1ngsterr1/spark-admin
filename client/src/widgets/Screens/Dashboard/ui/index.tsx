import React from "react";
import { Button } from "@shared/ui/Buttons";
import { useWebPopup } from "@shared/lib/contexts/AppContext";
import Heading from "@shared/ui/Heading/index";

import styles from "./styles.module.scss";
import { ClientButton } from "@shared/ui/clientButton";

export const Dashboard = () => {
  return (
    <div className="flex flex-col">
      <div className="flex w-[90%] justify-between items-center m-auto ">
        <Heading text="Ваши Сайты" />
        <ClientButton />
        {/* <Button
          text="Добавить сайт"
          buttonType="regular--small"
          onClick={toggleWebPopup}
        /> */}
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
