import React, { useState } from 'react';
import { Editor } from "react-draft-wysiwyg";
import { convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import '../../css/newsEditor.scss'
export default function NewsEditor(props) {
  const [editorState, seteditorState] = useState('')
  return (
    <div>
      <Editor
        editorState={editorState}
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
        placeholder='输入文本内容'
        onEditorStateChange={(value) => seteditorState(value)}
        onBlur={() => {
          const draftToHtmlValue = draftToHtml(convertToRaw(editorState.getCurrentContent()));
          // console.log(draftToHtmlValue);
          props.getContent(draftToHtmlValue);
        }}
      />
    </div>
  )
}
