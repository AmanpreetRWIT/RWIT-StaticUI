import { storyblokEditable } from '@storyblok/react';
export default function Required({ blok, errors, inputName }) {
  return (
    <div {...storyblokEditable(blok)}>
      {errors.firstName?.type === 'required' &&
        inputName === 'Name' &&
        blok.errorMessage}
      {errors.lastName?.type === 'required' &&
        inputName === 'company' &&
        blok.errorMessage}
      {errors.email?.type === 'required' &&
        inputName === 'email' &&
        blok.errorMessage}
    </div>
  );
}
