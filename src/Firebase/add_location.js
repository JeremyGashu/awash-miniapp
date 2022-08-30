import axius from 'axios'

export const saveLocation = async (data) => {
    const BASE_URL = 'https://us-central1-location-picker-miniapp.cloudfunctions.net/app/location'

    const { name, woreda, region, city, hoseNo, latitude, longitude, type } = data
    axius.post(BASE_URL, { name, woreda, region, city, hoseNo, latitude, longitude, type },).then(val => { }).catch(err => {
        throw err
    })
}