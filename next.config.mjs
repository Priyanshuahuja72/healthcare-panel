/** @type {import('next').NextConfig} */
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });
const nextConfig = {
    env: {
        NEXT_PUBLIC_PROJECT_ID: process.env.NEXT_PUBLIC_PROJECT_ID,
        NEXT_PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY,
        NEXT_PUBLIC_DATABASE_ID: process.env.NEXT_PUBLIC_DATABASE_ID,
        NEXT_PUBLIC_PATIENT_COLLECTION_ID: process.env.NEXT_PUBLIC_PATIENT_COLLECTION_ID,
        NEXT_PUBLIC_DOCTOR_COLLECTION_ID: process.env.NEXT_PUBLIC_DOCTOR_COLLECTION_ID,
        NEXT_PUBLIC_APPOINTMENT_COLLECTION_ID: process.env.NEXT_PUBLIC_APPOINTMENT_COLLECTION_ID,
        NEXT_PUBLIC_BUCKET_ID: process.env.NEXT_PUBLIC_BUCKET_ID,
        NEXT_PUBLIC_ENDPOINT: process.env.NEXT_PUBLIC_ENDPOINT,
    }
};

export default nextConfig;
