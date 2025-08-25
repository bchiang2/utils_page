export const formatJSON = (jsonString: string): string => {
  try {
    const parsed = JSON.parse(jsonString);
    return JSON.stringify(parsed, null, 2);
  } catch {
    throw new Error('Invalid JSON format');
  }
};

export const validateJSON = (jsonString: string): boolean => {
  try {
    JSON.parse(jsonString);
    return true;
  } catch {
    return false;
  }
};

export const minifyJSON = (jsonString: string): string => {
  try {
    const parsed = JSON.parse(jsonString);
    return JSON.stringify(parsed);
  } catch {
    throw new Error('Invalid JSON format');
  }
};

export const escapeJSONString = (jsonString: string): string => {
  try {
    // First validate that it's valid JSON
    JSON.parse(jsonString);
    // Then escape it for use as a string value in another JSON
    return JSON.stringify(jsonString);
  } catch {
    throw new Error('Invalid JSON format');
  }
};

export const unescapeJSONString = (escapedString: string): string => {
  try {
    // Parse the escaped string to get the original JSON
    const unescaped = JSON.parse(escapedString);
    // Validate that the unescaped content is valid JSON
    JSON.parse(unescaped);
    return unescaped;
  } catch {
    throw new Error('Invalid escaped JSON format');
  }
};

export const isEscapedJSON = (content: string): boolean => {
  try {
    // Try to parse as a string first
    const parsed = JSON.parse(content);
    // If it's a string, check if that string contains valid JSON
    if (typeof parsed === 'string') {
      JSON.parse(parsed);
      return true;
    }
    return false;
  } catch {
    return false;
  }
};
