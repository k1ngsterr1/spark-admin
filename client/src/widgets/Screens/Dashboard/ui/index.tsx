import { Button } from "@shared/ui/Buttons_Components/Buttons";
import Heading from "@shared/ui/Heading/index";
import WebsiteTab from "@entities/Tabs_Components/WebsiteTab/index";

interface DashboardProps {
  sites: [];
  isvalid: boolean;
}

export const Dashboard: React.FC<DashboardProps> = ({ sites, isValid }) => {
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
      <WebsiteTab sites={sites} isTokenValid={isValid} />
    </div>
  );
};

export default Dashboard;
