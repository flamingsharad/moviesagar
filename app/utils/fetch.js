"use server"
import axios from 'axios';

const apiKey = process.env.NEXT_API_KEY;
const baseId = process.env.NEXT_AIRTABLE_BASE_ID;
const tableName = process.env.NEXT_AIRTABLE_TABLE_NAME; // Replace with the actual table name

const axiosInstance = axios.create({
  baseURL: 'https://api.airtable.com/v0/',
  headers: {
    Authorization: `Bearer ${apiKey}`,
  },
});


export async function fetchRecords() { // Pass optional search term
  try {
    const url = `/${baseId}/${tableName}?view=viwQVwr9YQ0mQJUZd`; // Fetch all records if no search term

    const response = await axiosInstance.get(url);
    const records = response.data.records;
    return records;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; // Re-throw to handle in components
  }
}
export async function fetchNotice() {
  try {
    // Assuming `baseId` is defined elsewhere
    const url = `/${baseId}/tblohlPnc7Maxxoin`; // Specific record ID, not fetching all

    const response = await axiosInstance.get(url);
    const records = response.data.records; // Assuming data structure has 'records' property

    if (records.length > 0) {
      return records[0]; // Return the first record (assuming only one notice)
    } else {
      return null; // Return null if no record found
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; // Re-throw to handle in components
  }
}

export default async function fetchRecordsSearch(searchTerm = '') { // Pass optional search term
  try {
    const url = `/${baseId}/${tableName}?filterByFormula=SEARCH("${searchTerm}",Name)` // Filter by Name field
    const response = await axiosInstance.get(url);
    const records = response.data.records;
    return records;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; // Re-throw to handle in components
  }
}

export async function fetchRecordById(id) {
  try {
    const response = await axiosInstance.get(`/${baseId}/${tableName}/${id}`);
    const record = response.data;
    return record;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; // Re-throw to handle in components
  }
}
