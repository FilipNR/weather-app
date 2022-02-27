const reducer = (state, action) => {
    if (action.type === 'CITY') {
        return { ...state, city: action.payload.city, loading: false }
    }
    if (action.type === 'SET_CORDS') {
        return { ...state, lat: action.payload.lat, lon: action.payload.lon }
    }
    if (action.type === 'SET_INFO') {
        return { ...state, data: action.payload.data }
    }
    if (action.type === 'GET_POLLUTION') {
        return { ...state, data_pollution: action.payload.pollution }
    }
}

export default reducer;