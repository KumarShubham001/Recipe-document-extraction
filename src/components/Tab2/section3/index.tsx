import React, { useEffect, useRef, useState } from 'react';

import Button from '../../ui/button/'
import EditableText from '../../ui/editableTextbox/'
import styles from './style.module.css';
import { useDocument } from '../../../context/DocumentContext';
import { getExtractionPrompt, regenerateExtractionOutput } from '../../../api';

const Third = ({ selectedDocument, selectedAttribute }) => {
  const { setIsLoading } = useDocument();
  const [currPrompt, setCurrPrompt] = useState<any>()
  const [ogPrompt, setOgPrompt] = useState<any>();

  useEffect(() => {
    const fetchPagedetails = async (attri) => {
      try {
        setIsLoading(true);
        const { original_prompt, current_prompt } = await getExtractionPrompt(selectedDocument, attri);
        setOgPrompt(original_prompt);
        setCurrPrompt(current_prompt);
      }
      catch (e) {
        console.error(e)
      }
      finally {
        setIsLoading(false);
      }
    }

    if (selectedAttribute) {
      fetchPagedetails(selectedAttribute);
    }
  }, [selectedAttribute]);

  const resetprompt = () => {
    setCurrPrompt(ogPrompt);
  }

  const regenerateOutput = async () => {
    try {
      setIsLoading(true);
      const data = {
        "document_id": selectedDocument,
        "attribute": selectedAttribute,
        "updated_prompt": currPrompt
      }
      const res = await regenerateExtractionOutput(data);
      console.log(res);
    }
    catch (e) {
      console.error(e)
    }
    finally {
      setIsLoading(false);
    }
  }

  return (
    <section className={styles.main}>
      <h4 className={styles.tabTitle}>
        Prompt used to extract attribute
      </h4>
      {currPrompt && <>
        <div className={styles.prompt}>
        Prompt used:
        <div>
          <EditableText
            initialText={currPrompt}
            showIcons={true}
            onSave={e => setCurrPrompt(e)}
          />
        </div>
      </div>
      <div className={styles.buttonContainerFlex}>
        <Button onClick={resetprompt} className="secondry">Go back to initial prompt</Button>
        <Button onClick={regenerateOutput} className="full-width primary">Re-generate output based on updated prompt</Button>
      </div>
      </>}
      {!currPrompt && <p>Select an attribute to view the prompt details</p>}
    </section>
  );
};

export default Third;