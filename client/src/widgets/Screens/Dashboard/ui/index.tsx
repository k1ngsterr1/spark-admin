import React from "react";
import { useHydrateStore } from "@redux/hydrateStore";
import { Button } from "@shared/ui/Buttons";
import Heading from "@shared/ui/Heading/index";
import { WebsiteTab } from "@entities/WebsiteTab";
import { WebsiteItem } from "@shared/lib/types";
import { useDispatch, useSelector } from "react-redux";
import { toggleOnPopup } from "@redux/slices/websitePopupSlice";

import styles from "./styles.module.scss";

export const Dashboard = () => {
  return (
    <div className="flex flex-col">
      <div className="flex w-[90%] justify-between items-center m-auto ">
        <Heading text="Ваши Сайты" />
        <Button
          text="Добавить сайт"
          buttonType="regular--small"
          // onClick={() => dispatch(toggleOnPopup())}
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
