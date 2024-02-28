import { Header } from "@features/Header";
import { Menu } from "@features/Menu";
import { Dashboard } from "@widgets/Screens/Dashboard/ui";
import { ClientSideComponent, WebsitePopup } from "@entities/WebsitePopup";
import { WebsiteItem } from "@shared/lib/types";

import StoreProvider from "app/StoreProvider/StoreProvider";

import "@fortawesome/fontawesome-svg-core/styles.css";

interface DashboardProps {
  websites: WebsiteItem[];
  popupState: any;
}

const WebsitesPage: React.FC<DashboardProps> = ({ popupState }) => {
  return (
    <div className="flex">
      <Menu />
      <main className="flex flex-col w-full">
        <Header />
        <ClientSideComponent popupState={popupState} />
        <Dashboard />
      </main>
    </div>
  );
};

export default WebsitesPage;
