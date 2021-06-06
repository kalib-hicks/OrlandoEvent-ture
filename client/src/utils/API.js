export const geoCode = (query) => {
    const regEx = / /g;
    console.log(query.address.replace(regEx, '%') + '%' + query.city.replace(regEx, '%') + '%' + query.state);
    return fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${query.address.replace(regEx, '%') + '%' + query.city.replace(regEx, '%') + '%' + query.state}&key${process.env.REACT_APP_GOOGLE_KEY}`);
};