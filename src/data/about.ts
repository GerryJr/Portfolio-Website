import heroProfessional from "@/assets/hero-professional.webp";
import heroCouple from "@/assets/hero-couple.webp";

export const aboutData = {
  hero: {
    image: heroProfessional,
    alt: "Gerardo Lopez Jr. Headshot",
    paragraphs: [
      "I'm a software engineer who focuses on building scalable, cloud-native systems and solving problems through clean, practical design. I've worked on both collaborative projects and independent builds across backend, data, and integration work.",
      "My goal is to work as a software engineer building scalable systems, learning new technologies, and sharpening my problem-solving skills through real production challenges."
    ]
  },
  personalInterests: {
    title: "Personal Hobbies",
    paragraphs: [
      "Outside of work, I love playing video games with my fiance and friends. I play Rocket League and Elden Ring the most, but I'm trying to get into books. I'm not a reader yet, but it's my second year in a row giving it a real shot.",
      "Also, as nerdy as it sounds, I really enjoy building new programs in my computer to try to make my life easier. Currently, I have am working on my home server so that I can always access to my files and easily share them with friends and family."
    ],
    image: {
      src: heroCouple,
      alt: "Gerardo Lopez with fiance",
      note: "Me and my fiance Kourtney :)"
    }
  }
};
