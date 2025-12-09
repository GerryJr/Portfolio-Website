import heroProfessional from "@/assets/hero-professional.jpg";
import profilePhoto from "@/assets/profile-photo.jpg";

export const aboutData = {
  hero: {
    image: heroProfessional,
    alt: "Gerardo Lopez - Professional headshot",
    paragraphs: [
      "I'm a software engineer who focuses on building scalable, cloud-native systems and solving problems through clean, practical design. I've worked on both collaborative projects and independent builds across backend, data, and integration work.",
      "(Insert Goal) Outside of work, I love playing video games with my fiance and friends. I play Rocket League and Elden Ring the most, but I'm trying to get into books. I'm not a reader yet, but it's my second year in a row giving it a real shot."
    ]
  },
  personalInterests: {
    title: "Personal Hobbies",
    paragraphs: [
      "I unwind with the same energy I bring to code - tinkering with co-op games, brewing a decent cup of coffee, and planning day trips with my fiance. Most weekends include a walk, a new food spot, and a playlist that keeps the vibe up.",
      "I'm also pushing myself to read more, usually sci-fi or design books friends recommend. Swap these lines with your own hobbies: gym goals, music you're looping, travel ideas, or the side project that keeps you curious."
    ],
    image: {
      src: profilePhoto,
      alt: "Personal snapshot to swap in",
      note: "Replace src/assets/profile-photo.jpg with your own photo or rename and update the import."
    }
  }
};
