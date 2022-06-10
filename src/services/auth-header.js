export default function authHeader() {
  const token = `Bearer `+ JSON.parse(sessionStorage.getItem("token")).accessToken;
  if (token) {
    return { Authorization: token};
  } else {
    return {};
  }
}
