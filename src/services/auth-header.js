export default function authHeader() {
  const token = `Bearer `+ JSON.parse(sessionStorage.getItem("token")).accessToken;
  console.warn(token)
  if (token) {
    return { Authorization: token};
  } else {
    return {};
  }
}
