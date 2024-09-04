import styles from './ChallengeAuthMethod.module.scss'
import TextareaField from '../../../../components/textareaField/TextareaField'
import { UseFormRegister } from 'react-hook-form';
import { FormValues } from '../ChallengeUpload';

interface ChallengeAuthMethodProps{
    activeInput: string;
    handleFocus: (inputId:string) => void;
    handleBlur: () => void;
    register:UseFormRegister<FormValues>;
}

const ChallengeAuthMethod = ({activeInput, register, handleFocus, handleBlur}:ChallengeAuthMethodProps) => {
    return (
        <div className={styles.authMethod}>
            <TextareaField
                id='authMethod'
                label='인증방법'
                activeInput={activeInput}
                register={register}
                onFocus={handleFocus}
                onBlur={handleBlur}
                placeholderText='예) 오늘 날짜와 걸음 수가 적힌 만보기 캡쳐 화면 업로드 (날짜 필수! 시간 필수!)'
            />
            <div className={styles.authMethod_text}>
                <p>• 챌린지가 시작되면 인증 방법을 수정할 수 없습니다. 신중히 작성해주세요.</p>
                <p>• 참가자들이 혼란을 겪지 않도록 정확한 기준과 구체적인 인증방법을 적어주세요</p>
            </div>
        </div>
    )
}

export default ChallengeAuthMethod