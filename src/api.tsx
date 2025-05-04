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
  return fetchWithBaseUrl(`/get_extraction_status?document_id=${docId}`, {
    method: "GET",
    // headers: {
    //   "Content-Type": "application/json",
    // },
    // body: JSON.stringify(data),
  });
};

export const getExtractionLog = async (data: any) => {
  return fetchWithBaseUrl("/get_extraction_log", {
    method: "GET",
    // headers: {
    //   "Content-Type": "application/json",
    // },
    // body: JSON.stringify(data),
  });
};

// get_extracted_tables
export const getExtractedTables = async (docId: any) => {
  // data={document_id:''}
  return fetchWithBaseUrl(`/extracted-tables?document_id=${docId}`, {
    method: "GET",
    // headers: {
    //   "Content-Type": "application/json",
    // },
    // body: JSON.stringify(data),
  });
};

// get_extracted_outputs
export const getExtractedOutputs = async (data: any) => {
  // data={document_id:'string',  "table_name": "string"
  return fetchWithBaseUrl(
    `/extracted_outputs?${data.document_id}&&${data.table_name}`,
    {
      method: "GET",
      // headers: {
      //   "Content-Type": "application/json",
      // },
      // body: JSON.stringify(data),
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
export const getAttributeSourcePage = async (data: any) => {
  return fetchWithBaseUrl(`/attribute-source-page`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

// get_extraction_prompt
export const getExtractionPrompt = async (data: any) => {
  return fetchWithBaseUrl(`/extraction-prompt`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
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
