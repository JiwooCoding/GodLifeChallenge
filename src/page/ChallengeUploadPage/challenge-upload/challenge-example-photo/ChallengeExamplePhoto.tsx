import { Control, FieldValues } from 'react-hook-form';
import styles from './ChallengeExamplePhoto.module.scss'
import success from '../../../../image/challenge/successImage.png'
import fail from '../../../../image/challenge/failImage.png'
import ExampleImageField from '../../../../components/ExampleImageField/ExampleImageField';

interface ChallengeExamplePhotoProps<T extends FieldValues> {
    control: Control<T>;
    handlePhotoChange?: (files: FileList | null) => void;
    label: string;
}

const ChallengeExamplePhoto = <T extends FieldValues>({
    control,
    handlePhotoChange,
    label,
}: ChallengeExamplePhotoProps<T>) => {

    return (
        <div className={styles.photo_container}>
            <label htmlFor={label}>
                {label}<span style={{color:'red'}}>*</span>
            </label>
            <div className={styles.photobox}>
                <ExampleImageField
                    name='successImage'
                    handlePhotoChange={handlePhotoChange}
                    control={control}
                    initialPreview={success}
                />
                <ExampleImageField
                    name='failImage'
                    handlePhotoChange={handlePhotoChange}
                    control={control}
                    initialPreview={fail}
                />
            </div>
        </div>
    );
};

export default ChallengeExamplePhoto;
