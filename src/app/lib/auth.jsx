"use client"
import { login, logout } from "../redux/slices/loginSlice";

export const handleLogin = (dispatch) => {
    const fakeUser = { name: "Lisa Doe", email: "lisa@example.com" };

    dispatch(login({ userName: fakeUser.name, userEmail: fakeUser.email, login: true }));
}
export const handleLogout = (dispatch) => {
    dispatch(logout());
};