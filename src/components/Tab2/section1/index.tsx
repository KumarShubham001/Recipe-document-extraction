import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getExtractedOutputs,
  saveValidatedOutputs
} from "./../../../api";
import Button from "../../ui/button";
import { useDocument } from "../../../context/DocumentContext";
import { ColumnDef, getEditableRowData } from "../../ui/editableTableRow";
import StarRating from "../../ui/starRating";
import Feedback from "../../ui/feedback";
import Table from "../../ui/table";

import styles from "./style.module.css";

interface DocumentData {
  attribute: string;
  extractedOutput: string;
  manualOverride: string;
}

// const documentData: DocumentData[] = [
//   { attribute: "Recipe ID", extractedOutput: "DOC-12345", manualOverride: "-" },
//   { attribute: "Recipe Title", extractedOutput: "-", manualOverride: "-" },
// ];

const attributeOptions = ["Recipe ID", "Recipe Title"];

const tableColumns: ColumnDef[] = [
  // {
  //   key: "attribute",
  //   header: "Attribute",
  //   type: "select",
  //   options: attributeOptions,
  // },
  { key: "recipeId", header: "Recipe ID", type: "input" },
  { key: "recipeTitle", header: "Recipe Title", type: "input" },
  { key: "recipeVersion", header: "Recipe Version", type: "input" },
  { key: "recipeType", header: "Recipe Type", type: "input" },
  { key: "product", header: "Product", type: "input" },
  { key: "statusOfTheRecipe", header: "Status of the Recipe", type: "input" },
  { key: "description", header: "Description", type: "input" },
  { key: "approvedDate", header: "Approved Date", type: "input" },
];

