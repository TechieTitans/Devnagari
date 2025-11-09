import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Copy, Lock, ArrowRight } from "lucide-react";
import Sanscript from "@indic-transliteration/sanscript";
import Navbar from "@/components/Navbar";

const Index = () => {
  const [hindiWord, setHindiWord] = useState("");
  const [convertedText, setConvertedText] = useState("");
  const [result, setResult] = useState<{
    characters: string[];
    numbers: string[];
    pin4: string;
    pin6: string;
  } | null>(null);
  const [error, setError] = useState("");

  const getDevanagariNumber = (char: string): string | null => {
    const mapping: Record<string, string> = {
      'अ': '31', 'आ': '311', 'इ': '5', 'ई': '5', 'उ': '3', 'ऊ': '3',
      'ए': '1', 'ऐ': '1', 'ओ': '311', 'औ': '311', 'क': '9', 'ख': '21',
      'ग': '1', 'घ': '1', 'ङ': '5', 'च': '1', 'छ': '8', 'ज': '1',
      'झ': '51', 'ञ': '01', 'ठ': '0', 'ड': '5', 'ढ': '6', 'ण': '01',
      'त': '7', 'थ': '1', 'द': '6', 'ध': '1', 'न': '7', 'प': '4',
      'फ': '4', 'ब': '9', 'भ': '4', 'म': '4', 'य': '4', 'र': '2',
      'ल': '1', 'व': '9', 'श': '21', 'ष': '4', 'स': '21', 'ह': '5',
      'ा': '1', 'ि': '1', 'ी': '1', 'ो': '1', 'ौ': '1', 'ू': '9', 'ु': '6'
    };
    return mapping[char] || null;
  };

  const processWord = (word: string) => {
    const allowedMatras = new Set(['ा', 'ि', 'ी', 'ो', 'ौ', 'ु', 'ू']);
    const characters = Array.from(word).filter(
      char => allowedMatras.has(char) || (char >= 'अ' && char <= 'ह')
    );
    
    const numbers: string[] = [];
    for (const char of word) {
      const num = getDevanagariNumber(char);
      if (num) {
        numbers.push(num);
      }
    }
    
    const pin = numbers.join("");
    
    let pin4: string, pin6: string;
    
    if (pin.length === 3) {
      const doubled = pin + pin;
      pin6 = doubled;
      pin4 = doubled.slice(0, 4);
    } else if (pin.length === 4) {
      const doubled = pin + pin;
      pin6 = doubled.slice(0, 6);
      pin4 = doubled.slice(0, 4);
    } else {
      pin4 = pin.slice(0, 4);
      pin6 = pin.slice(0, 6);
    }
    
    return { characters, numbers, pin4, pin6 };
  };

  const handleGenerate = () => {
    setError("");
    setResult(null);
    setConvertedText("");

    if (!hindiWord.trim()) {
      setError("कृपया देवनागरी शब्द दर्ज करें");
      return;
    }

    if (/\d/.test(hindiWord)) {
      setError("अमान्य इनपुट। कृपया देवनागरी शब्द दर्ज करें");
      return;
    }

    let wordToProcess = hindiWord;

    // Check if input is ASCII (English)
    if (/^[a-zA-Z]+$/.test(hindiWord)) {
      try {
        // Convert English to Devanagari using ITRANS scheme
        const converted = Sanscript.t(hindiWord.toLowerCase(), 'itrans', 'devanagari');
        setConvertedText(converted);
        wordToProcess = converted;
      } catch (err) {
        setError("अनुवाद में त्रुटि। कृपया देवनागरी में लिखें।");
        return;
      }
    }

    try {
      const processed = processWord(wordToProcess);
      setResult(processed);
      toast.success("PIN सफलतापूर्वक जनरेट किया गया!");
    } catch (err) {
      setError("प्रोसेसिंग में त्रुटि। कृपया पुनः प्रयास करें।");
    }
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} कॉपी किया गया!`);
  };

  return (
    <div className="min-h-screen bg-gradient-background">
      <Navbar />
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-primary rounded-2xl mb-6 shadow-accent">
            <Lock className="w-10 h-10 text-primary-foreground" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            देवनागरी UPI PIN जेनरेटर
          </h1>
          <p className="text-lg text-muted-foreground">
            अपने देवनागरी शब्द को सुरक्षित UPI PIN में बदलें
          </p>
        </div>

        {/* Input Card */}
        <Card className="p-8 mb-8 shadow-medium animate-slide-up border-border">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                देवनागरी शब्द दर्ज करें (उदाहरण: भारद्वाज, पर्व) या English में लिखें
              </label>
              <div className="flex gap-3">
                <Input
                  type="text"
                  value={hindiWord}
                  onChange={(e) => setHindiWord(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleGenerate()}
                  placeholder="यहां टाइप करें या bharat..."
                  className="text-2xl py-6 border-border focus:border-primary focus:ring-primary"
                  dir="auto"
                />
                <Button
                  onClick={handleGenerate}
                  className="px-8 bg-gradient-primary hover:opacity-90 transition-opacity shadow-accent"
                  size="lg"
                >
                  जनरेट करें
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
              {convertedText && (
                <p className="mt-2 text-sm text-primary animate-fade-in">
                  देवनागरी में परिवर्तित: <span className="text-xl font-semibold">{convertedText}</span>
                </p>
              )}
              {error && (
                <p className="mt-2 text-sm text-destructive animate-fade-in">{error}</p>
              )}
            </div>
          </div>
        </Card>

        {/* Results */}
        {result && (
          <div className="space-y-6 animate-slide-up">
            {/* Character Breakdown */}
            <Card className="p-6 shadow-medium border-border">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                शब्द विभाजन
              </h3>
              <div className="flex flex-wrap gap-3 mb-4">
                {result.characters.map((char, idx) => (
                  <div
                    key={idx}
                    className="px-4 py-2 bg-secondary rounded-lg text-2xl text-secondary-foreground shadow-subtle"
                  >
                    {char}
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-3">
                {result.numbers.map((num, idx) => (
                  <div
                    key={idx}
                    className="px-4 py-2 bg-primary/10 rounded-lg text-xl font-mono text-primary border border-primary/20"
                  >
                    {num}
                  </div>
                ))}
              </div>
            </Card>

            {/* PIN Results */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* 4-Digit PIN */}
              <Card className="p-6 bg-gradient-primary shadow-accent border-0">
                <div className="text-center">
                  <p className="text-primary-foreground/80 text-sm font-medium mb-2">
                    4 अंकों का PIN
                  </p>
                  <div className="text-5xl font-bold text-primary-foreground mb-4 font-mono tracking-wider">
                    {result.pin4}
                  </div>
                  <Button
                    onClick={() => copyToClipboard(result.pin4, "4 अंकों का PIN")}
                    variant="secondary"
                    size="sm"
                    className="w-full"
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    कॉपी करें
                  </Button>
                </div>
              </Card>

              {/* 6-Digit PIN */}
              <Card className="p-6 bg-gradient-accent shadow-accent border-0">
                <div className="text-center">
                  <p className="text-accent-foreground/80 text-sm font-medium mb-2">
                    6 अंकों का PIN
                  </p>
                  <div className="text-5xl font-bold text-accent-foreground mb-4 font-mono tracking-wider">
                    {result.pin6}
                  </div>
                  <Button
                    onClick={() => copyToClipboard(result.pin6, "6 अंकों का PIN")}
                    variant="secondary"
                    size="sm"
                    className="w-full"
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    कॉपी करें
                  </Button>
                </div>
              </Card>
            </div>

            {/* Security Note */}
            <Card className="p-4 bg-muted/50 border-border">
              <p className="text-sm text-muted-foreground text-center">
                🔒 अपने PIN को सुरक्षित रखें और किसी के साथ साझा न करें
              </p>
            </Card>
          </div>
        )}

        {/* Info Section */}
        <Card className="mt-8 p-6 shadow-subtle border-border">
          <h3 className="text-lg font-semibold text-foreground mb-3">
            कैसे उपयोग करें?
          </h3>
          <ul className="space-y-2 text-muted-foreground">
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              कोई भी देवनागरी शब्द दर्ज करें या English में लिखें (जैसे: bharat → भरत)
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              प्रत्येक अक्षर एक विशिष्ट संख्या में परिवर्तित हो जाता है
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              याद रखने में आसान और सुरक्षित PIN बनाएं
            </li>
          </ul>
        </Card>
      </div>
    </div>
  );
};

export default Index;
