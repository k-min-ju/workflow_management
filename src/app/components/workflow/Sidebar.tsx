import React from 'react';
import InputIcon from '@mui/icons-material/Input';
import OutputIcon from '@mui/icons-material/Output';
import CreateNodeObject from '@/app/components/workflow/CreateNodeObject';
import styles from '@/app/components/workflow/workflow.module.scss';

/**
 * Workflow Object creation Sidebar Component
 * @constructor
 */
export default function Sidebar(): React.JSX.Element {
  return (
    <>
      <CreateNodeObject className={styles.flowNodeObject} muiIcon={<InputIcon />} labelText="Input" />
      <CreateNodeObject className={styles.flowNodeObject} muiIcon={<OutputIcon />} labelText="Output" />
    </>
  );
}
