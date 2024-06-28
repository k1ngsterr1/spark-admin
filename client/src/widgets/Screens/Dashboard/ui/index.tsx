"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Button, ButtonLink } from "@shared/ui/Buttons_Components/Buttons";
import { useGetWebsites } from "@shared/lib/hooks/useGetWebsites";
import { EmptySvg } from "@assets/index";
import { useCheckIsAdmin } from "@shared/lib/hooks/useCheckIsAdmin";
import { useTranslations } from "next-intl";
import { WebsiteItem } from "@shared/lib/types";
import Heading from "@shared/ui/Heading/index";
import WebsiteTab from "@entities/Tabs_Components/WebsiteTab/index";
import SkeletonLoader from "@shared/ui/Skeleton_Loader";

import styles from "./styles.module.scss";

export const Dashboard = () => {
  const t = useTranslations("Dashboard");
  const { isLoading, hasWebsites, data } = useGetWebsites();
  const { isAdmin } = useCheckIsAdmin();
  const { locale } = useParams();

  if (isLoading) {
    return (
      <div>
        <SkeletonLoader />
      </div>
    );
  }

  if (!hasWebsites) {
    return (
      <>
        <div className={styles.container}>
          <div className="flex justify-between w-[90%] items-center mb-24">
            <Heading text={t("websites")} />
            <div className="flex items-center-justify-center gap-4">
              <Button
                text={t("add_website")}
                buttonType="regular--small"
                functionType="webPopup"
              />
              <Button
                text={t("verify_website")}
                buttonType="regular--small"
                functionType="verifyPopup"
              />
              <ButtonLink
                text={t("create_website")}
                href={`/${locale}/websites/build`}
                buttonType="regular--small"
              />
              {isAdmin && (
                <Button
                  text={t("upload_website")}
                  buttonType="regular--small"
                  functionType="websiteUploadPopup"
                />
              )}
            </div>
          </div>

          <EmptySvg className={styles.container__svg} />
          <p className={styles.container__already}>{t("empty")}</p>
        </div>
      </>
    );
  }

  return (
    <div className="flex flex-col">
      <div className="flex w-[90%]  justify-between items-center m-auto">
        <Heading text={t("websites")} />
        <div className="flex items-center justify-center gap-4">
          <Button
            text={t("add_website")}
            buttonType="regular--small"
            functionType="webPopup"
          />
          <Button
            text={t("verify_website")}
            buttonType="regular--small"
            functionType="verifyPopup"
          />
          <ButtonLink
            text={t("create_website")}
            href={`/${locale}/websites/build`}
            buttonType="regular--small"
          />
        </div>
      </div>
      {data.map((site: any | unknown) => (
        <WebsiteTab
          key={site.id}
          name={site.name}
          url={site.url}
          href={site.url}
        />
      ))}
    </div>
  );
};

export default Dashboard;
