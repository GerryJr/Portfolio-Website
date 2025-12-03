import { Button } from "@/components/ui/button";
import { ArrowRight, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import profilePhoto from "@/assets/profile-photo.jpg";
import { homeHighlights } from "@/data/highlights";

const Home = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <div className="flex flex-col items-center text-center space-y-8">
        
        {/* Profile Photo */}
        <div className="relative">
          <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-full overflow-hidden border-4 border-accent/20 shadow-lg">
            <img
              src={profilePhoto}
              alt="Gerardo Lopez profile photo"
              className="w-full h-full object-cover"
              width={192}
              height={192}
            />
          </div>
        </div>

        <div className="space-y-6">
          {/* Slightly Smaller Name */}
          <h1 className="text-4xl sm:text-5xl lg:text-5xl font-bold font-heading leading-tight">
            Gerardo Lopez
          </h1>

          <p className="text-xl sm:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Building scalable cloud systems for real-world data.
            Delivering secure, full-stack solutions from idea to launch.
          </p>

          {/* === Highlight Strip (with fade + lift animation) === */}
          <div className="hidden sm:grid grid-cols-3 gap-4 pt-2 max-w-3xl mx-auto">
            {homeHighlights.map((item, idx) => (
              <div
                key={item.title}
                style={{ animationDelay: `${idx * 0.12}s` }}
                className="p-5 rounded-xl border border-border/60 bg-card/60 backdrop-blur-sm shadow-[0_2px_10px_rgba(0,0,0,0.06)]
                           opacity-0 translate-y-2 animate-[fadeInUp_0.5s_ease-out_forwards]"
              >
                <p className="font-semibold text-foreground/90">{item.title}</p>
                <p className="text-sm text-muted-foreground/90 mt-1">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
          {/* === End Highlight Strip === */}

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button size="lg" asChild>
              <Link to="/projects">
                View Projects
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>

            <Button variant="secondary" size="lg" asChild>
              <a
                href="/Gerardo-Lopez-Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FileText className="mr-2 h-5 w-5" />
                Resume
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
