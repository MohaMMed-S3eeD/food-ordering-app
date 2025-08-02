import React from "react";
import Image from "next/image";
import { formatCurrency } from "@/lib/formatters";
import { AddToCart } from "./AddToCart";
import { ProductWithRelations } from "@/types/product";

const CardPizaa = ({ Product }: { Product: ProductWithRelations }) => {
  return (
    <div className="group relative w-full max-w-sm mx-auto bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out overflow-hidden border border-gray-100 hover:border-orange-200 transform hover:-translate-y-1">
      {/* Pizza Image Section */}
      <div className="relative w-full h-52 bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50 overflow-hidden">
        <Image
          src={Product.imageUrl}
          alt={Product.name}
          loading="lazy"
          fill
          className="object-contain group-hover:scale-110 transition-transform duration-500 ease-out p-6"
        />
        
        {/* Price Badge */}
        <div className="absolute top-4 right-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full px-4 py-2 shadow-lg transform group-hover:scale-105 transition-transform duration-200">
          <span className="text-sm font-bold">
            {formatCurrency(Product.basePrice)}
          </span>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-orange-200 rounded-full opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
        <div className="absolute -top-4 -right-4 w-12 h-12 bg-red-200 rounded-full opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
      </div>
      
      {/* Content Section */}
      <div className="p-6 space-y-4 bg-gradient-to-b from-white to-gray-50">
        <div className="space-y-3">
          <h1 className="text-xl font-bold text-gray-800 line-clamp-1 group-hover:text-orange-600 transition-colors duration-300 leading-tight">
            {Product.name}
          </h1>
          <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
            {Product.description}
          </p>
        </div>
        
        {/* Action Section */}
        <div className="pt-3 border-t border-gray-100 w-full flex justify-center">
          <AddToCart Product={Product} />
        </div>
      </div>
      
      {/* Subtle Glow Effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-orange-400/0 via-transparent to-red-400/0 group-hover:from-orange-400/5 group-hover:to-red-400/5 transition-all duration-300 pointer-events-none"></div>
    </div>
  );
};

export default CardPizaa;
