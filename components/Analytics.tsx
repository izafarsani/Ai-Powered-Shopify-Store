
import React from 'react';
import { Product } from '../types';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
  PieChart, Pie
} from 'recharts';
import { TrendingUp, DollarSign, Package, Activity, Target } from 'lucide-react';

interface AnalyticsProps {
  products: Product[];
}

const Analytics: React.FC<AnalyticsProps> = ({ products }) => {
  const stockData = products.map(p => ({
    name: p.name.length > 12 ? p.name.substring(0, 10) + '...' : p.name,
    stock: p.stock,
    value: p.price * p.stock
  }));

  const COLORS = ['#4f46e5', '#818cf8', '#a78bfa', '#f472b6', '#34d399', '#22d3ee'];

  const categoryTotals = products.reduce((acc, p) => {
    acc[p.category] = (acc[p.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const pieData = Object.entries(categoryTotals).map(([name, value]) => ({ name, value }));

  const totalValue = stockData.reduce((acc, curr) => acc + curr.value, 0);
  const avgPrice = products.reduce((acc, p) => acc + p.price, 0) / products.length;

  return (
    <div className="space-y-12">
      <div>
        <h2 className="text-3xl font-black text-slate-900 tracking-tight">Analytics</h2>
        <p className="text-slate-500 text-sm mt-1">Operational performance and financial visibility.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard title="Inventory Value" value={`$${totalValue.toLocaleString()}`} icon={DollarSign} color="indigo" />
        <MetricCard title="Total SKU Count" value={products.length.toString()} icon={Package} color="violet" />
        <MetricCard title="Avg Price" value={`$${avgPrice.toFixed(2)}`} icon={Activity} color="emerald" />
        <MetricCard title="Sales Potential" value="+14.2%" icon={Target} color="rose" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-5 gap-8">
        {/* Stock Volume Chart */}
        <div className="xl:col-span-3 bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Stock Distribution</h3>
              <p className="text-sm font-bold text-slate-800">Inventory levels per SKU</p>
            </div>
            <div className="bg-slate-50 p-2 rounded-xl">
               <TrendingUp size={16} className="text-indigo-600" />
            </div>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stockData}>
                <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 700 }} 
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 700 }} 
                />
                <Tooltip 
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', fontWeight: 'bold' }}
                />
                <Bar dataKey="stock" radius={[8, 8, 0, 0]} barSize={40}>
                  {stockData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Pie Chart */}
        <div className="xl:col-span-2 bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
          <div className="mb-8 text-center">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Inventory Mix</h3>
            <p className="text-sm font-bold text-slate-800">Categorical Breakdown</p>
          </div>
          <div className="h-64 w-full relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  innerRadius={75}
                  outerRadius={95}
                  paddingAngle={8}
                  dataKey="value"
                  stroke="none"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                   contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', fontWeight: 'bold' }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-[10px] font-black text-slate-400 uppercase">Diversity</span>
              <span className="text-2xl font-black text-slate-900">{pieData.length}</span>
            </div>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            {pieData.map((d, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-tighter">{d.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

interface MetricCardProps {
  title: string;
  value: string;
  icon: any;
  color: 'indigo' | 'violet' | 'emerald' | 'rose';
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, icon: Icon, color }) => {
  const colorClasses = {
    indigo: 'bg-indigo-50 text-indigo-600',
    violet: 'bg-violet-50 text-violet-600',
    emerald: 'bg-emerald-50 text-emerald-600',
    rose: 'bg-rose-50 text-rose-600',
  };

  return (
    <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col gap-4 group hover:shadow-xl transition-all duration-300">
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${colorClasses[color]} group-hover:scale-110 transition-transform`}>
        <Icon size={24} />
      </div>
      <div>
        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{title}</h4>
        <p className="text-2xl font-black text-slate-900 tracking-tighter">{value}</p>
      </div>
    </div>
  );
};

export default Analytics;
