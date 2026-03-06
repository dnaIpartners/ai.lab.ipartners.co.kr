import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="relative z-10 min-h-screen flex items-center justify-center bg-[#FFFFFF]">
      
      {/* Ambient Background - Extended to bleed into the next section (IntroSection) completely */}
      <div className="absolute top-0 left-0 w-full h-[200%] pointer-events-none overflow-hidden z-0">
        {/* Light Gray Orb 1 */}
        <div className="absolute top-[-5%] left-[-10%] w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] bg-[#E2E2E2] rounded-full mix-blend-multiply filter blur-[80px] opacity-90 animate-ambient-slow"></div>
        
        {/* Blue Orb 1 */}
        <div className="absolute top-[10%] right-[-5%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] bg-[#0033FF] rounded-full mix-blend-multiply filter blur-[90px] opacity-40 animate-ambient-medium" style={{ animationDelay: '1s' }}></div>
        
        {/* Light Gray Orb 2 - Moved lower to cover IntroSection */}
        <div className="absolute top-[45%] right-[10%] w-[55vw] h-[55vw] max-w-[700px] max-h-[700px] bg-[#E2E2E2] rounded-full mix-blend-multiply filter blur-[80px] opacity-80 animate-ambient-slow" style={{ animationDelay: '2s' }}></div>
        
        {/* Blue Orb 2 - Moved lower to cover IntroSection */}
        <div className="absolute top-[55%] left-[5%] w-[45vw] h-[45vw] max-w-[500px] max-h-[500px] bg-[#0033FF] rounded-full mix-blend-multiply filter blur-[80px] opacity-35 animate-ambient-fast" style={{ animationDelay: '0.5s' }}></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-center px-6 w-full max-w-5xl mx-auto opacity-0 animate-[fadeIn_1s_ease-out_forwards]">
        <h1 className="text-5xl md:text-7xl lg:text-[100px] font-black tracking-tighter text-[#111827] leading-[1.15] mb-12">
          Work <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#001641] to-[#0033FF] pb-2">smarter.</span><br />
          Communicate <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#001641] to-[#0033FF] pb-2">faster.</span><br />
          Scale <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#001641] to-[#0033FF] pb-2">further.</span>
        </h1>
        
        <div className="flex flex-col items-center mt-12 md:mt-20">
          <div className="w-64 md:w-96 h-px bg-gray-200 mb-8"></div>
          <p className="text-gray-500 text-sm md:text-base font-medium tracking-wide">
            브랜드가 일하고, 소통하고, 성장하는 방식을 AI로 재설계합니다.
          </p>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes ambient {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(60px, -90px) scale(1.15); }
          66% { transform: translate(-40px, 50px) scale(0.85); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-ambient-slow {
          animation: ambient 10s infinite alternate ease-in-out;
        }
        .animate-ambient-medium {
          animation: ambient 8s infinite alternate ease-in-out;
        }
        .animate-ambient-fast {
          animation: ambient 5s infinite alternate ease-in-out;
        }
      `}</style>
    </section>
  );
};

export default Hero;
