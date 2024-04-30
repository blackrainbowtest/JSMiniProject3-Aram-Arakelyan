const defaultCenter = {
    lat: 40.177,
    lng: 44.503,
};

export const getBrowserLocation = () => {
    return new Promise((reslove, reject) => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    const { latitude: lat, longitude: lng } = pos.coords;
                    reslove({ lat, lng })
                },
                () => {
                    reject(defaultCenter)
                }
            )
        } else {
            reject(defaultCenter)
        }
    })
}