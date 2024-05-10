import { Button } from "@shared/ui/Buttons_Components/Buttons";
import styles from "./styles.module.scss";
import Heading from "@shared/ui/Heading";
import { UserTab } from "@entities/Tabs_Components/UserTab/index";

interface UsersProps {
  users: [];
  isLoading: boolean
}

export const Users: React.FC<UsersProps> = ({ users, isLoading }) => {
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
      {users?.websites.map(website =>
        website.users.map(user => (
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
