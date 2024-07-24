"use client";
import { useEffect } from "react";
import { useParams } from "next/navigation";
import { Button, ButtonLink } from "@shared/ui/Buttons_Components/Buttons";
import { useGetWebsites } from "@shared/lib/hooks/Websites/useGetWebsites";
import { useCheckIsAdmin } from "@shared/lib/hooks/Misc/useCheckIsAdmin";
import { useTranslations } from "next-intl";
import Heading from "@shared/ui/Heading/index";
import WebsiteTab from "@entities/Tabs_Components/WebsiteTab/index";
import ClipLoader from "react-spinners/ClipLoader";
import { EmtpyScreen } from "@shared/ui/EmptyScreen";
import { Loading } from "@entities/Loading";

import styles from "./styles.module.scss";
import { BigLoader } from "@entities/BigLoader";

export const Dashboard = () => {
  const t = useTranslations("Dashboard");
  const { isLoading, hasWebsites, data } = useGetWebsites();
  const { isAdmin } = useCheckIsAdmin();
  const { locale } = useParams();

  useEffect(() => {
    const handleCopy = (e) => {
      const selection = window.getSelection();
      if (selection && selection.toString().length > 0) {
        const { clientX: x, clientY: y } = e;
        setMenuPosition({ x, y });
        setMenuVisible(true);
      } else {
        setMenuVisible(false);
      }
    };

    document.addEventListener("copy", handleCopy);
    return () => {
      document.removeEventListener("copy", handleCopy);
    };
  }, []);

  if (isLoading) {
    return (
      <>
        <BigLoader />
      </>
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
          <EmtpyScreen text={t("empty")} />
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
