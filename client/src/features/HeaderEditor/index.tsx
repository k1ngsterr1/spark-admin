import React from "react";
import SparkLogo from "@assets/spark_product_logo.svg";
import SkeletonLoader from "@shared/ui/Skeleton_Loader";
import { Breadcrumbs } from "@shared/ui/Breadcrumbs_Components/Breadcrumbs";
import { faGlobe, faHome } from "@fortawesome/free-solid-svg-icons";
import { ButtonLink } from "@shared/ui/Buttons_Components/Buttons";
import { useTranslations } from "next-intl";
import { Logo } from "@shared/ui/Logo";

import styles from "./styles.module.scss";

interface HeaderEditorProps {
  locale: string | string[];
  websiteName: string | string[];
  websiteURL: string | string[];
  pageType: string | string[];
  pageURL: string | string[];
  isLoading: boolean;
  hasBlog: boolean;
  hasRequests: boolean;
}

export const HeaderEditor: React.FC<HeaderEditorProps> = ({
  websiteName,
  websiteURL,
  pageType,
  pageURL,
  locale,
  isLoading,
  hasRequests,
  hasBlog,
}) => {
  const t = useTranslations("Website");

  const breadcrumbData = [
    { label: t("websites"), path: `/${locale}/websites`, icon: faHome },
    { label: websiteName, path: websiteURL, icon: faGlobe },
  ];

  if ((!websiteName && !websiteURL && !pageType) || !pageURL) {
    return (
      <header className={`${styles.header_edit} dark:bg-dark-lighter`}>
        <div className={styles.header_edit__content}>
          <nav className="flex items-center gap-8">
            <div className={styles.header_edit__content__logo}>
              <SparkLogo />
            </div>
            <div className="flex items-center gap-4">
              <SkeletonLoader width="100px" height="40px" className="circle" />
              <SkeletonLoader width="100px" height="40px" className="circle" />
              <SkeletonLoader width="100px" height="40px" className="circle" />
            </div>
          </nav>
          <div className="flex items-center gap-4">
            <SkeletonLoader width="120px" height="40px" />
            <SkeletonLoader width="120px" height="40px" />
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className={`${styles.header_edit} dark:bg-dark-lighter`}>
      <div className={styles.header_edit__content}>
        <nav className="flex items-center gap-8">
          <div className={styles.header_edit__content__logo}>
            <Logo url={`/${locale}/websites`} />
          </div>
          <Breadcrumbs crumbs={breadcrumbData} isLoading={isLoading} />
        </nav>
        <div className="flex items-center gap-0">
          {hasRequests && (
            <ButtonLink
              href={`/${locale}/websites/${websiteName}/requests`}
              buttonType="regular--text"
              text="Requests"
            />
          )}
          {hasBlog && (
            <ButtonLink
              href={`/${locale}/blog/editor/${websiteName}`}
              buttonType="regular--text"
              text="Blog"
            />
          )}
          {hasBlog && (
            <ButtonLink
              href={`/${locale}/blog/add-card/${websiteName}`}
              buttonType="regular--text"
              text="Add Blog Card"
            />
          )}
        </div>
        {/* <div className="flex items-center gap-4">
          <Button text="Предпросмотр" buttonType="regular--text" />
          <Button text="Сохранить" buttonType="regular--small" />
        </div> */}
      </div>
    </header>
  );
};
