const BASE_URL = 'http://localhost:8081';

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

export const uploadDocument = async (data:any) => {
  const formData = new FormData();
  formData.append('file', data.file);
  formData.append('username', data.username);
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

// get_extracted_tables
export const getExtractedTables = async (data: any) => {
  // data={document_id:''}
  return fetchWithBaseUrl(`/api/extracted-tables`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
};

// get_extracted_outputs
export const getExtractedOutputs  = async (data: any) => {
  // data={document_id:'string',  "table_name": "string"
  return fetchWithBaseUrl(`/api/extracted_outputs`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
};

// save_validated_outputs
export const saveValidatedOutputs  = async (data: any) => {
  return fetchWithBaseUrl(`/api/save-validated-outputs`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
};

// get_attribute_source_page
export const getAttributeSourcePage  = async (data: any) => {
  return fetchWithBaseUrl(`/api/attribute-source-page`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
};

// get_extraction_prompt
export const getExtractionPrompt  = async (data: any) => {
  return fetchWithBaseUrl(`/api/extraction-prompt`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
};

// regenerate_extraction_output
export const regenerateExtractionOutput  = async (data: any) => {
  return fetchWithBaseUrl(`/api/regenerate-extraction`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
};

// get_validated_output_tables
export const getValidatedOutputTables  = async (data: any) => {
  return fetchWithBaseUrl(`/api/validated-output-tables`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
};

// download_validated_output_tables
export const downloadValidatedOutputTables  = async (data: any) => {
  return fetchWithBaseUrl(`/api/download-validated-output-tables`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
};