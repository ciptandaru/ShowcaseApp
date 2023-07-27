import React from "react";
import {View, Image, Text, StyleSheet, FlatList} from "react-native";

const ProductSlider = () => {
  const data = [
    {
      image:
        "https://www2.hm.com/content/dam/hm-magazine-2020/featured-fashion/20_13_A_trend_bildspel_1.jpg",
      title: "Women",
      subtitle: "Jackets & Coats",
    },
    {
      image:
        "https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2F33%2F9e%2F339e3549ec41eef34883a4fbe73e8501c36764fb.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5Bladies_cardigansjumpers_cardigans%5D%2Ctype%5BLOOKBOOK%5D%2Cres%5Bm%5D%2Chmver%5B1%5D&call=url[file:/product/main]",
      title: "Women",
      subtitle: "Cardigans & Sweaters",
    },
    {
      image:
        "https://cdna.lystit.com/photos/56a1-2014/11/06/hm-blue-jumper-in-a-mohair-blend-product-1-25065199-0-150443488-normal.jpeg",
      title: "Women",
      subtitle: "Clothes",
    },
    {
      image:
        "https://i.pinimg.com/736x/32/00/a8/3200a8617dfbc6139b8251a36d5118de.jpg",
      title: "Kids",
      subtitle: "Boys 11/2-10 years",
    },
    {
      image:
        "https://lp2.hm.com/hmprod?hmver=0&set=quality[79],source[/environment/2016/8EZ_0117_008R.jpg],width[4054],height[4740],x[549],y[438],type[FASHION_FRONT]&call=url[file:/product/main]",
      title: "Kids",
      subtitle: "Girls 11/2-10 years",
    },
    {
      image:
        "https://i.pinimg.com/736x/b3/21/bd/b321bd9d618ee5439cd7218f9a543704.jpg",
      title: "Men",
      subtitle: "Hoodies & Sweatshirts",
    },
    {
      image:
        "https://media1.popsugar-assets.com/files/thumbor/Ol-YWVWUQnVmpEjhoKL6eZK0Kfo/fit-in/2048xorig/filters:format_auto-!!-:strip_icc-!!-/2014/09/11/879/n/24155406/6877ea140db7a0db_thumb_temp_image22153611410465627/i/HM-Newborn-Clothes.jpg",
      title: "Kids",
      subtitle: "Newborn 0-9months",
    },
    {
      image:
        "https://mk0stylisheve1cal1r6.kinstacdn.com/wp-content/uploads/2011/12/HM-Jumpers-and-Cardigans-for-Men_01.jpg",
      title: "Men",
      subtitle: "Cardigans & Sweaters",
    },
    {
      image:
        "https://media1.popsugar-assets.com/files/thumbor/SDuW_U-wIdtnXwH3He3H9lpAOKM/fit-in/2048xorig/filters:format_auto-!!-:strip_icc-!!-/2015/03/24/849/n/1922564/648b5c4b2fb7a0db_thumb_temp_cover_file22127581418424792/i/Best-H-amp-M-Spring-Clothes-Men-2015.jpg",
      title: "Men",
      subtitle: "Clothes",
    },
  ];
  const renderItem = ({item}) => {
    return (
      <View style={styles.itemContainer}>
        <Image source={{uri: item.image}} style={styles.image} />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.subtitle}>{item.subtitle}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        horizontal
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.contentContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 16,
  },
  itemContainer: {
    alignItems: "center",
    marginBottom: 20,
    marginRight: 10,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 40,
  },
  title: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 12,
    textAlign: "center",
  },
});

export default ProductSlider;
