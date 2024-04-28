import React from "react";
import { Button } from "@shared/ui/Buttons_Components/Buttons";
import { useWebPopup } from "@shared/lib/contexts/AppContext";
import Heading from "@shared/ui/Heading/index";

import styles from "./styles.module.scss";

export const Dashboard = () => {
  return (
    <div className="flex flex-col">
      <div className="flex w-[90%] justify-between items-center m-auto ">
        <Heading text="Ваши Сайты" />
        <div className="flex items-center-justify-center gap-4">
          <Button
            text="Добавить сайт"
            buttonType="regular--small"
            functionType="webPopup"
          />
          <Button
            text="Верифицировать сайт"
            buttonType="regular--small"
            functionType="verifyPopup"
          />
        </div>
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
