import {SafeAreaView, StyleSheet} from "react-native";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {ApolloProvider} from "@apollo/client";
import {client} from "./src/config/apollo";

import DetailScreen from "./src/screens/DetailScreen";
import ProductScreen from "./src/screens/ProductScreen";
import BotNavBar from "./src/components/BotNavBar";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={BotNavBar}
            options={{headerShown: false, statusBarHidden: true}}
          />
          <Stack.Screen
            name="Product"
            component={ProductScreen}
            options={{headerShown: false, statusBarHidden: true}}
          />
          <Stack.Screen
            name="Detail"
            component={DetailScreen}
            options={{headerShown: false, statusBarHidden: true}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
