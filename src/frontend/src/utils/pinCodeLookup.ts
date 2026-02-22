export interface PinCodeLookupResult {
  district: string;
  state: string;
  postOffice: string;
  success: boolean;
  error?: string;
}

/**
 * Lookup district, state, and post office information for an Indian PIN code
 * Uses the India Post API (postalpincode.in) for PIN code lookup
 */
export async function lookupPinCode(pinCode: string): Promise<PinCodeLookupResult> {
  // Validate PIN code format (6 digits)
  if (!/^\d{6}$/.test(pinCode)) {
    return {
      district: '',
      state: '',
      postOffice: '',
      success: false,
      error: 'Invalid PIN code format. Must be 6 digits.',
    };
  }

  try {
    // Using India Post API
    const response = await fetch(`https://api.postalpincode.in/pincode/${pinCode}`);
    
    if (!response.ok) {
      throw new Error('Network error');
    }

    const data = await response.json();

    // Check if the API returned valid data
    if (data && data[0] && data[0].Status === 'Success' && data[0].PostOffice && data[0].PostOffice.length > 0) {
      const postOffice = data[0].PostOffice[0];
      return {
        district: postOffice.District || '',
        state: postOffice.State || '',
        postOffice: postOffice.Name || '',
        success: true,
      };
    } else {
      return {
        district: '',
        state: '',
        postOffice: '',
        success: false,
        error: 'PIN code not found or invalid',
      };
    }
  } catch (error) {
    console.error('PIN code lookup error:', error);
    return {
      district: '',
      state: '',
      postOffice: '',
      success: false,
      error: 'Failed to lookup PIN code. Please try again.',
    };
  }
}
