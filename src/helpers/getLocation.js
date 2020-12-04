import Geocode from "react-geocode";
import saveLocal from "./saveLocal";

Geocode.setApiKey("AIzaSyAHF5sU-uXkvCZ6L1ieDNBwOhERg3moCkg");
Geocode.enableDebug();

const getLocation = (saveAddress, statusSaveStreet, customSaveAddress) => {
	navigator.geolocation.getCurrentPosition(
		(position) => {
			Geocode.fromLatLng(position.coords.latitude, position.coords.longitude).then(
				(response) => {
					if (response.status === "OK") {
						const address = response.results[0].formatted_address;

						if (statusSaveStreet) {
							const streetName = response.results[0].address_components[2].short_name;
							saveLocal.saveToLocal("street", streetName);
						}

						if (customSaveAddress) {
							saveAddress(response.results);
						} else {
							saveAddress(address);
						}
					}
				},
				(error) => {
					console.error(error);
				}
			);
		},
		(error) => {
			console.log(error);
		}
	);
};

export default getLocation;
