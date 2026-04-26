import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { X, ChevronLeft, ShoppingCart, CreditCard, Star, ShieldCheck, Truck, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';
import api, { API_BASE_URL } from '../services/api';
import toast from 'react-hot-toast';

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProduct = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await api.get(`/${id}`);
      setProduct(response.data);
    } catch (error) {
      console.error('Fetch error:', error);
      toast.error('Could not find this product');
      navigate('/');
    } finally {
      setIsLoading(false);
    }
  }, [id, navigate]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f1f3f6] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-[#2874f0] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!product) return null;

  return (
    <div className="min-h-screen bg-[#f1f3f6] pb-12">
      {/* Mini Header */}
      <header className="bg-[#2874f0] py-3 sticky top-0 z-50 shadow-md">
        <div className="container mx-auto px-4 flex items-center gap-4">
          <button onClick={() => navigate('/')} className="text-white">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h1 className="text-white font-bold text-lg truncate">{product.name}</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <div className="bg-white rounded-sm shadow-sm overflow-hidden flex flex-col md:flex-row min-h-[600px]">
          {/* Left: Image Gallery (Simplified) */}
          <div className="w-full md:w-[40%] p-8 flex flex-col items-center border-r border-gray-100">
            <div className="sticky top-24 w-full">
              <div className="aspect-square bg-white flex items-center justify-center mb-8 border border-gray-100 rounded-sm">
                <img
                  src={product.image ? `${API_BASE_URL}/${product.prod_id}/image` : 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop'}
                  alt={product.name}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
              
              <div className="flex gap-4">
                <button className="flex-1 py-4 bg-[#ff9f00] text-white font-bold rounded-sm flex items-center justify-center gap-2 shadow hover:bg-[#f39700] transition-all">
                  <ShoppingCart className="w-5 h-5" />
                  ADD TO CART
                </button>
                <button className="flex-1 py-4 bg-[#fb641b] text-white font-bold rounded-sm flex items-center justify-center gap-2 shadow hover:bg-[#f4511e] transition-all">
                  <CreditCard className="w-5 h-5" />
                  BUY NOW
                </button>
              </div>
            </div>
          </div>

          {/* Right: Product Info */}
          <div className="w-full md:w-[60%] p-8">
            <nav className="flex items-center text-xs text-muted-foreground mb-2 gap-2">
              <Link to="/" className="hover:text-[#2874f0]">Home</Link>
              <span>&gt;</span>
              <span className="hover:text-[#2874f0]">{product.category}</span>
              <span>&gt;</span>
              <span className="text-foreground font-medium">{product.brand}</span>
            </nav>

            <h1 className="text-xl md:text-2xl font-medium text-gray-900 mb-2">
              {product.name}
            </h1>

            <div className="flex items-center gap-3 mb-4">
              <div className="bg-green-700 text-white text-xs font-bold px-2 py-0.5 rounded flex items-center gap-1">
                4.5 <Star className="w-3 h-3 fill-current" />
              </div>
              <span className="text-sm font-bold text-muted-foreground">1,245 Ratings & 320 Reviews</span>
            </div>

            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-3xl font-bold text-gray-900">${product.price.toLocaleString()}</span>
              <span className="text-sm text-muted-foreground line-through">${(product.price * 1.2).toLocaleString()}</span>
              <span className="text-sm font-bold text-green-600">20% off</span>
            </div>

            {/* Offers */}
            <div className="mb-8 p-4 border border-gray-100 rounded-sm bg-gray-50/50">
              <h3 className="text-sm font-bold mb-3 flex items-center gap-2">
                Available offers
              </h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <div className="text-green-600 font-bold mt-0.5">🏷️</div>
                  <span><span className="font-bold">Bank Offer</span> 10% instant discount on XYZ Bank Credit Cards, up to $1500.</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="text-green-600 font-bold mt-0.5">🏷️</div>
                  <span><span className="font-bold">Partner Offer</span> Sign up for ShopPlus Pay Later and get a gift card worth $500.</span>
                </li>
              </ul>
            </div>

            {/* Product Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8 border-b border-gray-100 pb-8">
              <div className="space-y-4">
                <h3 className="text-gray-900 font-bold text-sm">Highlights</h3>
                <ul className="list-disc list-inside text-sm text-gray-700 space-y-2">
                  <li>Brand: {product.brand}</li>
                  <li>Category: {product.category}</li>
                  <li>Model: {product.name.split(' ').pop()}</li>
                  <li>In Stock: {product.quantity} units</li>
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="text-gray-900 font-bold text-sm">Services</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-center gap-2"><Truck className="w-4 h-4 text-[#2874f0]" /> Delivery by Tomorrow</li>
                  <li className="flex items-center gap-2"><RefreshCw className="w-4 h-4 text-[#2874f0]" /> 7 Days Replacement Policy</li>
                  <li className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-[#2874f0]" /> 1 Year Warranty</li>
                </ul>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-gray-900 font-bold text-lg">Product Description</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductPage;
