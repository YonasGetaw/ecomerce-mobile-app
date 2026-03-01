import { products } from '../data/productsData';
import { categories } from '../data/categoriesData';
import { userData } from '../data/userData';
import { promoData } from '../data/promoData';

export const dummyData = {
  // User data
  user: userData,
  
  // Product data
  products: products,
  
  // Category data
  categories: categories,
  
  // Promo data
  promo: promoData,
  
  // Get product by ID
  getProductById: (id) => {
    return products.find(p => p.id === id);
  },
  
  // Get products by category
  getProductsByCategory: (category) => {
    return products.filter(p => p.category === category);
  },
  
  // Get products by subcategory
  getProductsBySubcategory: (subcategory) => {
    return products.filter(p => p.subcategory === subcategory);
  },
  
  // Get related products
  getRelatedProducts: (productId, limit = 4) => {
    const product = products.find(p => p.id === productId);
    if (!product) return [];
    
    return products
      .filter(p => p.id !== productId && p.category === product.category)
      .slice(0, limit);
  },
  
  // Get featured products
  getFeaturedProducts: (limit = 10) => {
    return products.filter(p => p.isNew || p.isHot).slice(0, limit);
  },
  
  // Get sale products
  getSaleProducts: (limit = 10) => {
    return products.filter(p => p.isSale).slice(0, limit);
  },
  
  // Get new products
  getNewProducts: (limit = 10) => {
    return products.filter(p => p.isNew).slice(0, limit);
  },
  
  // Get hot products
  getHotProducts: (limit = 10) => {
    return products.filter(p => p.isHot).slice(0, limit);
  },
  
  // Search products
  searchProducts: (query) => {
    const searchTerm = query.toLowerCase();
    return products.filter(p => 
      p.name.toLowerCase().includes(searchTerm) ||
      p.description.toLowerCase().includes(searchTerm) ||
      p.category.toLowerCase().includes(searchTerm)
    );
  },
  
  // Get category by ID
  getCategoryById: (id) => {
    return categories.find(c => c.id === id);
  },
  
  // Get subcategories by category ID
  getSubcategoriesByCategoryId: (categoryId) => {
    const category = categories.find(c => c.id === categoryId);
    return category ? category.subcategories : [];
  },
  
  // Get user addresses
  getUserAddresses: () => {
    return userData.addresses;
  },
  
  // Get user payment methods
  getPaymentMethods: () => {
    return userData.paymentMethods;
  },
  
  // Get user orders
  getUserOrders: () => {
    return userData.orders;
  },
  
  // Get user wishlist
  getUserWishlist: () => {
    return userData.wishlist.map(id => products.find(p => p.id === id));
  },
  
  // Get recently viewed
  getRecentlyViewed: () => {
    return userData.recentlyViewed.map(id => products.find(p => p.id === id));
  },
  
  // Get promo banners
  getPromoBanners: () => {
    return promoData.banners;
  },
  
  // Get flash sales
  getFlashSales: () => {
    return promoData.flashSales;
  },
  
  // Get featured items
  getFeaturedItems: () => {
    return promoData.featured;
  },
  
  // Get trending items
  getTrendingItems: () => {
    return promoData.trending;
  }
};