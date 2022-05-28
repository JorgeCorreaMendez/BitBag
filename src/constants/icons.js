import { MaterialIcons } from "@expo/vector-icons";
import colors from "./colors";

const tracks = (
  <MaterialIcons name="music-note" size={27} color={colors.primary} />
);

const player = (
  <MaterialIcons name="play-circle-outline" size={27} color={colors.primary} />
);

const playlist = (
  <MaterialIcons name="my-library-music" size={27} color={colors.primary} />
);

const setting = (
  <MaterialIcons name="settings" size={27} color={colors.primary} />
);

export default { tracks, player, playlist, setting };
