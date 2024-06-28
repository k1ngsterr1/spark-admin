import { Button } from "@shared/ui/Buttons_Components/Buttons";
import { UserTab } from "@entities/Tabs_Components/UserTab/index";
import { useGetUsers } from "@shared/lib/hooks/Websites/useGetUsers";
import { EmptySvg } from "@assets/index";
import { useTranslations } from "next-intl";
import SkeletonLoader from "@shared/ui/Skeleton_Loader";
import Heading from "@shared/ui/Heading";

import styles from "./styles.module.scss";

interface UsersProps {
  users: [];
}

export const Users: React.FC<UsersProps> = ({ users }) => {
  const { isLoading, hasUsers } = useGetUsers();
  const t = useTranslations("Users");

  if (isLoading) {
    return (
      <div>
        <SkeletonLoader />
      </div>
    );
  }

  if (!hasUsers) {
    return (
      <>
        <div className={styles.container}>
          <div className="flex w-[90%] justify-between items-center m-auto ">
            <Heading text={t("heading")} />
            <Button
              text={t("add_user")}
              buttonType="regular--small"
              functionType="userPopup"
            />
          </div>
          <EmptySvg className={styles.container__image} />
          <p className={styles.container__already}>{t("no_users")}</p>
        </div>
      </>
    );
  }
  return (
    <div className={styles.users}>
      <div className="flex w-[90%] justify-between items-center m-auto ">
        <Heading text={t("heading")} />
        <Button
          text={t("add_user")}
          buttonType="regular--small"
          functionType="userPopup"
        />
      </div>
      {users?.websites.map((website) =>
        website.users.map((user) => (
          <UserTab
            key={user.id}
            username={user.username}
            email={user.email}
            role={user.UserToWebsite.role}
          />
        ))
      )}
    </div>
  );
};

export default Users;
