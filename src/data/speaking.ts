import { SpeakingEngagement } from "@/types/speaking";
import speakingEvent1 from "@/assets/speaking-event-1.jpg";
import speakingEvent2 from "@/assets/speaking-event-2.jpg";

export const speakingEngagements: SpeakingEngagement[] = [
  {
    id: "edtech-summit-2023",
    image: speakingEvent1,
    title: "EdTech Innovation Summit 2023",
    date: "October 15, 2023",
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
    title: "UCI Computer Science Education Workshop",
    date: "March 8, 2023",
    location: "Irvine, CA",
    description: "Led a hands-on workshop for educators on implementing culturally sustaining curriculum in computer science education. Shared insights from research on empowering Latinx students with disabilities through accessible programming education and inclusive teaching practices.",
    technologies: [
      "CS Education",
      "Culturally Sustaining Curriculum",
      "Accessibility",
      "Inclusive Design",
      "Educational Equity"
    ]
  }
];
