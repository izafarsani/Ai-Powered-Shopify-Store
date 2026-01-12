
import React, { useState } from 'react';
import { generateAIEmail } from '../services/geminiService';
import { Send, Wand2, Copy, CheckCircle2, RefreshCcw, Mail, Sparkles, User, Globe, ChevronDown } from 'lucide-react';

const AIEmailGenerator: React.FC = () => {
  const [customerName, setCustomerName] = useState('');
  const [context, setContext] = useState('welcome');
  const [productDetails, setProductDetails] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedEmail, setGeneratedEmail] = useState<{ subject: string; body: string } | null>(null);
  const [copied, setCopied] = useState(false);

  const contexts = [
    { value: 'welcome', label: 'Welcome New Customer', desc: 'First time welcome sequence' },
    { value: 'abandoned-cart', label: 'Abandoned Cart', desc: 'Re-engage lost sales' },
    { value: 'back-in-stock', label: 'Back in Stock', desc: 'Notify interested buyers' },
    { value: 'exclusive-discount', label: 'Exclusive VIP Discount', desc: 'Loyalty reward program' },
  ];

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName) return;
    setIsGenerating(true);
    setCopied(false);
    const result = await generateAIEmail(context, customerName, productDetails);
    setGeneratedEmail(result);
    setIsGenerating(false);
  };

  const copyToClipboard = () => {
    if (!generatedEmail) return;
    const text = `Subject: ${generatedEmail.subject}\n\n${generatedEmail.body}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-10">
      <div>
        <h2 className="text-3xl font-black text-slate-900 tracking-tight">AI Outreach</h2>
        <p className="text-slate-500 text-sm mt-1">Generate high-conversion campaigns powered by Gemini AI.</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-5 gap-10">
        {/* Modern Campaign Form */}
        <div className="xl:col-span-2 space-y-6">
          <form onSubmit={handleGenerate} className="bg-slate-50/50 p-8 rounded-[2.5rem] border border-slate-100 shadow-inner">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6">Campaign Settings</h3>
            
            <div className="space-y-6">
              <div>
                <label className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 px-1">
                  <User size={12} className="text-indigo-500" /> Customer Name
                </label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="e.g. Alex Rivera"
                  className="w-full px-5 py-3.5 rounded-2xl bg-white border border-slate-200 text-sm font-semibold focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all shadow-sm"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 px-1">
                  <Globe size={12} className="text-indigo-500" /> Message Intent
                </label>
                <div className="grid grid-cols-1 gap-2">
                  {contexts.map((c) => (
                    <button
                      key={c.value}
                      type="button"
                      onClick={() => setContext(c.value)}
                      className={`flex flex-col items-start px-5 py-3.5 rounded-2xl border transition-all text-left ${
                        context === c.value 
                        ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-100' 
                        : 'bg-white border-slate-200 text-slate-600 hover:border-indigo-300'
                      }`}
                    >
                      <span className="text-sm font-black tracking-tight">{c.label}</span>
                      <span className={`text-[10px] ${context === c.value ? 'text-indigo-100' : 'text-slate-400'}`}>{c.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 px-1">
                  <Sparkles size={12} className="text-indigo-500" /> Contextual Details
                </label>
                <textarea
                  value={productDetails}
                  onChange={(e) => setProductDetails(e.target.value)}
                  placeholder="Mention product features, price points, or special conditions..."
                  rows={4}
                  className="w-full px-5 py-3.5 rounded-2xl bg-white border border-slate-200 text-sm font-medium focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none resize-none transition-all shadow-sm"
                />
              </div>

              <button
                type="submit"
                disabled={isGenerating}
                className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black flex items-center justify-center gap-3 hover:bg-indigo-600 disabled:opacity-50 transition-all shadow-xl shadow-slate-200 hover:shadow-indigo-100"
              >
                {isGenerating ? (
                  <RefreshCcw className="animate-spin" size={20} />
                ) : (
                  <Wand2 size={20} className="text-indigo-400" />
                )}
                {isGenerating ? 'Gemini is Thinking...' : 'Generate Campaign'}
              </button>
            </div>
          </form>
        </div>

        {/* Email Preview Canvas */}
        <div className="xl:col-span-3">
          <div className="bg-slate-100 rounded-[2.5rem] p-4 sm:p-8 min-h-full border border-slate-200 relative overflow-hidden">
            {/* Browser/Email Bar Decor */}
            <div className="bg-white/80 backdrop-blur-md border border-slate-200 rounded-2xl mb-6 p-4 flex items-center justify-between shadow-sm">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              </div>
              <div className="bg-slate-50 px-4 py-1.5 rounded-lg border border-slate-100 flex items-center gap-2">
                 <Mail size={12} className="text-slate-400" />
                 <span className="text-[10px] font-bold text-slate-500">campaign-preview@shopgenius.ai</span>
              </div>
              <div />
            </div>

            {generatedEmail ? (
              <div className="animate-in fade-in slide-in-from-top-4 duration-500">
                <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl shadow-slate-300/30 border border-white">
                  <div className="flex justify-between items-center mb-8 pb-6 border-b border-slate-50">
                    <div className="bg-indigo-50 text-indigo-600 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                       <Sparkles size={12} /> Gemini Optimized Draft
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={copyToClipboard}
                        className="p-2.5 bg-slate-50 rounded-xl text-slate-400 hover:text-indigo-600 transition-all border border-slate-100"
                        title="Copy to clipboard"
                      >
                        {copied ? <CheckCircle2 size={18} className="text-emerald-500" /> : <Copy size={18} />}
                      </button>
                    </div>
                  </div>
                  
                  <div className="space-y-8">
                    <div>
                      <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Subject Line</h4>
                      <p className="text-lg font-black text-slate-900 leading-tight">{generatedEmail.subject}</p>
                    </div>

                    <div>
                      <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Body Content</h4>
                      <div className="text-slate-700 whitespace-pre-wrap leading-relaxed font-medium text-sm border-l-4 border-indigo-100 pl-6 italic">
                        {generatedEmail.body}
                      </div>
                    </div>

                    <div className="pt-8 border-t border-slate-50 flex flex-col sm:flex-row gap-4">
                      <button className="flex-1 bg-indigo-600 text-white py-3.5 rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100">
                        <Send size={18} />
                        Dispatch Campaign
                      </button>
                      <button className="px-6 py-3.5 rounded-2xl font-black border border-slate-200 text-slate-600 hover:bg-slate-50 transition-all">
                        Edit Manually
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-[500px] text-center p-12 space-y-4">
                <div className="w-24 h-24 bg-white/50 backdrop-blur rounded-[2rem] border border-white flex items-center justify-center shadow-sm">
                   <Wand2 size={40} className="text-indigo-300" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-800">Ready to write?</h3>
                  <p className="text-sm text-slate-500 max-w-xs mx-auto">Fill in the campaign details on the left and let Gemini craft the perfect message.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIEmailGenerator;
