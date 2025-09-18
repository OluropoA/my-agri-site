"use client";

const ContactMap = () => {
  return (
    <div className="h-80 md:h-96 rounded-xl overflow-hidden border border-gray-200 shadow-md">
      <div className="relative w-full h-full bg-brand-ivory/50">
        {/* In a real application, you would include an actual map integration */}
        {/* For now, we'll simulate a map with a placeholder */}
        <div className="absolute inset-0 flex items-center justify-center flex-col">
          <div className="w-12 h-12 bg-brand-green rounded-full flex items-center justify-center mb-2">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6 text-white" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" 
              />
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" 
              />
            </svg>
          </div>
          <p className="text-brand-charcoal font-medium text-center px-4 font-primary">
            Nnamdi Azikiwe University<br />
            Awka, Anambra State<br />
            Nigeria
          </p>
          <p className="text-sm text-brand-charcoal/60 mt-2 font-secondary">
            Interactive map will be implemented in production
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactMap;
