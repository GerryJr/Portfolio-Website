import { Button } from "@/components/ui/button";
import { ArrowRight, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import profilePhoto from "@/assets/profile-photo.jpg";
const Home = () => {
  return <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <div className="flex flex-col items-center text-center space-y-8">
        {/* Profile Photo */}
        <div className="relative">
          <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-full overflow-hidden border-4 border-accent/20 shadow-lg">
            <img src={profilePhoto} alt="Gerardo Lopez profile photo" className="w-full h-full object-cover" width={192} height={192} />
          </div>
        </div>

        <div className="space-y-6">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-heading leading-tight">
            Gerardo Lopez
          </h1>
          
          <p className="text-xl sm:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">Building scalable cloud systems for real-world data.
Delivering secure, full-stack solutions from idea to launch.</p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button size="lg" asChild>
              <Link to="/projects">
                View Projects
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            
            <Button variant="secondary" size="lg" asChild>
              <a href="/Gerardo-Lopez-Resume.pdf" target="_blank" rel="noopener noreferrer">
                <FileText className="mr-2 h-5 w-5" />
                Resume
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>;
};
export default Home;