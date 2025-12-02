import React, { useState } from 'react';
import { generateVexStatement } from '../services/gemini';
import { VexResult } from '../types';
import { FileCode, AlertTriangle, CheckCircle, Loader2, Copy, ShieldAlert } from 'lucide-react';

const VexTool: React.FC = () => {
  const [cveId, setCveId] = useState('');
  const [product, setProduct] = useState('');
  const [status, setStatus] = useState<'not_affected' | 'fixed'>('not_affected');
  const [justification, setJustification] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<VexResult | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cveId || !product || !justification) return;

    setLoading(true);
    setResult(null);
    try {
      const data = await generateVexStatement({ cveId, product, status, justification });
      setResult(data);
    } catch (err) {
      console.error(err);
      alert('ไม่สามารถสร้างเอกสาร VEX ได้ โปรดตรวจสอบ API Key ของคุณ');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (result) {
      navigator.clipboard.writeText(result.json);
      alert('คัดลอก VEX JSON แล้ว!');
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">ระงับ CVE ด้วย VEX</h1>
        <p className="text-slate-400">
          เรียนรู้วิธีระงับช่องโหว่ที่ไม่สามารถใช้งานได้หรือแก้ไขแล้วที่พบในรูปภาพของคุณโดยใช้ Vulnerability Exploitability eXchange (VEX)
          การสร้างด้วย AI ช่วยให้มั่นใจว่าคำอธิบายของคุณมีความเป็นมืออาชีพและได้มาตรฐาน
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Form */}
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-lg h-fit">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
            <FileCode className="text-indigo-400" />
            สร้างคำชี้แจง (Generate Statement)
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">รหัส CVE (CVE ID)</label>
              <input
                type="text"
                value={cveId}
                onChange={(e) => setCveId(e.target.value)}
                placeholder="CVE-2023-XXXX"
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">อิมเมจคอนเทนเนอร์ / ผลิตภัณฑ์</label>
              <input
                type="text"
                value={product}
                onChange={(e) => setProduct(e.target.value)}
                placeholder="my-app:v1.2.0"
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">สถานะ (Status)</label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setStatus('not_affected')}
                  className={`p-3 rounded-lg border flex items-center justify-center gap-2 transition ${
                    status === 'not_affected' 
                      ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400' 
                      : 'bg-slate-900 border-slate-700 text-slate-400 hover:bg-slate-700'
                  }`}
                >
                  <CheckCircle size={18} />
                  ไม่ได้รับผลกระทบ
                </button>
                <button
                  type="button"
                  onClick={() => setStatus('fixed')}
                  className={`p-3 rounded-lg border flex items-center justify-center gap-2 transition ${
                    status === 'fixed' 
                      ? 'bg-blue-500/10 border-blue-500 text-blue-400' 
                      : 'bg-slate-900 border-slate-700 text-slate-400 hover:bg-slate-700'
                  }`}
                >
                  <AlertTriangle size={18} />
                  แก้ไขแล้ว
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">บริบทคำอธิบาย (Justification)</label>
              <textarea
                value={justification}
                onChange={(e) => setJustification(e.target.value)}
                placeholder="อธิบายว่าทำไมช่องโหว่นี้จึงไม่มีผล (เช่น 'ฟังก์ชัน X ไม่ได้ใช้ในการกำหนดค่าการใช้งานจริง')"
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white h-32 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition resize-none"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-900 text-white font-semibold py-3 rounded-lg transition flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" /> กำลังสร้าง...
                </>
              ) : (
                'สร้างเอกสาร VEX'
              )}
            </button>
          </form>
        </div>

        {/* Output Area */}
        <div className="space-y-6">
          {result ? (
            <>
              <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-lg animate-fade-in">
                <h3 className="text-lg font-semibold text-white mb-3">การวิเคราะห์โดย AI</h3>
                <p className="text-slate-300 leading-relaxed text-sm">
                  {result.analysis}
                </p>
              </div>

              <div className="bg-slate-900 rounded-xl border border-slate-700 shadow-lg overflow-hidden relative">
                 <div className="bg-slate-950 px-4 py-2 flex justify-between items-center border-b border-slate-800">
                    <span className="text-xs text-slate-400 font-mono">vex-output.json</span>
                    <button 
                      onClick={copyToClipboard}
                      className="text-slate-400 hover:text-white transition"
                      title="คัดลอก JSON"
                    >
                      <Copy size={16} />
                    </button>
                 </div>
                 <pre className="p-4 overflow-x-auto text-sm font-mono text-emerald-400">
                   {JSON.stringify(JSON.parse(result.json), null, 2)}
                 </pre>
              </div>
            </>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-slate-500 border-2 border-dashed border-slate-700 rounded-xl p-12">
               <ShieldAlert size={48} className="mb-4 opacity-50" />
               <p className="text-center">ระบุรายละเอียดช่องโหว่เพื่อสร้างคำแถลงระงับ VEX</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VexTool;