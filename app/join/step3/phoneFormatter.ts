/**
 * Formats a phone number string into a more readable format
 * Example: "12345678901" becomes "+1 (234) 567-8901"
 * 
 * @param phoneNumber - The raw phone number string to format
 * @returns The formatted phone number string
 */
export const formatPhoneNumber = (phoneNumber: string): string => {
    // If phone is empty, return empty string
    if (!phoneNumber || phoneNumber.trim() === '') {
      return '';
    }
  
    // Remove all non-digit characters
    const cleaned = phoneNumber.replace(/\D/g, '');
    
    // If US format (length 10 or 11)
    if (cleaned.length === 10) {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`;
    } else if (cleaned.length === 11 && cleaned[0] === '1') {
      return `+1 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7, 11)}`;
    } else if (cleaned.length > 10) {
      // International format with varying lengths
      // Assume first 1-3 digits are country code
      const countryCodeLength = cleaned.length <= 12 ? 2 : 3;
      const areaCodeLength = 3;
      const firstPartLength = 3;
      
      const countryCode = cleaned.slice(0, countryCodeLength);
      const areaCode = cleaned.slice(countryCodeLength, countryCodeLength + areaCodeLength);
      const firstPart = cleaned.slice(countryCodeLength + areaCodeLength, countryCodeLength + areaCodeLength + firstPartLength);
      const lastPart = cleaned.slice(countryCodeLength + areaCodeLength + firstPartLength);
      
      return `+${countryCode} (${areaCode}) ${firstPart}-${lastPart}`;
    } else {
      // For shorter numbers or different formats
      // Just add basic grouping
      if (cleaned.length <= 4) {
        return cleaned;
      } else if (cleaned.length <= 7) {
        return `${cleaned.slice(0, 3)}-${cleaned.slice(3)}`;
      } else {
        // Split it in groups of 3-2-2 or similar
        return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
      }
    }
  };