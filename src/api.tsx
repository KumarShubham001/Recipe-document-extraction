const BASE_URL = 'YOUR_BASE_URL';

export const fetchWithBaseUrl = async (url: string, options: RequestInit = {}) => {
  const fullUrl = `${BASE_URL}${url}`;
  const response = await fetch(fullUrl, options);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};

export const getPreviousUploads = async () => {
  return fetchWithBaseUrl('/previous-uploads', { method: "GET" });
};

export const uploadDocument = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  return fetchWithBaseUrl('/upload', {
    method: 'POST',
    body: formData,
  });
};

export const submitDocument = async (data: any) => {
  return fetchWithBaseUrl('/submit-document', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
};

export const getExtractionStatus = async (data: any) => {
  return fetchWithBaseUrl('/get_extraction_status', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
};

export const getExtractionLog = async (data: any) => {
  return fetchWithBaseUrl('/get_extraction_log', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
};