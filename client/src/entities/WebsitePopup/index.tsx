"use client";
import React from "react";
import { Provider, useSelector } from "react-redux";
import { RootState, makeStore } from "@redux/store";

import Logo from "@assets/spark_product_logo.svg";

import styles from "./styles.module.scss";

interface ClientSide {
  popupState: any;
}

export const WebsitePopup = () => {
  const isOpen = useSelector((state: RootState) => state.websitePopup.isOpen);

  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.website_popup}>
        <Logo />
        <span className={styles.website_popup__text}>Добавьте ваш сайт</span>
      </div>
    </div>
  );
};

export const ClientSideComponent: React.FC<ClientSide> = ({ popupState }) => {
  const store = makeStore(popupState);

  return (
    <Provider store={store}>
      <WebsitePopup />
    </Provider>
  );
};
