import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useRoute } from "../router";
import { authStateChanged } from "../redux/auth/authOperations";

export const Main = () => {
  const dispatch = useDispatch();

  const { stateChange } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(authStateChanged());
  }, []);

  const routing = useRoute(stateChange);

  return    <NavigationContainer>
  {routing}
</NavigationContainer>
};
