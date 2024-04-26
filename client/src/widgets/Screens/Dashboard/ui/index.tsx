import { Button } from "@shared/ui/Buttons_Components/Buttons";
import Heading from "@shared/ui/Heading/index";
import { faLink, faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "./styles.module.scss";

interface DashboardProps {
  sites: [];
}

export const Dashboard: React.FC<DashboardProps> = ({ sites }) => {
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
            <div key={site.id}>
              <span className={styles.sites_section__name}>{site.name}</span>
              <div className={styles.sites_section__row}>
                <span className={styles.sites_section__row__click}>
                  <FontAwesomeIcon
                    icon={faEdit}
                    className={styles.sites_section__row__item}
                    size="md"
                    color="#FF5722"
                  />
                  Редактировать Сайт
                </span>
                <a href={site.url} className={styles.sites_section__row__hover}>
                  <FontAwesomeIcon
                    icon={faLink}
                    className={styles.sites_section__row__item}
                    size="md"
                    color="#FF5722"
                  />
                  {site.url}
                </a>
              </div>
            </div>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Dashboard;
