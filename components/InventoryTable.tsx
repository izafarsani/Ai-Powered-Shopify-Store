
import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { getInventoryInsights } from '../services/geminiService';
import { RefreshCcw, Sparkles, AlertCircle, TrendingUp, Plus, Minus, MoreVertical } from 'lucide-react';

interface InventoryTableProps {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

const InventoryTable: React.FC<InventoryTableProps> = ({ products, setProducts }) => {
  const [insights, setInsights] = useState<string[]>([]);
  const [loadingInsights, setLoadingInsights] = useState(false);

  const fetchInsights = async () => {
    setLoadingInsights(true);
    const data = await getInventoryInsights(products);
    setInsights(data);
    setLoadingInsights(false);
  };

  useEffect(() => {
    fetchInsights();
  }, []);

  const updateStock = (id: string, delta: number) => {
    setProducts(prev => prev.map(p => 
      p.id === id ? { ...p, stock: Math.max(0, p.stock + delta) } : p
    ));
  };

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Inventory</h2>
          <p className="text-slate-500 text-sm mt-1">Manage stock levels and receive AI logistics alerts.</p>
        </div>
        <button 
          onClick={fetchInsights}
          disabled={loadingInsights}
          className="flex items-center gap-2 bg-indigo-50 text-indigo-600 px-5 py-2.5 rounded-2xl text-sm font-bold hover:bg-indigo-100 transition-all disabled:opacity-50"
        >
          <RefreshCcw size={18} className={loadingInsights ? 'animate-spin' : ''} />
          {loadingInsights ? 'Analyzing...' : 'Refresh Insights'}
        </button>
      </div>

      {/* AI Insight Cards with Gradient Accents */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {loadingInsights ? (
          [1,2,3].map(i => (
            <div key={i} className="h-28 bg-slate-50 animate-pulse rounded-[2rem]"></div>
          ))
        ) : (
          insights.map((insight, idx) => (
            <div key={idx} className="bg-white border border-slate-100 p-6 rounded-[2rem] shadow-sm hover:shadow-md transition-shadow relative overflow-hidden flex flex-col gap-3">
              <div className={`absolute top-0 left-0 w-1 h-full ${idx === 0 ? 'bg-rose-500' : idx === 1 ? 'bg-indigo-500' : 'bg-violet-500'}`} />
              <div className="flex items-center gap-3">
                <div className={`${idx === 0 ? 'text-rose-600' : idx === 1 ? 'text-indigo-600' : 'text-violet-600'}`}>
                  {idx === 0 ? <AlertCircle size={20} /> : idx === 1 ? <TrendingUp size={20} /> : <Sparkles size={20} />}
                </div>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  {idx === 0 ? 'Risk Alert' : idx === 1 ? 'Market Insight' : 'Opportunity'}
                </span>
              </div>
              <p className="text-sm text-slate-700 font-semibold leading-relaxed">{insight}</p>
            </div>
          ))
        )}
      </div>

      {/* Modern Data Table */}
      <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">Product</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">Category</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">Price</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 text-center">Stock</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 text-right">Adjust</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {products.map(p => (
                <tr key={p.id} className="group hover:bg-slate-50/80 transition-all duration-300">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <img src={p.image} className="w-12 h-12 rounded-xl object-cover ring-2 ring-slate-100 shadow-sm" />
                        {p.stock < 10 && <div className="absolute -top-1 -right-1 w-3 h-3 bg-rose-500 rounded-full border-2 border-white" />}
                      </div>
                      <span className="font-bold text-slate-900">{p.name}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-[10px] font-bold uppercase tracking-wider">
                      {p.category}
                    </span>
                  </td>
                  <td className="px-8 py-5">
                    <span className="font-black text-slate-900">${p.price.toFixed(2)}</span>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex flex-col items-center gap-1">
                      <div className={`px-4 py-1.5 rounded-full text-xs font-black shadow-sm ${
                        p.stock < 10 
                          ? 'bg-rose-50 text-rose-600 border border-rose-100' 
                          : 'bg-indigo-50 text-indigo-600 border border-indigo-100'
                      }`}>
                        {p.stock}
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-40 group-hover:opacity-100 transition-all">
                      <button 
                        onClick={() => updateStock(p.id, -1)}
                        className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 text-slate-400 transition-all shadow-sm"
                      >
                        <Minus size={14} />
                      </button>
                      <button 
                        onClick={() => updateStock(p.id, 1)}
                        className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-200 text-slate-400 transition-all shadow-sm"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default InventoryTable;
