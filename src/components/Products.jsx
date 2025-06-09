import { useState, useEffect } from 'react';
import { products } from '../data/products';
import ProductCard from './ProductCard';
import './CircularLogo.css';

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const categories = ['all', ...new Set(products.map(product => product.category))];
  
  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => {
      if (selectedCategory === 'all') {
        setFilteredProducts(products);
      } else {
        setFilteredProducts(products.filter(product => product.category === selectedCategory));
      }
      setIsAnimating(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [selectedCategory]);

  const formatCategoryName = (category) => {
    const categoryNames = {
      'all': 'All',
      'traditional': 'Traditional',
      'filled': 'Filled',
      'chocolate': 'Chocolate',
      'coffee': 'Coffee'
    };
    return categoryNames[category] || category.charAt(0).toUpperCase() + category.slice(1);
  };
  
  return (
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <div className="flex justify-center mb-4">
          <img 
            src="/assets/images/minibiscos-logo-circular.png" 
            alt="MiniBiscos Logo" 
            className="w-16 h-16 rounded-full border-2 border-amber-400" 
          />
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-amber-900 mb-4">Our Products</h2>
        <p className="text-lg text-amber-800 max-w-2xl mx-auto">
          Discover our variety of artisanal cookies, made with carefully selected ingredients and lots of love
        </p>
      </div>
      
      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-2 mb-12">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full transition-all ${
              selectedCategory === category 
                ? 'bg-amber-600 text-white' 
                : 'bg-amber-100 text-amber-800 hover:bg-amber-200'
            }`}
          >
            {formatCategoryName(category)}
          </button>
        ))}
      </div>
      
      {/* Products Grid */}
      <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 transition-opacity duration-300 ${
        isAnimating ? 'opacity-50' : 'opacity-100'
      }`}>
        {filteredProducts.map(product => (
          <ProductCard 
            key={product.id} 
            product={product}
          />
        ))}
      </div>
    </div>
  );
};

export default Products;