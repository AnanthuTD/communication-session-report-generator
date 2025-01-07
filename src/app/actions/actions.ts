'use server'
import fs from 'fs';
import path from 'path';
import { parse, unparse } from 'papaparse';

const filePath = path.join(process.cwd(), 'public', 'members.csv');
console.log(filePath);

async function check(){
  try {
    const postsDirectory = path.join(process.cwd())
    const filenames = fs.readdirSync(postsDirectory);
  
    console.log('asfdsdf',postsDirectory, filenames)
    
  } catch (error) {
    console.error(error)
  }
}


// Define the structure of a member
interface Member {
  Name: string;
  Role: string;
  OptOutAudio: boolean;
  OptOutCommunication: boolean;
  Coordinator?: boolean;
}

export const getMembers = async (): Promise<Member[]> => {
  try {
check()

    const csvData = fs.readFileSync(filePath, 'utf-8');
    const { data } = parse(csvData, { header: true });
    
    // Type casting to ensure we return the correct structure
    return data.map((member: any) => ({
      Name: member.Name,
      Role: member.Role,
      OptOutAudio: member.OptOutAudio === 'true',  // Convert to boolean
      OptOutCommunication: member.OptOutCommunication === 'true',  // Convert to boolean
      Coordinator: member.Coordinator === 'true',  // Convert to boolean if exists
    }));
  } catch (error) {
    console.error("Error reading members file:", error);
    return [];
  }
};

export const saveMembers = async (members: Member[]): Promise<void> => {
  try {
    const csvContent = unparse(
      members.map((member) => ({
        Name: member.Name,
        Role: member.Role,
        OptOutAudio: member.OptOutAudio ? 'true' : 'false',  // Convert boolean to string
        OptOutCommunication: member.OptOutCommunication ? 'true' : 'false',  // Convert boolean to string
        Coordinator: member.Coordinator ? 'true' : 'false',  // Add Coordinator field
      }))
    );

    // Write to the CSV file
    fs.writeFileSync(filePath, csvContent, 'utf-8');
  } catch (error) {
    console.error("Error saving members file:", error);
  }
};

export const saveMember = async (members: Member[]): Promise<void> => {
  try {
    const currentMembers = await getMembers();  // Get the current members already in the CSV file

    const csvContent = unparse([
      { Name: 'Name', Role: 'Role', OptOutAudio: 'OptOutAudio', OptOutCommunication: 'OptOutCommunication' },
      ...currentMembers.map((member) => ({
        Name: member.Name,
        Role: member.Role,
        OptOutAudio: member.OptOutAudio ? 'true' : 'false',
        OptOutCommunication: member.OptOutCommunication ? 'true' : 'false',
      })),
      ...members.map((member) => ({
        Name: member.Name,
        Role: member.Role,
        OptOutAudio: member.OptOutAudio ? 'true' : 'false',
        OptOutCommunication: member.OptOutCommunication ? 'true' : 'false',
      })),
    ]);

    fs.writeFileSync(filePath, csvContent, 'utf-8');
  } catch (error) {
    console.error("Error saving members file:", error);
  }
};

export const deleteMember = async (memberName: string): Promise<boolean> => {
  try {
    const members = await getMembers();
    const updatedMembers = members.filter((member) => member.Name !== memberName);

    if (members.length === updatedMembers.length) {
      console.log("No member found to delete");
      return false; // Member was not found
    }

    await saveMembers(updatedMembers);
    console.log(`Member ${memberName} deleted successfully`);
    return true;
  } catch (error) {
    console.error("Error deleting member:", error);
    return false;
  }
};

export const updateCoordinator = async (
  memberName: string,
  isCoordinator: boolean
): Promise<void> => {
  try {
    const members = await getMembers();
    const updatedMembers = members.map((member) =>
      member.Name === memberName
        ? { ...member, Coordinator: isCoordinator }
        : member
    );

    console.log(memberName, isCoordinator, updatedMembers)

    await saveMembers(updatedMembers);
  } catch (error) {
    console.error("Error updating coordinator status:", error);
  }
};