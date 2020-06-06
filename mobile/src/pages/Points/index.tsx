import React, { useState, useEffect } from "react";
import { TouchableOpacity, ScrollView, Alert } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Feather as Icon } from "@expo/vector-icons";
import { SvgUri } from "react-native-svg";
import * as Location from "expo-location";

import api from "../../services/api";

import {
  Container,
  Title,
  Description,
  Map,
  MapContainer,
  MapMaker,
  MapMakerImage,
  MapMakerTitle,
  MapMarkerContainer,
  ItemsContainer,
  Item,
  ItemTitle,
} from "./styles";

interface Items {
  id: number;
  title: string;
  image_url: string;
}

interface Points {
  id: number;
  image: string;
  image_url: string;
  name: string;
  latitude: number;
  longitude: number;
}

interface RouteParams {
  uf: string;
  city: string;
}

const Points: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const { uf, city } = route.params as RouteParams;

  const [points, setPoints] = useState<Points[]>([]);
  const [items, setItems] = useState<Items[]>([]);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [initialPosition, setInitialPosition] = useState<[number, number]>([
    0,
    0,
  ]);

  useEffect(() => {
    async function loadPosition() {
      const { status } = await Location.requestPermissionsAsync();

      if (status !== "granted") {
        Alert.alert(
          "Oooops",
          "Precisamos de permissão para acessar sua localização"
        );
        return;
      }

      const location = await Location.getCurrentPositionAsync();

      const { latitude, longitude } = location.coords;

      setInitialPosition([latitude, longitude]);
    }

    loadPosition();
  }, []);

  useEffect(() => {
    async function loadPoints() {
      const response = await api.get("/items");

      setItems(response.data);
    }

    loadPoints();
  }, []);

  useEffect(() => {
    async function loadPoints() {
      const response = await api.get("/points", {
        params: {
          city,
          uf,
          items: selectedItems,
        },
      });

      setPoints(response.data);
    }

    loadPoints();
  }, [selectedItems]);

  function handleNavigateBack() {
    navigation.goBack();
  }

  function handleNavigateToDetail(pointId: number) {
    navigation.navigate("Detail", { pointId });
  }

  function handleSelectItem(id: number) {
    const alreadySelected = selectedItems.findIndex((item) => item === id);

    if (alreadySelected >= 0) {
      const filteredItems = selectedItems.filter((item) => item !== id);

      setSelectedItems(filteredItems);
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  }

  return (
    <>
      <Container>
        <TouchableOpacity onPress={handleNavigateBack}>
          <Icon name="arrow-left" size={20} color="#34CB79" />
        </TouchableOpacity>

        <Title>Bem vindo.</Title>
        <Description>Encontre no mapa um ponto de coleta.</Description>
        {initialPosition[0] !== 0 && (
          <MapContainer>
            <Map
              loadingEnabled={initialPosition[0] === 0}
              initialRegion={{
                latitude: initialPosition[0],
                longitude: initialPosition[1],
                latitudeDelta: 0.014,
                longitudeDelta: 0.014,
              }}
            >
              {points.map((point) => (
                <MapMaker
                  key={String(point.id)}
                  coordinate={{
                    latitude: point.latitude,
                    longitude: point.longitude,
                  }}
                  onPress={() => handleNavigateToDetail(point.id)}
                >
                  <MapMarkerContainer>
                    <MapMakerImage
                      style={{ resizeMode: "cover" }}
                      source={{
                        uri: point.image_url,
                      }}
                    />
                    <MapMakerTitle>{point.name}</MapMakerTitle>
                  </MapMarkerContainer>
                </MapMaker>
              ))}
            </Map>
          </MapContainer>
        )}
      </Container>
      <ItemsContainer>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20 }}
        >
          {items.map((item) => (
            <Item
              style={
                selectedItems.includes(item.id)
                  ? {
                      borderColor: "#34cb79",
                      borderWidth: 2,
                    }
                  : {}
              }
              onPress={() => {
                handleSelectItem(item.id);
              }}
              activeOpacity={0.6}
              key={String(item.id)}
            >
              <SvgUri width={42} height={42} uri={item.image_url} />
              <ItemTitle>{item.title}</ItemTitle>
            </Item>
          ))}
        </ScrollView>
      </ItemsContainer>
    </>
  );
};

export default Points;
