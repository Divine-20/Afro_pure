export default function authHeader() {
  const token = localStorage.getItem("token");
  if (token) {
    const tokenObject = JSON.parse(token);
    const accessToken = tokenObject.accessToken; 
    if (accessToken) {
      return { Authorization: `Bearer ${accessToken}` };
      
      
    }
    console.log(accessToken);
  }
  return {};
}
