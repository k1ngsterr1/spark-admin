import Link from "next/link";
import styles from "./styles.module.scss";

interface MiniTextProps {
  margin?: string;
  href: string;
  text: string;
  linktext: string;
}

const MiniText: React.FC<MiniTextProps> = ({
  margin,
  href,
  text,
  linktext,
}) => {
  return (
    <div className={styles.mini_text} style={{ margin }}>
      <span>{text} </span>
      <Link href={href} className={styles.orange_text}>
        {linktext}
      </Link>
    </div>
  );
};

export default MiniText;
