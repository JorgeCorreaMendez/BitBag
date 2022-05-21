import { TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { auth } from "./src/services/firebase";
import { MaterialIcons } from "@expo/vector-icons";
import Login from "./src/screen/Login";
import Tracks from "./src/screen/Tracks";

import colors from "./src/constants/colors";
import size from "./src/constants/size";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TracksIcon = (
  <MaterialIcons name="music-note" size={29} color={colors.primary} />
);

export default function App() {
  const [user, setUser] = useState();

  useEffect(() => {
    auth.onAuthStateChanged((firebaseUser) => {
      setUser(firebaseUser);
    });
  }, [auth]);

  return (
    <NavigationContainer>
      {!user ? (
        <Tab.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: colors.background,
            },
            headerTitleStyle: {
              fontWeight: "bold",
            },
            tabBarStyle: {
              backgroundColor: colors.superficies,
              paddingTop: "1%",
              height: "9%",
            },
            tabBarLabelStyle: {
              fontSize: size.h4,
            },
            headerTintColor: colors.primary,
            headerTitleAlign: "center",
            tabBarActiveTintColor: colors.primary,
          }}
        >
          <Tab.Screen
            name="Tracks"
            component={Tracks}
            options={{
              title: "Pistas",
              tabBarIcon: () => TracksIcon,
              headerRight: () => (
                <TouchableOpacity style={{ paddingRight: 20 }}>
                  <MaterialIcons
                    name="add-circle-outline"
                    size={35}
                    color={colors.primary}
                  />
                </TouchableOpacity>
              ),
            }}
          />
        </Tab.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            options={{ headerShown: false }}
            component={Login}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
