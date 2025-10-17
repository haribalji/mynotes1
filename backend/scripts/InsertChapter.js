// const mongoose = require("mongoose");
// const Chapter = require("../models/Chapter");
// const mongoURI ='mongodb+srv://haribalaji17072004:123456hari@cluster0.b21vp.mongodb.net/mynotes'
// // 'mongodb://localhost:27017/mynotes'

// const insertChapters = async () => {
//     try {
//         await mongoose.connect(mongoURI, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//         });

//         await Chapter.deleteMany(); // Clear existing data
//         const chaptersData = [
//             // Class 1
//             { class: 1, subject: "Tamil", chapters: ["அகர வரிசை", "எழுத்துக்கள்", "சொற்கள்", "வாக்கியங்கள்"] },
//             { class: 1, subject: "English", chapters: ["Alphabet", "Basic Words", "Simple Sentences"] },
//             { class: 1, subject: "Mathematics", chapters: ["Numbers", "Addition & Subtraction", "Shapes"] },
//             { class: 1, subject: "Environmental Studies", chapters: ["My Body", "Family", "Animals", "Plants"] },
        
//             // Class 2
//             { class: 2, subject: "Tamil", chapters: ["எழுத்துகள்", "சொற்கள்", "வாக்கியங்கள்", "கவிதைகள்"] },
//             { class: 2, subject: "English", chapters: ["Nouns", "Verbs", "Short Stories"] },
//             { class: 2, subject: "Mathematics", chapters: ["Counting", "Addition & Subtraction", "Measurement"] },
//             { class: 2, subject: "Environmental Studies", chapters: ["Seasons", "Neighborhood", "Transport"] },
        
//             // Class 3
//             { class: 3, subject: "Tamil", chapters: ["நாவல் கதைகள்", "பாடல்கள்", "வாக்கிய அமைப்பு"] },
//             { class: 3, subject: "English", chapters: ["Tenses", "Story Writing", "Opposites"] },
//             { class: 3, subject: "Mathematics", chapters: ["Multiplication", "Division", "Patterns"] },
//             { class: 3, subject: "Science", chapters: ["Living & Non-living things", "Water", "Air"] },
//             { class: 3, subject: "Social Science", chapters: ["My India", "Community Helpers", "Maps"] },
        
//             // Class 4
//             { class: 4, subject: "Tamil", chapters: ["கவிதைகள்", "கதை சொல்லல்", "வாக்கிய அமைப்பு"] },
//             { class: 4, subject: "English", chapters: ["Adjectives", "Short Stories", "Picture Composition"] },
//             { class: 4, subject: "Mathematics", chapters: ["Fractions", "Time & Calendar", "Money"] },
//             { class: 4, subject: "Science", chapters: ["Our Environment", "Energy", "Food & Nutrition"] },
//             { class: 4, subject: "Social Science", chapters: ["History of Tamil Nadu", "Famous Personalities"] },
        
//             // Class 5
//             { class: 5, subject: "Tamil", chapters: ["நாவல்கள்", "கவிதைகள்", "பழமொழிகள்"] },
//             { class: 5, subject: "English", chapters: ["Grammar", "Comprehension", "Letter Writing"] },
//             { class: 5, subject: "Mathematics", chapters: ["Decimals", "Geometry", "Measurement"] },
//             { class: 5, subject: "Science", chapters: ["Simple Machines", "Solar System", "Force & Motion"] },
//             { class: 5, subject: "Social Science", chapters: ["Indian Constitution", "Freedom Fighters"] },
        
//             // Class 6
//             { class: 6, subject: "Tamil", chapters: ["இலக்கணம்", "நாவல்கள்", "எழுத்து பழக்கம்"] },
//             { class: 6, subject: "English", chapters: ["Prose & Poetry", "Tenses", "Letter Writing"] },
//             { class: 6, subject: "Mathematics", chapters: ["Integers", "Factors & Multiples", "Graphing"] },
//             { class: 6, subject: "Science", chapters: ["Light & Shadow", "Electricity", "Magnets"] },
//             { class: 6, subject: "Social Science", chapters: ["Ancient Civilizations", "Indian Geography"] },
        
