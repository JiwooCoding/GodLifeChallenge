import React from 'react';
import { Control, Controller } from 'react-hook-form';

type ImageUploadProps = {
    control: Control;
    preview: string;
    handlePhotoChange: (files: FileList | null) => void;
};

const ImageUpload: React.FC<ImageUploadProps> = ({ control, preview, handlePhotoChange }) => {
    return (
        <div className='product-items'>
            <div>
                <label htmlFor="productPhoto">상품 사진</label>
                <div className='flex gap-8'>
                    <img src={preview} alt="미리보기" style={{ marginTop: '0px', maxWidth: '100px' }} />
                    <div>
                        <Controller
                            name="productPhoto"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                                <input
                                    type="file"
                                    name='file'
                                    id='file'
                                    accept="image/*"
                                    multiple
                                    onChange={(e) => {
                                        field.onChange(e.target.files);
                                        handlePhotoChange(e.target.files);
                                    }}
                                />
                            )}
                        />
                        <div className='mt-5 text-gray-500 text-[13px]'>
                            <p>JPG, GIF, PNG</p>
                            <p>권장 사이즈 128px, 최대 250KB</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ImageUpload;
