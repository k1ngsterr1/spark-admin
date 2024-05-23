import React, { useState } from 'react';
import { sidebarContent } from '@shared/lib/hooks/content/sideBarContent';
import { SideBarButton } from '@shared/ui/SideBarMenuButton';
import {BlocksList} from '@shared/ui/BlocksList'; // Import Popup Component

import styles from './styles.module.scss';

export const SideBarMenu = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false); 

  const handleButtonClick = index => {
    if (sidebarContent[index].content) {
      setActiveIndex(index);
      setIsPopupOpen(true); 
    }
  };

  const handleClose = () => {
    setIsPopupOpen(false);
  };

  return (
    <aside className={`${styles.menu} dark:bg-dark-super relative`}>
      <nav className={styles.menu__nav}>
        {sidebarContent.map((item, index) => (
          <SideBarButton
            key={index}
            text={item.text}
            isOpen={activeIndex === index}
            onClick={() => handleButtonClick(index)}
            isActive={index === activeIndex}
          />
        ))}
      </nav>
      {isPopupOpen && activeIndex !== null && (
        <BlocksList onClose={handleClose}>
          {sidebarContent[activeIndex].content()}
        </BlocksList>
      )}
    </aside>
  );
};
