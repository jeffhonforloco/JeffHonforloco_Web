
import React, { useState, useEffect } from 'react';
import { getSubscribers, exportSubscribersCSV } from '@/utils/emailService';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Download, Filter } from 'lucide-react';

interface EmailListProps {
  className?: string;
}

const EmailList: React.FC<EmailListProps> = ({ className }) => {
  const [subscribers, setSubscribers] = useState<ReturnType<typeof getSubscribers>>([]);
  const [filteredSubscribers, setFilteredSubscribers] = useState<ReturnType<typeof getSubscribers>>([]);
  const [filter, setFilter] = useState('');
  const [sortBy, setSortBy] = useState<'email' | 'date'>('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  useEffect(() => {
    // Load subscribers
    const loadedSubscribers = getSubscribers();
    setSubscribers(loadedSubscribers);
    setFilteredSubscribers(loadedSubscribers);
  }, []);

  useEffect(() => {
    // Apply filtering
    if (!filter) {
      setFilteredSubscribers(subscribers);
    } else {
      const lowerFilter = filter.toLowerCase();
      setFilteredSubscribers(
        subscribers.filter(sub => 
          sub.email.toLowerCase().includes(lowerFilter) || 
          (sub.name && sub.name.toLowerCase().includes(lowerFilter)) ||
          sub.source.toLowerCase().includes(lowerFilter) ||
          (sub.tags && sub.tags.some(tag => tag.toLowerCase().includes(lowerFilter)))
        )
      );
    }
  }, [filter, subscribers]);

  // Sort subscribers
  useEffect(() => {
    const sortedSubscribers = [...filteredSubscribers].sort((a, b) => {
      if (sortBy === 'email') {
        return sortDirection === 'asc' 
          ? a.email.localeCompare(b.email)
          : b.email.localeCompare(a.email);
      } else {
        return sortDirection === 'asc'
          ? new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
          : new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
      }
    });
    
    setFilteredSubscribers(sortedSubscribers);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortBy, sortDirection]);

  const handleExportCSV = () => {
    const csv = exportSubscribersCSV();
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `jeffhonforloco-subscribers-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const toggleSort = (field: 'email' | 'date') => {
    if (sortBy === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortDirection('asc');
    }
  };

  return (
    <div className={`space-y-4 ${className || ''}`}>
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Email Subscribers</h2>
        <Button onClick={handleExportCSV} variant="outline" className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Export CSV
        </Button>
      </div>
      
      <div className="flex items-center gap-2 mb-4">
        <Input
          type="text"
          placeholder="Filter subscribers..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="max-w-xs"
        />
        <Filter className="h-4 w-4 text-gray-400" />
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
                  onClick={() => toggleSort('email')}
                >
                  Email {sortBy === 'email' && (sortDirection === 'asc' ? '↑' : '↓')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Source
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
                  onClick={() => toggleSort('date')}
                >
                  Date {sortBy === 'date' && (sortDirection === 'asc' ? '↑' : '↓')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Tags
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredSubscribers.length > 0 ? (
                filteredSubscribers.map((subscriber, index) => (
                  <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      {subscriber.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      {subscriber.name || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      {subscriber.source}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      {new Date(subscriber.timestamp).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      {subscriber.tags?.map((tag, idx) => (
                        <span key={idx} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100 mr-1">
                          {tag}
                        </span>
                      )) || '-'}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-300">
                    No subscribers found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EmailList;
