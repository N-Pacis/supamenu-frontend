export default function authHeader() {
  const token = JSON.parse(sessionStorage.getItem("token"));

  if (token) {
    return { Authorization: token};
  } else {
    return {};
  }
}
