import React, { useEffect, useState } from "react";

import Status from "./section1/index";
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

const dropdown1: Option[] = [
  {
    value: "DOC-12345",
    label: "DOC-12345",
  },
  {
    value: "DOC-67890",
    label: "DOC-67890",
  },
];

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

const tableData = {
  tables: [
    {
      table_id: "string",
      table_name: "string",
    },
  ],
};

const Tab2: React.FC = () => {
    const documentId = useDocument();
 console.log('docId in tab 2', documentId) 
  const [tableList, setTableList] = useState([]);
  const [previousUploadList, setPreviousUploadList] = useState<Option[]>([]);
  const [SelectedUploadedFileId, setSelectedUploadedFileId] = useState<
    string | undefined
  >(undefined);

  useEffect(() => {
    const _init = async () => {
      // use the fetch API call to get the previous upload list
      const docList = await getPreviousUploads();
      // const docList = documentData;
      console.log("doclist", docList);

      // extract the list of document IDs from the table list
      const docIds: Option[] = docList?.documents?.map((item) => {
        return {
          value: item.document_id,
          label:
            item.document_name.charAt(0).toUpperCase() +
            item.document_name.slice(1),
        };
      });
      setPreviousUploadList(docIds);
    };
    _init();
  }, []);

  useEffect(() => {
    const fetchExtractedTables = async () => {
      const response = await getExtractedTables(documentId?.documentId);
      setTableList(response?.tables);
    };

    fetchExtractedTables();
  }, []);

  return (
    <>
      <div className="tab-header">
        <div className="form-element">
          Selected document:{" "}
          {/* <Select
            options={dropdown1}
            onChange={(e) => {
              console.log("changed", e);
            }}
            value="DOC-12345"
          /> */}
          <Select
            options={previousUploadList}
            onChange={(e: string) => setSelectedUploadedFileId(e)}
            value={SelectedUploadedFileId}
          />
        </div>
        <div className="form-element">
          Selected table:{" "}
          <Select
            options={dropdown2}
            onChange={(e) => {
              console.log("changed", e);
            }}
            value="recipe"
          />
        </div>
      </div>
      <div className="tab-container">
        <Status />
        <section>
          <Second />
          <Third />
        </section>
      </div>
    </>
  );
};

export default Tab2;
