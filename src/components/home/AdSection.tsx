
import React from 'react';

const AdSection = () => {
  React.useEffect(() => {
    // Load Google AdSense script
    const loadAdSense = () => {
      const script = document.createElement('script');
      script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXX';
      script.async = true;
      script.crossOrigin = 'anonymous';
      document.head.appendChild(script);
    };

    // Call the function to load the script
    loadAdSense();
  }, []);

  return (
    <div className="py-8 bg-white">
      <div className="container-lg">
        <div className="text-center text-gray-500 text-xs mb-2">ADVERTISEMENT</div>
        <div className="flex justify-center">
          {/* AdSense ad placeholder - replace with actual AdSense code */}
          <div
            className="w-full max-w-4xl h-[250px] bg-gray-100 flex items-center justify-center rounded-md"
            id="ad-container"
          >
            <p className="text-gray-400">
              Google AdSense Advertisement
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdSection;
