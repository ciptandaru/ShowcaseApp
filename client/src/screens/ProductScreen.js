import React from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {GET_PRODUCTS} from "../config/query";
import {useQuery} from "@apollo/client";
import {useCurrency} from "../../hooks/useCurrency";

const ProductScreen = () => {
  const navigation = useNavigation();

  const toDetail = (slug) => {
    navigation.navigate("Detail", {slug});
  };
  const {loading, error, data} = useQuery(GET_PRODUCTS);
  if (loading) {
    return (
      <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
        <Text>Error loading Product.</Text>
      </View>
    );
  }
  return (
    <ScrollView>
      <View style={styles.containerCard}>
        <View style={styles.content}>
          {data?.getProducts.map((product) => (
            <View key={product?.id} style={styles.cards}>
              <TouchableOpacity
                onPress={() => {
                  toDetail(product?.slug);
                }}
              >
                <Image source={{uri: product?.mainImg}} style={styles.image} />
              </TouchableOpacity>
              <Text style={styles.title}>{product?.name}</Text>
              <Text style={styles.title}>{useCurrency(product?.price)}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    marginHorizontal: 10,
    marginTop: 20,
    backgroundColor: "white",
  },
  containerCard: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 10,
  },

  content: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 10,
  },

  cards: {
    width: "48%",
    backgroundColor: "#f0f0f0",
    padding: 20,
    marginBottom: 10,
  },
  image: {
    width: "100%",
    height: 200,
    marginBottom: 10,
  },
  title: {
    marginTop: 0,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default ProductScreen;
