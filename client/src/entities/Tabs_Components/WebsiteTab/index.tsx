import {
  faLink,
  faEdit,
  faCalendar,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./styles.module.scss";
import { KebabMenu } from "@shared/ui/KebabMenu"; // Ensure this import path is correct

interface IWebsiteTabProps {
  name: string;
  href: string;
  url: string;
}

export const WebsiteTab: React.FC<IWebsiteTabProps> = ({ name, href, url }) => {
  return (
    <div className="flex flex-col">
      <div className={styles.sites_section}>
        <div className={styles.sites_section__name}>{name}</div>
        <div className={styles.sites_section__row}>
          <span className={styles.sites_section__row__click}>
            <FontAwesomeIcon
              icon={faEdit}
              className={styles.sites_section__row__item}
              size="lg"
              color="#FF5722"
            />
            Редактировать Сайт
          </span>
          <a href={href} className={styles.sites_section__row__hover}>
            <FontAwesomeIcon
              icon={faLink}
              className={styles.sites_section__row__item}
              size="lg"
              color="#FF5722"
            />
            {url}
          </a>
        </div>
      </div>
    </div>
  );
};

export default WebsiteTab;