//             // Class 7
//             { class: 7, subject: "Tamil", chapters: ["கவிதைகள்", "படைப்புகள்", "எழுத்து நுட்பம்"] },
//             { class: 7, subject: "English", chapters: ["Prose & Drama", "Direct & Indirect Speech"] },
//             { class: 7, subject: "Mathematics", chapters: ["Algebra", "Percentage", "Statistics"] },
//             { class: 7, subject: "Science", chapters: ["Heat", "Sound", "Chemical Reactions"] },
//             { class: 7, subject: "Social Science", chapters: ["Medieval History", "Government Structure"] },
        
//             // Class 8
//             { class: 8, subject: "Tamil", chapters: ["சிறுகதைகள்", "கவிதைகள்", "நடப்பு நிகழ்வுகள்"] },
//             { class: 8, subject: "English", chapters: ["Essay Writing", "Figures of Speech"] },
//             { class: 8, subject: "Mathematics", chapters: ["Linear Equations", "Probability"] },
//             { class: 8, subject: "Science", chapters: ["Cell Structure", "Acids & Bases", "Force"] },
//             { class: 8, subject: "Social Science", chapters: ["French Revolution", "Indian Economy"] },
        
//             // Class 9
//             { class: 9, subject: "Tamil", chapters: ["நாவல்கள்", "கவிதைகள்", "பண்பாட்டு வரலாறு"] },
//             { class: 9, subject: "English", chapters: ["Novel Study", "Comprehension", "Speech Writing"] },
//             { class: 9, subject: "Mathematics", chapters: ["Polynomials", "Coordinate Geometry"] },
//             { class: 9, subject: "Science", chapters: ["Gravitation", "Periodic Table"] },
//             { class: 9, subject: "Social Science", chapters: ["Indian Independence", "Globalization"] },
//             { class: 9, subject: "Computer Science", chapters: ["Python Basics", "Networking"] },
        
//             // Class 10
//             { class: 10, subject: "Tamil", chapters: ["சிறப்புப் பாடல்கள்", "தமிழ் இலக்கணம்"] },
//             { class: 10, subject: "English", chapters: ["Poetry Analysis", "Report Writing"] },
//             { class: 10, subject: "Mathematics", chapters: ["Trigonometry", "Mensuration"] },
//             { class: 10, subject: "Science", chapters: ["Magnetic Effects", "Genetics"] },
//             { class: 10, subject: "Social Science", chapters: ["World Wars", "Indian Judiciary"] },
//             { class: 10, subject: "Computer Science", chapters: ["HTML & CSS", "C Programming"] },
        
//             // Class 11
//             { class: 11, subject: "Tamil", chapters: ["இலக்கிய வரலாறு", "நாடக இலக்கியம்"] },
//             { class: 11, subject: "English", chapters: ["Shakespeare", "Essay Writing"] },
//             { class: 11, subject: "Mathematics", chapters: ["Matrices", "Limits & Continuity"] },
//             { class: 11, subject: "Physics", chapters: ["Laws of Motion", "Optics"] },
//             { class: 11, subject: "Chemistry", chapters: ["Periodic Table", "Chemical Bonding"] },
//             { class: 11, subject: "Biology", chapters: ["Human Physiology", "Genetics"] },
//             { class: 11, subject: "Commerce", chapters: ["Accounting Basics", "Market Structure"] },
        
//             // Class 12
//             { class: 12, subject: "Tamil", chapters: ["நவீன தமிழ்க் கவிதைகள்"] },
//             { class: 12, subject: "English", chapters: ["Prose & Drama", "Creative Writing"] },
//             { class: 12, subject: "Mathematics", chapters: ["Differentiation", "Probability"] },
//             { class: 12, subject: "Physics", chapters: ["Electromagnetism", "Semiconductors"] },
//             { class: 12, subject: "Chemistry", chapters: ["Organic Chemistry", "Electrochemistry"] },
//             { class: 12, subject: "Biology", chapters: ["Human Reproduction", "Biotechnology"] },
//             { class: 12, subject: "Computer Science", chapters: ["Java Basics", "Data Structures"] },
//             { class: 12, subject: "Commerce", chapters: ["Financial Management", "Taxation"] }
//         ];
        
