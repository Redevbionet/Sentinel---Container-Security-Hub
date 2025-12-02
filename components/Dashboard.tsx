import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from 'recharts';
import { ShieldAlert, ShieldCheck, Box, Activity } from 'lucide-react';

const cveData = [
  { name: 'Critical', count: 12, color: '#ef4444' },
  { name: 'High', count: 25, color: '#f97316' },
  { name: 'Medium', count: 45, color: '#eab308' },
  { name: 'Low', count: 80, color: '#3b82f6' },
];

const containerHealth = [
  { name: 'Secure', value: 65, color: '#10b981' },
  { name: 'Vulnerable', value: 35, color: '#ef4444' },
];

const StatCard = ({ title, value, icon: Icon, color }: { title: string, value: string, icon: any, color: string }) => (
  <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-lg flex items-center justify-between">
    <div>
      <p className="text-slate-400 text-sm font-medium uppercase tracking-wider">{title}</p>
      <h3 className="text-2xl font-bold text-white mt-1">{value}</h3>
    </div>
    <div className={`p-3 rounded-lg bg-opacity-20`} style={{ backgroundColor: `${color}33` }}>
      <Icon size={24} style={{ color }} />
    </div>
  </div>
);

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">ภาพรวมความปลอดภัย (Security Overview)</h1>
          <p className="text-slate-400 mt-2">ตรวจสอบสถานะความปลอดภัยของคอนเทนเนอร์และช่องโหว่ที่ใช้งานอยู่</p>
        </div>
        <div className="mt-4 md:mt-0 px-4 py-2 bg-indigo-600 rounded-lg text-white text-sm font-medium animate-pulse">
          สถานะระบบ: กำลังตรวจสอบ (Active)
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="CVE ที่ใช้งานอยู่" value="162" icon={ShieldAlert} color="#ef4444" />
        <StatCard title="การระงับ VEX" value="48" icon={ShieldCheck} color="#10b981" />
        <StatCard title="อิมเมจที่สแกน" value="1,204" icon={Box} color="#3b82f6" />
        <StatCard title="คะแนนความเสี่ยง" value="B+" icon={Activity} color="#f59e0b" />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        <div className="lg:col-span-2 bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-lg">
          <h3 className="text-lg font-semibold text-white mb-6">การกระจายช่องโหว่</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={cveData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <XAxis type="number" stroke="#94a3b8" />
                <YAxis dataKey="name" type="category" stroke="#94a3b8" width={80} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f8fafc' }}
                  itemStyle={{ color: '#f8fafc' }}
                  cursor={{fill: '#334155', opacity: 0.4}}
                />
                <Bar dataKey="count" radius={[0, 4, 4, 0]} barSize={32}>
                  {cveData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-lg">
          <h3 className="text-lg font-semibold text-white mb-6">ความปลอดภัยของอิมเมจ</h3>
          <div className="h-64 w-full flex justify-center items-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={containerHealth}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {containerHealth.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                   contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f8fafc' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-6 mt-4">
             {containerHealth.map((item) => (
               <div key={item.name} className="flex items-center gap-2">
                 <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                 <span className="text-sm text-slate-300">{item.name}</span>
               </div>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;