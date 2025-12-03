import React from 'react';
import { Recommendation, Property } from '../types';
import { MapPin, Home, Banknote, Star } from 'lucide-react';

interface PropertyCardProps {
  recommendation: Recommendation;
  propertyDetails?: Property;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ recommendation, propertyDetails }) => {
  return (
    <div className="group bg-[#121212] rounded-xl overflow-hidden border border-[#222] hover:border-[#00FF7F] transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,255,127,0.1)] relative">
      {/* Glow effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#00FF7F]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>

      {propertyDetails?.image_url && (
        <div className="h-48 w-full overflow-hidden relative">
          <img 
            src={propertyDetails.image_url} 
            alt={recommendation.titulo} 
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100 grayscale group-hover:grayscale-0"
          />
          <div className="absolute top-3 right-3">
             <span className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold backdrop-blur-md border ${
                recommendation.match_score > 80 
                ? 'bg-black/50 text-[#00FF7F] border-[#00FF7F]' 
                : 'bg-black/50 text-white border-white/20'
            }`}>
                <Star size={10} fill={recommendation.match_score > 80 ? "#00FF7F" : "white"} />
                {recommendation.match_score}% MATCH
            </span>
          </div>
        </div>
      )}
      <div className="p-6 relative z-10">
        <h3 className="font-bold text-white text-lg leading-tight mb-3 group-hover:text-[#00FF7F] transition-colors">{recommendation.titulo}</h3>
        
        {propertyDetails && (
            <div className="flex flex-wrap gap-4 mb-4 text-xs font-medium text-neutral-400">
                <span className="flex items-center gap-1.5"><MapPin size={14} className="text-[#00FF7F]"/> {propertyDetails.bairro}</span>
                <span className="flex items-center gap-1.5"><Home size={14} className="text-[#00FF7F]"/> {propertyDetails.quartos} qts • {propertyDetails.metragem}m²</span>
                <span className="flex items-center gap-1.5 text-white bg-[#222] px-2 py-0.5 rounded">
                    <Banknote size={14}/> 
                    {propertyDetails.aluguel_mensal > 0 ? `R$ ${propertyDetails.aluguel_mensal}/mês` : `R$ ${(propertyDetails.preco_venda/1000).toFixed(0)}k`}
                </span>
            </div>
        )}

        <p className="text-sm text-neutral-400 bg-[#0A0A0A] p-4 rounded-lg border border-[#222] border-l-2 border-l-[#00FF7F] italic leading-relaxed">
          "{recommendation.motivo_match}"
        </p>
      </div>
    </div>
  );
};

export default PropertyCard;