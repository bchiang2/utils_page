export const formatJSON = (jsonString: string): string => {
  try {
    const parsed = JSON.parse(jsonString)
    return JSON.stringify(parsed, null, 2)
  } catch (error) {
    throw new Error("Invalid JSON format")
  }
}

export const validateJSON = (jsonString: string): boolean => {
  try {
    JSON.parse(jsonString)
    return true
  } catch (error) {
    return false
  }
}

export const minifyJSON = (jsonString: string): string => {
  try {
    const parsed = JSON.parse(jsonString)
    return JSON.stringify(parsed)
  } catch (error) {
    throw new Error("Invalid JSON format")
  }
}
