import React from 'react';

export default function Welcome() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-brand-charcoal font-primary mb-6">
          Welcome!
        </h2>
        <p className="text-xl text-brand-charcoal/80 font-secondary leading-relaxed">
          Whether you're a farmer, a student, a researcher, a buyer, a seller, or simply curious about
          agriculture and food security, there's something here for you.
        </p>
      </div>
    </section>
  );
}