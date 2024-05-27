import React from 'react';
import { useSideBar } from '@shared/lib/hooks/useSideBar';
import { sidebarContent } from '@shared/lib/content/sideBarContent';
import { SideBarButton } from '@shared/ui/SideBarMenuButton';
import { BuildCard } from '@entities/Card_Components/BuildCard';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

import styles from './styles.module.scss';

export const SideBarMenu = () => {
  const { activeIndex, isBlockVisible, blocksContent, loading, handleButtonClick } = useSideBar();

  return (
    <div className={styles.container}>
      <aside className={`${styles.menu} dark:bg-dark-super relative`}>
        <nav className={styles.menu__nav}>
          <div className='pl-3 mt-2 mb-2 flex justify-between w-[95%] items-center'>
            <span className='mt-3 mb-3 flex flex-wrap w-[20%]'>Библиотека блоков</span>
            <button><FontAwesomeIcon icon={faXmark} className='text-3xl' /></button>
          </div>
          {sidebarContent.map((item, index) => (
            <SideBarButton
              key={index}
              text={item.text}
              onClick={() => handleButtonClick(index)}
              isActive={index === activeIndex}
            />
          ))}
        </nav>
      </aside>
      {isBlockVisible && (
        <div className={styles.menu__block}>
          {loading ? (
            <p>Loading...</p>
          ) : (
            blocksContent.map((item) => (
              <BuildCard key={item.id} title={item.title} description={item.description} image_url={item.image_url} />
            ))
          )}
        </div>
      )}
    </div>
  );
};
