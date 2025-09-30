import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/scss/style.scss';

/** @type { import('@storybook/nextjs-vite').Preview } */
const preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },

    // a11y: {
    //   test: "todo"
    // }
  },
};

export default preview;