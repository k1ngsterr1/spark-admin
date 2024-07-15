import Heading from "@shared/ui/Heading";
import { Button } from "@shared/ui/Buttons_Components/Buttons";
import { UserTab } from "@entities/Tabs_Components/UserTab/index";
import { useGetUsers } from "@shared/lib/hooks/Websites/useGetUsers";
import { EmptySvg } from "@assets/index";
import { useTranslations } from "next-intl";
import { BigLoader } from "@entities/BigLoader";
import { EmtpyScreen } from "@shared/ui/EmptyScreen";

import styles from "./styles.module.scss";

interface UsersProps {
  users: [];
}

export const Users: React.FC<UsersProps> = ({ users }) => {
  const { isLoading, hasUsers } = useGetUsers();
  const t = useTranslations("Users");

  if (isLoading) {
    return (
      <>
        <BigLoader />
      </>
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
          <EmtpyScreen text={t("You don't have any users")} />
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
