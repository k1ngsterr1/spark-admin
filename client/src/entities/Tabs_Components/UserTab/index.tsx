import styles from "./styles.module.scss";

interface UserTabProps {
  users: [];
}

export const UserTab: React.FC<UserTabProps> = ({ users }) => {

  return (
    <div>
      {users.map((user) => (
        <section key={user.id}>
          <div>Name: {user.username}</div>
          <div>Owner: {user.email}</div>
        </section>
      ))}
    </div>
  );
};

export default UserTab;