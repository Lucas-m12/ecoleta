import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import HomePage from "./pages/Home";
import DetailPage from "./pages/Detail";
import PointsPage from "./pages/Points";

const Stack = createStackNavigator();

const Routes: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        headerMode="none"
        screenOptions={{
          cardStyle: { backgroundColor: "#f0f0f5" },
        }}
      >
        <Stack.Screen name="Home" component={HomePage} />
        <Stack.Screen name="Points" component={PointsPage} />
        <Stack.Screen name="Detail" component={DetailPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
