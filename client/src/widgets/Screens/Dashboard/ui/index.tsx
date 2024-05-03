import { Button } from "@shared/ui/Buttons_Components/Buttons";
import Heading from "@shared/ui/Heading/index";
import WebsiteTab from "@entities/Tabs_Components/WebsiteTab/index";

interface DashboardProps {
  sites: [];
}

interface IWebsite {
  name: string;
  url: string;
}

export const Dashboard: React.FC<DashboardProps> = ({ sites }) => {
  return (
    <div className="flex flex-col">
      <div className="flex w-[90%] justify-between items-center m-auto">
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
