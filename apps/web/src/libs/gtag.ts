export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export const pageview = (url: string) => {
  // @ts-expect-error window.gtag is defined by the script tag in the _app.tsx
  window.gtag("config", GA_MEASUREMENT_ID, {
    page_path: url,
  });
};
