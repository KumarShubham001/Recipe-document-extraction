const BASE_URL = "http://localhost:8000/api/v1";

export const fetchWithBaseUrl = async (
  url: string,
  options: RequestInit = {}
) => {
  const fullUrl = `${BASE_URL}${url}`;
  const response = await fetch(fullUrl, options);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};

export const getPreviousUploads = async () => {
  return fetchWithBaseUrl("/uploaded-documents", { method: "GET" });
};

export const uploadDocument = async (data: any) => {
  try {
    const formData = new FormData();
    formData.append('file', data.file);

    const response = await fetch(`${BASE_URL}/upload`, {
      method: 'POST',
      body: formData,
      headers: {
        'X-User-Name': data.username
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    throw error;
  }
};

export const submitDocument = async (data: any) => {
  return fetchWithBaseUrl("/submit-document", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};


export const getExtractionStatus = async (docId: any) => {
  return fetchWithBaseUrl(`/extraction-status?document_id=${docId}`, { method: "GET" });
};

export const getExtractionLog = async (docId: any) => {
  return fetchWithBaseUrl(`/extraction-log?document_id=${docId}`, { method: "GET" });
};

// get_extracted_tables
export const getExtractedTables = async (docId: any) => {
  return fetchWithBaseUrl(`/extracted-tables?document_id=${docId}`, {
    method: "GET"
  });
};


// get_extracted_outputs
export const getExtractedOutputs = async (document_id: string, table_name: string) => {
  // data={document_id:'string',  "table_name": "string"
  return fetchWithBaseUrl(
    `/extracted-outputs?document_id=${document_id}&table_name=${table_name}`,
    {
      method: "GET"
    }
  );
};

// save_validated_outputs
export const saveValidatedOutputs = async (data: any) => {
  return fetchWithBaseUrl(`/save-validated-outputs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

// get_attribute_source_page
export const getAttributeSourcePage = async (docId: string, attri: string) => {
  return fetchWithBaseUrl(`/attribute-source-page?document_id=${docId}&attribute=${attri}`, { method: "GET" });
};

// get_extraction_prompt
export const getExtractionPrompt = async (docId: string, attri: string) => {
  return fetchWithBaseUrl(`/extraction-prompt?document_id=${docId}&attribute=${attri}`, { method: "GET" });
};

// regenerate_extraction_output
export const regenerateExtractionOutput = async (data: any) => {
  return fetchWithBaseUrl(`/regenerate-extraction`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

// get_validated_output_tables
export const getValidatedOutputTables = async (data: any) => {
  return fetchWithBaseUrl(`/validated-output-tables`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

// download_validated_output_tables
export const downloadValidatedOutputTables = async (data: any) => {
  return fetchWithBaseUrl(`/download-validated-output-tables`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};
