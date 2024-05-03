import styles from "./styles.module.scss";

interface UserTabProps {
  users: [];
}

export const UserTab: React.FC<UserTabProps> = ({ users }) => {
  return (
    <div>
      {users.map((user) => (
        <div key={user.id}>
          <div>{user.username}</div>
          <div>{user.email}</div>
          <div>{user.role}</div>
        </div>
      ))}
    </div>
  );
};

export default UserTab;
