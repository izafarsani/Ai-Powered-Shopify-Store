
import React, { useState, useMemo } from 'react';
import { Product } from '../types';
import { CATEGORIES } from '../constants';
import { Search, Filter, ShoppingCart, Star, Heart, ArrowRight } from 'lucide-react';

interface StorefrontProps {
  products: Product[];
  onAddToCart: () => void;
}

const Storefront: React.FC<StorefrontProps> = ({ products, onAddToCart }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [maxPrice, setMaxPrice] = useState(500);

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
      const matchesPrice = p.price <= maxPrice;
      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [products, searchTerm, selectedCategory, maxPrice]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Hero Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-black text-slate-900 mb-2">Curated Collection</h1>
        <p className="text-slate-500 max-w-xl">Explore our hand-picked products powered by intelligence and designed for modern life.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        
        {/* Modern Sidebar Filters */}
        <aside className="w-full lg:w-72 flex-shrink-0">
          <div className="sticky top-28 space-y-10">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
              <h3 className="text-sm font-black text-slate-900 mb-6 flex items-center gap-2 uppercase tracking-widest">
                <Filter size={16} className="text-indigo-600" /> Refine Search
              </h3>
              
              <div className="space-y-8">
                {/* Search in sidebar for cleaner look on desktop */}
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Search</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input
                      type="text"
                      placeholder="Product name..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Categories */}
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Department</label>
                  <div className="flex flex-wrap gap-2">
                    {CATEGORIES.map(cat => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                          selectedCategory === cat 
                          ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-100' 
                          : 'bg-white border-slate-200 text-slate-600 hover:border-indigo-300 hover:bg-slate-50'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Slider */}
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Price Limit</label>
                    <span className="text-xs font-black text-indigo-600">${maxPrice}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="500"
                    step="5"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                  <div className="flex justify-between mt-2 text-[10px] font-medium text-slate-400">
                    <span>$0</span>
                    <span>$500</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-indigo-600 to-violet-700 p-6 rounded-3xl text-white shadow-xl shadow-indigo-100 relative overflow-hidden group">
              <div className="relative z-10">
                <h4 className="font-black text-lg mb-2">Exclusive Offer</h4>
                <p className="text-sm text-indigo-100 mb-4">Get 20% off your first AI-assisted purchase.</p>
                <button className="flex items-center gap-2 text-xs font-bold bg-white text-indigo-600 px-4 py-2 rounded-xl hover:bg-indigo-50 transition-colors">
                  Claim Now <ArrowRight size={14} />
                </button>
              </div>
              <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform">
                <ShoppingCart size={120} />
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <span className="text-sm text-slate-400 font-medium">
              Showing <span className="text-slate-900 font-black">{filteredProducts.length}</span> products
            </span>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map(product => (
              <div key={product.id} className="bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500 group border border-slate-100 flex flex-col h-full">
                {/* Image Container */}
                <div className="relative h-64 overflow-hidden bg-slate-50">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover mix-blend-multiply group-hover:scale-110 transition-transform duration-700"
                  />
                  
                  {/* Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full text-[10px] font-black text-slate-900 shadow-sm border border-slate-100">
                      {product.category.toUpperCase()}
                    </span>
                  </div>

                  {/* Actions Overlay */}
                  <div className="absolute top-4 right-4 flex flex-col gap-2 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
                    <button className="p-2.5 bg-white rounded-full text-slate-400 hover:text-rose-500 shadow-xl border border-slate-100">
                      <Heart size={16} />
                    </button>
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  <div className="mb-4">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="font-bold text-slate-900 leading-tight group-hover:text-indigo-600 transition-colors">
                        {product.name}
                      </h4>
                      <span className="font-black text-lg text-slate-900">${product.price.toFixed(2)}</span>
                    </div>
                    <p className="text-xs text-slate-500 line-clamp-2">
                      {product.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5 mb-6">
                    <div className="flex gap-0.5">
                      {[1,2,3,4].map(i => <Star key={i} size={12} className="fill-indigo-500 text-indigo-500" />)}
                      <Star size={12} className="text-slate-200 fill-slate-200" />
                    </div>
                    <span className="text-[10px] font-bold text-slate-400">(4.0)</span>
                  </div>

                  <div className="mt-auto flex flex-col gap-3">
                    <button 
                      onClick={onAddToCart}
                      className="w-full flex items-center justify-center gap-2 bg-slate-900 text-white py-3.5 rounded-2xl font-bold hover:bg-indigo-600 active:scale-[0.98] transition-all duration-300 shadow-lg shadow-slate-100 hover:shadow-indigo-100"
                    >
                      <ShoppingCart size={18} />
                      Add to Cart
                    </button>
                    
                    <div className="flex justify-center">
                      {product.stock > 10 ? (
                         <span className="text-[10px] font-bold text-emerald-600 flex items-center gap-1">
                           <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> In Stock
                         </span>
                      ) : (
                        <span className="text-[10px] font-bold text-rose-500 flex items-center gap-1">
                          <div className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" /> Low Stock: {product.stock}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-32 bg-white rounded-[3rem] border border-dashed border-slate-200">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                 <Search size={32} className="text-slate-200" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-1">No products found</h3>
              <p className="text-slate-400 text-sm">Try adjusting your filters or search keywords.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Storefront;
