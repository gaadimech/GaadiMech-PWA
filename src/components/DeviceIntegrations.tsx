import React from 'react';
import { PhoneIcon, ShareIcon } from '@heroicons/react/24/outline';
import ButtonEnhanced from './ui/button-enhanced';

interface ShareData {
  title?: string;
  text?: string;
  url?: string;
}

interface DeviceIntegrationsProps {
  className?: string;
}

export const useDeviceIntegrations = () => {
  // Native sharing
  const shareContent = async (data: ShareData) => {
    if (navigator.share) {
      try {
        await navigator.share(data);
        return { success: true, method: 'native' };
      } catch (error) {
        if (error instanceof Error && error.name !== 'AbortError') {
          console.error('Error sharing:', error);
        }
        return { success: false, method: 'native', error };
      }
    } else {
      // Fallback to clipboard or social media links
      const shareUrl = data.url || window.location.href;
      const shareText = `${data.title || ''} ${data.text || ''} ${shareUrl}`.trim();
      
      if (navigator.clipboard) {
        try {
          await navigator.clipboard.writeText(shareText);
          return { success: true, method: 'clipboard' };
        } catch (error) {
          console.error('Error copying to clipboard:', error);
        }
      }
      
      // Last resort: open WhatsApp share
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
      window.open(whatsappUrl, '_blank');
      return { success: true, method: 'whatsapp' };
    }
  };

  // Click to call
  const makeCall = (phoneNumber: string) => {
    window.location.href = `tel:${phoneNumber}`;
  };

  // Click to SMS
  const sendSMS = (phoneNumber: string, message?: string) => {
    const smsUrl = `sms:${phoneNumber}${message ? `?body=${encodeURIComponent(message)}` : ''}`;
    window.location.href = smsUrl;
  };

  // Open email
  const sendEmail = (email: string, subject?: string, body?: string) => {
    const params = new URLSearchParams();
    if (subject) params.append('subject', subject);
    if (body) params.append('body', body);
    
    const emailUrl = `mailto:${email}${params.toString() ? '?' + params.toString() : ''}`;
    window.location.href = emailUrl;
  };

  // Open maps/navigation
  const openMaps = (address: string) => {
    const encodedAddress = encodeURIComponent(address);
    
    // Try to detect platform for better experience
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const isAndroid = /Android/.test(navigator.userAgent);
    
    if (isIOS) {
      window.open(`maps://maps.apple.com/?q=${encodedAddress}`, '_system');
    } else if (isAndroid) {
      window.open(`geo:0,0?q=${encodedAddress}`, '_system');
    } else {
      window.open(`https://maps.google.com/maps?q=${encodedAddress}`, '_blank');
    }
  };

  // Check if device has specific capabilities
  const deviceCapabilities = {
    canShare: !!navigator.share,
    canVibrate: !!navigator.vibrate,
    canNotify: 'Notification' in window,
    hasCamera: !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia),
    hasGeolocation: !!navigator.geolocation,
  };

  // Vibration feedback
  const vibrate = (pattern: number | number[] = 50) => {
    if (navigator.vibrate) {
      navigator.vibrate(pattern);
    }
  };

  return {
    shareContent,
    makeCall,
    sendSMS,
    sendEmail,
    openMaps,
    vibrate,
    deviceCapabilities,
  };
};

// Quick action buttons component
const DeviceIntegrations: React.FC<DeviceIntegrationsProps> = ({ className = '' }) => {
  const { makeCall, shareContent, deviceCapabilities } = useDeviceIntegrations();

  const handleCall = () => {
    makeCall('+91-8448-285289');
  };

  const handleShare = async () => {
    await shareContent({
      title: 'GaadiMech - Car Service & Repair',
      text: 'Professional car service, repair, and maintenance in Jaipur',
      url: window.location.href,
    });
  };

  return (
    <div className={`flex space-x-2 ${className}`}>
      <ButtonEnhanced
        variant="outline"
        size="sm"
        leftIcon={<PhoneIcon className="w-4 h-4" />}
        onClick={handleCall}
        className="haptic-light"
      >
        Call
      </ButtonEnhanced>
      
      {deviceCapabilities.canShare && (
        <ButtonEnhanced
          variant="outline"
          size="sm"
          leftIcon={<ShareIcon className="w-4 h-4" />}
          onClick={handleShare}
          className="haptic-light"
        >
          Share
        </ButtonEnhanced>
      )}
    </div>
  );
};

export default DeviceIntegrations; 