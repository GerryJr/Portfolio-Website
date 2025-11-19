import { SpeakingEngagement } from "@/types/speaking";
import speakingEvent1 from "@/assets/speaking-event-1.png";
import speakingEvent2 from "@/assets/speaking-event-2.jpg";

export const speakingEngagements: SpeakingEngagement[] = [
  {
    id: "edtech-summit-2023",
    image: speakingEvent1,
    title: "CP-LEADS Research Presenter 2024",
    date: "July 15, 2024",
    location: "San Francisco, CA",
    description: "Presented on \"Building Scalable Learning Platforms with Serverless Architecture\" at the annual EdTech Innovation Summit. Discussed cloud-native approaches to education technology and demonstrated real-world implementations of LTI 1.3 integrations.",
    technologies: [
      "AWS Lambda",
      "LTI 1.3",
      "Serverless Architecture",
      "EdTech",
      "Scalability"
    ]
  },
  {
    id: "uci-cs-workshop-2023",
    image: speakingEvent2,
    title: "UCI Undergraduate Research Opportunities Presenter 2024",
    date: "May 17, 2024",
    location: "Irvine, CA",
    description: "Showcasing the usage of a ChatGPT like tool in an upper-division writing course co-designed by instructors viewing students grade outcomes.",
    technologies: [
      "CS Education",
      "Culturally Sustaining Curriculum",
      "Accessibility",
      "Inclusive Design",
      "Educational Equity"
    ]
  }
];
