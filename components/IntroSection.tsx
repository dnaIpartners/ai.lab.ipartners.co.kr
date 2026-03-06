import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'motion/react';
import { PieChart, Layers, Smile, User, Settings, DollarSign, Activity, Cpu, Database, Cloud } from 'lucide-react';

const AnimatedChar = ({ char, progress, range }: { char: string, progress: MotionValue<number>, range: [number, number] }) => {
  const color = useTransform(progress, range, ["#D1D5DB", "#000000"]);
  return (
    <motion.span style={{ color }}>
      {char}
    </motion.span>
  );
};

export default function IntroSection() {
  const textRef = useRef<HTMLHeadingElement>(null);
  const { scrollYProgress } = useScroll({
    target: textRef,
    offset: ["start 85%", "end 50%"]
  });

  const text1 = "기존 에이전시의 한계를 넘어,";
  const text2 = "IPARTNERS는 완벽한 AI 전환(AX)을 통해 지속 가능한 성장을 함께 이끄는 디지털 혁신 파트너가 되겠습니다.";
  const totalChars = text1.length + text2.length;

  return (
    <section className="py-24 md:py-32 bg-[#F8F8F8] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Existing About Content */}
        <div className="mb-20">
          <h3 className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-6">ABOUT IPARTNERS AI DIVISION</h3>
          <h2 ref={textRef} className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 leading-tight break-keep"> 
            <span>
              {text1.split('').map((char, i) => {
                const start = i / totalChars;
                const end = start + (1 / totalChars);
                return <AnimatedChar key={i} char={char} progress={scrollYProgress} range={[start, end]} />;
              })}
            </span>
            <br className="hidden md:block" />
            {text2.split('').map((char, i) => {
              const start = (text1.length + i) / totalChars;
              const end = start + (1 / totalChars);
              return <AnimatedChar key={i} char={char} progress={scrollYProgress} range={[start, end]} />;
            })}
          </h2>
          <p className="text-lg md:text-xl text-gray-500 max-w-7xl break-keep leading-relaxed font-light">        
            내부 프로세스에 최신 AI 기술을 완벽히 내재화해 비효율적인 반복 작업을 없애고, 구축 리드타임을 획기적으로 단축합니다. <br className="hidden md:block" />시스템화된 '지능형 워크플로우(AI-Human Intelligent Workflow)'로 전 팀원의 역량을 상향 평준화하여, 변함없이 안정적이고 완성도 높은 최상의 디지털 경험을 제공합니다.
          </p>
        </div>


        {/* New i-PIE Section */}
        <div className="mt-20 pt-24 border-t border-gray-200">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-sm font-bold tracking-[0.2em] text-[#0033FF] uppercase mb-6">New AI DIVISION</h3>
              <h2 className="text-5xl md:text-7xl font-black text-gray-900 mb-6 tracking-tighter">i-PIE</h2>
              <p className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 font-serif italic">"The Perfect Recipe for Success."</p>
              <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto break-keep leading-relaxed font-light">
                복잡한 기술을 조합하는 것이 아니라, 아이파트너즈의 경험과 AI를 통해<br className="hidden md:block" />
                성공을 위한 최적의 조합을 만들어내는 조직
              </p>
            </motion.div>
          </div>

          {/* Why Choose Us Section (Neumorphic Style) */}
          <div className="mt-8 pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {/* Card 1 */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-[#FDFDFD] p-8 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white flex flex-col items-center text-center"
              >
                <div className="h-48 flex items-center justify-center mb-8 relative w-full">
                  {/* Background grid/data representation */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-20">
                    <div className="w-32 h-32 border border-gray-300 rounded-full border-dashed animate-[spin_20s_linear_infinite]"></div>
                    <div className="absolute w-24 h-24 border border-gray-300 rounded-full border-dashed animate-[spin_15s_linear_infinite_reverse]"></div>
                  </div>

                  <div className="relative w-32 h-32 flex items-center justify-center">
                    {/* Base Pie (Full circle) */}
                    <div className="absolute inset-0 rounded-full bg-white shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-gray-100"></div>
                    
                    {/* Recessed area for the slice */}
                    <div className="absolute top-0 right-0 w-16 h-16 bg-gray-50 rounded-tr-full shadow-[inset_2px_2px_8px_rgba(0,0,0,0.05)] border-l border-b border-gray-200/50 overflow-hidden">
                       {/* Glowing Insight Dot inside the recess */}
                       <div className="relative w-full h-full flex items-end justify-start pb-2 pl-2">
                         <motion.div 
                           animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                           transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                           className="absolute w-8 h-8 bg-[#0033FF] rounded-full blur-md"
                         />
                         <div className="relative z-10 w-3 h-3 bg-white rounded-full shadow-[0_0_10px_rgba(0,51,255,0.8)]"></div>
                       </div>
                    </div>

                    {/* The Floating Slice (Extracting Insight) */}
                    <motion.div 
                      animate={{ 
                        x: [0, 24, 24, 0], 
                        y: [0, -24, -24, 0], 
                        rotate: [0, 15, 15, 0],
                        scale: [1, 1.1, 1.1, 1]
                      }}
                      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", times: [0, 0.3, 0.7, 1] }}
                      className="absolute top-0 right-0 w-16 h-16 bg-white rounded-tr-full shadow-[inset_0_2px_5px_rgba(255,255,255,1),-8px_8px_20px_rgba(0,0,0,0.1)] border border-gray-100 origin-bottom-left flex items-center justify-center z-20 overflow-hidden"
                    >
                      {/* Data lines inside the extracted slice */}
                      <div className="absolute bottom-3 left-3 flex flex-col gap-1.5 rotate-45 origin-bottom-left">
                        <motion.div 
                          animate={{ width: ['0px', '20px', '20px', '0px'] }}
                          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", times: [0, 0.3, 0.7, 1] }}
                          className="h-1 bg-[#0033FF] rounded-full"
                        />
                        <motion.div 
                          animate={{ width: ['0px', '12px', '12px', '0px'] }}
                          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", times: [0, 0.3, 0.7, 1], delay: 0.1 }}
                          className="h-1 bg-[#0033FF]/60 rounded-full"
                        />
                        <motion.div 
                          animate={{ width: ['0px', '16px', '16px', '0px'] }}
                          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", times: [0, 0.3, 0.7, 1], delay: 0.2 }}
                          className="h-1 bg-[#0033FF]/30 rounded-full"
                        />
                      </div>
                    </motion.div>
                    
                    {/* Center dot to anchor the pie */}
                    <div className="absolute w-8 h-8 bg-white rounded-full shadow-[0_2px_10px_rgba(0,0,0,0.1)] border border-gray-50 z-30 flex items-center justify-center">
                      <div className="w-2 h-2 bg-gray-200 rounded-full"></div>
                    </div>
                  </div>
                  
                  {/* Floating data particles around */}
                  <motion.div 
                    animate={{ y: [0, -15, 0], opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-8 right-12 w-2 h-2 rounded-full bg-[#0033FF]"
                  />
                  <motion.div 
                    animate={{ y: [0, -20, 0], opacity: [0, 0.8, 0], scale: [0.5, 1.2, 0.5] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute top-12 right-20 w-1.5 h-1.5 rounded-full bg-[#0033FF]/60"
                  />
                  <motion.div 
                    animate={{ y: [0, -10, 0], opacity: [0, 0.6, 0], scale: [0.5, 0.8, 0.5] }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                    className="absolute top-4 right-16 w-2.5 h-2.5 rounded-full bg-[#0033FF]/40"
                  />
                </div>
                <h4 className="text-xl font-medium text-gray-900 mb-3">A Slice of Insight</h4>
                <p className="text-gray-500 text-sm leading-relaxed">
                파이 한 조각을 떼어내듯, <br className="hidden md:block" />방대한 데이터 속에서 클라이언트가 바로 실행할 수 있는 핵심만 골라냅니다.
                </p>
              </motion.div>

              {/* Card 2 */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-[#FDFDFD] p-8 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white flex flex-col items-center text-center"
              >
                <div className="h-48 flex flex-col items-center justify-center mb-8 relative w-full">
                  {/* Floating particles */}
                  <motion.div 
                    animate={{ y: [0, -15, 0], opacity: [0.3, 0.8, 0.3] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-6 left-8 w-3 h-3 rounded-full bg-[#0033FF]/20 border border-[#0033FF]/30"
                  />
                  <motion.div 
                    animate={{ y: [0, 15, 0], opacity: [0.3, 0.8, 0.3] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute bottom-8 right-8 w-4 h-4 rounded-full bg-[#0033FF]/20 border border-[#0033FF]/30"
                  />

                  <div className="relative w-full h-full flex flex-col items-center justify-center" style={{ perspective: '1000px' }}>
                    <motion.div 
                      className="relative w-24 h-24 mt-12"
                      initial={{ rotateX: 60, rotateZ: -45 }}
                      style={{ transformStyle: 'preserve-3d' }}
                    >
                      {/* Bottom Layer: Data */}
                      <motion.div 
                        animate={{ z: [0, -5, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
                        className="absolute inset-0 bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-center shadow-sm"
                      >
                        <span className="text-[9px] font-bold text-gray-400 tracking-widest rotate-45">DATA BASE</span>
                      </motion.div>

                      {/* Middle Layer: AI Logic */}
                      <motion.div 
                        animate={{ 
                          z: [30, 40, 30], 
                          boxShadow: ['0 5px 15px rgba(0,51,255,0.05)', '0 10px 25px rgba(0,51,255,0.15)', '0 5px 15px rgba(0,51,255,0.05)'] 
                        }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                        className="absolute inset-0 bg-[#0033FF]/5 border border-[#0033FF]/30 backdrop-blur-sm rounded-xl flex items-center justify-center"
                      >
                        <span className="font-black text-[#0033FF] tracking-tighter text-base rotate-45">i-PIE</span>
                      </motion.div>

                      {/* Top Layer: Creative */}
                      <motion.div 
                        animate={{ z: [60, 80, 60] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0 }}
                        className="absolute inset-0 bg-white/80 border border-white backdrop-blur-md rounded-xl flex items-center justify-center shadow-lg"
                      >
                        <span className="text-[9px] font-bold text-gray-800 tracking-widest rotate-45">CREATIVE</span>
                      </motion.div>
                    </motion.div>
                  </div>
                </div>
                <h4 className="text-xl font-medium text-gray-900 mb-3">Layered Strategy</h4>
                <p className="text-gray-500 text-sm leading-relaxed">
                파이의 단면처럼 전략도 층층이 쌓입니다. <br className="hidden md:block" />견고한 데이터 기반 위에 AI 로직을 얹고, <br className="hidden md:block" />그 위에 크리에이티브한 결과물을 완성합니다.
                </p>
              </motion.div>
 
              {/* Card 3 */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-[#FDFDFD] p-8 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white flex flex-col items-center text-center"
              >
                <div className="h-48 flex items-center justify-center mb-8 relative w-full">
                  {/* Orbiting Track */}
                  <div className="absolute w-36 h-36 rounded-full border border-gray-100/50"></div>
                  
                  {/* Orbiting Elements Container */}
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="absolute w-36 h-36 rounded-full z-20"
                  >
                    {/* Tech Icon 1 (0 deg) */}
                    <motion.div 
                      animate={{ rotate: -360 }}
                      transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                      className="absolute w-10 h-10 bg-[#FDFDFD] rounded-full shadow-[inset_0_2px_5px_rgba(255,255,255,1),0_5px_15px_rgba(0,0,0,0.08)] flex items-center justify-center border border-white"
                      style={{ top: '-20px', left: '52px' }}
                    >
                      <Settings className="w-4 h-4 text-gray-400" />
                    </motion.div>
                    
                    {/* Tech Icon 2 (060 deg) */}
                    <motion.div 
                      animate={{ rotate: -360 }}
                      transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                      className="absolute w-10 h-10 bg-[#FDFDFD] rounded-full shadow-[inset_0_2px_5px_rgba(255,255,255,1),0_5px_15px_rgba(0,0,0,0.08)] flex items-center justify-center border border-white"
                      style={{ top: '16px', left: '114px' }}
                    >
                      <Activity className="w-4 h-4 text-gray-400" />
                    </motion.div>

                    {/* Tech Icon 3 (120 deg) */}
                    <motion.div 
                      animate={{ rotate: -360 }}
                      transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                      className="absolute w-10 h-10 bg-[#FDFDFD] rounded-full shadow-[inset_0_2px_5px_rgba(255,255,255,1),0_5px_15px_rgba(0,0,0,0.08)] flex items-center justify-center border border-white"
                      style={{ top: '88px', left: '114px' }}
                    >
                      <Layers className="w-4 h-4 text-gray-400" />
                    </motion.div>

                    {/* Tech Icon 4 (180 deg) */}
                    <motion.div 
                      animate={{ rotate: -360 }}
                      transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                      className="absolute w-10 h-10 bg-[#FDFDFD] rounded-full shadow-[inset_0_2px_5px_rgba(255,255,255,1),0_5px_15px_rgba(0,0,0,0.08)] flex items-center justify-center border border-white"
                      style={{ top: '124px', left: '52px' }}
                    >
                      <Cpu className="w-4 h-4 text-gray-400" />
                    </motion.div>

                    {/* Tech Icon 5 (240 deg) */}
                    <motion.div 
                      animate={{ rotate: -360 }}
                      transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                      className="absolute w-10 h-10 bg-[#FDFDFD] rounded-full shadow-[inset_0_2px_5px_rgba(255,255,255,1),0_5px_15px_rgba(0,0,0,0.08)] flex items-center justify-center border border-white"
                      style={{ top: '88px', left: '-10px' }}
                    >
                      <Database className="w-4 h-4 text-gray-400" />
                    </motion.div>

                    {/* Tech Icon 6 (300 deg) */}
                    <motion.div 
                      animate={{ rotate: -360 }}
                      transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                      className="absolute w-10 h-10 bg-[#FDFDFD] rounded-full shadow-[inset_0_2px_5px_rgba(255,255,255,1),0_5px_15px_rgba(0,0,0,0.08)] flex items-center justify-center border border-white"
                      style={{ top: '16px', left: '-10px' }}
                    >
                      <Cloud className="w-4 h-4 text-gray-400" />
                    </motion.div>
                  </motion.div>

                  {/* Central Element: Easy as Pie */}
                  <div className="relative z-10 flex items-center justify-center">
                    {/* Glowing background */}
                    <motion.div 
                      animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute w-32 h-32 rounded-full bg-[#0033FF]/10 blur-xl"
                    />
                    
                    <div className="w-24 h-24 relative flex items-center justify-center">
                      {/* Base Pie */}
                      <div className="absolute inset-0 rounded-full bg-white shadow-[0_10px_30px_rgba(0,0,0,0.08)] border border-gray-100"></div>
                      
                      {/* Recessed slot for the slice */}
                      <div className="absolute top-0 right-0 w-12 h-12 bg-gray-50 rounded-tr-full shadow-[inset_3px_3px_8px_rgba(0,0,0,0.05)] border-l border-b border-gray-200/50"></div>
                      
                      {/* Animated Slice */}
                      <motion.div 
                        animate={{ 
                          x: [20, 0, 0, 20], 
                          y: [-20, 0, 0, -20],
                          rotate: [15, 0, 0, 15],
                          opacity: [0.8, 1, 1, 0.8]
                        }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", times: [0, 0.2, 0.8, 1] }}
                        className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-bl from-[#0033FF] to-[#001188] rounded-tr-full shadow-[4px_-4px_15px_rgba(0,51,255,0.3)] border border-white/30 z-20 origin-bottom-left"
                      />

                      {/* Center Hub */}
                      <motion.div 
                        animate={{ scale: [0.95, 1.05, 1.05, 0.95], boxShadow: ['0 2px 10px rgba(0,0,0,0.05)', '0 5px 20px rgba(0,51,255,0.2)', '0 5px 20px rgba(0,51,255,0.2)', '0 2px 10px rgba(0,0,0,0.05)'] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", times: [0, 0.2, 0.8, 1] }}
                        className="relative z-30 bg-white w-14 h-14 rounded-full flex items-center justify-center border border-gray-50"
                      >
                        <span className="font-black text-[#0033FF] tracking-tighter text-base">i-PIE</span>
                      </motion.div>
                    </div>
                  </div>
                </div>
                <h4 className="text-xl font-medium text-gray-900 mb-3">Easy as Pie</h4>
                <p className="text-gray-500 text-sm leading-relaxed">
                 복잡한 AI 기술도 아이파트너즈를 만나면<br className="hidden md:block" /> 파이처럼 쉽고 달콤한 경험이 됩니다.
                </p>
              </motion.div>
            </div>

            {/* Bottom Tags (Marquee) */}
            <div className="relative flex overflow-hidden w-full py-4 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
              <motion.div
                className="flex whitespace-nowrap gap-3 w-max"
                animate={{ x: ["0%", "-50%"] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                {[
                  { name: 'Scalable Solutions', icon: <Layers size={14} /> },
                  { name: 'Consistent Operations', icon: <Smile size={14} /> },
                  { name: 'Cost Effective', icon: <DollarSign size={14} /> },
                  { name: 'Quality Upgrades', icon: <Activity size={14} /> },
                  { name: 'Knowledge Assetization', icon: <Settings size={14} /> },
                   { name: 'Scalable Solutions', icon: <Layers size={14} /> },
                  { name: 'Consistent Operations', icon: <Smile size={14} /> },
                  { name: 'Cost Effective', icon: <DollarSign size={14} /> },
                  { name: 'Quality Upgrades', icon: <Activity size={14} /> },
                  { name: 'Knowledge Assetization', icon: <Settings size={14} /> },
                ].map((tag, i) => (
                  <div key={i} className="bg-white px-5 py-2.5 rounded-full shadow-sm border border-gray-100 text-sm text-gray-600 flex items-center gap-2 shrink-0">
                    <span className="text-gray-400">{tag.icon}</span>
                    {tag.name}
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
