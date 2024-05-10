import { KebabMenu } from "@shared/ui/KebabMenu/index";
import SkeletonLoader from "@shared/ui/Skeleton_Loader";

import styles from "./styles.module.scss";

interface UserTabProps {
  username: string;
  email: string;
  role: string;
  isLoading: boolean;
}

export const UserTab: React.FC<UserTabProps> = ({ username, email, role, isLoading }) => {

  if (isLoading) {
    return (
      <div className={`${styles.website_page_tab} dark:bg-dark-lighter`}>
        <div className="flex gap-2 items-center">
          <SkeletonLoader width="24px" height="24px" className="circle" />
          <div className="flex flex-col items-start ml-4">
            <SkeletonLoader width="160px" height="20px" className="text" />
            <SkeletonLoader width="120px" height="16px" className="mt-4" />
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <SkeletonLoader width="120px" height="40px" />
          <SkeletonLoader width="120px" height="40px" />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.container__rounder}></div>
      <div className={styles.container__items}>
        <KebabMenu />
        <div className={styles.container__user}>{username}</div>
        <div className={styles.container__email}>{email}</div>
        <div className={styles.container__role}>{role}</div>
      </div>
    </div>
  )
}

export default UserTab;
