import React, { useEffect, useState } from "react";

import First from "./section1/index";
import Second from "./section2/index";
import Third from "./section3/index";

import Select from "../ui/select";
import { getExtractedTables, getPreviousUploads } from "../../api";
import { useDocument } from "../../context/DocumentContext";

interface Option {
  value: string;
  label: string;
}

interface DocumentData {
  documentId: string;
  documentName: string;
  uploadedOn: string;
  uploadedBy: string;
  validated: string;
}

const dropdown2: Option[] = [
  {
    value: "recipe",
    label: "Recipe",
  },
  {
    value: "monitoring-points",
    label: "Monitoring Points",
  },
  {
    value: "unit_operations",
    label: "Unit Operations",
  },
  {
    value: "activity",
    label: "Activity",
  },
  {
    value: "parameters",
    label: "Parameters",
  },
  {
    value: "material",
    label: "Material",
  },
  {
    value: "unit_operation_material",
    label: "Unit Operation Material",
  },
  {
    value: "sampling_point",
    label: "Sampling Point",
  },
  {
    value: "equipment_master",
    label: "Equipment Master",
  },
  {
    value: "unit_operation_equipment",
    label: "Unit Operation Equipment",
  },
  {
    value: "parameters_general",
    label: "Parameters General",
  },
  {
    value: "unit_operation_comment",
    label: "Unit Operation Comment",
  },
];

const Tab2: React.FC = () => {
  const { documentId } = useDocument();
  const [selectedAttribute, setSelectedAttribute] = useState<string>("")
  const [tableOptions, setTableOptions] = useState<Option[]>([]);
  const [selectedTable, setSelectedTable] = useState<
    string | undefined
  >(undefined);
  const [documentOptions, setDocumentOptions] = useState<Option[]>([]);
  const [selectedDocument, setSelectedDocument] = useState<
    string | undefined
  >(undefined);

  useEffect(() => {
    const _init = async () => {
      // use the fetch API call to get the previous upload list
      const { documents } = await getPreviousUploads();

      const docOptions: Option[] = documents.map((item) => ({
        value: item.document_id,
        label:
          item.document_name.charAt(0).toUpperCase() +
          item.document_name.slice(1),
      }));
      setDocumentOptions(docOptions);
    };
    _init();
  }, []);

  const fetchExtractedTables = async () => {
    const { tables } = await getExtractedTables(documentId);
    const tableOptions = tables.map(table => ({
      value: table.table_name,
      label: table.table_name,
    }));
    setTableOptions(tableOptions);
    setSelectedTable(tableOptions[0].value);
  };

  useEffect(() => {
    fetchExtractedTables();
  }, []);

  useEffect(() => {
    if (documentId) {
      setSelectedDocument(documentId)
    }
  }, [documentId])

  return (
    <>
      <div className="tab-header">
        <div className="form-element">
          Selected document:{" "}
          <Select
            options={documentOptions}
            onChange={(e: string) => setSelectedDocument(e)}
            value={selectedDocument}
            disabled={true}
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
        <First selectedTable={selectedTable} selectedDocument={selectedDocument} />
        <section>
          <Second
            selectedTable={selectedTable}
            selectedDocument={selectedDocument}
            selectedAttribute={selectedAttribute}
            onAttriChange={setSelectedAttribute}
          />
          <Third selectedDocument={selectedDocument} selectedAttribute={selectedAttribute} />
        </section>
      </div>
    </>
  );
};

export default Tab2;
