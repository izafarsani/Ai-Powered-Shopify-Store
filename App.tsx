
import React, { useState } from 'react';
import Storefront from './components/Storefront';
import AdminDashboard from './components/AdminDashboard';
import { AppView, Product } from './types';
import { INITIAL_PRODUCTS } from './constants';
import { ShoppingBag, LayoutDashboard, Search, Bell } from 'lucide-react';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>('storefront');
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [cartCount, setCartCount] = useState(0);

  const toggleView = () => setView(prev => prev === 'storefront' ? 'admin' : 'storefront');
  const addToCart = () => setCartCount(c => c + 1);

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col selection:bg-indigo-100 selection:text-indigo-900">
      {/* Premium Glassmorphic Navigation */}
      <nav className="bg-white/80 backdrop-blur-xl border-b border-slate-200 sticky top-0 z-[100] transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex items-center gap-3 group cursor-pointer" onClick={() => setView('storefront')}>
              <div className="w-10 h-10 bg-gradient-to-tr from-indigo-600 to-violet-500 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200 group-hover:rotate-6 transition-transform">
                <ShoppingBag className="text-white w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-tight text-slate-900">
                  ShopGenius
                </span>
                <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest leading-none">AI Powered</span>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="hidden md:flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
                <button
                  onClick={() => setView('storefront')}
                  className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all ${
                    view === 'storefront' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  Storefront
                </button>
                <button
                  onClick={() => setView('admin')}
                  className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all ${
                    view === 'admin' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  Admin
                </button>
              </div>

              <div className="h-6 w-[1px] bg-slate-200 mx-2 hidden md:block"></div>

              <div className="flex items-center gap-4">
                <button className="p-2 text-slate-400 hover:text-indigo-600 transition-colors hidden sm:block">
                  <Bell size={20} />
                </button>
                <div className="relative group cursor-pointer">
                  <div className="p-2.5 bg-slate-50 rounded-full border border-slate-200 text-slate-600 hover:border-indigo-300 hover:text-indigo-600 transition-all">
                    <ShoppingBag size={22} />
                  </div>
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full ring-2 ring-white">
                      {cartCount}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-1">
        <div className="animate-in fade-in duration-700 slide-in-from-bottom-4">
          {view === 'storefront' ? (
            <Storefront products={products} onAddToCart={addToCart} />
          ) : (
            <AdminDashboard products={products} setProducts={setProducts} />
          )}
        </div>
      </main>

      <footer className="bg-white border-t border-slate-200 py-12 mt-12">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-indigo-600 rounded flex items-center justify-center">
                <ShoppingBag className="text-white w-4 h-4" />
              </div>
              <span className="font-bold text-slate-900">ShopGenius</span>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed max-w-xs">
              Revolutionizing e-commerce with Gemini-driven insights and automated workflows.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-400 uppercase">Platform</h4>
              <ul className="text-sm text-slate-600 space-y-1">
                <li>Features</li>
                <li>Pricing</li>
                <li>Support</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-400 uppercase">Company</h4>
              <ul className="text-sm text-slate-600 space-y-1">
                <li>About</li>
                <li>Privacy</li>
                <li>Terms</li>
              </ul>
            </div>
          </div>
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex flex-col gap-3">
            <h4 className="text-sm font-bold text-slate-900">Get AI Tips</h4>
            <div className="flex gap-2">
              <input type="text" placeholder="Email" className="flex-1 bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500" />
              <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-bold">Join</button>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 text-center text-xs text-slate-400 mt-12 pt-8 border-t border-slate-100">
          &copy; 2024 ShopGenius AI Inc. All rights reserved. Built with Gemini 3 Pro.
        </div>
      </footer>
    </div>
  );
};

export default App;
