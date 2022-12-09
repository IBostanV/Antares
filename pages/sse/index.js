export { default } from './component';

export const getStaticProps = async () => ({
  props:
      {
        hostUrl: process.env.NEXT_PUBLIC_BE_HOST_URL,
      },
});
