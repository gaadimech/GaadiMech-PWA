import React from 'react';

const SeoKeywords = () => {
  const keywords = [
    // Location-based service keywords
    "car mechanic near me",
    "car mechanic",
    "car mechanic shop near me",
    "nearby car mechanic",
    "car ac mechanic near me",
    
    "car service center near me",
    "car service near me",
    "car service",
    "car ac service near me",
    "car towing service near me",
    
    "car repair",
    "car repair near me",
    "car ac repair near me",
    "car repair shops near me",
    "car dent repair near me",

    // Service type keywords
    "Vehicle repair services",
    "Car maintenance experts",
    "Automotive mechanics",
    "Auto repair shop",
    "Car service center",

    "Vehicle diagnostics",
    "Brake repair services",
    "Engine tuning experts",
    "Oil change services",
    "Affordable car repairs",

    "Transmission services",
    "Tire alignment specialists",
    "Battery replacement",
    "Suspension repair",
    "Vehicle inspection services",

    "Auto AC repair",
    "Wheel balancing services",
    "Exhaust system repair",
    "Professional auto mechanics",
    "Full-service auto repair",

    "Clutch repair services",
    "Affordable vehicle maintenance",
    "Automobile repair solutions",
    "Reliable car service",
    "Check engine light diagnostics",

    "Emission testing center",
    "Local car repair shop",
    "Timing belt replacement",
    "Car Service at Home",
    "Car Service at Home near me",
  ];

  // Split keywords into lines for better readability
  const lines = [
    keywords.slice(0, 5),   // First line
    keywords.slice(5, 10),  // Second line
    keywords.slice(10, 15), // Third line
    keywords.slice(15, 20), // Fourth line
    keywords.slice(20, 25), // Fifth line
    keywords.slice(25, 30), // Sixth line
    keywords.slice(30, 35), // Seventh line
    keywords.slice(35, 40), // Eighth line
    keywords.slice(40),     // Last line
  ];

  return (
    <section className="py-6 bg-gray-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-3">
          {lines.map((line, lineIndex) => (
            <div 
              key={lineIndex} 
              className="text-[11px] md:text-xs leading-relaxed text-gray-500/90 font-light"
            >
              {line.map((keyword, keywordIndex) => (
                <React.Fragment key={keywordIndex}>
                  <span className="hover:text-gray-600 transition-colors cursor-default whitespace-nowrap">
                    {keyword}
                  </span>
                  {keywordIndex < line.length - 1 && (
                    <span className="text-gray-300 mx-1.5">|</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SeoKeywords; 