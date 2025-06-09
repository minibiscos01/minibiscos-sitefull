import { useState, useEffect } from 'react';

const ProductCard = ({ product }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageRotationTimer, setImageRotationTimer] = useState(null);

  // Collect all available images for the product
  const productImages = [
    product.imageUrl || "/assets/images/cookie-placeholder.jpg",
    product.imageUrl2,
    product.imageUrl3
  ].filter(Boolean); // Remove undefined or null values

  // Set up image rotation on hover
  useEffect(() => {
    if (isHovering && productImages.length > 1) {
      const timer = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % productImages.length);
      }, 1500); // Change image every 1.5 seconds
      setImageRotationTimer(timer);
    } else {
      // Clear timer and reset to first image when not hovering
      if (imageRotationTimer) {
        clearInterval(imageRotationTimer);
        setImageRotationTimer(null);
      }
      setCurrentImageIndex(0);
    }
    
    return () => {
      if (imageRotationTimer) clearInterval(imageRotationTimer);
    };
  }, [isHovering, productImages.length]);
  
  return (
    <div 
      className={`bg-white rounded-xl overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl 
        ${isExpanded ? 'scale-[1.03] z-10 ring-2 ring-amber-400' : 'scale-100'}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Product Image */}
      <div className="h-64 overflow-hidden relative">
        <img 
          src={productImages[currentImageIndex]}
          alt={product.name}
          className="w-full h-full object-cover transition-all duration-500 hover:scale-110"
        />
        {productImages.length > 1 && isHovering && (
          <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
            {productImages.map((_, index) => (
              <span 
                key={index} 
                className={`h-1.5 rounded-full transition-all duration-300 ${currentImageIndex === index ? 'w-4 bg-amber-400' : 'w-1.5 bg-amber-200'}`}
              />
            ))}
          </div>
        )}
      </div>
      
      {/* Product Info */}
      <div className="p-6">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-bold text-amber-900">{product.name}</h3>
          <span className="inline-block px-2 py-1 text-xs rounded bg-amber-100 text-amber-800">
            {product.category === 'traditional' ? 'Traditional' : 
             product.category === 'chocolate' ? 'Chocolate' : 
             product.category === 'special' ? 'Special' : 
             product.category === 'wholegrain' ? 'Wholegrain' : 
             product.category === 'seasonal' ? 'Seasonal' : product.category}
          </span>
        </div>
        
        <p className="text-amber-700 mt-2">
          {isExpanded ? product.description : `${product.description.substring(0, 90)}${product.description.length > 90 ? '...' : ''}`}
        </p>
        
        <div className="mt-4 flex items-center justify-between">
          {product.price && (
            <span className="text-lg font-semibold text-amber-900">
              {typeof product.price === 'string' ? product.price : `R$ ${product.price.toFixed(2).replace('.', ',')}`}
            </span>
          )}
          
          {product.description.length > 90 && (
            <button 
              onClick={() => setIsExpanded(!isExpanded)} 
              className="text-amber-600 hover:text-amber-500 font-medium"
            >
              {isExpanded ? 'Show less' : 'Show more'}
            </button>
          )}
        </div>
        
        {/* Ingredients and Allergens when expanded */}
        {isExpanded && product.ingredients && (
          <div className="mt-4 pt-4 border-t border-amber-100">
            <p className="text-sm text-amber-800">
              <strong>Ingredients:</strong> {product.ingredients}
            </p>
            {product.allergens && (
              <p className="text-sm text-amber-800 mt-2">
                <strong>Contains:</strong> {product.allergens}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;