//         await Chapter.insertMany(chaptersData);
//         console.log("Chapters inserted successfully!");
//         mongoose.connection.close();
//     } catch (error) {
//         console.error("Error inserting chapters:", error);
//         mongoose.connection.close();
//     }
// };

// insertChapters();















// insertchapter.js
const mongoose = require("mongoose");
const Chapter = require("../models/Chapter");
const mongoURI ='mongodb+srv://haribalaji17072004:123456hari@cluster0.b21vp.mongodb.net/mynotes'
// 'mongodb://localhost:27017/mynotes'

const insertChapters = async () => {
    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        await Chapter.deleteMany(); // Clear existing data
        const chaptersData = [
            // Class 1
            // { class: 1, subject: "Tamil", chapters: ["அகர வரிசை", "எழுத்துக்கள்", "சொற்கள்", "வாக்கியங்கள்"] },
            // { class: 1, subject: "English", chapters: ["Alphabet", "Basic Words", "Simple Sentences"] },
            // { class: 1, subject: "Mathematics", chapters: ["Numbers", "Addition & Subtraction", "Shapes"] },
            // { class: 1, subject: "Environmental Studies", chapters: ["My Body", "Family", "Animals", "Plants"] },

            { class: 1, subject: "Tamil", chapters: ["அகர வரிசை", "எழுத்துக்கள்", "சொற்கள்", "வாக்கியங்கள்"] },
            { class: 1, subject: "English", chapters: ["Alphabet", "Basic Words", "Simple Sentences"] },
            { class: 1, subject: "Mathematics", chapters: ["Numbers", "Addition & Subtraction", "Shapes"] },
            { class: 1, subject: "Environmental Studies", chapters: ["My Body", "Family", "Animals", "Plants"] },
            { class: 1, subject: "Computer Science", chapters: ["Introduction to Computers", "Parts of a Computer", "Basic Computer Operations"] },
        
            // Class 2
            // { class: 2, subject: "Tamil", chapters: ["எழுத்துகள்", "சொற்கள்", "வாக்கியங்கள்", "கவிதைகள்"] },
            // { class: 2, subject: "English", chapters: ["Nouns", "Verbs", "Short Stories"] },
            // { class: 2, subject: "Mathematics", chapters: ["Counting", "Addition & Subtraction", "Measurement"] },
            // { class: 2, subject: "Environmental Studies", chapters: ["Seasons", "Neighborhood", "Transport"] },

            { class: 2, subject: "Tamil", chapters: ["அகர வரிசை", "எழுத்துக்கள்", "சொற்கள்", "வாக்கியங்கள்"] },
            { class: 2, subject: "English", chapters: ["Alphabet", "Basic Words", "Simple Sentences"] },
            { class: 2, subject: "Mathematics", chapters: ["Numbers", "Addition & Subtraction", "Multiplication", "Shapes"] },
            { class: 2, subject: "Science", chapters: ["Living Things", "Non-living Things", "Plants", "Animals"] },
            { class: 2, subject: "Social Science", chapters: ["My Neighborhood", "Community Helpers", "Seasons", "Festivals"] },
        
            // Class 3
            // { class: 3, subject: "Tamil", chapters: ["நாவல் கதைகள்", "பாடல்கள்", "வாக்கிய அமைப்பு"] },
            // { class: 3, subject: "English", chapters: ["Tenses", "Story Writing", "Opposites"] },
            // { class: 3, subject: "Mathematics", chapters: ["Multiplication", "Division", "Patterns"] },
            // { class: 3, subject: "Science", chapters: ["Living & Non-living things", "Water", "Air"] },
            // { class: 3, subject: "Social Science", chapters: ["My India", "Community Helpers", "Maps"] },

            { class: 3, subject: "Tamil", chapters: ["எழுத்துக்கள்", "சொற்கள்", "வாக்கியங்கள்", "பாடல்கள்"] },
            { class: 3, subject: "English", chapters: ["Alphabet", "Words and Sentences", "Short Stories", "Grammar Basics"] },
            { class: 3, subject: "Mathematics", chapters: ["Numbers", "Addition and Subtraction", "Multiplication and Division", "Shapes and Patterns", "Time and Money"] },
            { class: 3, subject: "Science", chapters: ["Living and Non-living Things", "Animals and Their Homes", "Plants and Their Uses", "The Human Body", "Our Environment"] },
            { class: 3, subject: "Social Science", chapters: ["My Family and Relatives", "Neighborhood and Helpers", "Festivals and Celebrations", "Transport and Communication", "Our Earth"] },
        
            // Class 4
            // { class: 4, subject: "Tamil", chapters: ["கவிதைகள்", "கதை சொல்லல்", "வாக்கிய அமைப்பு"] },
            // { class: 4, subject: "English", chapters: ["Adjectives", "Short Stories", "Picture Composition"] },
            // { class: 4, subject: "Mathematics", chapters: ["Fractions", "Time & Calendar", "Money"] },
            // { class: 4, subject: "Science", chapters: ["Our Environment", "Energy", "Food & Nutrition"] },
            // { class: 4, subject: "Social Science", chapters: ["History of Tamil Nadu", "Famous Personalities"] },
            { class: 4, subject: "Tamil", chapters: ["இலக்கணம்", "பாடல்கள்", "சொற்கள்", "வாக்கியங்கள்"] },
            { class: 4, subject: "English", chapters: ["Stories", "Grammar", "Poems", "Prose"] },
            { class: 4, subject: "Mathematics", chapters: ["Numbers and Operations", "Multiplication and Division", "Fractions", "Time and Calendar", "Measurement"] },
            { class: 4, subject: "Science", chapters: ["Our Universe", "Plant Life", "Animal Life", "Human Body", "Weather and Seasons"] },
            { class: 4, subject: "Social Science", chapters: ["My Country", "States and Capitals", "Great Leaders", "Our Festivals", "Means of Transport"] },
        
            // Class 5
            // { class: 5, subject: "Tamil", chapters: ["நாவல்கள்", "கவிதைகள்", "பழமொழிகள்"] },
            // { class: 5, subject: "English", chapters: ["Grammar", "Comprehension", "Letter Writing"] },
            // { class: 5, subject: "Mathematics", chapters: ["Decimals", "Geometry", "Measurement"] },
            // { class: 5, subject: "Science", chapters: ["Simple Machines", "Solar System", "Force & Motion"] },
            // { class: 5, subject: "Social Science", chapters: ["Indian Constitution", "Freedom Fighters"] },
            { class: 5, subject: "Tamil", chapters: ["கவிதைகள்", "கதைகள்", "நாடகம்", "தமிழ் இலக்கியம்"] },
            { class: 5, subject: "English", chapters: ["Prose", "Poetry", "Grammar", "Reading Comprehension"] },
            { class: 5, subject: "Mathematics", chapters: ["Numbers", "Fractions", "Geometry", "Measurements"] },
            { class: 5, subject: "Science", chapters: ["Human Body", "Plants and Animals", "Force and Energy", "Air and Water"] },
            { class: 5, subject: "Social Science", chapters: ["Indian History", "Geography", "Civics", "Our Nation"] },
        
            // Class 6
            // { class: 6, subject: "Tamil", chapters: ["இலக்கணம்", "நாவல்கள்", "எழுத்து பழக்கம்"] },
            // { class: 6, subject: "English", chapters: ["Prose & Poetry", "Tenses", "Letter Writing"] },
            // { class: 6, subject: "Mathematics", chapters: ["Integers", "Factors & Multiples", "Graphing"] },
            // { class: 6, subject: "Science", chapters: ["Light & Shadow", "Electricity", "Magnets"] },
            // { class: 6, subject: "Social Science", chapters: ["Ancient Civilizations", "Indian Geography"] },

            { class: 6, subject: "Tamil", chapters: ["சிறுகதைகள்", "கவிதைகள்", "நாடகம்", "தமிழர் பண்பாடு"] },
            { class: 6, subject: "English", chapters: ["Prose", "Poetry", "Grammar", "Reading Skills"] },
            { class: 6, subject: "Mathematics", chapters: ["Whole Numbers", "Decimals", "Geometry", "Data Handling"] },
            { class: 6, subject: "Science", chapters: ["Food and Nutrition", "Living Organisms", "Force and Motion", "Electricity"] },
            { class: 6, subject: "Social Science", chapters: ["History of India", "Geography of the World", "Civics and Government", "Indian Culture"] },

        
            // Class 7
            // { class: 7, subject: "Tamil", chapters: ["கவிதைகள்", "படைப்புகள்", "எழுத்து நுட்பம்"] },
            // { class: 7, subject: "English", chapters: ["Prose & Drama", "Direct & Indirect Speech"] },
            // { class: 7, subject: "Mathematics", chapters: ["Algebra", "Percentage", "Statistics"] },
            // { class: 7, subject: "Science", chapters: ["Heat", "Sound", "Chemical Reactions"] },
            // { class: 7, subject: "Social Science", chapters: ["Medieval History", "Government Structure"] },

            { class: 7, subject: "Tamil", chapters: ["அகநானூறு", "புறநானூறு", "சொற்களின் வகைகள்", "வாக்கிய அமைப்பு"] },
            { class: 7, subject: "English", chapters: ["Prose", "Poetry", "Grammar", "Comprehension"] },
            { class: 7, subject: "Mathematics", chapters: ["Algebra", "Geometry", "Fractions and Decimals", "Data Handling"] },
            { class: 7, subject: "Science", chapters: ["Heat", "Light", "Respiration", "Nutrition in Plants and Animals"] },
            { class: 7, subject: "Social Science", chapters: ["History of India", "Civics", "Geography", "Economics"] },
        
            // Class 8
            // { class: 8, subject: "Tamil", chapters: ["சிறுகதைகள்", "கவிதைகள்", "நடப்பு நிகழ்வுகள்"] },
            // { class: 8, subject: "English", chapters: ["Essay Writing", "Figures of Speech"] },
            // { class: 8, subject: "Mathematics", chapters: ["Linear Equations", "Probability"] },
            // { class: 8, subject: "Science", chapters: ["Cell Structure", "Acids & Bases", "Force"] },
            // { class: 8, subject: "Social Science", chapters: ["French Revolution", "Indian Economy"] },

            { class: 8, subject: "Tamil", chapters: ["இலக்கணம்", "சொற்களின் பயிற்சி"] },
            { class: 8, subject: "English", chapters: ["Prose", "Poetry"] },
            { class: 8, subject: "Mathematics", chapters: ["Statistics", "Probability"] },
            { class: 8, subject: "Science", chapters: ["Cell Structure", "Reproduction in Animals"] },
            { class: 8, subject: "Social Science", chapters: ["National Movements", "Economic Development"] },
        
            // Class 9
            // { class: 9, subject: "Tamil", chapters: ["நாவல்கள்", "கவிதைகள்", "பண்பாட்டு வரலாறு"] },
            // { class: 9, subject: "English", chapters: ["Novel Study", "Comprehension", "Speech Writing"] },
            // { class: 9, subject: "Mathematics", chapters: ["Polynomials", "Coordinate Geometry"] },
            // { class: 9, subject: "Science", chapters: ["Gravitation", "Periodic Table"] },
            // { class: 9, subject: "Social Science", chapters: ["Indian Independence", "Globalization"] },
            // { class: 9, subject: "Computer Science", chapters: ["Python Basics", "Networking"] },

            { class: 9, subject: "Tamil", chapters: ["இலக்கணம்", "சிறுகதை"] },
            { class: 9, subject: "English", chapters: ["Prose", "Poetry", "Grammar"] },
            { class: 9, subject: "Mathematics", chapters: ["Algebra", "Geometry", "Trigonometry"] },
            { class: 9, subject: "Science", chapters: ["Laws of Motion", "Atoms and Molecules", "Tissues"] },
            { class: 9, subject: "Social Science", chapters: ["French Revolution", "Industrial Revolution", "Indian National Movement"] },
        
            // Class 10
            // { class: 10, subject: "Tamil", chapters: ["சிறப்புப் பாடல்கள்", "தமிழ் இலக்கணம்"] },
            // { class: 10, subject: "English", chapters: ["Poetry Analysis", "Report Writing"] },
            // { class: 10, subject: "Mathematics", chapters: ["Trigonometry", "Mensuration"] },
            // { class: 10, subject: "Science", chapters: ["Magnetic Effects", "Genetics"] },
            // { class: 10, subject: "Social Science", chapters: ["World Wars", "Indian Judiciary"] },
            // { class: 10, subject: "Computer Science", chapters: ["HTML & CSS", "C Programming"] },
            { class: 10, subject: "Tamil", chapters: ["இலக்கியம்", "கவிதைகள்", "சிறுகதை"] },
            { class: 10, subject: "English", chapters: ["Prose", "Poetry", "Supplementary"] },
            { class: 10, subject: "Mathematics", chapters: ["Algebra", "Geometry", "Trigonometry", "Statistics"] },
            { class: 10, subject: "Science", chapters: ["Electricity", "Magnetism", "Chemical Reactions", "Reproduction"] },
            { class: 10, subject: "Social Science", chapters: ["Indian Freedom Struggle", "World War II", "Indian Constitution", "Economics"] },
        
            // Class 11
            // { class: 11, subject: "Tamil", chapters: ["இலக்கிய வரலாறு", "நாடக இலக்கியம்"] },
            // { class: 11, subject: "English", chapters: ["Shakespeare", "Essay Writing"] },
            // { class: 11, subject: "Mathematics", chapters: ["Matrices", "Limits & Continuity"] },
            // { class: 11, subject: "Physics", chapters: ["Laws of Motion", "Optics"] },
            // { class: 11, subject: "Chemistry", chapters: ["Periodic Table", "Chemical Bonding"] },
            // { class: 11, subject: "Biology", chapters: ["Human Physiology", "Genetics"] },
            // { class: 11, subject: "Commerce", chapters: ["Accounting Basics", "Market Structure"] },
            { class: 11, subject: "Tamil", chapters: ["இலக்கணம்", "கவிதைகள்", "சிறுகதை"] },
            { class: 11, subject: "English", chapters: ["Prose", "Poetry", "Supplementary"] },
            { class: 11, subject: "Mathematics", chapters: ["Sets", "Relations & Functions", "Trigonometric Functions", "Probability"] },
            { class: 11, subject: "Physics", chapters: ["Units & Measurements", "Motion in a Straight Line", "Work, Energy & Power"] },
            { class: 11, subject: "Chemistry", chapters: ["Some Basic Concepts of Chemistry", "Structure of Atom", "Chemical Bonding"] },
            { class: 11, subject: "Biology", chapters: ["Cell Structure", "Plant Physiology", "Human Physiology"] },
            { class: 11, subject: "Computer Science", chapters: ["Introduction to Programming", "Data Structures", "Algorithms"] },
            { class: 11, subject: "Commerce", chapters: ["Business Environment", "Forms of Business Organization", "Emerging Modes of Business"] },
            { class: 11, subject: "Economics", chapters: ["Introduction to Microeconomics", "Demand and Supply", "National Income Accounting"] },
            
        
            // Class 12
            { class: 12, subject: "Tamil", chapters: ["நவீன தமிழ்க் கவிதைகள்"] },
            { class: 12, subject: "English", chapters: ["Prose & Drama", "Creative Writing"] },
            { class: 12, subject: "Mathematics", chapters: ["Differentiation", "Probability"] },
            { class: 12, subject: "Physics", chapters: ["Electromagnetism", "Semiconductors"] },
            { class: 12, subject: "Chemistry", chapters: ["Organic Chemistry", "Electrochemistry"] },
            { class: 12, subject: "Biology", chapters: ["Human Reproduction", "Biotechnology"] },
            { class: 12, subject: "Computer Science", chapters: ["Java Basics", "Data Structures"] },
            { class: 12, subject: "Commerce", chapters: ["Financial Management", "Taxation"] }
        ];
        
        await Chapter.insertMany(chaptersData);
        console.log("Chapters inserted successfully!");
        mongoose.connection.close();
    } catch (error) {
        console.error("Error inserting chapters:", error);
        mongoose.connection.close();
    }
};

insertChapters();




