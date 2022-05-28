import { View, FlatList } from "react-native";
import Song from "./Song";

const SongList = ({
  list,
  playlistName,
  onDelete,
  goToPlayer,
  addSongToPlaylist,
}) => {
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={list}
        renderItem={(song) => {
          return (
            <Song
              songData={song.item}
              playlistName={playlistName}
              addSongToPlaylist={addSongToPlaylist}
              goToPlayer={goToPlayer}
              onDelete={onDelete}
            />
          );
        }}
      />
    </View>
  );
};

export default SongList;
