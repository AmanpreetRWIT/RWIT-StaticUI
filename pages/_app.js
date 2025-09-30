import "@/styles/globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/scss/style.scss';

import Hero from "../components/banner/Hero";
import HeroWithForm from "../components/banner/HeroWithForm";

const components={
  Hero,
  HeroWithForm
}

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
