import { decode } from "jsonwebtoken";


class AuthService {
getProfile() {
const token = this.getToken();
return token ? decode(token) || null : null;
}
    // Removed duplicate getToken method

loggedIn() {
const token = this.getToken();
return !!token && !this.isTokenExpired(token);
}
isTokenExpired(token: string) {
const decoded: any = decode(token);
return decoded && decoded.exp < Date.now() / 1000;
}

getToken() {
return localStorage.getItem('id_token');
}

login(token) {
localStorage.setItem('id_token', token);
window.location.assign('/');
}

logout() {
localStorage.removeItem('id_token');
window.location.assign('/');
}
}

export default new AuthService();


