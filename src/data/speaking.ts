import { SpeakingEngagement } from "@/types/speaking";
import speakingEvent1 from "@/assets/speaking-event-1.webp";
import speakingEvent2 from "@/assets/speaking-event-2.jpg";

export const speakingEngagements: SpeakingEngagement[] = [
  {
    id: "edtech-summit-2023",
    image: speakingEvent1,
    title: "CP-LEADS Research Presenter 2024",
    date: "July 15, 2024",
    location: "Irvine, CA",
    description: "Presented research findings on user engagement with AI-supported tools using natural language processing (NLP) techniques. This highlighted key themes in how learners interact with AI in educational settings.",
    technologies: [
      "AI in Education",
      "Accessibility",
      "Natural Language Processing (NLP)",
      "Topic Modeling (LDA)",
      "Sentiment Analysis",
      "Statistical Analysis",
      "Predictive Modeling",
    ]
  },
  {
    id: "uci-cs-workshop-2023",
    image: speakingEvent2,
    title: "UCI Undergraduate Research Opportunities Presenter 2024",
    date: "May 17, 2024",
    location: "Irvine, CA",
    description: "Showcased the usage of a ChatGPT like tool in an upper-division writing course compared to student grade outcomes, co-designed by instructors and UCI faculty.",
    technologies: [
      "CS Education",
      "Statistical Analysis",
      "Predictive Modeling",
      "Inclusive Design",
      "Educational Equity"
    ]
  }
];
