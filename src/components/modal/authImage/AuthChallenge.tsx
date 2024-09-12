import styles from './AuthChallenge.module.scss';
import ImageField from '../../imageField/ImageField';
import { useForm } from 'react-hook-form';
import { FormData } from '../../../page/AppliedChallengePage/appliedChallenge-list/appliedChallenge-button/authButton/AuthButton';
import InputField from '../../inputField/InputField';
import useActiveInput from '../../../hooks/useActiveInput';

interface AuthChallengeProps {
    uploadAuth: (data: FormData) => void;
    modalClose: () => void;
    title:string;
}

const AuthChallenge = ({ uploadAuth, modalClose, title }: AuthChallengeProps) => {
    
    const { control, handleSubmit, register } = useForm<FormData>();
    const { activeInput, handleFocus, handleBlur } = useActiveInput();

    return (
        <div className={styles.modal_overlay}>
            <div className={styles.modal_content} onClick={(e) => e.stopPropagation()}>
                <h1>[{title}]</h1>
                    <form onSubmit={handleSubmit(uploadAuth)}>
                        <ImageField
                            control={control}
                            multiple={false}
                            label="인증 이미지"
                            name="images"
                        />
                        <InputField
                            id='description'
                            label='인증 설명'
                            type='text'
                            placeholder='예) 매일 1만보 걷기'
                            activeInput={activeInput}
                            register={register}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                        />
                        <div className={styles.button_container}>
                            <button className={styles.cancle_button} type='button' onClick={modalClose}>취소</button>
                            <button className={styles.upload_button} type='submit'>업로드</button>
                        </div>
                    </form>
                </div>
            </div>
    );
}

export default AuthChallenge;
