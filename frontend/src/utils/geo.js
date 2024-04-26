const defaultCenter = {
    lat: 51.509865,
    lng: -0.118092,
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