//import "@/styles/globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/scss/style.scss';
import dynamic from 'next/dynamic';
import { DM_Sans, Lato } from 'next/font/google';

import HeroArea from "../components/banner/Hero"
const Counter = dynamic(() => import('../components/counters/Counter'));
const CounterTwoColumn = dynamic(() => import('../components/counters/CounterTwoColumn'));
import Team from '../components/teams/Team';
const CallToAction = dynamic(() => import('../components/call-to-actions/CallToAction'));
const Page = dynamic(() => import('../components/Storyblok/Page'));
const Button = dynamic(() => import('../components/buttons/Button'));
const Link = dynamic(() => import('../components/buttons/Link'));
const Testimonials = dynamic(() => import('../components/testimonials/Testimonial'));
import HeroWithoutImage from '../components/banner/HeroWithoutImage';

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-dm-sans',
  display: 'swap',
});

const lato = Lato({
  subsets: ['latin'],
  weight: ['100', '300', '400', '700', '900'],
  variable: '--font-lato',
  display: 'swap',
});

const components={
  HeroArea,
  Counter,
  CounterTwoColumn,
  Team,
  CallToAction,
  page: Page,
  Button,
  Link,
  Testimonials,
  HeroWithoutImage,
  }

export default function App({ Component, pageProps }) {
  return (
    <>
      <style jsx global>{`
        :root {
          --font-dm-sans: ${dmSans.style.fontFamily};
          --font-lato: ${lato.style.fontFamily};
        }
      `}</style>
      <Component {...pageProps} />
    </>
  );
}
