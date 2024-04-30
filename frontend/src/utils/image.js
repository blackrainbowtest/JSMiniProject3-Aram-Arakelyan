export function resizeImage(file, maxWidth, maxHeight, callback) {
    const reader = new FileReader();

    reader.onload = (readerEvent) => {
        const image = new Image();
        image.onload = () => {
            const canvas = document.createElement('canvas');
            let width = image.width;
            let height = image.height;

            if (width > height) {
                if (width > maxWidth) {
                    height *= maxWidth / width;
                    width = maxWidth;
                }
            } else {
                if (height > maxHeight) {
                    width *= maxHeight / height;
                    height = maxHeight;
                }
            }

            canvas.width = width;
            canvas.height = height;

            const ctx = canvas.getContext('2d');
            ctx.drawImage(image, 0, 0, width, height);

            canvas.toBlob((blob) => {
                const resizedFile = new File([blob], file.name, {
                    type: file.type,
                    lastModified: Date.now(),
                });
                callback(resizedFile);
            }, file.type);
        };
        image.src = readerEvent.target.result;
    };

    reader.readAsDataURL(file);
};

export async function convertImageToBase64(imageFile) {
    if (typeof imageFile === "string") {
        return imageFile
    }
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = () => {
            resolve(reader.result.split(',')[1]);
        };

        reader.onerror = (error) => {
            reject(error);
        };

        reader.readAsDataURL(imageFile);
    });
}

export function decodeBase64ToImage(base64String) {
    return `data:image/jpeg;base64,${base64String}`;
};