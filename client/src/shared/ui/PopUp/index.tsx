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

const PopUp: React.FC<PopUpProps & { addUser: (user: { login: string, role: string, site: string }) => void }> = ({ isOpen, setIsOpen, addUser }) => {
    const [isSelectorVisible, setIsSelectorVisible] = useState(false);
    const [isSiteSelectorVisible, setIsSiteSelectorVisible] = useState(false);
    const [selectedRole, setSelectedRole] = useState('');
    const [login, setLogin] = useState("");
    const [site, setSite] = useState("");
    const [selectedSite, setSelectedSite] = useState('');

    const handleConfirm = () => {
        addUser({ login: login, role: selectedRole, site: selectedRole });
        setIsOpen(false);
    };

    const handleRoleInputClick = () => {
        setIsSelectorVisible(!isSelectorVisible);
        setIsSiteSelectorVisible(false);
    };


    const handleSiteInputClick = () => {
        setIsSiteSelectorVisible(!isSiteSelectorVisible);
        setIsSelectorVisible(false);
    };

    return (
        <div className={`${styles.popup} ${isOpen ? styles.show : ''}`}>
            {isOpen && (
                <div className={styles.popup__items}>
                    <div className={styles.popup__items__logo}>
                        <Logo />
                    </div>
                    <p className={styles.popup__items__text}>Меню передачи ролей</p>
                    <Input placeholder="Введите логин пользователя" value={login} onChange={(e) => setLogin(e.target.value)} />
                    <div className="">
                        <Input placeholder="Выберите роль" readOnly onClick={handleRoleInputClick} value={selectedRole} />
                        {isSelectorVisible && <Selector items={['Пользователь', 'Редактор', 'Админ']} onChange={(selectedRole) => setSelectedRole(selectedRole)} />}
                    </div>
                    <div className="">
                        <Input placeholder="Выберите сайт" readOnly onClick={handleSiteInputClick} value={selectedSite} />
                        {isSiteSelectorVisible && <Selector items={['Site 1', 'Site 2', 'Site 3']} onChange={(selectedSite) => setSelectedSite(selectedSite)} />}
                    </div>
                    <Button onClick={handleConfirm} text="Внести изменения" buttonType="regular--small" margin="mt-6" />
                </div>
            )}
        </div>
    );
};

export default PopUp;
