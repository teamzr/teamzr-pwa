import { TextField } from '@material-ui/core';
import { Editor } from '@tinymce/tinymce-react';
import * as React from 'react';

export default function TextAreaEditorComponent(props) {
  const [isFocused, setIsFocused] = React.useState(false);
  const handleFocus = () => {
    setIsFocused(!isFocused);
  };

  const handleOnBlur = () => {
    setIsFocused(false);
  };
  return (
    <>
      {!isFocused && <TextField onFocus={handleFocus} {...props} />}
      {isFocused && <Editor onBlur={handleOnBlur} {...props} />}
    </>
  );
}
