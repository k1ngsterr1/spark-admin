import { Button, ButtonLink } from "@shared/ui/Buttons_Components/Buttons";
import Heading from "@shared/ui/Heading/index";
import WebsiteTab from "@entities/Tabs_Components/WebsiteTab/index";
import { useGetWebsites } from "@shared/lib/hooks/useGetWebsites";
import SkeletonLoader from "@shared/ui/Skeleton_Loader";

import EmptySvg from "@assets/empty 1 (1).svg";

import styles from "./styles.module.scss";

interface DashboardProps {
  sites: [];
}

export const Dashboard: React.FC<DashboardProps> = ({ sites }) => {
  const { isLoading, hasWebsites } = useGetWebsites();

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
          <EmptySvg />
          <p className={styles.container__already}>У вас еще нет сайтов</p>
        </div>
      </>
    );
  }

  return (
    <div className="flex flex-col">
      <div className="flex w-[90%]  justify-between items-center m-auto">
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
          <ButtonLink
            text="Создать сайт"
            href="/websites/build"
            buttonType="regular--small"
          />
        </div>
      </div>
      {sites.map((site: any | unknown) => (
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
