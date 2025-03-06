'use client';

import { User } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white shadow flex justify-between items-center px-6 py-3">
      <h1 className="text-lg font-semibold text-gray-700">Navkaar Jewellers</h1>
      <User className="w-8 h-8 text-gray-500" />
    </header>
  );
};

export default Header;
