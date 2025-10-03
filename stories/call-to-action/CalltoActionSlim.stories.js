import CallToActionSlim from '../../components/call-to-actions/CallToActionSlim';

export default {
  title: 'Sections/CallToActionSlim',
  component: CallToActionSlim,
  tags: ['autodocs'],
  argTypes: {
    backgroundImage: { control: 'text' },
    mobileBgImage: { control: 'text' },
    containerBgColor: { control: 'color' },
    minHeight: { control: 'number' },
    applyBorder: { control: 'boolean' },
    borderColor: { control: 'color' },
    bgColor: { control: 'color' },
    heading: { control: 'text' },
    tags: { control: 'text' },
    titleColor: { control: 'color' },
    description: { control: 'text' },
    descriptionColor: { control: 'color' },
    showTags:{control:"boolean"},
  },
};

export const Default = {
  args: {
    backgroundImage: 'https://via.placeholder.com/1920x500',
    mobileBgImage: 'https://via.placeholder.com/600x400',
    containerBgColor: '#ffffff',
    minHeight: 300,
    applyBorder: true,
    borderColor: 'rgb(74, 134, 232)',
    bgColor: 'rgb(74, 134, 232)',
    heading: 'Request a free Builder.io Consultation',
    tags: 'Subscribe today',
    titleColor: 'rgb(255, 255, 255)',
    description: 'Accelerate your headless cms development process with our award-winning company.',
    descriptionColor: 'rgb(255, 255, 255)',
    buttons: { label: 'Schedule a call' },
    showTags:true,
  },
};

export const WithoutImage = {
  args: {
    ...Default.args,
    backgroundImage: '',
    mobileBgImage: '',
  },
};

export const Minimal = {
  args: {
    heading: 'Quick CTA',
    description: '',
    buttons: [{ label: 'Click Me' }],
    phones: [],
  },
};
