import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { fetchWithBaseUrl } from './../../../api';

import Button from '../../ui/button';

import Table from '../../ui/table';
import styles from './style.module.css';

interface DocumentData {
  attribute: string;
  extractedOuput: string;
  manualOverride: string;
}

const documentData: DocumentData[] = [
  { attribute: 'Recipe ID', extractedOuput: 'DOC-12345', manualOverride: '-' },
  { attribute: 'Recipe Title', extractedOuput: '-', manualOverride: '-' }
];

const tableColumns = [
  { key: "attribute", header: "Attribute" },
  { key: "extractedOuput", header: "Extracted Ouput" },
  { key: "manualOverride", header: "Manual Override" },
];



const Status = () => {
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const data = await fetchWithBaseUrl("/api/document", { method: "GET" });
      console.log(data);
    }
    fetchData();
  }, [])

  return (
    <section className={styles.main}>
      <h4 className={styles.tabTitle}>
        Extracted Outputs
      </h4>
      <div>
        <Table data={documentData} columns={tableColumns} />
      </div>
      <Button onClick={() => navigate("/output")} className="full-width">1 Change made, Digitize Recipe?</Button>
    </section>
  )
}

export default Status