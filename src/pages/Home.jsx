import React, { useState, useEffect, useCallback } from 'react';
import { Plus, Package, RefreshCw, AlertCircle, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import ProductCard from '../components/ProductCard';
import ProductForm from '../components/ProductForm';
import SearchBar from '../components/SearchBar';
import Modal from '../components/Modal';

const Home = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productToDelete, setProductToDelete] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await api.get('');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Failed to load products', { id: 'fetch-products' });
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleNavigateDetail = useCallback((product) => {
    navigate(`/product/${product.prod_id}`);
  }, [navigate]);

  const hasFetched = React.useRef(false);

  useEffect(() => {
    if (!hasFetched.current) {
      fetchProducts();
      hasFetched.current = true;
    }
  }, [fetchProducts]);

  const handleSearch = useCallback(async (keyword) => {
    if (keyword.trim() === '') {
      fetchProducts();
      return;
    }
    
    setIsLoading(true);
    try {
      const response = await api.get(`/search?searchWord=${keyword}`);
      setProducts(response.data);
    } catch (error) {
      console.error('Search error:', error);
      toast.error('Search failed', { id: 'search-products' });
    } finally {
      setIsLoading(false);
    }
  }, [fetchProducts]);

  const handleCreateOrUpdate = async (formData, imageFile) => {
    setIsSubmitting(true);
    const loadToast = toast.loading(selectedProduct ? 'Updating product...' : 'Creating product...');
    
    const payload = { ...formData };
    if (selectedProduct) {
      payload.prod_id = selectedProduct.prod_id;
    }

    const data = new FormData();
    data.append('newproduct', JSON.stringify(payload));
    if (imageFile) {
      data.append('imageFile', imageFile);
    }

    try {
      if (selectedProduct) {
        await api.put(`/${selectedProduct.prod_id}`, data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        toast.success('Product updated successfully', { id: loadToast });
      } else {
        await api.post('', data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        toast.success('Product created successfully', { id: loadToast });
      }
      setIsFormOpen(false);
      setSelectedProduct(null);
      fetchProducts();
    } catch (error) {
      console.error('Error saving product:', error);
      toast.error(error.response?.data?.message || 'Failed to save product', { id: loadToast });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = useCallback(async () => {
    if (!productToDelete) return;
    const loadToast = toast.loading('Deleting product...');
    try {
      await api.delete(`/${productToDelete}`);
      toast.success('Product deleted', { id: loadToast });
      setIsDeleteModalOpen(false);
      setProductToDelete(null);
      fetchProducts();
    } catch (error) {
      console.error('Delete error:', error);
      toast.error('Failed to delete product', { id: loadToast });
    }
  }, [productToDelete, fetchProducts]);

  return (
    <div className="min-h-screen bg-[#f1f3f6] dark:bg-background text-foreground pb-12">
      {/* Header Section (Amazon/Flipkart inspired) */}
      <header className="sticky top-0 z-40 w-full bg-[#2874f0] dark:bg-secondary py-3 shadow-md">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center gap-4">
          <div className="flex items-center justify-between w-full sm:w-auto">
            <div className="flex items-center space-x-2 cursor-pointer" onClick={() => fetchProducts()}>
              <Package className="w-7 h-7 text-white" />
              <h1 className="text-xl font-bold italic text-white tracking-tight">
                Shop<span className="text-yellow-400">Plus</span>
              </h1>
            </div>
            
            <button
              onClick={() => { setSelectedProduct(null); setIsFormOpen(true); }}
              className="sm:hidden bg-white text-[#2874f0] px-3 py-1.5 rounded-sm font-bold text-sm"
            >
              Add
            </button>
          </div>
          
          <div className="flex-1 w-full max-w-2xl">
            <SearchBar onSearch={handleSearch} />
          </div>

          <button
            onClick={() => { setSelectedProduct(null); setIsFormOpen(true); }}
            className="hidden sm:flex items-center space-x-2 px-6 py-2 bg-white text-[#2874f0] rounded-sm font-bold hover:bg-gray-100 transition-all shadow-sm"
          >
            <Plus className="w-5 h-5" />
            <span>Add Product</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {/* Breadcrumbs or Filter placeholder */}
        <div className="flex items-center text-xs text-muted-foreground mb-4 gap-2">
          <span>Home</span>
          <span>{'>'}</span>
          <span className="font-bold text-foreground">All Products</span>
        </div>

        {/* Stats / Actions Summary */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold">Recommended for You</h2>
            <p className="text-xs text-muted-foreground">Based on your recent browsing</p>
          </div>
          <button
            onClick={fetchProducts}
            className="flex items-center space-x-1 text-xs font-bold text-[#2874f0] hover:underline"
          >
            <RefreshCw className={`w-3 h-3 ${isLoading ? 'animate-spin' : ''}`} />
            <span>REFRESH CATALOG</span>
          </button>
        </div>

        {/* Products Grid */}
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="aspect-[3/4] rounded bg-gray-200 dark:bg-muted/20 animate-pulse" />
            ))}
          </div>
        ) : products.length > 0 ? (
          <motion.div 
            layout
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
          >
            <AnimatePresence>
              {products.map((product) => (
                <ProductCard
                  key={product.prod_id}
                  product={product}
                  onEdit={(p) => { setSelectedProduct(p); setIsFormOpen(true); }}
                  onDelete={(id) => { setProductToDelete(id); setIsDeleteModalOpen(true); }}
                  onClick={handleNavigateDetail}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded shadow-sm">
            <div className="p-6 bg-gray-50 rounded-full mb-4">
              <AlertCircle className="w-12 h-12 text-gray-300" />
            </div>
            <h3 className="text-xl font-bold text-gray-800">No results found</h3>
            <p className="text-muted-foreground mt-2">Try a different search term or check back later.</p>
          </div>
        )}
      </main>

      {/* Modals */}
      <Modal isOpen={isFormOpen} onClose={() => setIsFormOpen(false)}>
        <ProductForm
          product={selectedProduct}
          onSubmit={handleCreateOrUpdate}
          onCancel={() => setIsFormOpen(false)}
          isLoading={isSubmitting}
        />
      </Modal>

      <Modal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)}>
        <div className="w-full max-w-md bg-white dark:bg-card rounded-sm p-6 shadow-2xl">
          <div className="flex items-center space-x-4 mb-6">
            <div className="p-3 bg-red-50 rounded-full">
              <Trash2 className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <h3 className="text-lg font-bold">Remove Product?</h3>
              <p className="text-sm text-muted-foreground">Are you sure you want to remove this item?</p>
            </div>
          </div>
          <div className="flex space-x-4">
            <button
              onClick={() => setIsDeleteModalOpen(false)}
              className="flex-1 py-2 text-sm font-bold text-gray-600 hover:bg-gray-100 rounded-sm transition-all"
            >
              CANCEL
            </button>
            <button
              onClick={handleDelete}
              className="flex-1 py-2 bg-red-600 text-white text-sm font-bold rounded-sm hover:bg-red-700 transition-all shadow-md"
            >
              REMOVE
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Home;
