import React, { useState } from 'react';
import { askSecurityQuestion } from '../services/gemini';
import { ChevronDown, ChevronUp, Search, Lock, Shield, Server, Terminal, BookOpen } from 'lucide-react';

const bestPractices = [
  {
    title: 'การยืนยันตัวตนและการเข้าถึง',
    description: 'ใช้เครื่องมือต่างๆ เช่น การรับรองความถูกต้องด้วยสองปัจจัย (2FA) และโทเค็นการเข้าถึงส่วนบุคคล (PATs) เพื่อจัดการการเข้าถึงอย่างปลอดภัย',
    icon: Lock
  },
  {
    title: 'การตรวจจับตั้งแต่เนิ่นๆ',
    description: 'ใช้ Docker Scout หรือเครื่องมือสแกนอื่นๆ เพื่อตรวจจับช่องโหว่ตั้งแต่เนิ่นๆ ในเวิร์กโฟลว์ของคุณก่อนที่จะนำไปใช้งานจริง',
    icon: Search
  },
  {
    title: 'การจัดการความลับ',
    description: 'รวมข้อมูลลับ (Secrets) เข้ากับสแต็กการพัฒนาของคุณอย่างปลอดภัย ห้ามฮาร์ดโค้ดรหัสผ่านลงใน Dockerfile หรือตัวแปรสภาพแวดล้อมโดยตรง',
    icon: Shield
  },
  {
    title: 'Minimal Base Images',
    description: 'ใช้อิมเมจ Distroless หรือ Alpine เพื่อลดพื้นผิวการโจมตีโดยการลบเชลล์และตัวจัดการแพ็คเกจที่ไม่จำเป็นออก',
    icon: Server
  }
];

const faqs = [
  {
    q: "เอกสาร VEX คืออะไร?",
    a: "Vulnerability Exploitability eXchange (VEX) เป็นมาตรฐานที่ใช้สื่อสารสถานะของช่องโหว่ในผลิตภัณฑ์ซอฟต์แวร์ ช่วยให้ผู้ขายสามารถระบุได้ว่าผลิตภัณฑ์ได้รับผลกระทบจากช่องโหว่เฉพาะหรือไม่"
  },
  {
    q: "ฉันจะลดผลบวกปลอม (False Positives) ในการสแกนได้อย่างไร?",
    a: "ใช้ VEX เพื่อระงับช่องโหว่ที่ไม่สามารถใช้ประโยชน์ได้ในการกำหนดค่าเฉพาะของคุณ นอกจากนี้ ตรวจสอบให้แน่ใจว่าอิมเมจพื้นฐานของคุณเป็นปัจจุบัน"
  },
  {
    q: "ข้อแตกต่างระหว่าง CVSS และ EPSS คืออะไร?",
    a: "CVSS วัดความรุนแรงของช่องโหว่ตามลักษณะทางเทคนิค ในขณะที่ EPSS ประเมินความน่าจะเป็นที่ช่องโหว่จะถูกใช้โจมตีในสถานการณ์จริง"
  }
];

const KnowledgeBase: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [question, setQuestion] = useState('');
  const [aiAnswer, setAiAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleAsk = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;

    setLoading(true);
    setAiAnswer('');
    try {
      const answer = await askSecurityQuestion(question);
      setAiAnswer(answer);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-16">
      
      {/* Best Practices Section */}
      <section>
        <div className="flex items-center gap-3 mb-8">
          <BookOpen className="text-indigo-400" size={28} />
          <h2 className="text-3xl font-bold text-white">แนวทางปฏิบัติที่ดีที่สุดด้านความปลอดภัย</h2>
        </div>
        <p className="text-slate-400 mb-8 max-w-3xl">
          ทำความเข้าใจขั้นตอนที่คุณสามารถทำได้เพื่อปรับปรุงความปลอดภัยของคอนเทนเนอร์ของคุณ การปฏิบัติตามคำแนะนำเหล่านี้ช่วยลดความเสี่ยงในสภาพแวดล้อมของคุณ
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {bestPractices.map((practice, index) => (
            <div key={index} className="bg-slate-800 p-6 rounded-xl border border-slate-700 hover:border-indigo-500 transition group">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-indigo-500/10 rounded-lg text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition">
                  <practice.icon size={24} />
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{practice.title}</h3>
              <p className="text-slate-400">{practice.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ & AI Assistant Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <h2 className="text-2xl font-bold text-white mb-6">คำถามที่พบบ่อยด้านความปลอดภัย (FAQ)</h2>
          <p className="text-slate-400 mb-4">สำรวจคำถามที่พบบ่อยด้านความปลอดภัยทั่วไป</p>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-slate-700 rounded-lg overflow-hidden bg-slate-800/50">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex justify-between items-center p-4 text-left hover:bg-slate-800 transition"
                >
                  <span className="font-medium text-slate-200">{faq.q}</span>
                  {openFaq === index ? <ChevronUp size={18} className="text-slate-400" /> : <ChevronDown size={18} className="text-slate-400" />}
                </button>
                {openFaq === index && (
                  <div className="p-4 bg-slate-800/30 border-t border-slate-700 text-slate-400 text-sm leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* AI Chat Widget */}
        <div className="bg-slate-800 rounded-xl border border-slate-700 p-6 flex flex-col h-full">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Terminal size={20} className="text-emerald-400" />
            ถาม Sentinel AI
          </h3>
          <p className="text-sm text-slate-400 mb-4">
            มีคำถามด้านความปลอดภัยเฉพาะเจาะจงหรือไม่? ถามผู้ช่วย AI ของเราเพื่อรับคำแนะนำทันที
          </p>
          
          <div className="flex-1 bg-slate-900 rounded-lg p-4 mb-4 border border-slate-700 overflow-y-auto min-h-[200px] max-h-[300px]">
            {loading ? (
              <div className="flex items-center gap-2 text-slate-400 text-sm animate-pulse">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce"></div>
                กำลังวิเคราะห์คำขอ...
              </div>
            ) : aiAnswer ? (
              <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-line">{aiAnswer}</p>
            ) : (
              <p className="text-slate-600 text-sm italic">คำตอบจะแสดงที่นี่...</p>
            )}
          </div>

          <form onSubmit={handleAsk} className="relative">
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="เช่น วิธีรักษาความปลอดภัย Kubernetes pod?"
              className="w-full bg-slate-900 border border-slate-700 rounded-lg py-3 pl-4 pr-12 text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
            />
            <button 
              type="submit"
              disabled={loading}
              className="absolute right-2 top-2 p-1.5 bg-emerald-600 hover:bg-emerald-700 rounded-md text-white transition disabled:opacity-50"
            >
              <Search size={18} />
            </button>
          </form>
        </div>
      </section>

    </div>
  );
};

export default KnowledgeBase;