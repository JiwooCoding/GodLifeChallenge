import { createContext, useContext, useState } from 'react'
import Modal from '../components/modal/Modal';

interface ModalContextProps {
    isOpen: boolean;
    openModal: () => void;
    closeModal: () => void;
}

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

interface ModalProviderProps {
    children: React.ReactNode;
}

const ModalProvider = ({children}:ModalProviderProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    return (
        <ModalContext.Provider value={{isOpen, openModal, closeModal}}>
            {children}
            {isOpen && <Modal.Dimmed/>}
        </ModalContext.Provider>
    )
}

export const useModal = ():ModalContextProps => {
    const context = useContext(ModalContext);
    if(!context){
        throw new Error('모달 에러')
    }
    return context;
}

export default ModalProvider