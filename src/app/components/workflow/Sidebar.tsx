import React from 'react';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import CreateNodeObject from '@/app/components/workflow/CreateNodeObject';
import styles from '@/app/components/workflow/workflow.module.scss';

/**
 * Workflow Object creation Sidebar Component
 * @constructor
 */
export default function Sidebar(): React.JSX.Element {
  return (
    <>
      <CreateNodeObject
        className={styles.flowNodeObject}
        muiIcon={<ArrowForwardIcon />}
        labelText="Input"
        nodeType="input"
      />
      <CreateNodeObject
        className={styles.flowNodeObject}
        muiIcon={<ArrowBackIcon />}
        labelText="Output"
        nodeType="output"
      />
      <CreateNodeObject
        className={styles.flowNodeObject}
        muiIcon={<CompareArrowsIcon />}
        labelText="Other"
        nodeType="other"
      />
    </>
  );
}
