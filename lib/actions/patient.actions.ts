"use server"

import { databases, storage, users } from "../appwrite.config";
import { ID, Query } from "node-appwrite";
import { parseStringify } from "../utils";
import { InputFile } from "node-appwrite/file"
export const createUser = async (user: CreateUserParams) => {
  try {
    const randomPassword = ID.unique();
    const newUser = await users.create(
      ID.unique(),
      user.email,
      user.phone,
      randomPassword,
      user.name
    );
    return parseStringify(newUser);
  } catch (error: any) {
    console.log(error, "error");
    if (error && error?.code === 409) {
      console.log(error, "error");
      const documents = await users.list([Query.equal("email", [user.email])]);

      return documents?.users[0];
    }
  }
};
export const getUser = async (userId: string) => {
  try {
    const user = await users.get(userId);

    return parseStringify(user);
  } catch (error) {}
};

export const registerPatient = async ({
  identificationDocument,
  ...patient
}: RegisterUserParams) => {
    try{
        let file;

        if(identificationDocument){
            const inputFile = InputFile.fromBuffer(
                identificationDocument?.get('blobFile') as Blob,
                identificationDocument?.get('fileName') as string,
            )
    
        file = await storage.createFile(process.env.NEXT_PUBLIC_BUCKET_ID!, ID.unique(), inputFile)
        }

        const newPatient = await databases.createDocument(
            process.env.NEXT_PUBLIC_DATABASE_ID!,
            process.env.NEXT_PUBLIC_PATIENT_COLLECTION_ID!,
            ID.unique(),
            {
                identificationDocumentId: file?.$id || null,
                identificationDocumentUrl: `${process.env.NEXT_PUBLIC_ENDPOINT}/storage/buckets/${process.env.NEXT_PUBLIC_BUCKET_ID}/files/${file?.$id}/view?project=${process.env.NEXT_PUBLIC_PROJECT_ID}`,
                ...patient
            }
        )
        return parseStringify(newPatient);
    }catch(err){
        console.log(err);
    }
};

// GET PATIENT
export const getPatient = async (userId: string) => {
  try {
    const patients = await databases.listDocuments(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_PATIENT_COLLECTION_ID!,
      [Query.equal("userId", [userId])]
    );

    return parseStringify(patients.documents[0]);
  } catch (error) {
    console.error(
      "An error occurred while retrieving the patient details:",
      error
    );
  }
};
