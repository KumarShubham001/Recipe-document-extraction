import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getExtractedOutputs, saveValidatedOutputs } from "./../../../api";
import Button from "../../ui/button";
import { useDocument } from "../../../context/DocumentContext";
import StarRating from "../../ui/starRating";
import Feedback from "../../ui/feedback";
import Table from "../../ui/table";

import styles from "./style.module.css";

interface DocumentData {
  attribute: string;
  extractedOutput: string;
  manualOverride: string;
}

interface Col {
  key: string;
  header: string;
}

interface TableData {
  columns: Col[],
  rows: any[],
  table_name: string,
  rating: number,
}

const First = ({ selectedTable, selectedDocument }) => {
  const navigate = useNavigate();
  const { setDocumentId, setIsLoading } = useDocument();
  const [extractedTableData, setExtractedTableData] = useState<TableData | undefined>(undefined);
  const [initialTableData, setInitialTableData] = useState<TableData | undefined>(undefined);
  const [rating, setRating] = useState<number>(0);
  const [countChangesMadeInTableData, setCountChangesMadeInTableData] = useState<number>(0);

  const formatData = (extracted_tables) => {
    const selectedTableData = extracted_tables.filter(table => table.table_name === selectedTable);
    if (selectedTableData.length > 0) {
      const tableData: TableData = selectedTableData.map((table) => {
        const cols = table.columns.map((e) => ({
          key: String(e).trim(),
          header: String(e).trim(),
        }));

        const rows = table.rows.map((row) => {
          const data = {};
          cols.forEach((col, index) => {
            data[col.key] = row[index];
          });
          return data;
        });

        return {
          columns: cols,
          rows: rows,
          table_name: table.table_name,
          rating: table.rating,
        };
      })[0];

      setRating(tableData.rating || 0);
      setExtractedTableData(tableData);
      setInitialTableData(structuredClone(tableData) as TableData);
    }
  }

  useEffect(() => {
    async function fetchData() {
      const { outputs } = await getExtractedOutputs(selectedDocument, selectedTable);
      console.log(outputs)
      const { extracted_tables } = {
        extracted_tables: [
          {
            table_name: "Table 1",
            columns: [
              "Recipe ID",
              "Recipe Title",
              "Recipe Version",
              "Recipe Type",
              "Product",
              "Description",
              "Approved Date",
            ],
            rows: [
              [
                "Doc-12345",
                "Generic Biologics Example Site Specific Downstream Process Description",
                "1",
                "Site Specific Downstream Process Description",
                "Generic Biologic",
                "This document describes the drug substance manufacturing (Indicate is molecule is Drug Substance or a mAb Intermediate) operations for Generic Biologics from protein A chromatography through drug substance storage for the Pharma Biologics manufacturing facility. The downstream manufacturing process concludes at the transfer of drug substance from the initial -80°C freeze to drug substance storage at -30°C",
                "05 March 2025",
              ],
            ],
            rating: 4,
          },
          {
            table_name: "Table 2",
            columns: [
              "DOCUMENT_ID",
              "DOCUMENT_NAME",
              "VERSION",
              "DOCUMENT_TYPE",
              "PRODUCT",
              "DESCRIPTION",
              "APPROVED_DATE",
            ],
            rows: [
              [
                "Doc-12345",
                "Generic Biologics Example Site Specific Downstream Process Description",
                "1",
                "Site Specific Downstream Process Description",
                "Generic Biologic",
                "This document describes the drug substance manufacturing (Indicate is molecule is Drug Substance or a mAb Intermediate) operations for Generic Biologics from protein A chromatography through drug substance storage for the Pharma Biologics manufacturing facility. The downstream manufacturing process concludes at the transfer of drug substance from the initial -80°C freeze to drug substance storage at -30°C",
                "03 March 2025",
              ],
            ],
            rating: 3,
          },
        ],
      };

      formatData(extracted_tables);
      setIsLoading(false);
    }

    if (selectedDocument && selectedTable) {
      setIsLoading(true);
      fetchData();
    }
  }, [selectedDocument, selectedTable]);

  useEffect(() => {
    if (rating) {
      // update rating API here
      console.log('ratings updated', rating);
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
      validated_outputs: extractedTableData?.rows,
    };
    console.log(data);
    // const response = await saveValidatedOutputs(data);
    // console.log("response", response);

    // setDocumentId(selectedDocument);
    // navigate("/app/output");
  };

  const revertToOriginal = () => {
    // reset the table data to the original data
    setExtractedTableData(undefined);

    setTimeout(() => {
      setExtractedTableData(structuredClone(initialTableData));
    })
    setCountChangesMadeInTableData(0);
  }

  const handleAddRow = () => {
    setExtractedTableData((prevTableData) => {
      if (prevTableData) {
        const newEmptyRow = {};
        prevTableData.columns.forEach((col) => newEmptyRow[col.key] = "");

        return {
          ...prevTableData,
          rows: [...prevTableData.rows, newEmptyRow],
        };
      }
      return prevTableData;
    });
    setCountChangesMadeInTableData(prev => prev + 1);
  };

  return (
    <section className={styles.main}>
      <h4 className={styles.tabTitle}>Extracted Outputs</h4>

      <div className={styles['table-container']}>
        {extractedTableData && (
          <>
            <div className={styles["button-group-inline"]}>
              <StarRating rating={rating} setRating={(newRating) => setRating(newRating)} />
              <Feedback title="Feedback" onSaveFeedback={saveFeedback} />
            </div>
            <div>
              <div className={styles["button-group"]}>
                <Button onClick={handleAddRow}>
                  {/* <Button onClick={handleAddRow} className="icon-button"> */}
                  {/* <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 448 512" height="15px" width="15px" xmlns="http://www.w3.org/2000/svg"><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z"></path></svg> */}
                  Add Row
                </Button>
                <Button onClick={revertToOriginal}>
                  Revert to AI generate outputs
                </Button>
              </div>
              <Table
                editable={true}
                data={extractedTableData.rows}
                columns={extractedTableData.columns}
                truncateLength={50}
                editedCells={countChangesMadeInTableData}
                onChange={(data, count) => {
                  setExtractedTableData({ ...extractedTableData, rows: data })
                  setCountChangesMadeInTableData(count)
                }}
              // onUpdate={updatedRowValue}
              />
            </div>
          </>
        )}

        {!extractedTableData && <p className="text-center">No extracted outputs found. Please select different table for the selected document.</p>}
      </div>

      <Button
        onClick={digitizeRecipe}
        className="full-width"
        disabled={!extractedTableData}
      >
        {countChangesMadeInTableData === 0 ? 'Digitize Recipe?' : countChangesMadeInTableData + ' Changes made, Digitize Recipe?'}
      </Button>
    </section>
  );
};

export default First;