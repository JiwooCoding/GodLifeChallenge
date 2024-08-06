import React from 'react'

interface ConfirmedGiftModalProps {
    onConfirm: () => void;
    onClose: () => void;
}

const ConfirmedGiftModal = ({onConfirm, onClose}:ConfirmedGiftModalProps) => {
    return (
        <div>
            <h1>선물하기를 계속하시겠습니까?</h1>
            <div>
                <button onClick={onConfirm}>확인</button>
                <button onClick={onClose}>닫기</button>
            </div>
        </div>
    )
}

export default ConfirmedGiftModal