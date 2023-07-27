import React, {useRef} from "react";
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";

const {width} = Dimensions.get("window");

const CarouselMain = () => {
  const data = [
    {
      id: 1,
      image:
        "https://d29c1z66frfv6c.cloudfront.net/pub/media/banner/23/5/W22-TPS-Opening.jpg",
    },
    {
      id: 2,
      image:
        "https://d29c1z66frfv6c.cloudfront.net/pub/media/banner/23/6/W23-Enjoy-20-Off.jpg",
    },
    {
      id: 3,
      image:
        "https://d29c1z66frfv6c.cloudfront.net/pub/media/banner/23/3/W10-Homepage-Find-The-Right-Size.jpg",
    },
    {
      id: 4,
      image:
        "https://d29c1z66frfv6c.cloudfront.net/pub/media/banner/23/3/W10-Homepage-Free-Delivery.jpg",
    },
  ];

  const sliderRef = useRef(null);
  let currentIndex = 0;

  const handleSlide = (index) => {
    if (sliderRef.current) {
      sliderRef.current.scrollTo({
        x: index * width,
        animated: true,
      });
      currentIndex = index;
    }
  };

  return (
    <View style={styles.carouselContainer}>
      <View style={styles.slider}>
        {data.map((item, index) => (
          <TouchableOpacity
            key={item.id}
            style={[styles.slide, {width}]}
            onPress={() => handleSlide(index)}
          >
            <Image
              source={{uri: item.image}}
              style={styles.image}
              resizeMode="cover"
            />
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.pagination}>
        {data.map((item, index) => (
          <TouchableOpacity
            key={item.id}
            style={[
              styles.paginationDot,
              index === currentIndex && styles.paginationDotActive,
            ]}
            onPress={() => handleSlide(index)}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  carouselContainer: {
    width: "100%",
    height: 250,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 20,
    borderRadius: 6,
    overflow: "hidden",
  },
  slider: {
    flexDirection: "row",
  },
  slide: {
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: width,
    height: 250,
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  paginationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#bbb",
    marginHorizontal: 5,
  },
  paginationDotActive: {
    backgroundColor: "#333",
  },
});

export default CarouselMain;
