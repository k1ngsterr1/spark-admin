<<<<<<< HEAD
'use client'
import React, { useState } from "react";
import { SearchBar } from "@features/SearchBar";
import { Button } from "@shared/ui/Buttons";
import PopUp from "@shared/ui/PopUp";

import styles from '../styles/styles.module.scss'

export const Users = () => {
    const [isPopUpOpen, setIsPopUpOpen] = useState(false);

    const handleOpenPopUp = () => {
        setIsPopUpOpen(true);
    };
    return <div className={styles.users}>
        <div className='flex justify-between items-center mt-4'>
            <p className={styles.users__text}>
                Управление пользователями
            </p>
            <Button onClick={handleOpenPopUp} text="Добавить пользователя" buttonType="regular--small" />
            <PopUp isOpen={isPopUpOpen} setIsOpen={setIsPopUpOpen} />
        </div>
        <div className={styles.users__box}>
            <SearchBar />
        </div>
    </div>;
};

export default Users
=======
import React from "react";

export const Users = () => {
  return <div></div>;
};
>>>>>>> 678f273510fdb90c540316657b244b89a60eb16b
