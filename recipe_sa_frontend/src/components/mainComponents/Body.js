import React, { useState, useEffect } from 'react';
import { displayInvalidTokenDialog } from '../../constants';
import AlertDialog from '../blocks/bodyBlocks/AlertDialog';

// export function toggleShowInvalidTokenDialog() {
//   setShowInvalidTokenDialog(showInvalidTokenDialog = (!showInvalidTokenDialog))
// }
  

function Body(props) {


  
  
  // const [displayInvalidTokenDialog, setDisplayInvalidTokenDialog] = useState('none')


  return (
    <div className='' style={{ padding: 30 }}>

      <AlertDialog />
      <toggleDisplayInvalidTokenDialog />

      {props.body}
    
    </div>
  );
}

export default Body;
