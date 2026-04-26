import React, { useState, useEffect } from 'react';
import { X, Upload, Check, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ProductForm = ({ product, onSubmit, onCancel, isLoading }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    brand: '',
    price: '',
    category: '',
    releaseDate: new Date().toISOString().split('T')[0],
    quantity: '',
    available: true
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        description: product.description,
        brand: product.brand,
        price: product.price,
        category: product.category,
        releaseDate: new Date(product.releaseDate).toISOString().split('T')[0],
        quantity: product.quantity,
        available: product.available
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData, imageFile);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="w-full max-w-2xl bg-white dark:bg-card rounded-sm shadow-xl overflow-hidden"
    >
      <div className="p-4 border-b border-gray-100 dark:border-border flex justify-between items-center bg-gray-50 dark:bg-muted/20">
        <h2 className="text-lg font-bold text-gray-800 dark:text-foreground">
          {product ? 'Edit Product Details' : 'Add New Product to Catalog'}
        </h2>
        <button
          onClick={onCancel}
          className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-muted transition-colors"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-muted-foreground uppercase mb-1">Product Name</label>
              <input
                required
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 text-sm border border-gray-300 dark:border-border rounded-sm focus:border-[#2874f0] outline-none transition-all"
                placeholder="e.g. Sony WH-1000XM5"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-muted-foreground uppercase mb-1">Brand Name</label>
              <input
                required
                type="text"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                className="w-full p-2 text-sm border border-gray-300 dark:border-border rounded-sm focus:border-[#2874f0] outline-none transition-all"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-muted-foreground uppercase mb-1">Price ($)</label>
                <input
                  required
                  type="number"
                  step="0.01"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full p-2 text-sm border border-gray-300 dark:border-border rounded-sm focus:border-[#2874f0] outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-muted-foreground uppercase mb-1">In Stock Qty</label>
                <input
                  required
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  className="w-full p-2 text-sm border border-gray-300 dark:border-border rounded-sm focus:border-[#2874f0] outline-none transition-all"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-muted-foreground uppercase mb-1">Category</label>
              <input
                required
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full p-2 text-sm border border-gray-300 dark:border-border rounded-sm focus:border-[#2874f0] outline-none transition-all"
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-muted-foreground uppercase mb-1">Product Media</label>
              <div className="relative group border border-gray-300 dark:border-border rounded-sm p-1">
                <div className="aspect-square bg-gray-50 dark:bg-muted/10 overflow-hidden flex flex-col items-center justify-center relative">
                  {imagePreview ? (
                    <img src={imagePreview} alt="Preview" className="w-full h-full object-contain p-2" />
                  ) : (
                    <div className="flex flex-col items-center text-gray-400">
                      <Upload className="w-8 h-8 mb-1" />
                      <span className="text-[10px]">UPLOAD IMAGE</span>
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                </div>
                {imagePreview && (
                  <button
                    type="button"
                    onClick={() => { setImageFile(null); setImagePreview(null); }}
                    className="absolute top-2 right-2 p-1 bg-black/50 text-white rounded-full hover:bg-black transition-all"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-muted-foreground uppercase mb-1">Release Date</label>
              <input
                required
                type="date"
                name="releaseDate"
                value={formData.releaseDate}
                onChange={handleChange}
                className="w-full p-2 text-sm border border-gray-300 dark:border-border rounded-sm focus:border-[#2874f0] outline-none transition-all"
              />
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="available"
                name="available"
                checked={formData.available}
                onChange={handleChange}
                className="w-4 h-4 rounded border-gray-300 text-[#2874f0] focus:ring-[#2874f0]"
              />
              <label htmlFor="available" className="text-sm font-medium text-gray-700 dark:text-foreground cursor-pointer">
                Product is active for sale
              </label>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 dark:text-muted-foreground uppercase mb-1">Description</label>
          <textarea
            required
            name="description"
            rows="3"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 text-sm border border-gray-300 dark:border-border rounded-sm focus:border-[#2874f0] outline-none transition-all resize-none"
            placeholder="Detailed product features and specifications..."
          ></textarea>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 dark:border-border">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 text-sm font-bold text-gray-600 dark:text-muted-foreground hover:bg-gray-100 dark:hover:bg-muted transition-all rounded-sm"
          >
            DISCARD
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="px-8 py-2 bg-[#fb641b] text-white text-sm font-bold shadow-md hover:bg-[#f4511e] transition-all rounded-sm disabled:opacity-50 flex items-center gap-2"
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <Check className="w-4 h-4" />
                <span>{product ? 'SAVE CHANGES' : 'PUBLISH PRODUCT'}</span>
              </>
            )}
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default ProductForm;
