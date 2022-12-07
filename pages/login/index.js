export { default } from './component';

export const getStaticProps = async () => ({
  props:
      {
        hostUrl: process.env.BE_HOST_URL,
      },
});
