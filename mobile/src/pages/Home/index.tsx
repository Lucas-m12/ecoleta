import React, { useState } from "react";
import { Feather as Icon } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { KeyboardAvoidingView, Platform, View } from "react-native";

import {
  Container,
  Logo,
  Main,
  Title,
  Description,
  Footer,
  Button,
  ButtonIcon,
  ButtonText,
  Input,
} from "./styles";

const Home: React.FC = () => {
  const navigation = useNavigation();

  const [uf, setUf] = useState("");
  const [city, setCity] = useState("");

  function handleNavigateToMap() {
    navigation.navigate("Points", {
      uf,
      city,
    });
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <Container
        source={require("../../assets/home-background.png")}
        imageStyle={{ width: 274, height: 368 }}
      >
        <Main>
          <Logo source={require("../../assets/logo.png")} />
          <View>
            <Title>Seu marketplace de coleta de resíduos</Title>
            <Description>
              Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente
            </Description>
          </View>
        </Main>

        <Footer>
          <Input
            placeholder="Digite a UF"
            autoCapitalize="characters"
            maxLength={2}
            autoCorrect={false}
            value={uf}
            onChangeText={setUf}
          />
          <Input
            placeholder="Digite a cidade"
            autoCorrect={false}
            value={city}
            onChangeText={setCity}
          />

          <Button onPress={handleNavigateToMap}>
            <ButtonIcon>
              <Icon name="arrow-right" color="#FFF" size={24} />
            </ButtonIcon>
            <ButtonText>Entrar</ButtonText>
          </Button>
        </Footer>
      </Container>
    </KeyboardAvoidingView>
  );
};

export default Home;
