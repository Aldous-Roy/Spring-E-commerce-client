import React from 'react';
import { X, Tag, Box, DollarSign, Calendar, Info, CheckCircle2, XCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { API_BASE_URL } from '../services/api';

const ProductDetails = ({ product, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="w-full max-w-4xl bg-white dark:bg-card rounded-sm shadow-2xl overflow-hidden"
    >
      <div className="flex flex-col md:flex-row h-full max-h-[90vh] overflow-y-auto">
        {/* Left: Image */}
        <div className="w-full md:w-1/2 bg-[#f7f7f7] dark:bg-muted/10 p-8 flex items-center justify-center relative border-r border-gray-100 dark:border-border">
          <img
            src={product.image ? `${API_BASE_URL}/${product.prod_id}/image` : 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop'}
            alt={product.name}
            className="max-w-full max-h-full object-contain mix-blend-multiply dark:mix-blend-normal"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 md:hidden p-2 bg-black/10 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Right: Info */}
        <div className="w-full md:w-1/2 p-8 flex flex-col">
          <div className="hidden md:flex justify-end mb-4">
            <button
              onClick={onClose}
              className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-muted transition-colors"
            >
              <X className="w-6 h-6 text-gray-400" />
            </button>
          </div>

          <nav className="flex text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2 gap-2">
            <span>{product.category}</span>
            <span>/</span>
            <span>{product.brand}</span>
          </nav>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-foreground mb-4">
            {product.name}
          </h2>

          <div className="flex items-center gap-4 mb-6">
            <div className="text-3xl font-bold text-gray-900 dark:text-foreground">
              ${product.price.toLocaleString()}
            </div>
            <div className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded">
              Special Price
            </div>
          </div>

          <div className="space-y-6 mb-8">
            <div className="flex items-start gap-4">
              <div className="w-24 text-xs font-bold text-muted-foreground uppercase pt-1">Availability</div>
              <div className={`text-sm font-bold ${product.available ? 'text-green-600' : 'text-destructive'}`}>
                {product.available ? `In Stock (${product.quantity} units remaining)` : 'Out of Stock'}
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-24 text-xs font-bold text-muted-foreground uppercase pt-1">Description</div>
              <div className="flex-1 text-sm text-gray-600 dark:text-muted-foreground leading-relaxed">
                {product.description}
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-24 text-xs font-bold text-muted-foreground uppercase pt-1">Specifications</div>
              <div className="flex-1 text-xs grid grid-cols-2 gap-y-2">
                <span className="text-muted-foreground">Release Date</span>
                <span className="font-bold">{new Date(product.releaseDate).toLocaleDateString()}</span>
                <span className="text-muted-foreground">Product ID</span>
                <span className="font-bold">#{product.prod_id}</span>
              </div>
            </div>
          </div>

          <div className="mt-auto pt-6 border-t border-gray-100 dark:border-border flex gap-4">
            <button
              onClick={onClose}
              className="flex-1 py-3 bg-[#ff9f00] text-white font-bold rounded-sm shadow hover:bg-[#f39700] transition-all flex items-center justify-center gap-2"
            >
              BACK TO LIST
            </button>
            <button
              onClick={onClose}
              className="flex-1 py-3 bg-[#fb641b] text-white font-bold rounded-sm shadow hover:bg-[#f4511e] transition-all flex items-center justify-center gap-2"
            >
              BUY NOW
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductDetails;
