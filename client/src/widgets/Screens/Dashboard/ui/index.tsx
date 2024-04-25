import { Button } from "@shared/ui/Buttons_Components/Buttons";
import Heading from "@shared/ui/Heading/index";

import styles from "./styles.module.scss";

interface DashboardProps {
  sites: [];
}

export const Dashboard: React.FC<DashboardProps> = ({ sites }) => {
  console.log("zhopa");
  return (
    <div className="flex flex-col">
      <div className="flex w-[90%] justify-between items-center m-auto">
        <Heading text="Ваши Сайты" />
        <Button
          text="Добавить сайт"
          buttonType="regular--small"
          functionType="webPopup"
        />
      </div>
      <section className={styles.sites_section}>
        <ul>
          {sites.map((site) => (
            <li key={site.id}>
              <div>Name: {site.name}</div>
              <div>URL: {site.url}</div>
              <div>Owner: {site.owner}</div>
              <div>Users Count: {site.usersCount}</div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Dashboard;
