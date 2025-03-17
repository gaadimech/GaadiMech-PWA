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

  // Create responsive line breaks
  const getMobileLines = () => {
    const mobileLines = [];
    for (let i = 0; i < keywords.length; i += 3) {
      mobileLines.push(keywords.slice(i, i + 3));
    }
    return mobileLines;
  };

  const getDesktopLines = () => {
    const desktopLines = [];
    for (let i = 0; i < keywords.length; i += 5) {
      desktopLines.push(keywords.slice(i, i + 5));
    }
    return desktopLines;
  };

  return (
    <section className="py-4 bg-gray-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mobile View */}
        <div className="space-y-2 md:hidden">
          {getMobileLines().map((line, lineIndex) => (
            <div 
              key={lineIndex} 
              className="text-[9px] leading-relaxed text-gray-400 font-light flex flex-wrap"
            >
              {line.map((keyword, keywordIndex) => (
                <React.Fragment key={keywordIndex}>
                  <span className="hover:text-gray-600 transition-colors cursor-default">
                    {keyword}
                  </span>
                  {keywordIndex < line.length - 1 && (
                    <span className="text-gray-300 mx-1">|</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          ))}
        </div>

        {/* Desktop View */}
        <div className="hidden md:block space-y-2">
          {getDesktopLines().map((line, lineIndex) => (
            <div 
              key={lineIndex} 
              className="text-xs leading-relaxed text-gray-400 font-light"
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