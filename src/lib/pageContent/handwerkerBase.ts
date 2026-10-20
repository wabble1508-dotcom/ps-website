// Handwerker (Craftsmen) — shared assets & types
export interface HandwerkerData {
  seo: { title: string; description: string; keywords?: string };
  hero: {
    videoSrc: string;
    title: string;
    subtitle: string;
    buttonText: string;
  };
  painPoints: { icon: string; title: string }[];
  leadMagnet: {
    title: string;
    description: string;
    buttonText: string;
    image: string;
  };
  workflow: { title: string; description: string; image: string };
  benefits: { title: string; description: string; image: string };
  checkmarksSection: {
    title: string;
    subtitle: string;
    image: string;
    list: { title: string; description: string }[];
  };
  videoTestimonial: { url: string; title: string; description: string };
  testimonials: { title: string; description: string; image: string }[];
  websitePreview: {
    title: string;
    description: string;
    beforeImage: string;
    afterImage: string;
  };
  faqs: { question: string; answer: string }[];
}

const ICON = {
  calendar:
    "/media/raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Spiral_calendar/3D/spiral_calendar_3d.png",
  bell: "/media/raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Bell/3D/bell_3d.png",
  phone:
    "/media/raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Mobile_phone/3D/mobile_phone_3d.png",
};

export const VIDEO =
  "/media/assets.cdn.filesafe.space/VkExHAgs8XW3SXXelIlC/media/69c04a4a3b3a582edddbee4d.mp4";

export const IMG = {
  leadMagnet:
    "/media/vibe.filesafe.space/1778931020193405557/assets/a3c9dd74-8624-4cce-be45-1c029e9e5cd8.png",
  workflow:
    "/media/vibe.filesafe.space/1778931020193405557/assets/70eae435-8182-4919-8250-c8e7b34bfb4d.jpg",
  benefits:
    "/media/vibe.filesafe.space/1778931020193405557/assets/7b604297-5c2c-490d-9ee2-c68d97f2ca18.png",
  checkmarks:
    "/media/vibe.filesafe.space/1778931020193405557/assets/7a661b8e-f320-46a9-8761-45f0d6b1e43e.png",
  t1: "/media/vibe.filesafe.space/1778931020193405557/assets/e2c1019e-7265-48e1-b03f-07ee277de34c.png",
  t2: "/media/vibe.filesafe.space/1778931020193405557/assets/e3467e9b-4e19-472d-a362-434b2db9295f.png",
  t3: "/media/vibe.filesafe.space/1778931020193405557/assets/fbb16852-5543-447f-a9a5-421b56223091.png",
  before:
    "/media/vibe.filesafe.space/1778931020193405557/assets/b2e515e2-c9f8-4727-9cd4-9cfd4580e5af.png",
  after:
    "/media/vibe.filesafe.space/1778931020193405557/assets/b2e515e2-c9f8-4727-9cd4-9cfd4580e5af.png",
};

export const VTESTI = "https://www.youtube.com/embed/EdMmS0uehe4?rel=0";

export const icon = (k: keyof typeof ICON) => ICON[k];
