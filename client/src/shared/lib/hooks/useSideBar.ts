import { useState } from 'react';
import { sidebarContent } from '@shared/lib/content/sideBarContent';
import { useFetchBlocks } from '@shared/lib/hooks/useGetBlocks'; // Adjust the path as necessary

export const useSideBar = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [isBlockVisible, setIsBlockVisible] = useState(false);

  const activeContentType = activeIndex !== null ? sidebarContent[activeIndex].type : null;
  const { data: blocksContent, loading } = useFetchBlocks(activeContentType);

  const handleButtonClick = (index: number) => {
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
    blocksContent,
    loading,
    handleButtonClick,
  };
}
