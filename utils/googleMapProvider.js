/**
 * Gets the distance(as Crows flies) of two global coordinates, 
 * using the longitude and latitude
 * @param {Float32Array} lat1 
 * @param {Float32Array} lon1 
 * @param {Float32Array} lat2 
 * @param {Float32Array} lon2 
 * @param {String} unit -'KM' for Kilometre, 'miles' for miles, 'm' for metres
 * @returns {String}the distance in corresponding unit or in Kilometres
 */
 module.exports = (lat1, lon1, lat2, lon2, unit = 'KM') => {
    const EarthRadius = 6371; // Radius of the earth in km
    const dLat = deg2rad(Math.abs(lat2 - lat1));  // deg2rad below
    const dLon = deg2rad(Math.abs(lon2 - lon1));
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2)
        ;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = EarthRadius * c; // Distance in km

    //Return the unit equivalence
    return convertDistance(d, unit); //convertDistance below
};

/**
 * Converts degrees to radians
 * @param {Number} deg 
 * @returns the corresponding radian value
 */
const deg2rad = deg => deg * (Math.PI / 180);

const unitObject = {
    'KM': 1,
    'miles': 0.621371192237334,
    'm': 1000
}

/**
 * Converts the distance from KM to the given unit 
 * @param {Number} distance 
 * @param {String} unit 
 */
const convertDistance = (distance, unit = 'KM') => `${Math.floor(distance * unitObject[unit])} ${unit}`;