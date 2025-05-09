import React, { useEffect, useState } from "react";

import First from "./section1/index";
import Second from "./section2/index";
import Third from "./section3/index";

import Select from "../ui/select";
import { getExtractedOutputs, getExtractedTables, getPreviousUploads } from "../../api";
import { useDocument } from "../../context/DocumentContext";

interface Option {
  value: string;
  label: string;
}

interface ExtractedOutput {
  "table_name": string,
  "columns": string[],
  "rows": any[]
}

const Tab2: React.FC = () => {
  const { documentId, setDocumentId, setIsLoading } = useDocument();
  const [selectedAttribute, setSelectedAttribute] = useState<string>("")
  const [extractedOutputs, setExtractedOutputs] = useState<ExtractedOutput | undefined>(undefined)
  const [tableOptions, setTableOptions] = useState<Option[]>([]);
  const [selectedTable, setSelectedTable] = useState<
    string | undefined
  >(undefined);
  const [documentOptions, setDocumentOptions] = useState<Option[]>([]);

  useEffect(() => {
    const _init = async () => {
      setIsLoading(true);

      // use the fetch API call to get the previous upload list
      const { documents } = await getPreviousUploads();

      const docOptions: Option[] = documents.map((item) => ({
        value: item.document_id,
        label:
          item.document_id.charAt(0).toUpperCase() +
          item.document_id.slice(1),
      }));
      setDocumentOptions(docOptions);
      setIsLoading(false);
    };

    _init();
  }, []);

  const fetchExtractedTables = async (selectedDocument) => {
    setIsLoading(true);
    const { table_names } = await getExtractedTables(selectedDocument);
    const tableOptions = table_names.map(table => ({
      value: table,
      label:
        table.charAt(0).toUpperCase() +
        table.slice(1),
    }));
    setTableOptions(tableOptions);
    setSelectedTable(tableOptions[0].value);
    setIsLoading(false);
  };

  const fetchExtractedOutputs = async (selectedDocument, selectedTable) => {
    setIsLoading(true);
    const extractedOutputs = await getExtractedOutputs(selectedDocument, selectedTable);
    setExtractedOutputs(extractedOutputs);
    setIsLoading(false);
  };

  useEffect(() => {
    if (documentId) {
      fetchExtractedTables(documentId);
    }
  }, [documentId]);

  useEffect(() => {
    if (documentId && selectedTable) {
      fetchExtractedOutputs(documentId, selectedTable)
    }
  }, [documentId, selectedTable])

  return (
    <>
      <div className="tab-header">
        <div className="form-element">
          Selected document:{" "}
          <Select
            options={documentOptions}
            onChange={(e: string) => setDocumentId(e)}
            value={documentId || undefined}
          />
        </div>
        <div className="form-element">
          Selected table:{" "}
          <Select
            className="wide-select"
            options={tableOptions}
            onChange={(e: string) => setSelectedTable(e)}
            value={selectedTable}
          />
        </div>
      </div>
      <div className="tab-container">
        <First
          selectedTable={selectedTable}
          selectedDocument={documentId}
          extractedOutputs={extractedOutputs}
        />
      </div>
      <div className="tab-container">
        <Second
          selectedTable={selectedTable}
          selectedDocument={documentId}
          selectedAttribute={selectedAttribute}
          extractedOutputs={extractedOutputs}
          onAttriChange={setSelectedAttribute}
        />
        <Third selectedDocument={documentId} selectedAttribute={selectedAttribute} />
      </div>
    </>
  );
};

export default Tab2;
