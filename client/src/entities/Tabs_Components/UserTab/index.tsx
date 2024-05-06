import { KebabMenu } from "@shared/ui/KebabMenu/index";

import styles from "./styles.module.scss";

interface UserTabProps {
  username: string;
  email: string;
  role: string;
}

export const UserTab: React.FC<UserTabProps> = ({ username, email, role }) => {
  return (
    <div className={styles.container}>
          <div className={styles.container__rounder}></div>
        <div className={styles.container__items}>
          <KebabMenu/>
          <div className={styles.container__user}>{username}</div>
          <div className={styles.container__email}>{email}</div>
          <div className={styles.container__role}>{role}</div>
        </div>
      </div>
  )
}
      
export default UserTab;
