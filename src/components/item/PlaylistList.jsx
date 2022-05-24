import { View, FlatList } from "react-native";
import PlaylistItem from "./PlaylistItem";

const PlaylistList = ({ list }) => {
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={list}
        renderItem={(playlist) => {
          return <PlaylistItem playlistData={playlist.item} />;
        }}
      />
    </View>
  );
};

export default PlaylistList;
