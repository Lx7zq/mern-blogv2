import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { forwardRef, useRef, useImperativeHandle } from "react";

const Editor = forwardRef(({ value, onChange }, ref) => {
  const quillRef = useRef(null);
  useImperativeHandle(ref, () => ({
    getQuill: () => {
      return quillRef.current.getEditor();
    },
  }));
  const toolbarOptions = [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
    ["clean"],
  ];

  const modules = {
    toolbar: toolbarOptions,
  };

  return (
    <div className="content h-full max-h-screen overflow-y-auto">
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        bounds="#scrolling-container"
        scrollingContainer=".parent-scroll"
      />
    </div>
  );
});

export default Editor;
