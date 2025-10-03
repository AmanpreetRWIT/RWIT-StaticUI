import CallToActionWithAvatar from '../../components/call-to-actions/CallToActionWithAvatar';

export default {
  title: 'Sections/CallToActionWithAvatar',
  component: CallToActionWithAvatar,
  tags: ['autodocs'],
  argTypes: {
    isSlim: { control: 'boolean' },
    isBlogPage: { control: 'boolean' },
    bgColor: { control: 'color' },
    heading: { control: 'text' },
    tags: { control: 'text' },
    description: { control: 'text' },
    headingColor: { control: 'color' },
    descriptionColor: { control: 'color' },
    avatar: { control: 'text' },
  },
};

export const Default = {
  args: {
    isSlim: false,
    isBlogPage: false,
    bgColor: '#f8f9fa',
    avatar: 'https://a-us.storyblok.com/f/1016184/397x462/0f47330420/jim-sir.png',
    heading: "Hi, my name is Jaswinder, let's talk about your business needs",
    tags: 'Are you ready?',
    description: 'I will do my best to find a reliable solution for you!',
    headingColor: '#000248',
    descriptionColor: '#757589',
    buttons: { label: 'Book a discovery call' },
  },
};

export const Slim = {
  args: {
    ...Default.args,
    isSlim: true,
  },
};

export const WithoutAvatar = {
  args: {
    ...Default.args,
    avatar: '',
  },
};
