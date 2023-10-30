export const buildQueryString = (params: { [key: string]: any }): string => {
    const queryParams = [];
  
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined && value !== null) {
        if (typeof value === "string" && value.trim() === "") {
          continue;
        }
        queryParams.push(`${key}=${encodeURIComponent(value)}`);
      }
    }
  
    return queryParams.join("&");
  };
  