import { useState } from 'react';
import { useAction } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { useLocation } from '../contexts/LocationContext';
import { MagnifyingGlassIcon, PhoneIcon, EnvelopeIcon, GlobeAltIcon, StarIcon } from '@heroicons/react/24/outline';

interface Lawyer {
  name: string;
  email: string;
  phone: string;
  address: string;
  specialization: string[];
  rating: number;
  location: string;
  website?: string;
}

export function LawyerSearch() {
  const [searchLocation, setSearchLocation] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [lawyers, setLawyers] = useState<Lawyer[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const { location } = useLocation();
  
  const searchLawyers = useAction(api.lawyers.searchLawyers);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const locationToSearch = searchLocation || location;
    
    if (!locationToSearch.trim()) {
      alert('Please enter a location to search for lawyers');
      return;
    }

    setIsSearching(true);
    try {
      const results = await searchLawyers({
        location: locationToSearch,
        specialization: specialization || undefined,
      });
      setLawyers(results);
    } catch (error) {
      console.error('Error searching lawyers:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const specializations = [
    'Criminal Law',
    'Family Law',
    'Corporate Law',
    'Property Law',
    'Civil Law',
    'Intellectual Property',
    'Labour Law',
    'Tax Law',
    'Consumer Law',
    'Cyber Law',
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <MagnifyingGlassIcon className="w-5 h-5 text-blue-600" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Find Lawyers Near You
        </h3>
      </div>

      <form onSubmit={handleSearch} className="space-y-3">
        <div className="grid md:grid-cols-2 gap-3">
          <input
            type="text"
            placeholder={`Location ${location ? `(current: ${location})` : ''}`}
            value={searchLocation}
            onChange={(e) => setSearchLocation(e.target.value)}
            className="px-3 py-2 bg-white/50 dark:bg-gray-800/50 border border-white/20 dark:border-gray-700/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 backdrop-blur-sm"
          />
          <select
            value={specialization}
            onChange={(e) => setSpecialization(e.target.value)}
            className="px-3 py-2 bg-white/50 dark:bg-gray-800/50 border border-white/20 dark:border-gray-700/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 backdrop-blur-sm"
          >
            <option value="">All Specializations</option>
            {specializations.map((spec) => (
              <option key={spec} value={spec}>
                {spec}
              </option>
            ))}
          </select>
        </div>
        
        <button
          type="submit"
          disabled={isSearching}
          className="w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:transform-none"
        >
          {isSearching ? 'Searching...' : 'Search Lawyers'}
        </button>
      </form>

      {lawyers.length > 0 && (
        <div className="space-y-3 max-h-96 overflow-y-auto">
          <h4 className="font-medium text-gray-900 dark:text-white">
            Found {lawyers.length} lawyers
          </h4>
          {lawyers.map((lawyer, index) => (
            <div
              key={index}
              className="backdrop-blur-sm bg-white/40 dark:bg-gray-800/40 border border-white/20 dark:border-gray-700/30 rounded-lg p-4"
            >
              <div className="flex justify-between items-start mb-2">
                <h5 className="font-semibold text-gray-900 dark:text-white">
                  {lawyer.name}
                </h5>
                <div className="flex items-center gap-1">
                  <StarIcon className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    {lawyer.rating}
                  </span>
                </div>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex flex-wrap gap-1">
                  {lawyer.specialization.map((spec, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded text-xs"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
                
                <p className="text-gray-600 dark:text-gray-300">{lawyer.address}</p>
                
                <div className="flex flex-wrap gap-4 pt-2">
                  <a
                    href={`tel:${lawyer.phone}`}
                    className="flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    <PhoneIcon className="w-4 h-4" />
                    {lawyer.phone}
                  </a>
                  <a
                    href={`mailto:${lawyer.email}`}
                    className="flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    <EnvelopeIcon className="w-4 h-4" />
                    Email
                  </a>
                  {lawyer.website && (
                    <a
                      href={`https://${lawyer.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      <GlobeAltIcon className="w-4 h-4" />
                      Website
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