const First = ({ selectedTable, selectedDocument }) => {
  const navigate = useNavigate();
  const { setIsLoading } = useDocument();
  const [documentData, setDocumentData] = useState<DocumentData[]>([]);
  const [rating, setRating] = useState<number>(0);

  useEffect(() => {
    async function fetchData() {
      const { outputs } = await getExtractedOutputs(selectedDocument, selectedTable);
      console.log(outputs)
      setDocumentData(outputs);
      setIsLoading(false);
    }

    if (selectedDocument && selectedTable) {
      setIsLoading(true)
      fetchData();
    }
  }, [selectedDocument, selectedTable]);

  useEffect(() => {
    if (rating) {
      // update rating API here
    }
  }, [rating]);

  const saveFeedback = (feedback) => {
    // save feedback API here
    console.log("Saving feedback: " + feedback);
  };

  const digitizeRecipe = async () => {
    const data = {
      document_id: selectedDocument,
      table_name: selectedTable,
      validated_outputs: [
        {
          attribute: "Recipe ID",
          extraction_output: "DOC-12345",
          manual_override: "",
        },
      ],
    };
    // const response = await saveValidatedOutputs(data);
    // console.log("response", response);
    navigate("/app/output");
  };

  const handleAddRow = () => {
    setDocumentData((prev) => [
      ...prev,
      { attribute: "", extractedOutput: "", manualOverride: "" },
    ]);
  };

  const updateRowField = (
    index: number,
    key: keyof DocumentData,
    value: string
  ) => {
    const updated = [...documentData];
    updated[index][key] = value;
    setDocumentData(updated);
  };
  const handleDeleteRow = (index: number) => {
    setDocumentData((prev) => prev.filter((_, i) => i !== index));
  };

  const renderData = getEditableRowData(
    documentData,
    tableColumns,
    updateRowField,
    (index) => (
      <Button className="icon-btn" onClick={() => handleDeleteRow(index)}>
        <svg
          stroke="currentColor"
          fill="none"
          strokeWidth="0"
          viewBox="0 0 15 15"
          height="16px"
          width="16px"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z"
            fill="currentColor"
          ></path>
        </svg>
      </Button>
    )
  );
  // const renderData = documentData.map((row, index) => ({
  //   attribute: row.attribute ? (
  //     row.attribute
  //   ) : (
  //     <select
  //       value={row.attribute}
  //       onChange={(e) => updateRowField(index, "attribute", e.target.value)}
  //     >
  //       <option value="">Select</option>
  //       {attributeOptions?.map((opt) => (
  //         <option key={opt} value={opt}>
  //           {opt}
  //         </option>
  //       ))}
  //     </select>
  //   ),
  //   extractedOutput: row.extractedOutput ? (
  //     row.extractedOutput
  //   ) : (
  //     <input
  //       defaultValue={row.extractedOutput}
  //       // value={row.extractedOutput}
  //       onBlur={(e) => updateRowField(index, "extractedOutput", e.target.value)}
  //     />
  //   ),
  //   manualOverride: row.manualOverride ? (
  //     row.manualOverride
  //   ) : (
  //     <input
  //       defaultValue={row.manualOverride}
  //       // value={row.manualOverride}
  //       onBlur={(e) => updateRowField(index, "manualOverride", e.target.value)}
  //     />
  //   ),
  //   actions: (
  //     <Button className="icon-btn" onClick={() => handleDeleteRow(index)}>
  //       <svg
  //         stroke="currentColor"
  //         fill="currentColor"
  //         strokeWidth="0"
  //         version="1.1"
  //         viewBox="0 0 16 16"
  //         height="16px"
  //         width="16px"
  //         xmlns="http://www.w3.org/2000/svg"
  //       >
  //         <path d="M15.854 12.854c-0-0-0-0-0-0l-4.854-4.854 4.854-4.854c0-0 0-0 0-0 0.052-0.052 0.090-0.113 0.114-0.178 0.066-0.178 0.028-0.386-0.114-0.529l-2.293-2.293c-0.143-0.143-0.351-0.181-0.529-0.114-0.065 0.024-0.126 0.062-0.178 0.114 0 0-0 0-0 0l-4.854 4.854-4.854-4.854c-0-0-0-0-0-0-0.052-0.052-0.113-0.090-0.178-0.114-0.178-0.066-0.386-0.029-0.529 0.114l-2.293 2.293c-0.143 0.143-0.181 0.351-0.114 0.529 0.024 0.065 0.062 0.126 0.114 0.178 0 0 0 0 0 0l4.854 4.854-4.854 4.854c-0 0-0 0-0 0-0.052 0.052-0.090 0.113-0.114 0.178-0.066 0.178-0.029 0.386 0.114 0.529l2.293 2.293c0.143 0.143 0.351 0.181 0.529 0.114 0.065-0.024 0.126-0.062 0.178-0.114 0-0 0-0 0-0l4.854-4.854 4.854 4.854c0 0 0 0 0 0 0.052 0.052 0.113 0.090 0.178 0.114 0.178 0.066 0.386 0.029 0.529-0.114l2.293-2.293c0.143-0.143 0.181-0.351 0.114-0.529-0.024-0.065-0.062-0.126-0.114-0.178z"></path>
  //       </svg>
  //     </Button>
  //   ),
  // }));

  return (
    <section className={styles.main}>
      <h4 className={styles.tabTitle}>Extracted Outputs</h4>
      <div className={styles['button-group-inline']}>
        <StarRating rating={rating} setRating={e => setRating(e)} />
        <Feedback title="Feedback" onSaveFeedback={saveFeedback} />
      </div>

      {documentData && <div>
        <div className={styles['button-group']}>
          <Button onClick={handleAddRow}>Add Row</Button>
          <Button onClick={handleAddRow}>Revert to AI generate outputs</Button>
        </div>
        <Table data={documentData} columns={tableColumns} />
      </div>
      }

      <Button onClick={digitizeRecipe} className="full-width" disabled={!documentData}>
        {/* 1 Change made, Digitize Recipe? */}
        Digitize Recipe
      </Button>
    </section>
  );
};

export default First;
