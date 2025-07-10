import React from 'react';
import { cn } from '../../utils/cn';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({ className, ...props }) => {
  return (
    <div
      className={cn('skeleton rounded-md', className)}
      {...props}
    />
  );
};

// Predefined skeleton components for common use cases
const SkeletonText: React.FC<{ lines?: number; className?: string }> = ({ 
  lines = 1, 
  className 
}) => {
  return (
    <div className={cn('space-y-2', className)}>
      {Array.from({ length: lines }).map((_, index) => (
        <Skeleton
          key={index}
          className={cn(
            'h-4',
            index === lines - 1 ? 'w-3/4' : 'w-full' // Last line is shorter
          )}
        />
      ))}
    </div>
  );
};

const SkeletonCard: React.FC<{ className?: string; hasImage?: boolean }> = ({ 
  className,
  hasImage = false 
}) => {
  return (
    <div className={cn('p-4 space-y-3', className)}>
      {hasImage && <Skeleton className="h-48 w-full rounded-lg" />}
      <div className="space-y-2">
        <Skeleton className="h-5 w-3/4" />
        <SkeletonText lines={2} />
      </div>
      <div className="flex space-x-2">
        <Skeleton className="h-8 w-20" />
        <Skeleton className="h-8 w-16" />
      </div>
    </div>
  );
};

const SkeletonAvatar: React.FC<{ size?: 'sm' | 'md' | 'lg'; className?: string }> = ({ 
  size = 'md',
  className 
}) => {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-12 w-12',
    lg: 'h-16 w-16',
  };

  return (
    <Skeleton
      className={cn('rounded-full', sizeClasses[size], className)}
    />
  );
};

const SkeletonButton: React.FC<{ className?: string; fullWidth?: boolean }> = ({ 
  className,
  fullWidth = false 
}) => {
  return (
    <Skeleton
      className={cn(
        'h-12 rounded-app',
        fullWidth ? 'w-full' : 'w-24',
        className
      )}
    />
  );
};

const SkeletonList: React.FC<{ 
  items?: number; 
  hasAvatar?: boolean;
  className?: string;
}> = ({ 
  items = 3, 
  hasAvatar = false,
  className 
}) => {
  return (
    <div className={cn('space-y-4', className)}>
      {Array.from({ length: items }).map((_, index) => (
        <div key={index} className="flex items-center space-x-3">
          {hasAvatar && <SkeletonAvatar size="md" />}
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
};

// Service-specific skeletons for GaadiMech
const SkeletonServiceCard: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={cn('bg-white rounded-card p-4 shadow-sm space-y-3', className)}>
      <Skeleton className="h-32 w-full rounded-lg" />
      <div className="space-y-2">
        <Skeleton className="h-5 w-3/4" />
        <SkeletonText lines={2} />
      </div>
      <div className="flex justify-between items-center">
        <Skeleton className="h-4 w-16" />
        <SkeletonButton className="w-20 h-8" />
      </div>
    </div>
  );
};

const SkeletonNavbar: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={cn('bg-white border-b p-4', className)}>
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-32" />
        <div className="flex space-x-4">
          <Skeleton className="h-8 w-16" />
          <Skeleton className="h-8 w-16" />
          <Skeleton className="h-8 w-16" />
        </div>
      </div>
    </div>
  );
};

const SkeletonPage: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={cn('space-y-6 p-4', className)}>
      {/* Header */}
      <div className="space-y-2">
        <Skeleton className="h-8 w-3/4" />
        <SkeletonText lines={2} />
      </div>
      
      {/* Content grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <SkeletonServiceCard key={index} />
        ))}
      </div>
    </div>
  );
};

export {
  Skeleton,
  SkeletonText,
  SkeletonCard,
  SkeletonAvatar,
  SkeletonButton,
  SkeletonList,
  SkeletonServiceCard,
  SkeletonNavbar,
  SkeletonPage,
}; 