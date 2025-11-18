import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';

const NotFound = () => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">
      <div className="mb-8">
        <ApperIcon 
          name="AlertTriangle" 
          size={80} 
          className="text-gray-400 mb-4" 
        />
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          404 - Page Not Found
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
      </div>
      
      <div className="space-y-4">
        <Link to="/">
          <Button variant="primary" size="lg">
            <ApperIcon name="Home" size={20} className="mr-2" />
            Back to Dashboard
          </Button>
        </Link>
        
        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <Link to="/reports">
            <Button variant="outline" size="md">
              ESG Reports
            </Button>
          </Link>
          <Link to="/marketplace">
            <Button variant="outline" size="md">
              Marketplace
            </Button>
          </Link>
          <Link to="/supply-chain">
            <Button variant="outline" size="md">
              Supply Chain
            </Button>
          </Link>
          <Link to="/analytics">
            <Button variant="outline" size="md">
              Analytics
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;