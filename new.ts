import * as mammoth from 'mammoth';
import axios from 'axios';

// Define the API endpoint
const API_URL = 'http://localhost:3000/universities'; // Change as needed

// Function to extract data from .docx
async function extractDataFromDocx(filePath: string) {
    try {
        const { value } = await mammoth.extractRawText({ path: filePath });
        console.log("Extracted text:", value); // Debugging line
        const lines = value.split('\n');

        const universities = [];
        
        let currentUniversity = null;

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();

            if (!line || line.startsWith('University')) continue; // Skip empty lines or header

            // Identify a new university entry
            if (line.match(/^\d+\.\s/)) { // Check if the line starts with a number (indicating a new entry)
                // If we already have a university, push it to the array before starting a new one
                if (currentUniversity) {
                    universities.push(currentUniversity);
                }

                const universityData = line.split('\t');
                currentUniversity = {
                    name: universityData[1] || "", // Assuming the university name is at the second position
                    country: "USA", // Assuming all universities are in the USA
                    place: universityData[2] || "", // Assuming the city/state is at the third position
                    feeStructure: {
                        tuitionFee: "",
                        initialDeposit: "",
                    },
                    programs: [],
                    applicationRequirements: {
                        academicRequirement: "",
                        depositDetails: "",
                    },
                };
            }

            // Parse additional details if currentUniversity is defined
            if (currentUniversity) {
                if (line.startsWith("Tuition fee:")) {
                    const tuitionMatch = line.match(/Tuition fee:\s*(.+)/);
                    if (tuitionMatch) {
                        currentUniversity.feeStructure.tuitionFee = tuitionMatch[1] || "";
                    }
                }
                if (line.startsWith("Initial deposit:")) {
                    const depositMatch = line.match(/Initial deposit:\s*(.+)/);
                    if (depositMatch) {
                        currentUniversity.feeStructure.initialDeposit = depositMatch[1] || "";
                    }
                }
                if (line.startsWith("Academic requirement:")) {
                    const academicMatch = line.match(/Academic requirement:\s*(.+)/);
                    if (academicMatch) {
                        currentUniversity.applicationRequirements.academicRequirement = academicMatch[1] || "";
                    }
                }
                if (line.startsWith("IELTS:") || line.startsWith("TOEFL:") || line.startsWith("Duolingo:")) {
                    const langTest = line.split(':');
                    const testName = langTest[0].trim();
                    const score = langTest[1]?.trim() || "";

                    currentUniversity.programs.push({
                        type: "Bachelor's Degree", // Adjust if needed
                        englishLanguageTest: {
                            [testName]: score,
                        },
                        initialDeposit: currentUniversity.feeStructure.initialDeposit, // Use the initial deposit
                    });
                }
            }
        }

        // Push the last university if exists
        if (currentUniversity) {
            universities.push(currentUniversity);
        }

        console.log('Extracted Universities:', universities); // Debugging line
        return universities;
    } catch (error) {
        console.error('Error reading .docx file:', error);
    }
}

// Function to post university data
async function postUniversities(universities) {
    try {
        for (const university of universities) {
            const response = await axios.post(API_URL, university);
            console.log('University created:', response.data);
        }
    } catch (error) {
        console.error('Error posting university data:', error);
    }
}

// Main function to execute the above functions
async function main() {
    const filePath = './USA_Universities.docx'; // Change to your file path
    const universities = await extractDataFromDocx(filePath);
    
    if (universities && universities.length > 0) {
        await postUniversities(universities);
    } else {
        console.log('No universities data to post.');
    }
}

// Run the main function
main();
