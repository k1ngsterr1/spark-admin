import React from 'react';
import { Link } from 'react-scroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import styles from './styles.module.scss';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

interface LinkProps {
  text: string;
  to: string;
  href: string;
  linkTextType: 'header' | 'footer' ;
  onClick?: () => void;
  icon?: IconDefinition | undefined;
}

const LinkText: React.FC<LinkProps> = ({ text, to, href, linkTextType, icon, onClick }) => {
  const handleClick = (event: React.MouseEvent) => {
    event.preventDefault();
    if (window.location.pathname !== '/') {
      window.location.href = '/';
    } else if (onClick) {
      onClick();
    }
  };

  const linkTextClass = `${styles.linktext} ${styles[`link--${linkTextType}`]}`;

  return (
    <Link className={linkTextClass} to={to} href={href} smooth onClick={handleClick}>
      {icon && <FontAwesomeIcon className={styles.icon} icon={icon}/>}
      {text}
    </Link>
  );
};

export default LinkText;
