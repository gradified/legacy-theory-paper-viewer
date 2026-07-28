/**
 * Default sample evaluation dataset for Theory Assessment Report.
 * Contains evaluation summary, MCQ results, student answers, and subjective question rubrics.
 */
const DEMO_REPORT_DATA = {
  summary: {
    percentage: 43.75,
    total_max_marks: 80,
    total_questions: 37,
    total_awarded_marks: 35,
    student_name: "Student Assessment",
    subject: "Social Science",
    exam_name: "Theory Evaluation"
  },
  mcqResults: [
    { max_marks: 1, is_correct: true, answer_type: "mcq", correctness: "correct", question_id: "1", marks_awarded: 1, correct_option: "B", student_option: "b", confidence: 0.98 },
    { max_marks: 1, is_correct: true, answer_type: "mcq", correctness: "correct", question_id: "2", marks_awarded: 1, correct_option: "C", student_option: "c", confidence: 0.99 },
    { max_marks: 1, is_correct: true, answer_type: "mcq", correctness: "correct", question_id: "3", marks_awarded: 1, correct_option: "B", student_option: "b", confidence: 0.97 },
    { max_marks: 1, is_correct: true, answer_type: "mcq", correctness: "correct", question_id: "4", marks_awarded: 1, correct_option: "C", student_option: "c", confidence: 0.99 },
    { max_marks: 1, is_correct: true, answer_type: "mcq", correctness: "correct", question_id: "5", marks_awarded: 1, correct_option: "B", student_option: "b", confidence: 0.96 },
    { max_marks: 1, is_correct: true, answer_type: "mcq", correctness: "correct", question_id: "12", marks_awarded: 1, correct_option: "B", student_option: "b", confidence: 0.99 },
    { max_marks: 1, is_correct: true, answer_type: "mcq", correctness: "correct", question_id: "13", marks_awarded: 1, correct_option: "B", student_option: "b", confidence: 0.98 },
    { max_marks: 1, is_correct: true, answer_type: "mcq", correctness: "correct", question_id: "14", marks_awarded: 1, correct_option: "A", student_option: "a", confidence: 0.97 },
    { max_marks: 1, is_correct: true, answer_type: "mcq", correctness: "correct", question_id: "15", marks_awarded: 1, correct_option: "C", student_option: "c", confidence: 0.99 },
    { max_marks: 1, is_correct: true, answer_type: "mcq", correctness: "correct", question_id: "16", marks_awarded: 1, correct_option: "B", student_option: "b", confidence: 0.96 },
    { max_marks: 1, is_correct: true, answer_type: "mcq", correctness: "correct", question_id: "25", marks_awarded: 1, correct_option: "B", student_option: "b", confidence: 0.98 },
    { max_marks: 1, is_correct: true, answer_type: "mcq", correctness: "correct", question_id: "26", marks_awarded: 1, correct_option: "B", student_option: "b", confidence: 0.99 },
    { max_marks: 1, is_correct: true, answer_type: "mcq", correctness: "correct", question_id: "27", marks_awarded: 1, correct_option: "C", student_option: "c", confidence: 0.97 },
    { max_marks: 1, is_correct: true, answer_type: "mcq", correctness: "correct", question_id: "28", marks_awarded: 1, correct_option: "C", student_option: "c", confidence: 0.98 },
    { max_marks: 1, is_correct: true, answer_type: "mcq", correctness: "correct", question_id: "29", marks_awarded: 1, correct_option: "A", student_option: "a", confidence: 0.99 }
  ],
  studentAnswers: {
    byQuestionId: {
      "1": "b", "2": "c", "3": "b", "4": "c", "5": "b",
      "8": "A globe is a spherical model of earth. It shows continents and oceans in positions.",
      "10": "Longitudes are for time. Earth rotates 360 degrees in 24 hours.",
      "11": "Earth turns on axis from west to east. Half faces sun(day) and half is dark(night). This causes day and night.",
      "12": "b", "13": "b", "14": "a", "15": "c", "16": "b",
      "17": "Manuscript is handwritten record. Written on Palm leaves and birch bark.",
      "21": "To means our country has two names. Ancient texts called it Bharadvaksha.",
      "24": "Indus civilization had planned cities and drainage. They used baked bricks and had trade with other places.",
      "25": "b", "26": "b", "27": "c", "28": "c", "29": "a",
      "33": "Family is fundamental unit of society.\n\nWe learn love, care and ahimsa there. It is a school of moral.",
      "37": "Panchayati Raj is a 3-tier system. It brings government to village people. Gram Sabha and Panchayat work together for roads and water."
    }
  },
  overall_feedback: "You did very well in the objective part of the paper: all your MCQ answers were correct, which shows strong basic recall in Geography, History, and Civics. Among the written answers, your responses to the globe, longitudes and time, day and night, manuscript, role of family, features of the Indus civilisation, and Panchayati Raj showed that you understand several key ideas.\n\nThe main reason your score dropped is that many short- and long-answer questions were left unanswered. In this exam, unattempted descriptive questions cost a lot of marks, especially in History and Civics. Even a brief definition or 2-3 correct points could have earned you partial marks.",
  subjectiveResults: [
    {
      question_id: "6",
      question_text: "What are latitudes?",
      max_marks: 2,
      marks_awarded: 0,
      confidence: 0.99,
      correctness: "incorrect",
      strengths: [],
      improvements: [
        "Write the basic definition that latitudes are imaginary horizontal lines.",
        "Add that they measure distance north or south of the Equator in degrees."
      ],
      rubric_scores: [
        { category: "concept", max_marks: 1, awarded_marks: 0, rationale: "No marks because no answer was written." },
        { category: "conclusion", max_marks: 1, awarded_marks: 0, rationale: "No marks because no final takeaway was provided." }
      ],
      overall_feedback: "No answer was attempted. Learn the definition of latitudes.",
      key_points_covered: [],
      key_points_missing: [
        "Latitudes are imaginary horizontal lines drawn from east to west.",
        "Latitudes measure distance north or south of the Equator in degrees."
      ]
    },
    {
      question_id: "7",
      question_text: "What is the importance of the Prime Meridian?",
      max_marks: 2,
      marks_awarded: 0,
      confidence: 0.99,
      correctness: "incorrect",
      strengths: [],
      improvements: [
        "State that the Prime Meridian is 0° longitude.",
        "Add its importance: it divides the Earth into two hemispheres and helps in time calculation."
      ],
      rubric_scores: [
        { category: "concept", max_marks: 1, awarded_marks: 0, rationale: "No marks because no answer was written." },
        { category: "conclusion", max_marks: 1, awarded_marks: 0, rationale: "No marks because no final idea was given." }
      ],
      overall_feedback: "No answer was attempted. Revise the Prime Meridian as 0° longitude.",
      key_points_covered: [],
      key_points_missing: [
        "The Prime Meridian is 0° longitude.",
        "It divides the Earth into the Eastern and Western Hemispheres.",
        "Longitudes help to calculate time."
      ]
    },
    {
      question_id: "8",
      question_text: "What is a globe?",
      max_marks: 2,
      marks_awarded: 2,
      confidence: 0.97,
      correctness: "correct",
      student_answer: "A globe is a spherical model of earth. It shows continents and oceans in positions.",
      strengths: [
        "The definition is clear and correct.",
        "The answer includes the globe's function of showing Earth's features."
      ],
      improvements: [
        "Add that a globe also shows countries.",
        "Use the phrase 'correct relative positions' for a more complete textbook answer."
      ],
      rubric_scores: [
        { category: "concept", max_marks: 1, awarded_marks: 1, rationale: "Full marks for spherical model." },
        { category: "conclusion", max_marks: 1, awarded_marks: 1, rationale: "Full marks for showing continents and oceans." }
      ],
      overall_feedback: "Good answer. You correctly defined a globe and mentioned what it shows.",
      key_points_covered: [
        "A globe is a spherical model of the Earth.",
        "A globe shows continents and oceans in their relative positions."
      ],
      key_points_missing: ["The answer does not mention countries."]
    },
    {
      question_id: "10",
      question_text: "Why are longitudes important for calculating time?",
      max_marks: 3,
      marks_awarded: 2,
      confidence: 0.92,
      correctness: "partially_correct",
      student_answer: "Longitudes are for time. Earth rotates 360 degrees in 24 hours.",
      strengths: [
        "You identified the main connection between longitudes and time.",
        "You used the important rotation fact correctly."
      ],
      improvements: [
        "Add that places on different longitudes have different local times.",
        "Finish by stating that standard time is based on a chosen longitude."
      ],
      rubric_scores: [
        { category: "concept", max_marks: 1, awarded_marks: 1, rationale: "Full marks for identifying longitudes are for time." },
        { category: "explanation", max_marks: 1, awarded_marks: 1, rationale: "Full marks for rotation fact 360 degrees in 24 hours." },
        { category: "conclusion", max_marks: 1, awarded_marks: 0, rationale: "No marks for missing local time conclusion." }
      ],
      overall_feedback: "A good start. You gave the key rotation fact, but your answer needs the final link to local times.",
      key_points_covered: [
        "Longitudes are related to time calculation.",
        "The Earth rotates 360 degrees in 24 hours."
      ],
      key_points_missing: [
        "Different longitudes experience different local times.",
        "Standard time is based on a selected longitude."
      ]
    },
    {
      question_id: "11",
      question_text: "How does Earth's rotation cause day and night?",
      max_marks: 3,
      marks_awarded: 3,
      confidence: 0.98,
      correctness: "correct",
      student_answer: "Earth turns on axis from west to east. Half faces sun(day) and half is dark(night). This causes day and night.",
      strengths: [
        "The answer is clear and scientifically correct.",
        "You included both the rotation and the Sun-facing explanation."
      ],
      improvements: [
        "Add that the Earth completes one rotation in about 24 hours for a fuller answer."
      ],
      rubric_scores: [
        { category: "concept", max_marks: 1, awarded_marks: 1, rationale: "Turns on axis from west to east." },
        { category: "explanation", max_marks: 1, awarded_marks: 1, rationale: "Half faces sun and half is dark." },
        { category: "conclusion", max_marks: 1, awarded_marks: 1, rationale: "Causes day and night." }
      ],
      overall_feedback: "Very good answer. You clearly explained how Earth's rotation causes day and night.",
      key_points_covered: [
        "The Earth rotates on its axis from west to east.",
        "The half facing the Sun has daylight.",
        "The half turned away from the Sun has night."
      ],
      key_points_missing: []
    },
    {
      question_id: "17",
      question_text: "What is a manuscript?",
      max_marks: 2,
      marks_awarded: 2,
      confidence: 0.97,
      correctness: "correct",
      student_answer: "Manuscript is handwritten record. Written on Palm leaves and birch bark.",
      strengths: [
        "The definition is correct.",
        "You included relevant details about writing materials."
      ],
      improvements: [
        "Add that manuscripts preserve valuable information about the past."
      ],
      rubric_scores: [
        { category: "concept", max_marks: 1, awarded_marks: 1, rationale: "Handwritten record." },
        { category: "conclusion", max_marks: 1, awarded_marks: 1, rationale: "Palm leaves and birch bark." }
      ],
      overall_feedback: "Good answer. You correctly defined a manuscript and mentioned writing materials.",
      key_points_covered: [
        "A manuscript is a handwritten record.",
        "Manuscripts were written on palm leaves and birch bark."
      ],
      key_points_missing: []
    },
    {
      question_id: "21",
      question_text: "Meaning of “India, that is Bharat”.",
      max_marks: 3,
      marks_awarded: 1,
      confidence: 0.84,
      correctness: "partially_correct",
      student_answer: "To means our country has two names. Ancient texts called it Bharadvaksha.",
      strengths: ["You understood the basic idea that India and Bharat refer to the same country."],
      improvements: [
        "Use the correct ancient name 'Bharatavarsha' instead of 'Bharadvaksha.'",
        "Add that the phrase reflects the identity and cultural unity of the country."
      ],
      rubric_scores: [
        { category: "concept", max_marks: 1, awarded_marks: 1, rationale: "Country has two names." },
        { category: "explanation", max_marks: 1, awarded_marks: 0, rationale: "Incorrect ancient name term." },
        { category: "conclusion", max_marks: 1, awarded_marks: 0, rationale: "Missing cultural identity conclusion." }
      ],
      overall_feedback: "You got the basic meaning, but the historical detail is incorrect.",
      key_points_covered: ["The phrase refers to the country by two names: India and Bharat."],
      key_points_missing: [
        "The phrase reflects the identity of the country.",
        "Ancient texts used names such as Bharatavarsha and Jambudvipa."
      ]
    },
    {
      question_id: "24",
      question_text: "Features of the Indus Valley Civilisation.",
      max_marks: 5,
      marks_awarded: 3,
      confidence: 0.89,
      correctness: "partially_correct",
      student_answer: "Indus civilization had planned cities and drainage. They used baked bricks and had trade with other places.",
      strengths: [
        "You included several important textbook features.",
        "Your answer is clear and neatly stated."
      ],
      improvements: [
        "Begin with a short introduction to the Indus Valley Civilisation.",
        "Add more features such as upper and lower towns or agriculture.",
        "Explain briefly why these features show advanced urban planning."
      ],
      rubric_scores: [
        { category: "concept", max_marks: 1, awarded_marks: 1, rationale: "Planned cities and drainage." },
        { category: "explanation", max_marks: 1, awarded_marks: 1, rationale: "Baked bricks and trade." },
        { category: "structure", max_marks: 1, awarded_marks: 1, rationale: "Organized sentences." }
      ],
      overall_feedback: "Good points were included, especially planned cities, drainage, bricks and trade.",
      key_points_covered: [
        "The civilisation had planned cities.",
        "It had drainage systems.",
        "It used baked bricks.",
        "It had trade with other places."
      ],
      key_points_missing: [
        "It was one of the earliest civilisations of the Indian subcontinent.",
        "It had upper and lower towns."
      ]
    },
    {
      question_id: "33",
      question_text: "Role of family in society.",
      max_marks: 3,
      marks_awarded: 3,
      confidence: 0.97,
      correctness: "correct",
      student_answer: "Family is fundamental unit of society.\n\nWe learn love, care and ahimsa there. It is a school of moral.",
      strengths: [
        "You covered the main role of family clearly.",
        "You included important values learned in family life."
      ],
      improvements: ["Use the fuller phrase 'school of moral development and responsibility.'"],
      rubric_scores: [
        { category: "concept", max_marks: 1, awarded_marks: 1, rationale: "Fundamental unit of society." },
        { category: "explanation", max_marks: 1, awarded_marks: 1, rationale: "Teaches love, care and ahimsa." },
        { category: "conclusion", max_marks: 1, awarded_marks: 1, rationale: "School of moral development." }
      ],
      overall_feedback: "Very good answer. You clearly explained the family as the basic unit of society.",
      key_points_covered: [
        "Family is the fundamental unit of society.",
        "Family teaches love, care and ahimsa.",
        "Family helps in moral development."
      ],
      key_points_missing: []
    },
    {
      question_id: "37",
      question_text: "How Panchayati Raj strengthens democracy.",
      max_marks: 5,
      marks_awarded: 4,
      confidence: 0.9,
      correctness: "partially_correct",
      student_answer: "Panchayati Raj is a 3-tier system. It brings government to village people. Gram Sabha and Panchayat work together for roads and water.",
      strengths: [
        "You included the definition and village-level purpose correctly.",
        "You supported the answer with examples of local work like roads and water."
      ],
      improvements: [
        "Add that people participate directly in decision-making through these institutions.",
        "Mention the three levels specifically: village, block and district."
      ],
      rubric_scores: [
        { category: "definition", max_marks: 1, awarded_marks: 1, rationale: "3-tier system." },
        { category: "concept", max_marks: 1, awarded_marks: 1, rationale: "Brings government to village people." },
        { category: "explanation", max_marks: 1, awarded_marks: 1, rationale: "Gram Sabha and Panchayat work for roads and water." },
        { category: "structure", max_marks: 1, awarded_marks: 1, rationale: "Logical order." }
      ],
      overall_feedback: "Good answer. You defined Panchayati Raj and explained how local work is handled.",
      key_points_covered: [
        "Panchayati Raj is a 3-tier system.",
        "It brings governance to village people.",
        "Gram Sabha and Panchayat work together."
      ],
      key_points_missing: ["Mention the three levels specifically: village, block and district."]
    }
  ]
};
