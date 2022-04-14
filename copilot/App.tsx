import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { View, StyleSheet } from "react-native";
import useCachedResources from "./src/hooks/useCachedResources";
import useColorScheme from "./src/hooks/useColorScheme";
import Navigation from "./src/Navigation";
import React, { useEffect, useState } from "react";
import axios from "axios";
import * as Application from "expo-application";
import * as Location from "expo-location";

export default function App() {
	const isLoadingComplete = useCachedResources();
	const colorScheme = useColorScheme();
	const deviceId = Application.androidId ?? "";
	const [id, setId] = useState();
	const [initialPosition, setInitialPosition] =
	    useState<[number, number]>([0, 0]);
  	let cadastrado = new Boolean(false);

	var options = {
		accuracy:3,
		distanceInterval:15,
		mayShowUserSettingsDialog:true,
		timeInterval: 5000,
	};

	useEffect(() => {
		const GetData = async () => {
			const response = await axios.get(
				`http://192.168.1.15:8006/profiles/?id_dispositivo=${deviceId}`
			);
			const id = response.data[0].id;
			setId(id);
		};

		GetData().catch(console.error);
	}, []);

	if (cadastrado) {
		console.log('Entrou no if');
		async function loadPosition() {
			const location = await Location.getCurrentPositionAsync(options);
			const { latitude, longitude } = location.coords;
			setInitialPosition([latitude, longitude]);
      /////////
		};
      loadPosition();
		async function putLocation() {
			const sendPatchRequest = async () => {
				try {
					const resp = await axios.patch(
						`http://192.168.1.15:8006/profiles/${id}/`, {
                            latitude: initialPosition[0].toString(),
                            longitude: initialPosition[1].toString(),
                        }
					);
					console.log(resp.data);
				}catch(err){
					// Handle Error Here
					console.error(err);
				};
			};
			await sendPatchRequest();
		};
		putLocation();
	};

	return (
		<SafeAreaProvider>
			<Navigation colorScheme={colorScheme} />
			<StatusBar />
			<View style={styles.Bar}></View>
		</SafeAreaProvider>
	);
};

const styles = StyleSheet.create({
	Bar: {
		paddingTop: 5,
	},
});
