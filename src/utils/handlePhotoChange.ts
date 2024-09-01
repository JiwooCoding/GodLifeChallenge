export const handlePhotoChange = (
    files: FileList | null,
    setPreview: (preview: string) => void,
    noImage: string
) => {
    if (files && files.length > 0) {
        const file = files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
    } else {
        setPreview(noImage);
    }
};