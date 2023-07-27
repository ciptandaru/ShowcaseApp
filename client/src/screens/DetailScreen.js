import React, {useEffect, useState} from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  ActivityIndicator,
} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {AntDesign} from "@expo/vector-icons";
import {TouchableOpacity} from "react-native";
import {useQuery} from "@apollo/client";
import {GET_ONE_PRODUCT} from "../config/query";
import {useCurrency} from "../../hooks/useCurrency";

export default function DetailScreen({navigation, route}) {
  const [baju, setbaju] = useState();
  const {slug} = route.params;
  const {loading, error, data} = useQuery(GET_ONE_PRODUCT, {variables: {slug}});
  useEffect(() => {
    setbaju(data);
  }, []);
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
        <Text>Error loading Product.{error}</Text>
      </View>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.sectionContainer}>
        <ImageBackground
          source={{uri: data.getProduct.mainImg}}
          style={{
            width: "100%",
            height: 300,
            resizeMode: "center",
          }}
        >
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <AntDesign name="arrowleft" size={24} style={styles.backButton} />
            </TouchableOpacity>
            <AntDesign name="heart" size={24} style={styles.heartIcon} />
          </View>
        </ImageBackground>
        <View style={styles.contentContainer}>
          <Text style={styles.sectionTitle}>{data.getProduct.name}</Text>
          <View style={styles.subHeading}>
            <Text style={styles.sectionPrice}>
              {useCurrency(data?.getProduct.price)}
            </Text>
            <View style={styles.ratingContainer}>
              <AntDesign name="star" size={18} style={styles.starIcon} />
              <Text style={styles.sectionPrice}>4.5</Text>
              <Text style={styles.reviewText}>From 1k+ reviews</Text>
            </View>
          </View>
          <Text style={styles.authorText}>By Author</Text>
          <Text style={styles.description}>
            {data?.getProduct.description}
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ullam
            voluptatem odio accusamus ratione aspernatur et impedit libero sequi
            omnis, eaque ea, eum dolores expedita eius magni ex excepturi. Nemo,
            voluptates!
          </Text>
          <View style={styles.imageContainer}></View>
          <View style={styles.imageRow}>
            {data?.getProduct.Images.map((el) => {
              <Image
                source={{
                  uri: el.imgUrl,
                  width: 80,
                  height: 80,
                  resizeMode: "contain",
                }}
                style={styles.image}
              />;
            })}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  sectionContainer: {
    width: "100%",
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
    padding: 8,
  },
  backButton: {
    backgroundColor: "white",
    width: 40,
    height: 40,
    textAlign: "center",
    paddingTop: 8,
    borderRadius: 20,
  },
  heartIcon: {
    color: "white",
    width: 40,
    height: 40,
    textAlign: "center",
    paddingTop: 8,
    borderRadius: 20,
  },
  contentContainer: {
    padding: 16,
    zIndex: 2,
    elevation: 2,
    marginTop: -32,
    marginBottom: 10,
    borderRadius: 16,
    backgroundColor: "white",
    shadowColor: "white",
    flex: 1,
  },
  sectionTitle: {
    fontSize: 24,
    marginBottom: 8,
  },
  sectionPrice: {
    fontSize: 18,
    fontWeight: "bold",
  },
  subHeading: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  starIcon: {
    marginRight: 4,
  },
  reviewText: {
    marginLeft: 4,
  },
  authorText: {
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    lineHeight: 18,
    textAlign: "justify",
    marginBottom: 16,
  },
  imageContainer: {
    marginBottom: 16,
  },
  imageRow: {
    flexDirection: "row",
    width: "100%",
    marginBottom: 12,
  },
  image: {
    borderRadius: 16,
    marginRight: 8,
  },
  backButtonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
