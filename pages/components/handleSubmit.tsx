import { useState, FormEvent } from 'react';
import Head from 'next/head'
import styles from '../../styles/Home.module.css'

type FormData = {
    name: string;
    phone: string;
    screener: boolean;
};

type ResponseMessage = {
    message: string;
    error?: string;
};

export default function SubmitNewApplicantForm() {
    const [formData, setFormData] = useState<FormData>({ name: '', phone: '', screener: false });
    const [responseMessage, setResponseMessage] = useState<string>('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value, type, checked } = e.target;
        setFormData((prevState) => ({ ...prevState, [id]: type === 'checkbox' ? checked : value, }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const result: ResponseMessage = await response.json();

            if (response.ok) {
                setResponseMessage(`Success: ${result.message}`);
            } else {
                setResponseMessage(`Error: ${result.message}`);
            }
        } catch (error) {
            setResponseMessage(`Error: ${error}`);
        }
    };

    return (
        <div className={styles.form}>
            <h2 className={styles['header']}>
                Add an Applicant
            </h2>

            <div className={styles['form-section']}>
                <div className={styles['form-label']}>
                    <label htmlFor='name'>Name:</label>
                </div>
                <div className={styles['form-text-input']}>
                    <input
                        type='text'
                        id='name'
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
            </div>

            <div className={styles['form-section']}>
                <div className={styles['form-label']}>
                    <label htmlFor='phone'>Phone Number:</label>
                </div>
                <div className={styles['form-text-input']}>
                    <input
                        type='text'
                        id='phone'
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    ></input>
                </div>
            </div>

            <div className={styles['form-section']}>
                <div className={styles['form-label']}>
                    <label htmlFor='screener'>(optional) Screener:</label>
                </div>
                <div className={styles['form-checkbox-input']}>
                    <input
                        type='checkbox'
                        id='screener'
                        onChange={handleChange}
                        checked={formData.screener}
                    />
                </div>
            </div>
            <div className={styles['submit-button']}>
                <button type='submit' onClick={handleSubmit}>Submit</button>
            </div>
        </div >
    );
}
