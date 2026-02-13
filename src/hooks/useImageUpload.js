import { useState, useEffect, useRef, useCallback } from "react";

const useImageUpload = () => {
    const [avatar, setAvatar] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState(null);
    const [uploadError, setUploadError] = useState("");
    const fileInputRef = useRef(null);

    useEffect(() => {
        return () => {
            if(avatarPreview) URL.revokeObjectURL(avatarPreview);
        };
    }, [avatarPreview]);

    const handleFileChange = useCallback((file) => {
        if (!file) return;

        if(!['image/jpeg', 'image/png'].includes(file.type)) {
            setUploadError("Invalid file format. JPG or PNG only.");
            return;
        }
        if(file.size > 500 * 1024){
            setUploadError("File is too large. Max size is 500KB.")
            return;
        }
        setUploadError("");
        setAvatar(file);
        setAvatarPreview(URL.createObjectURL(file))
    }, []);

    const onFileSelect = (e) => handleFileChange(e.target.files[0]);

    const onDrop = (e) => {
        e.preventDefault();
        handleFileChange(e.dataTransfer.files[0]);
    };
    const removeImage = () => {
        setAvatar(null);
        setAvatarPreview(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };


  return {
    avatar,
    avatarPreview,
    uploadError,
    fileInputRef,
    onFileSelect,
    onDrop,
    removeImage,
    triggerFileInput: () => fileInputRef.current?.click(),
  }
}
export default useImageUpload