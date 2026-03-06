import React, { useState } from 'react';

const qaData = [
  {
    id: 'q1',
    question: '어떤 규모의 프로젝트를 주로 진행하시나요?',
    answer: '아이파트너즈는 스타트업부터 대기업까지 다양한 규모의 프로젝트를 성공적으로 수행한 경험이 있습니다. 고객의 비즈니스 목표와 예산에 맞춰 최적화된 솔루션을 제안하며, 프로젝트 규모에 관계없이 최고의 품질을 보장합니다.'
  },
  {
    id: 'q2',
    question: 'AI 기반 솔루션 도입 시 어떤 이점이 있나요?',
    answer: 'AI 솔루션 도입은 업무 자동화, 데이터 기반 의사결정, 고객 경험 개선 등 다양한 이점을 제공합니다. 이를 통해 기업은 운영 효율성을 높이고 새로운 비즈니스 기회를 창출할 수 있습니다.'
  },
  {
    id: 'q3',
    question: '프로젝트 진행 과정은 어떻게 되나요?',
    answer: '요구사항 분석, 전략 수립, 디자인 및 개발, 테스트, 런칭, 유지보수의 단계로 진행됩니다. 각 단계마다 고객과 긴밀하게 소통하며 프로젝트를 성공적으로 이끕니다.'
  },
  {
    id: 'q4',
    question: '유지보수 및 사후 관리는 어떻게 이루어지나요?',
    answer: '프로젝트 완료 후에도 안정적인 서비스 운영을 위한 지속적인 모니터링과 유지보수 서비스를 제공합니다. 시스템 업데이트, 버그 수정, 기능 개선 등을 지원합니다.'
  },
  {
    id: 'q5',
    question: '견적 문의는 어떻게 할 수 있나요?',
    answer: '홈페이지 하단의 연락처나 이메일을 통해 문의해주시면, 담당자가 신속하게 답변해 드립니다. 프로젝트 개요를 함께 보내주시면 더욱 정확한 상담이 가능합니다.'
  }
];

const QuestionsAnswersSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(qaData[0].id);

  const toggleAccordion = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="py-24 md:py-32 px-6 bg-[#f9fafb] text-black border-t border-gray-100">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-6">
          <span className="text-[10px] font-bold text-blue-600 tracking-widest uppercase mb-4 block">
            FAQ
          </span>
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-none mb-4 relative inline-block">
            QUESTIONS?<br />
            ANSWERS
            <span className="absolute bottom-2 -right-6 w-3 h-3 bg-blue-600 rounded-full"></span>
          </h2>
          <p className="text-sm text-gray-500">
            자주 묻는 질문에 대한 답변을 확인해보세요.
          </p>
        </div>

        <div className="text-left mt-16 border-t border-gray-200">
          {qaData.map((item) => (
            <div key={item.id} className="border-b border-gray-200">
              <button
                className="w-full py-6 flex justify-between items-center text-left focus:outline-none group"
                onClick={() => toggleAccordion(item.id)}
              >
                <span className="text-lg font-bold group-hover:text-blue-600 transition-colors">
                  {item.question}
                </span>
                <span className="text-2xl text-gray-400 group-hover:text-blue-600 transition-colors">
                  {openId === item.id ? '−' : '+'}
                </span>
              </button>
              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${openId === item.id ? 'max-h-96 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <p className="text-sm text-gray-500 leading-relaxed pr-12">
                  {item.answer}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16">
          <p className="text-sm text-gray-500">
            더 궁금한 점이 있으신가요? <a href="mailto:contact@ipartners.co.kr" className="text-blue-600 font-bold hover:underline">contact@ipartners.co.kr</a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default QuestionsAnswersSection;
