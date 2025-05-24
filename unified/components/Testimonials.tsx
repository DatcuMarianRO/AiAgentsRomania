'use client';

import React, { useState } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  position: string;
  company: string;
  avatar: string;
  rating: number;
  text: string;
  featured?: boolean;
}

const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Alexandra Popescu",
      position: "CEO",
      company: "TechStart Romania",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616c28ca1dc?w=100&h=100&fit=crop&crop=face",
      rating: 5,
      text: "AI Agents România a revoluționat complet modul în care gestionăm customer support-ul. Agenții lor conversaționali au redus timpul de răspuns cu 90% și au crescut satisfacția clienților la un nivel record.",
      featured: true
    },
    {
      id: 2,
      name: "Mihai Ionescu",
      position: "CTO",
      company: "Digital Solutions SRL",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      rating: 5,
      text: "Calitatea agenților AI și suportul tehnic sunt excepționale. Am integrat 3 agenți în platforma noastră în mai puțin de o săptămână. ROI-ul a fost vizibil imediat."
    },
    {
      id: 3,
      name: "Dr. Elena Marinescu",
      position: "Director Medical",
      company: "MedTech Innovations",
      avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop&crop=face",
      rating: 5,
      text: "Agenții AI pentru analiză medicală au îmbunătățit dramatic precizia diagnosticelor noastre. Tehnologia lor este cu adevărat de ultimă generație."
    },
    {
      id: 4,
      name: "Radu Constantinescu",
      position: "Marketing Director",
      company: "Creative Agency Pro",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      rating: 5,
      text: "VisualCreator AI ne-a permis să creăm conținut vizual de calitate profesională în timp record. Clienții noștri sunt impresionați de rezultate."
    },
    {
      id: 5,
      name: "Ana Gheorghiu",
      position: "Business Analyst",
      company: "FinTech Romania",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      rating: 5,
      text: "DataMiner AI a automatizat complet procesele noastre de analiză financiară. Rapoartele se generează automat și sunt extrem de precise."
    }
  ];


  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="py-32 px-4 sm:px-6 lg:px-8 bg-gray-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 border border-blue-500 rounded-full animate-spin" style={{ animationDuration: '20s' }}></div>
        <div className="absolute top-3/4 right-1/4 w-24 h-24 border border-purple-500 rounded-full animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* Section Title */}
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
            Ce spun <span className="text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text">clienții noștri</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Peste 1000 de companii din România și Europa au ales AI Agents România 
            pentru a-și transforma procesele business cu inteligența artificială.
          </p>
        </div>

        {/* Main Testimonial */}
        <div className="max-w-4xl mx-auto">
          <div className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-3xl p-8 md:p-12">
            
            {/* Quote Icon */}
            <div className="absolute top-6 left-6 text-blue-400 opacity-20">
              <Quote className="w-16 h-16" />
            </div>

            {/* Navigation */}
            <div className="absolute top-6 right-6 flex gap-2">
              <button 
                onClick={prevTestimonial}
                className="w-10 h-10 bg-gray-700 hover:bg-gray-600 rounded-full flex items-center justify-center transition-colors duration-200"
              >
                <ChevronLeft className="w-5 h-5 text-white" />
              </button>
              <button 
                onClick={nextTestimonial}
                className="w-10 h-10 bg-gray-700 hover:bg-gray-600 rounded-full flex items-center justify-center transition-colors duration-200"
              >
                <ChevronRight className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Content */}
            <div className="relative z-10 pt-8">
              
              {/* Rating */}
              <div className="flex items-center gap-1 mb-6">
                {[...Array(currentTestimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                ))}
              </div>

              {/* Testimonial Text */}
              <blockquote className="text-xl md:text-2xl text-white leading-relaxed mb-8 font-medium">
                "{currentTestimonial.text}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-4">
                <img 
                  src={currentTestimonial.avatar}
                  alt={currentTestimonial.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-gray-600"
                />
                <div>
                  <div className="text-white font-bold text-lg">{currentTestimonial.name}</div>
                  <div className="text-blue-400 font-medium">{currentTestimonial.position}</div>
                  <div className="text-gray-400">{currentTestimonial.company}</div>
                </div>
              </div>
            </div>

            {/* Gradient Border Effect */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-600/20 to-purple-600/20 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
          </div>

          {/* Testimonial Indicators */}
          <div className="flex justify-center gap-3 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-blue-400 w-8' 
                    : 'bg-gray-600 hover:bg-gray-500'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 max-w-4xl mx-auto">
          {[
            { value: "1000+", label: "Clienți Mulțumiți" },
            { value: "99.9%", label: "Satisfacție Client" },
            { value: "50+", label: "Industrii Servite" },
            { value: "24/7", label: "Suport Premium" }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-black text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text">
                {stat.value}
              </div>
              <div className="text-gray-400 font-medium mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;