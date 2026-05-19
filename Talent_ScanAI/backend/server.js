const express = require('express'); 

const cors = require('cors');       // Allows frontend and backend to communicate from different ports/domains

const multer = require('multer');      // Handles file uploads  

const pdf = require('pdf-parse-fork');  

const mammoth = require('mammoth'); // Reads  DOCX   files

const axios = require('axios'); // Sends HTTP/API requests to other servers or AI APIs


const app = express();
app.use(cors());
app.use(express.json());

// Configure Multer
const upload = multer({ storage: multer.memoryStorage() });

app.post('/api/analyze', upload.single('resume'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        // Capture fields from Frontend (including the new classifier toggle)
        const targetRole = req.body.targetRole || "General";
        const selectedClassifier = req.body.classifier || "Naive Bayes";
        const additionalSkills = req.body.additionalSkills ? JSON.parse(req.body.additionalSkills) : [];

        console.log(`🚀 New Request: Analyzing for [${targetRole}] using engine [${selectedClassifier}]...`);
        let extractedText = "";

        // --- 1. Handle Different File Types ---
        if (req.file.mimetype === 'application/pdf') {
            console.log("📄 PDF detected. Extracting...");
            const data = await pdf(req.file.buffer);
            extractedText = data.text;
        } 
        else if (req.file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
            console.log("📝 DOCX detected. Extracting...");
            const result = await mammoth.extractRawText({ buffer: req.file.buffer });
            extractedText = result.value;
        } 
        else {
            return res.status(400).json({ error: "Unsupported file format. Please use PDF or DOCX." });
        }

        if (!extractedText || extractedText.trim().length === 0) {
            throw new Error("Could not extract any text from the document.");
        }

        console.log(`✅ Text Extracted (${extractedText.length} chars). Sending to Flask...`);

        // --- 2. Communicate with Flask ML Service ---
        // Forwarding the actual parsed resume text and the selected classifier name
        const flaskResponse = await axios.post('http://127.0.0.1:5000/predict', {
            resume_text: extractedText,
            target_role: targetRole,
            classifier: selectedClassifier,
            additional_skills: additionalSkills
        });

        // --- 3. Return to Frontend ---
        console.log(`🎯 Prediction received from Flask [Engine: ${selectedClassifier}]!`);
        res.json({
            analysis: flaskResponse.data,
            fileName: req.file.originalname,
            extractedLength: extractedText.length
        });

    } catch (error) {
        console.error("❌ Backend Bridge Error:", error.message);
        res.status(500).json({ 
            error: "Analysis failed", 
            message: error.message 
        });
    }
});

const PORT = 8000;
app.listen(PORT, () => {
    console.log(`
    =========================================
    🚀 Backend Bridge: http://localhost:${PORT}
    🛠️  Supported: PDF, DOCX
    🧠 Connected to Flask: http://127.0.0.1:5000
    =========================================
    `);
});