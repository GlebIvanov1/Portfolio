import { useSelector } from "react-redux";

export const useIsLogin = () => {
    const email = useSelector((state: any) => state.user.email);

    if(email){
        return true;
    };

    return false;
};

export const useOptimizeImage = async (file: any) => {
    return new Promise((resolve) => {
        const img = new Image();
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        img.onload = () => {
            const MAX_SIZE = 800;
            let width = img.width;
            let height = img.height;

            if(width > MAX_SIZE || height > MAX_SIZE) {
                const ratio = Math.min(MAX_SIZE / width, MAX_SIZE / height);
                width = Math.floor(width * ratio);
                height = Math.floor(height * ratio);
            }

            canvas.width = width;
            canvas.height = height;

            ctx?.drawImage(img, 0, 0, width, height);

            resolve(canvas.toDataURL('image/jpeg', 0.7));
        };

        img.src = URL.createObjectURL(file);
    });
};