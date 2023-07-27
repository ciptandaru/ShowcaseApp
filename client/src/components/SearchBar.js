import {Searchbar, DefaultTheme} from "react-native-paper";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const onChangeSearch = (query) => setSearchQuery(query);
  return (
    <Searchbar
      placeholder="Search"
      onChangeText={onChangeSearch}
      value={searchQuery}
      style={styles.searchBar}
      theme={{
        ...DefaultTheme,
        colors: {
          ...DefaultTheme.colors,
          background: "white", // Ganti dengan warna putih
        },
      }}
    />
  );
};

const styles = StyleSheet.create({
  searchBar: {
    marginHorizontal: 10,
    marginTop: 20,
    backgroundColor: "white",
  },
});

export default SearchBar;
