import { Header } from "@features/Header";
import { Menu } from "@features/Menu";
import { Dashboard } from "@widgets/Screens/Dashboard/ui";
import { WebsitePopup } from "@entities/WebsitePopup";
import { useDispatch, useSelector } from "react-redux";
import { GetServerSideProps } from "next";
import { RootState } from "@redux/store";
import { WebsiteItem } from "@shared/lib/types";
import "@fortawesome/fontawesome-svg-core/styles.css";

interface DashboardProps {
  websites: WebsiteItem[];
}

const WebsitesPage: React.FC<DashboardProps> = ({ websites }) => {
  return (
    <div className="flex">
      <Menu />
      <main className="flex flex-col w-full">
        <WebsitePopup />
        <Header />
        <Dashboard />
      </main>
    </div>
  );
};

export default WebsitesPage;
