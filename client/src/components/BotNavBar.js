import React from "react";
import {BottomNavigation, PaperProvider} from "react-native-paper";
import HomeScreen from "../screens/HomeScreen";
import ProductScreen from "../screens/ProductScreen";
import DetailScreen from "../screens/DetailScreen";
import {Ionicons} from "@expo/vector-icons";
import {StyleSheet} from "react-native";

function BotNavBar({navigation}) {
  const [index, setIndex] = React.useState(0);

  const tabs = [
    {key: "home", title: "Home", icon: "home"},
    {key: "product", title: "Product", icon: "reorder-three"},
  ];

  const renderScene = BottomNavigation.SceneMap({
    home: () => <HomeScreen />,
    product: () => <ProductScreen />,
  });

  return (
    <PaperProvider>
      <BottomNavigation
        navigationState={{index, routes: tabs}}
        onIndexChange={setIndex}
        renderScene={renderScene}
        style={styles.BottomNavigationContainer}
        renderIcon={({route}) => (
          <Ionicons name={route.icon} size={20} color="black" />
        )}
      />
    </PaperProvider>
  );
}
const styles = StyleSheet.create({
  BottomNavigationContainer: {
    color: "red",
  },
});
export default BotNavBar;
