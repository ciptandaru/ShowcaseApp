import React from "react";
import {View, Text, Image, StyleSheet, ScrollView} from "react-native";
import CarouselMain from "../components/CarouselMain";
import ProductSlider from "../components/ProductSlider";
import BotNavBar from "../components/BotNavBar";

const HomeScreen = () => {
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.heading}>10% off sitewide! No code required</Text>

        <Text style={styles.trendingText}>Trending now</Text>
        <View>
          {/* buat slider */}
          <ProductSlider />
        </View>

        <View>
          <Image
            source={{
              uri: "https://d29c1z66frfv6c.cloudfront.net/pub/media/banner/23/6/W24-Homepage-Ladies-Men-Divided-Kids-Sport-Baby-Sale-50-Off-bhs-Sale-Starts.jpg",
            }}
            style={styles.promoImage}
          />
        </View>

        <View style={styles.promoContainer}>
          <Image
            source={{
              uri: "https://i.ytimg.com/vi/yzBPsN6Ve7M/maxresdefault.jpg",
            }}
            style={styles.promoImage}
          />
        </View>
        <View>
          <CarouselMain />
        </View>
        <View style={styles.mgzSection}>
          <Text style={styles.mgzHeading}>Magazine</Text>
          <Text style={styles.readMgzText}>Read the magazine</Text>
          <View style={styles.cardContainer}>
            <View style={styles.card}>
              <Image
                source={{
                  uri: "https://d29c1z66frfv6c.cloudfront.net/pub/media/wysiwyg/HM-Magazine-Issue2.jpg",
                }}
                style={styles.cardImage}
              />
              <View style={styles.cardContent}>
                <Text style={[styles.cardText, styles.boldText]}>
                  Spring Fashion 2023
                </Text>
                <Text style={styles.cardText}>
                  The latest trends and styles for the spring season. Get
                  inspired!
                </Text>
                <Text style={styles.readStoryText}>Read story</Text>
              </View>
            </View>
            <View style={styles.card}>
              <Image
                source={{
                  uri: "https://d29c1z66frfv6c.cloudfront.net/pub/media/wysiwyg/HM-Magazine-Issue1.jpg",
                }}
                style={styles.cardImage}
              />
              <View style={styles.cardContent}>
                <Text style={[styles.cardText, styles.boldText]}>
                  Fall Fashion 2022
                </Text>
                <Text style={styles.cardText}>
                  Discover the latest fall fashion trends and must-have pieces.
                </Text>
                <Text style={styles.readStoryText}>Read story</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    padding: 20,
    backgroundColor: "#efe4ce",
    textAlign: "center",
  },
  trendingText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  sliderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  sliderItem: {
    width: "48%",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
  },
  sliderImage: {
    width: "100%",
    height: 150,
    marginBottom: 10,
    borderRadius: 8,
  },
  sliderTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  sliderText: {
    fontSize: 14,
  },
  promoContainer: {
    marginBottom: 10,
  },
  promoImage: {
    width: "100%",
    height: 250,
    borderRadius: 8,
    resizeMode: "cover",
  },
  mgzSection: {
    marginBottom: 10,
  },
  mgzHeading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  readMgzText: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 10,
  },
  cardContainer: {
    flexDirection: "row",
    justifyContent: "center", // Mengatur card menjadi di tengah secara horizontal
    flexWrap: "wrap",
    marginBottom: 10,
  },
  card: {
    width: "48%",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 4,
  },
  cardImage: {
    width: "100%",
    height: 150,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  cardContent: {
    padding: 10,
  },
  cardText: {
    fontSize: 14,
    marginBottom: 5,
  },
  boldText: {
    fontWeight: "bold",
  },
  readStoryText: {
    color: "#0099ff",
    fontWeight: "bold",
    marginTop: 10,
    textAlign: "center",
  },
});
export default HomeScreen;
