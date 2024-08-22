import { createContext, ReactNode, useContext, useState } from 'react'

interface ModalContextProps {
    isOpen: boolean;
    openModal: () => void;
    closeModal: () => void;
}

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

const useModalContext = ():ModalContextProps => {

    const context = useContext(ModalContext);
    if(!context){
        throw new Error('useModalContext는 ModalProvider와 함께 사용되어야 합니다!');
    }
    return context;
}

interface ModalProviderProps {
    children: ReactNode;
  }

    const ModalProvider = ({children}:ModalProviderProps) => {
        const [isOpen, setIsOpen] = useState(false);
        const openModal = () => setIsOpen(true);
        const closeModal = () => setIsOpen(false);

        return (
            <ModalContext.Provider value={{isOpen, openModal, closeModal}}>
                {children}
            </ModalContext.Provider>
        )
    }


export {ModalProvider, useModalContext};