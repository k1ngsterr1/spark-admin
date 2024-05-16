import { Button } from "@shared/ui/Buttons_Components/Buttons";
import styles from "./styles.module.scss";
import Heading from "@shared/ui/Heading";
import { UserTab } from "@entities/Tabs_Components/UserTab/index";
import { useGetUsers } from "@shared/lib/hooks/Websites/useGetUsers";
import SkeletonLoader from "@shared/ui/Skeleton_Loader";

import { EmptySvg } from "@assets/index";

interface UsersProps {
  users: [];
}

export const Users: React.FC<UsersProps> = ({ users }) => {
  const { isLoading, hasUsers } = useGetUsers();

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
            <Heading text="Управление пользователями" />
            <Button
              text="Добавить пользователя"
              buttonType="regular--small"
              functionType="userPopup"
            />
          </div>
          <EmptySvg className={styles.container__image} />
          <p className={styles.container__already}>
            У вас еще нет пользователей
          </p>
        </div>
      </>
    );
  }
  return (
    <div className={styles.users}>
      <div className="flex w-[90%] justify-between items-center m-auto ">
        <Heading text="Управление пользователями" />
        <Button
          text="Добавить пользователя"
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
