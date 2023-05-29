export const selectId = (state) => state.auth.id;
export const selectEmail = (state) => state.auth.email;
export const selectNickName = (state) => state.auth.nickname;
export const selectAvatar = (state) => state.auth.avatar;

export const selectUser = (state) => ({
  id: state.auth.id,
  email: state.auth.email,
  nickname: state.auth.nickname,
  avatar: state.auth.avatar,
});