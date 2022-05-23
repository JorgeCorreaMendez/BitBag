import { View, FlatList } from "react-native";
import Song from "./Song";

const SongList = ({ list, onDelete, goToPlayer }) => {
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={list}
        renderItem={(song) => {
          return (
            <Song
              songData={song.item}
              onDelete={onDelete}
              goToPlayer={goToPlayer}
            />
          );
        }}
      />
    </View>
  );
};

export default SongList;
