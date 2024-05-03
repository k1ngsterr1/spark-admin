import { Button } from "@shared/ui/Buttons_Components/Buttons";
import styles from "./styles.module.scss";
import Heading from "@shared/ui/Heading";
import { KebabMenu } from "@shared/ui/KebabMenu/index";
import { UserTab } from "@entities/Tabs_Components/UserTab/index";

interface UsersProps {
  users: [];
}

export const Users: React.FC<UsersProps> = ({ users }) => {
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
      {/* <div className={styles.users__box}> */}
      <UserTab users={users} />
      {/* <div className={styles.user_container}>
          <div className={styles.user_container__rounder}></div>
          <div className={styles.user_container__items}>
            <p className={styles.user_container__user}>UserName</p>
            <span className="text-primary">Role</span>
          </div>
          <KebabMenu />
        </div> */}
      {/* </div> */}
    </div>
  );
};

export default Users;
