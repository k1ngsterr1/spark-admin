import React from "react";
import { Button } from "@shared/ui/Buttons";
import { Provider } from "react-redux";
import { ClientSideButton } from "@shared/ui/ClientSideButton";
import { toggleOnPopup } from "@redux/slices/websitePopupSlice";

import Heading from "@shared/ui/Heading/index";

import styles from "./styles.module.scss";

export const Dashboard = () => {
  return (
    <div className="flex flex-col">
      <div className="flex w-[90%] justify-between items-center m-auto ">
        <Heading text="Ваши Сайты" />
        <ClientSideButton
          text="Добавить сайт"
          buttonType="regular--small"
          action={() => toggleOnPopup()}
        />
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
