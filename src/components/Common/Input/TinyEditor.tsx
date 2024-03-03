import { Box, Skeleton } from '@mui/material';
import { Editor } from '@tinymce/tinymce-react';
import { configs } from 'configurations';
import { useRef, useState } from 'react';
import { Editor as TinyMCEEditor } from 'tinymce';

interface TinyEditorProps {
  name?: string;
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  disabled?: boolean;
  height?: number;
}

export default function TinyEditor({
  name = 'tiny',
  value,
  placeholder,
  onChange,
  onBlur,
  disabled = false,
  height = 300,
}: TinyEditorProps) {
  const editorRef = useRef<TinyMCEEditor | null>(null);
  const [editorMounted, setEditorMounted] = useState(false);

  const handleEditorChange = (a: string, _: TinyMCEEditor) => {
    onChange(a);
  };

  return (
    <Box>
      <Editor
        id={`${name}-editor`}
        apiKey={configs.tinyMceEditor}
        onInit={(evt, editor) => {
          editorRef.current = editor;
          setEditorMounted(true);
          editor.setContent(value);
        }}
        onEditorChange={handleEditorChange}
        onBlur={onBlur}
        init={{
          placeholder,
          height,
          menubar: false,
          plugins: [
            'advlist autolink lists link image charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table paste code help wordcount',
          ],
          toolbar:
            'undo redo | formatselect | ' +
            'bold italic backcolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help',
          content_style: 'body { font-family:"Roboto","Helvetica","Arial",sans-serif; font-size:14px }',
        }}
        disabled={disabled}
      />
      {!editorMounted && (
        <Skeleton
          variant="rectangular"
          width="100%"
          height={height}
        />
      )}
    </Box>
  );
}
