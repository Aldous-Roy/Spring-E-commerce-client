import React from 'react'; // Refreshed ProductCard logic
import { Edit2, Trash2, Box, Tag, DollarSign, Calendar } from 'lucide-react';
import { API_BASE_URL } from '../services/api';
import { motion } from 'framer-motion';

const ProductCard = ({ product, onEdit, onDelete, onClick }) => {
  return (
    <motion.div
      layout
      whileHover={{ y: -4 }}
      onClick={() => onClick(product)}
      className="flex flex-col bg-card border border-border rounded-lg overflow-hidden transition-all duration-200 hover:shadow-lg cursor-pointer group h-full"
    >
      <div className="aspect-[4/5] relative bg-[#f7f7f7] dark:bg-muted/10 overflow-hidden">
        <img
          src={product.image ? `${API_BASE_URL}/${product.prod_id}/image` : 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop'}
          alt={product.name}
          className="w-full h-full object-contain p-4 mix-blend-multiply dark:mix-blend-normal transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop';
          }}
        />
        {product.quantity < 5 && product.available && (
          <div className="absolute top-2 left-2 bg-destructive text-white text-[10px] font-bold px-2 py-1 rounded">
            ONLY {product.quantity} LEFT
          </div>
        )}
      </div>

      <div className="flex flex-col p-4 flex-grow">
        <div className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider mb-1">
          {product.brand}
        </div>
        <h3 className="text-sm font-medium text-foreground line-clamp-2 min-h-[40px] leading-tight mb-2 group-hover:text-primary transition-colors">
          {product.name}
        </h3>
        
        <div className="flex items-center gap-1 mb-2">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-3 h-3 fill-current" viewBox="0 0 20 20">
                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
              </svg>
            ))}
          </div>
          <span className="text-[10px] text-muted-foreground">(42)</span>
        </div>

        <div className="mt-auto">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-foreground">
              ${product.price.toLocaleString()}
            </span>
            <span className="text-[10px] text-muted-foreground line-through">
              ${(product.price * 1.2).toLocaleString()}
            </span>
          </div>
          
          <div className="text-[10px] text-green-600 font-bold mb-3">
            Free delivery by Tomorrow
          </div>

          <div className="grid grid-cols-2 gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button
              onClick={(e) => { e.stopPropagation(); onEdit(product); }}
              className="flex items-center justify-center gap-1 py-1.5 px-2 text-[10px] font-bold border border-border rounded hover:bg-secondary transition-colors"
            >
              <Edit2 className="w-3 h-3" />
              Edit
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); onDelete(product.prod_id); }}
              className="flex items-center justify-center gap-1 py-1.5 px-2 text-[10px] font-bold text-destructive border border-destructive/20 rounded hover:bg-destructive/10 transition-colors"
            >
              <Trash2 className="w-3 h-3" />
              Delete
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
