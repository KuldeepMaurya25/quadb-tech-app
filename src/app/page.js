"use client"

import Navbar from "./components/navbar";
import HomeScreen from "./screens/homeScreen";

export default function Home() {
  return (
    <div className="overflow-scroll">
      <Navbar />
      <HomeScreen />
    </div>
  );
}
