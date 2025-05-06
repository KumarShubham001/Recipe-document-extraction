import React, { useRef, useState } from 'react';
import styles from './style.module.css';
import Button from '../button';

interface FeedbackPopupProps {
    title: string;
    placeholder: string;
    isOpen: boolean;
    onClose: () => void;
    onSave: (string) => void;
}

const FeedbackPopup: React.FC<FeedbackPopupProps> = ({ title, placeholder, isOpen, onClose, onSave }) => {
    if (!isOpen) return null;
    const feedbackref = useRef<HTMLTextAreaElement>(null);

    return (
        <div className={styles.popupOverlay}>
            <div className={styles.popupContent}>
                <h3>{title}</h3>
                <textarea ref={feedbackref} className={styles.feedbackTextarea} placeholder={placeholder} />
                <div className={styles.popupButtons}>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button onClick={() => onSave(feedbackref?.current?.value)}>Save</Button>
                </div>
            </div>
        </div>
    );
};

const Feedback = ({ title, onSaveFeedback }) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const handleOpenPopup = () => {
        setIsPopupOpen(true);
    };

    const handleClosePopup = () => {
        setIsPopupOpen(false);
    };

    const handleSaveFeedback = async (feedback) => {
        onSaveFeedback(feedback);
        handleClosePopup();
    };

    return (
        <>
            <div className={styles['feedback-icon']} onClick={handleOpenPopup} title={title}>
                <svg stroke="currentColor" fill="none" strokeWidth="1" viewBox="0 0 32 32" strokeLinecap="round" strokeLinejoin="round" height="32px" width="32px" xmlns="http://www.w3.org/2000/svg"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
            </div>
            <FeedbackPopup
                title="Please provide your feedbacks here:"
                placeholder="Enter your feedback here..."
                isOpen={isPopupOpen}
                onClose={handleClosePopup}
                onSave={handleSaveFeedback}
            />
        </>
    );
};

export default Feedback;
