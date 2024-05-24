import { useState } from 'react';
import { sidebarContent } from '@shared/lib/content/sideBarContent';

export const useSideBar = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [isBlockVisible, setIsBlockVisible] = useState(false);

  const handleButtonClick = index => {
    if (sidebarContent[index]) { 
      if (activeIndex === index) {
        setIsBlockVisible(!isBlockVisible);
      } else {
        setActiveIndex(index);
        setIsBlockVisible(true);
      }
    }
  };


  return {
    activeIndex,
    isBlockVisible,
    handleButtonClick,
  }
}
