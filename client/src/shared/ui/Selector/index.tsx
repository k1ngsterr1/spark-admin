import React, { useState } from 'react';

interface SelectorProps {
    onChange: (selectedOption: string) => void;
}

export const Selector: React.FC<SelectorProps> = ({ onChange }) => {
    const [isOpen, setIsOpen] = useState(false);

    const roles = ['Role 1', 'Role 2', 'Role 3'];


    const handleOptionClick = (selectedOption: string) => {
        onChange(selectedOption);
        setIsOpen(false);
    };

    return (
        <div>
            {isOpen && (
                <div>
                    {roles.map((role, index) => (
                        <div key={index} onClick={() => handleOptionClick(role)}>
                            {role}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
