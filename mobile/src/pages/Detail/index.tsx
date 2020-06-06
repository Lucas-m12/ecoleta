import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Linking } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Feather as Icon, FontAwesome } from "@expo/vector-icons";
import * as Mail from "expo-mail-composer";

import api from "../../services/api";

import {
  MainContainer,
  Container,
  PointImage,
  PointName,
  PointItems,
  Address,
  AddressContent,
  AddressTitle,
  Button,
  ButtonText,
  Footer,
} from "./styles";

interface RouteParams {
  pointId: number;
}

interface Data {
  point: {
    id: number;
    image: string;
    image_url: string;
    name: string;
    email: string;
    whatsapp: string;
    city: string;
    uf: string;
  };
  items: {
    title: string;
  }[];
}

const Detail: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const { pointId } = route.params as RouteParams;

  const [data, setData] = useState<Data>({} as Data);

  useEffect(() => {
    async function loadPoint() {
      const response = await api.get(`/points/${pointId}`);
      setData(response.data);
    }

    loadPoint();
  }, []);

  function handleNavigateBack() {
    navigation.goBack();
  }

  function handleMailCompose() {
    Mail.composeAsync({
      subject: "Interesse na coleta de resíduos",
      recipients: [data.point.email],
    });
  }

  function handleWhatsapp() {
    Linking.openURL(
      `whatsapp://send?phone=${data.point.whatsapp}&text=Tenho interesse sobre coleta de resíduos`
    );
  }

  if (!data.point) return null;

  return (
    <Container>
      <MainContainer>
        <TouchableOpacity onPress={handleNavigateBack}>
          <Icon name="arrow-left" size={20} color="#34CB79" />
        </TouchableOpacity>
        <PointImage
          style={{ resizeMode: "cover" }}
          source={{
            uri: data.point.image_url,
          }}
        />
        <PointName>{data.point.name}</PointName>
        <PointItems>
          {data.items.map((item) => item.title).join(", ")}
        </PointItems>

        <Address>
          <AddressTitle>Endereço</AddressTitle>
          <AddressContent>{`${data.point.city} - ${data.point.uf}`}</AddressContent>
        </Address>
      </MainContainer>

      <Footer>
        <Button onPress={handleWhatsapp}>
          <FontAwesome name="whatsapp" size={20} color="#FFF" />
          <ButtonText>Whatsapp</ButtonText>
        </Button>
        <Button onPress={handleMailCompose}>
          <Icon name="mail" size={20} color="#FFF" />
          <ButtonText>Email</ButtonText>
        </Button>
      </Footer>
    </Container>
  );
};

export default Detail;
