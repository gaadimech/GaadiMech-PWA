/// <reference types="vite/client" />

interface Window {
  Razorpay: any;
  fbq: any;
  dataLayer: any;
  amplitude: any;
  sessionReplay: any;
}

declare module '*.svg' {
  const content: any;
  export default content;
}

declare module '*.png' {
  const content: any;
  export default content;
}

declare module '*.jpg' {
  const content: any;
  export default content;
}
