import React, { useState } from 'react';
import { troubleshootOutlook } from '../services/microsoftGraph';

const OutlookTroubleshooting: React.FC = () => {
  const [issue, setIssue] = useState('');
  const [solution, setSolution] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const result = await troubleshootOutlook(issue);
      setSolution(result);
    } catch (error) {
      console.error('Error troubleshooting Outlook:', error);
      setSolution('Error troubleshooting Outlook. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Outlook Troubleshooting</h2>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow">
        <div className="mb-4">
          <label htmlFor="issue" className="block mb-2">
            Describe your Outlook issue
          </label>
          <textarea
            id="issue"
            value={issue}
            onChange={(e) => setIssue(e.target.value)}
            className="w-full p-2 border rounded"
            rows={4}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
          disabled={isLoading}
        >
          {isLoading ? 'Troubleshooting...' : 'Troubleshoot'}
        </button>
      </form>
      {solution && (
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <h3 className="font-bold mb-2">Suggested Solution:</h3>
          <p>{solution}</p>
        </div>
      )}
    </div>
  );
};

export default OutlookTroubleshooting;