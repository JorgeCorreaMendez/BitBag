import { View, FlatList } from "react-native";
import PlaylistItem from "./PlaylistItem";

const PlaylistList = ({ list, goToPlaylist }) => {
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={list}
        renderItem={(playlist) => {
          return (
            <PlaylistItem
              playlistData={playlist.item}
              goToPlaylist={goToPlaylist}
            />
          );
        }}
      />
    </View>
  );
};

export default PlaylistList;
