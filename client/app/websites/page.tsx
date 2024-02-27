import { Header } from "@features/Header";
import { Menu } from "@features/Menu";
import { Dashboard } from "@widgets/Screens/Dashboard/ui";
import { WebsitePopup } from "@entities/WebsitePopup";
import { WebsiteItem } from "@shared/lib/types";
import { useHydrateStore } from "@redux/hydrateStore";
import StoreProvider from "app/StoreProvider/StoreProvider";

import "@fortawesome/fontawesome-svg-core/styles.css";

interface DashboardProps {
  websites: WebsiteItem[];
  popupState: any;
}

const WebsitesPage: React.FC<DashboardProps> = ({ websites, popupState }) => {
  const store = useHydrateStore(popupState);

  return (
    <StoreProvider>
      <div className="flex">
        <Menu />
        <main className="flex flex-col w-full">
          <Header />
          <WebsitePopup isOpen={popupState.isOpen} />
          <Dashboard />
        </main>
      </div>
    </StoreProvider>
  );
};

export default WebsitesPage;
