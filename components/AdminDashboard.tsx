
import React, { useState } from 'react';
import { Product, AdminSubView } from '../types';
import InventoryTable from './InventoryTable';
import AIEmailGenerator from './AIEmailGenerator';
import Analytics from './Analytics';
import { Package, Mail, BarChart3, ChevronRight, Zap, Settings, HelpCircle } from 'lucide-react';

interface AdminDashboardProps {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ products, setProducts }) => {
  const [activeTab, setActiveTab] = useState<AdminSubView>('inventory');

  const menuItems = [
    { id: 'inventory', label: 'Inventory', icon: Package, description: 'Stock & logistics' },
    { id: 'ai-emails', label: 'AI Marketing', icon: Mail, description: 'Automated outreach' },
    { id: 'analytics', label: 'Performance', icon: BarChart3, description: 'Store insights' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col lg:flex-row gap-10">
        
        {/* Modern Admin Sidebar */}
        <aside className="w-full lg:w-72 flex-shrink-0">
          <div className="sticky top-28 space-y-2">
            <h3 className="px-4 text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Operations</h3>
            <nav className="space-y-1.5">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as AdminSubView)}
                  className={`w-full group relative flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 ${
                    activeTab === item.id
                      ? 'bg-white text-indigo-600 shadow-xl shadow-slate-200/50 border border-slate-100'
                      : 'text-slate-500 hover:bg-white hover:text-slate-900 border border-transparent'
                  }`}
                >
                  <div className={`p-2 rounded-xl transition-all ${
                    activeTab === item.id ? 'bg-indigo-50 text-indigo-600' : 'bg-slate-50 text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600'
                  }`}>
                    <item.icon size={20} />
                  </div>
                  <div className="flex flex-col items-start text-left">
                    <span className="text-sm font-bold tracking-tight">{item.label}</span>
                    <span className="text-[10px] opacity-60 font-medium">{item.description}</span>
                  </div>
                  {activeTab === item.id && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-indigo-600 rounded-r-full shadow-lg shadow-indigo-200" />
                  )}
                </button>
              ))}
            </nav>

            <div className="pt-8 space-y-1.5">
               <h3 className="px-4 text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Support</h3>
               <button className="w-full flex items-center gap-4 px-4 py-3 text-slate-500 hover:text-indigo-600 transition-colors">
                 <Settings size={18} />
                 <span className="text-sm font-bold">Settings</span>
               </button>
               <button className="w-full flex items-center gap-4 px-4 py-3 text-slate-500 hover:text-indigo-600 transition-colors">
                 <HelpCircle size={18} />
                 <span className="text-sm font-bold">Help Center</span>
               </button>
            </div>

            <div className="mt-10 p-6 bg-gradient-to-br from-slate-900 to-indigo-950 rounded-[2rem] text-white shadow-2xl relative overflow-hidden group">
              <div className="relative z-10 flex flex-col gap-4">
                <div className="w-10 h-10 bg-indigo-500/20 backdrop-blur-md rounded-xl flex items-center justify-center border border-indigo-400/30">
                  <Zap size={20} className="text-indigo-300" />
                </div>
                <div>
                  <h4 className="text-sm font-black mb-1">AI Assistant Pro</h4>
                  <p className="text-[11px] opacity-60 leading-relaxed">Optimize your revenue with Gemini-driven forecasting.</p>
                </div>
                <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-indigo-400 h-full w-[85%] rounded-full shadow-[0_0_10px_rgba(129,140,248,0.5)]"></div>
                </div>
                <span className="text-[10px] font-bold text-indigo-300 uppercase tracking-widest">85% Optimization</span>
              </div>
              <div className="absolute -right-6 -top-6 w-32 h-32 bg-indigo-500/10 blur-3xl rounded-full" />
            </div>
          </div>
        </aside>

        {/* Dynamic Content Area */}
        <div className="flex-1 min-h-[700px]">
          <div className="bg-white rounded-[2.5rem] p-8 lg:p-12 shadow-sm border border-slate-100 min-h-full">
            <div className="animate-in fade-in zoom-in-95 duration-500">
              {activeTab === 'inventory' && (
                <InventoryTable products={products} setProducts={setProducts} />
              )}
              {activeTab === 'ai-emails' && (
                <AIEmailGenerator />
              )}
              {activeTab === 'analytics' && (
                <Analytics products={products} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
