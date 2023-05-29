import { TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import { MaterialIcons } from "@expo/vector-icons";
import { authSignOutUser } from "../redux/auth/authOperations";

export const Logout = ({styles}) => {
  const dispatch = useDispatch();
  return (
    <TouchableOpacity
      style={styles}
      onPress={() => dispatch(authSignOutUser())}
      activeOpacity={0.8}
    >
      <MaterialIcons name="logout" size={24} color="#BDBDBD" />
    </TouchableOpacity>
  );
};
