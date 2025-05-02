import React, {
  useState,
  useRef,
  ChangeEvent,
  DragEvent,
  useCallback,
  forwardRef,
  useImperativeHandle,
} from 'react';
import './index.css';

interface DropzoneProps {
  onFileChange: (file: File) => void;
  text: string;
}

interface DropzoneHandle {
  clearFile: () => void;
}

const Dropzone = forwardRef<DropzoneHandle, DropzoneProps>(
  ({ onFileChange, text }, ref) => {
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      setIsDragging(true);
    };

    const handleDragLeave = () => {
      setIsDragging(false);
    };

    const handleDrop = (event: DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      setIsDragging(false);
      if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
        onFileChange(event.dataTransfer.files[0]);
      }
    };

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
      if (event.target.files && event.target.files.length > 0) {
        onFileChange(event.target.files[0]);
      }
    };
    
    const clearFileInput = useCallback(() => {
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }, []);

    useImperativeHandle(ref, () => ({
      clearFile: clearFileInput,
    }));

    const handleClick = () => {
      fileInputRef.current?.click();
    };

    return (
      <div
        className={`dropzone ${isDragging ? 'dragging' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <input
          type="file"
          ref={fileInputRef}
          className="file-input"
          onChange={handleFileChange}
        />
        <div>
          <svg
            stroke="#777"
            fill="#777"
            strokeWidth="0"
            viewBox="0 0 512 512"
            height="60px"
            width="60px"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="16"
              d="M320 367.79h76c55 0 100-29.21 100-83.6s-53-81.47-96-83.6c-8.89-85.06-71-136.8-144-136.8-69 0-113.44 45.79-128 91.2-60 5.7-112 43.88-112 106.4s54 106.4 120 106.4h56"
            ></path>
            <path
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="16"
              d="m320 255.79-64-64-64 64m64 192.42V207.79"
            ></path>
          </svg>
          <p style={{ margin: 0, padding: 0 }}>{text}</p>
        </div>
      </div>
    );
  }
);

export default Dropzone;