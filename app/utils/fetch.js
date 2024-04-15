"use server"
import axios from 'axios';

const apiKey = process.env.NEXT_API_KEY;
const baseId = process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID;
const tableName = "tblObYzqeQ0rurO97"; // Replace with the actual table name

const axiosInstance = axios.create({
  baseURL: 'https://api.airtable.com/v0/',
  headers: {
    Authorization: `Bearer ${apiKey}`,
  },
});

export async function fetchRecords() {
  try {
    const response = await axiosInstance.get(`/${baseId}/${tableName}`);
    const records = response.data.records;
    return records;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; // Re-throw to handle in components
  }
}

export async function fetchRecordById(id) {
  // const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE_ID);
  // const record = await base(tableName).find(id);
  // return record;
  try {
    const response = await axiosInstance.get(`/${baseId}/${tableName}/${id}`);
    const record = response.data;
    console.log(record)
    return record;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; // Re-throw to handle in components
  }
}
