import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import { 
  CheckCircle2, 
  Code2, 
  Lightbulb, 
  Rocket, 
  Shield, 
  Github,
  Book,
  Sparkles
} from "lucide-react";
import bannerImage from "@/assets/banner.png";

const About = () => {
  const features = [
    "Generate 4-digit and 6-digit UPI PINs from Hindi words",
    "Handles matras and special characters",
    "Prevents invalid input (English letters, numbers)",
    "Simple and clean interface",
    "Real-time English to Devanagari conversion"
  ];

  const techStack = [
    { name: "React", icon: Code2 },
    { name: "TypeScript", icon: Code2 },
    { name: "Tailwind CSS", icon: Code2 },
    { name: "Vite", icon: Rocket }
  ];

  const useCases = [
    "Educational purpose (learn Unicode & transliteration)",
    "Banking concept simulation",
    "Fun project for developers",
    "Cultural tech exploration"
  ];

  const futureEnhancements = [
    "Support for multiple Indian languages",
    "Export option for PINs",
    "PIN strength analyzer",
    "Mobile app version"
  ];

  return (
    <div className="min-h-screen bg-gradient-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Hero Section */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center justify-center mb-6">
            <Badge variant="secondary" className="text-sm px-4 py-2">
              <Sparkles className="w-4 h-4 mr-2" />
              Open Source Project
            </Badge>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-hero bg-clip-text text-transparent">
            Devanagari UPI PIN Generator
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Convert Hindi (Devanagari) words into secure UPI PINs. 
            Inspired by Axis Bank's innovative Devanagari UPI PIN feature.
          </p>
        </div>

        {/* Banner Image */}
        <Card className="mb-16 p-8 shadow-glow border-2 border-primary/20 overflow-hidden animate-slide-up">
          <img 
            src={bannerImage} 
            alt="Devanagari Character Mapping" 
            className="w-full h-auto rounded-lg"
          />
        </Card>

        {/* About Section */}
        <Card className="p-8 mb-8 shadow-medium animate-slide-up">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center shadow-accent">
              <Book className="w-6 h-6 text-primary-foreground" />
            </div>
            <h2 className="text-3xl font-bold text-foreground">About The Project</h2>
          </div>
          <p className="text-muted-foreground text-lg leading-relaxed">
            This project is inspired by <strong className="text-primary">Axis Bank's Devanagari UPI PIN Generation feature</strong>. 
            It allows users to generate a UPI PIN based on a Hindi word written in Devanagari script. 
            Each character in the input word is mapped to a specific number according to custom logic, 
            making it easier to remember PINs using words that are meaningful to you.
          </p>
        </Card>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card className="p-8 shadow-medium animate-slide-up">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center shadow-accent">
                <CheckCircle2 className="w-6 h-6 text-primary-foreground" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">Features</h2>
            </div>
            <ul className="space-y-3">
              {features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">{feature}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card className="p-8 shadow-medium animate-slide-up">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-accent rounded-xl flex items-center justify-center shadow-accent">
                <Code2 className="w-6 h-6 text-accent-foreground" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">Tech Stack</h2>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {techStack.map((tech, idx) => (
                <div 
                  key={idx}
                  className="flex items-center gap-2 p-3 bg-secondary rounded-lg"
                >
                  <tech.icon className="w-5 h-5 text-primary" />
                  <span className="text-secondary-foreground font-medium">{tech.name}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* How It Works */}
        <Card className="p-8 mb-8 shadow-medium animate-slide-up">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center shadow-accent">
              <Lightbulb className="w-6 h-6 text-primary-foreground" />
            </div>
            <h2 className="text-3xl font-bold text-foreground">How It Works</h2>
          </div>
          <div className="space-y-6">
            {[
              {
                step: "1",
                title: "Enter a Hindi Word",
                description: "Type a word in Devanagari script (e.g., भारद्वाज, पर्व) or in English which will be converted automatically"
              },
              {
                step: "2",
                title: "Character Mapping",
                description: "Each character is mapped to a specific numeric code based on custom logic"
              },
              {
                step: "3",
                title: "PIN Generation",
                description: "The system generates both 4-digit and 6-digit PINs from the mapped numbers"
              }
            ].map((item, idx) => (
              <div key={idx} className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-lg shadow-accent">
                  {item.step}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Use Cases & Future Enhancements */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card className="p-8 shadow-medium animate-slide-up">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center shadow-accent">
                <Shield className="w-6 h-6 text-primary-foreground" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">Use Cases</h2>
            </div>
            <ul className="space-y-3">
              {useCases.map((useCase, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="text-primary text-xl">•</span>
                  <span className="text-muted-foreground">{useCase}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card className="p-8 shadow-medium animate-slide-up">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-accent rounded-xl flex items-center justify-center shadow-accent">
                <Rocket className="w-6 h-6 text-accent-foreground" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">Future Enhancements</h2>
            </div>
            <ul className="space-y-3">
              {futureEnhancements.map((enhancement, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">{enhancement}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        {/* Credits & License */}
        <Card className="p-8 bg-muted/50 border-border animate-slide-up">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Github className="w-6 h-6 text-primary" />
              <h3 className="text-2xl font-bold text-foreground">Credits</h3>
            </div>
            <p className="text-muted-foreground">
              Concept inspired by <strong className="text-primary">Axis Bank's Devanagari UPI PIN feature</strong>
            </p>
            <p className="text-muted-foreground">
              Developed by <a href="https://github.com/cjasoncode" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-semibold">cjasoncode</a>
            </p>
            <p className="text-sm text-muted-foreground mt-6">
              This project is <strong>for educational purposes only</strong> and is not affiliated with any bank.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default About;
