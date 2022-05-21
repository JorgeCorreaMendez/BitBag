import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./src/screen/Login";
import Tracks from "./src/screen/Tracks";

import colors from "./src/constants/colors";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTintColor: colors.primary,
          headerTitleAlign: "center",
        }}
      >
        <Stack.Screen
          name="Login"
          options={{ headerShown: false }}
          component={Login}
        />
        <Stack.Screen
          name="Tracks"
          component={Tracks}
          options={{
            title: "Pistas",
            headerBackVisible: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
