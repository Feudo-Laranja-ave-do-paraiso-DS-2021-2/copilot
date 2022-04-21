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

export const IP = "http://192.168.1.15:8006";

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const deviceId = Application.androidId ?? "";
  const [id, setId] = useState();
  const [cadastrado, setCadastrado] = useState(false);
  const [initialPosition, setInitialPosition] = useState<[number, number]>([0, 0,]);

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(
        `${IP}/profiles/?id_dispositivo=${deviceId}`
      );
      const id = response.data[0].id;
      setId(id);
      const cadastrado = true;
      setCadastrado(cadastrado);
    };
    getData().catch(console.error);
  }, []);

  async function handlingData() {
    async function loadPosition() {
      const location = await Location.getCurrentPositionAsync({ accuracy: 3 });
      const { latitude, longitude } = location.coords;
      setInitialPosition([latitude, longitude]);
    }
    await loadPosition();

    async function putLocation() {
      const sendPatchRequest = async () => {
        try {
          const resp = await axios.patch(`${IP}/profiles/${id}/`, {
            latitude: initialPosition[0].toString(),
            longitude: initialPosition[1].toString(),
          });
        } catch (err) {
          console.error(err);
        }
      };
      await sendPatchRequest();
    }

    await putLocation();
  }

  if (cadastrado) {
    setTimeout(() => {
      handlingData();
    }, 8000);
  }

  return (
    <SafeAreaProvider>
      <Navigation colorScheme={colorScheme} />
      <StatusBar />
      <View style={styles.Bar}></View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  Bar: {
    paddingTop: 5,
  },
});
