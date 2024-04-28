import { Header } from "@features/Header";
import { Menu } from "@features/Menu";
import { Dashboard } from "@widgets/Screens/Dashboard/ui";
import { WebsitePopup } from "@entities/Popup_Components/WebsitePopup";
import { WebsiteItem } from "@shared/lib/types";
import { ThemeProvider } from "next-themes";

import "@fortawesome/fontawesome-svg-core/styles.css";
import { CodePopup } from "@entities/Popup_Components/CodePopup";

interface DashboardProps {
  websites: WebsiteItem[];
  popupState: any;
}

const WebsitesPage: React.FC<DashboardProps> = () => {
  return (
    <div className="flex">
      <Menu />
      <main className="flex flex-col w-full">
        <Header />
        <WebsitePopup />
        <CodePopup />
        <Dashboard />
      </main>
    </div>
  );
};

export default WebsitesPage;
