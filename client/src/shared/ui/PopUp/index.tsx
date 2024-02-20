import React, { useState } from "react";
import { Button } from "@shared/ui/Buttons";
import Input from '../Inputs/DefaultInport/index';
import { Selector } from "../Selector";

import styles from './styles.module.scss';
import Logo from '../../../assets/spark_product_logo.svg';

interface PopUpProps {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const PopUp: React.FC<PopUpProps> = ({ isOpen, setIsOpen }) => {
    const [isSelectorVisible, setIsSelectorVisible] = useState(false);

    const handleInputClick = () => {
        setIsSelectorVisible(!isSelectorVisible);
    };

    const handleRoleChange = (selectedRole: string) => {
        console.log('Selected role:', selectedRole);
        setIsSelectorVisible(false);
    };

    const handleClosePopUp = () => {
        setIsOpen(false);
    };

    return (
        <div className={`${styles.popup} ${isOpen ? styles.show : ''}`}>
            {isOpen && (
                <div className={styles.popup__items}>
                    <div className={styles.popup__items__logo}>
                        <Logo />
                    </div>
                    <p className={styles.popup__items__text}>Меню передачи ролей</p>
                    <Input placeholder="Введите логин пользователя" />
                    <Input placeholder="Выберите роль" readOnly onClick={handleInputClick} />
                    {isSelectorVisible && <Selector onChange={handleRoleChange} />}
                    <Button onClick={handleClosePopUp} text="Закрыть" buttonType="regular--small" margin="mt-8" />
                </div>
            )}
        </div>
    );
};

export default PopUp;
