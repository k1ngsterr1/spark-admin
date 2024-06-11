import Link from "next/link";
import styles from "./styles.module.scss";

interface MiniTextProps {
  margin?: string;
  href: string;
  text: string;
  linktext: string;
  onClick?: () => void;
}

const MiniText: React.FC<MiniTextProps> = ({
  margin,
  href,
  text,
  linktext,
  onClick,
}) => {
  return (
    <div className={styles.mini_text} style={{ margin }}>
      <span className="dark:text-white">
        {text} {""}
      </span>
      <Link href={href} className={styles.orange_text} onClick={onClick}>
        {""}
        {linktext}
      </Link>
    </div>
  );
};

export default MiniText;
