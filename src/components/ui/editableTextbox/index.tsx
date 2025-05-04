import React, { useEffect, useState } from 'react';

import './style.css';

interface EditableTextProps {
  initialText: string;
  onSave?: (text: string) => void;
  onCancel?: () => void;
  showIcons?: boolean;
}

const EditableText: React.FC<EditableTextProps> = ({
  initialText,
  onSave,
  onCancel,
  showIcons = false,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(initialText);
  const [editText, setEditText] = useState(initialText);

  useEffect(() => {
    setText(initialText);
  }, [initialText])

  const handleEdit = () => {
    setIsEditing(true);
    setEditText(text);
  };

  const handleSave = () => {
    setIsEditing(false);
    setText(editText);
    if (onSave) {
      onSave(editText);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setText(initialText);
    if (onCancel) {
      onCancel();
    }
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditText(event.target.value);
  };

  return (
    <div>
      {isEditing ? (
        <div>
          <textarea
            className="edit-textarea"
            value={editText}
            onChange={handleTextChange}
          />
          {showIcons && (
            <div className='action-icons'>
              <span className="save-icon" onClick={handleSave}>
                Save
              </span>
              <span className="cancel-icon" onClick={handleCancel}>
                Cancel
              </span>
            </div>
          )}
        </div>
      ) : (
        <div>
          <p>{text}</p>
          {showIcons && (
            <div className='action-icons'>
              <span className="edit-icon" onClick={handleEdit}>
                Edit
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default EditableText;