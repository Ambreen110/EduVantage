"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mammoth = require("mammoth");
const axios_1 = require("axios");
const API_URL = 'http://localhost:3000/universities';
async function extractDataFromDocx(filePath) {
    try {
        const { value } = await mammoth.extractRawText({ path: filePath });
        console.log("Extracted text:", value);
        const lines = value.split('\n');
        const universities = [];
        let currentUniversity = null;
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();
            if (!line || line.startsWith('University'))
                continue;
            if (line.match(/^\d+\.\s/)) {
                if (currentUniversity) {
                    universities.push(currentUniversity);
                }
                const universityData = line.split('\t');
                currentUniversity = {
                    name: universityData[1] || "",
                    country: "USA",
                    place: universityData[2] || "",
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
                        type: "Bachelor's Degree",
                        englishLanguageTest: {
                            [testName]: score,
                        },
                        initialDeposit: currentUniversity.feeStructure.initialDeposit,
                    });
                }
            }
        }
        if (currentUniversity) {
            universities.push(currentUniversity);
        }
        console.log('Extracted Universities:', universities);
        return universities;
    }
    catch (error) {
        console.error('Error reading .docx file:', error);
    }
}
async function postUniversities(universities) {
    try {
        for (const university of universities) {
            const response = await axios_1.default.post(API_URL, university);
            console.log('University created:', response.data);
        }
    }
    catch (error) {
        console.error('Error posting university data:', error);
    }
}
async function main() {
    const filePath = './USA_Universities.docx';
    const universities = await extractDataFromDocx(filePath);
    if (universities && universities.length > 0) {
        await postUniversities(universities);
    }
    else {
        console.log('No universities data to post.');
    }
}
main();
//# sourceMappingURL=new.js.map