/**
 * Default sample evaluation dataset for Mathematics Assessment Report.
 * Used as fallback data when no URL parameters, local storage, or uploaded files are found.
 */
const DEMO_REPORT_DATA = {
  student: null,
  summary: {
    percentage: 90,
    total_max_marks: 30,
    total_questions: 14,
    total_awarded_marks: 27,
    student_name: "Student Assessment",
    subject: "Mathematics",
    exam_name: "Mathematics Evaluation"
  },
  evaluation: [
    {
      feedback: {
        strengths: "You selected the correct option.",
        improvements: "Write Roman numerals more clearly to avoid OCR/reading confusion."
      },
      max_marks: 1,
      confidence: 0.96,
      answer_type: "mcq",
      correctness: "correct",
      question_id: "1",
      marks_awarded: 1,
      question_text: "Roman number for 19 is:\n   (i) XVIII (ii) XVIIIII\n   (iii) XIX (iv) None",
      correct_option: "C",
      student_answer: "Chose (iii), written as 'x1x' in the extract (OCR/handwriting variation for XIX).",
      student_option: "C"
    },
    {
      feedback: {
        strengths: "Correct option selected.",
        improvements: "For practice, you can also verify such questions using common factor 9307."
      },
      max_marks: 1,
      confidence: 1.0,
      answer_type: "mcq",
      correctness: "correct",
      question_id: "2",
      marks_awarded: 1,
      question_text: "Value of 9307 × 937 - 9307 × 837 is:\n   (i) 93700 (ii) 930700\n   (iii) 930070 (iv) 990730",
      correct_option: "B",
      student_answer: "(ii) 930700",
      student_option: "B"
    },
    {
      feedback: {
        strengths: "Correct option selected.",
        improvements: "Keep revising division and remainder concepts for speed."
      },
      max_marks: 1,
      confidence: 1.0,
      answer_type: "mcq",
      correctness: "correct",
      question_id: "3",
      marks_awarded: 1,
      question_text: "If 153874÷215 then remainder is:\n   (i) 150 (ii) 149\n   (iii) 715 (iv) None",
      correct_option: "B",
      student_answer: "(ii) 149",
      student_option: "B"
    },
    {
      feedback: {
        strengths: "Correct option selected.",
        improvements: "Remember that additive identity keeps a number unchanged when added."
      },
      max_marks: 1,
      confidence: 1.0,
      answer_type: "mcq",
      correctness: "correct",
      question_id: "4",
      marks_awarded: 1,
      question_text: "The additive identity for whole number is:\n   (i) 0 (ii) 1\n   (iii) 2 (iv) None",
      correct_option: "A",
      student_answer: "(i) 0",
      student_option: "A"
    },
    {
      feedback: {
        strengths: "Correct option selected.",
        improvements: "You can also check HCF by prime factorization for reinforcement."
      },
      max_marks: 1,
      confidence: 1.0,
      answer_type: "mcq",
      correctness: "correct",
      question_id: "5",
      marks_awarded: 1,
      question_text: "The HCF of 22, 44 and 88 is:\n   (i) 22 (ii) 44\n   (iii) 88 (iv) 1",
      correct_option": "A",
      student_answer: "(i) 22",
      student_option": "A"
    },
    {
      feedback: {
        strengths: "You attempted the diagram-based representation.",
        improvements: "Make the division of the interval and the point 3/5 clearly visible and labeled."
      },
      max_marks: 2,
      confidence: 0.67,
      answer_type: "numerical",
      correctness: "partially_correct",
      question_id: "6",
      marks_awarded: 1,
      question_text: "Represent 3/5 on a number line.",
      steps_analysis: [
        { step: "A number-line diagram/image was submitted for the representation.", marks: 1, is_correct: true },
        { step: "The precise marking of the point 3/5 cannot be verified from the available extract.", marks: 1, is_correct: false }
      ],
      student_answer: "Wrote '3/5 on a number line' and included a diagram/image, but the exact plotted position is not fully verifiable from the extracted answer text."
    },
    {
      feedback: {
        strengths: "Correct method and correct conclusion.",
        improvements: "You can also compare fractions by cross-multiplication as another method."
      },
      max_marks: 2,
      confidence: 0.99,
      answer_type: "numerical",
      correctness: "correct",
      question_id: "7",
      marks_awarded: 2,
      question_text: "Which is greater 3/8 or 4/5.",
      steps_analysis: [
        { step: "Converted 3/8 to 0.375 correctly.", marks: 1, is_correct: true },
        { step: "Converted 4/5 to 0.8 correctly and compared the values properly.", marks: 1, is_correct: true }
      ],
      student_answer: "Converted 3/8 = 0.375 and 4/5 = 0.8, then concluded that 4/5 is greater."
    },
    {
      feedback: {
        strengths: "Your equation and final answer are correct.",
        improvements: "Write the opening statement more clearly so the variable definition is easy to read."
      },
      max_marks: 2,
      confidence: 0.96,
      answer_type: "numerical",
      correctness: "correct",
      question_id: "8",
      marks_awarded: 2,
      question_text: "If 10 is subtracted from six times a number, the difference is equal to 32. Find the number.",
      steps_analysis: [
        { step: "Introduced a variable and formed the equation 6x - 10 = 32 correctly.", marks: 1, is_correct: true },
        { step: "Solved the equation correctly to get x = 7.", marks: 1, is_correct: true }
      ],
      student_answer: "Let the number be x; formed 6x - 10 = 32 and solved x = 7."
    },
    {
      feedback: {
        strengths: "The proportional method and final value are correct.",
        improvements: "Write the variable a more clearly, as it was distorted in the extract."
      },
      max_marks: 2,
      confidence: 0.74,
      answer_type: "numerical",
      correctness: "correct",
      question_id: "9",
      marks_awarded: 2,
      question_text: "Find a if a, 21, 5, 15 are in proportion.",
      steps_analysis: [
        { step: "Set up the proportion a : 21 = 5 : 15 (visible text is OCR-distorted).", marks: 1, is_correct: true },
        { step: "Solved the proportion to obtain a = 7.", marks: 1, is_correct: true }
      ],
      student_answer: "The work appears OCR-distorted, with 'a' read as '9', but it corresponds to setting a : 21 = 5 : 15 and obtaining a = 7."
    },
    {
      feedback: {
        strengths: "Complete and correct answer.",
        improvements: "Avoid repeating reversed factor pairs unnecessarily."
      },
      max_marks: 3,
      confidence: 0.99,
      answer_type: "short",
      correctness: "correct",
      question_id: "10",
      marks_awarded: 3,
      question_text: "Write all factors of 24.",
      steps_analysis: [
        { step: "Identified factor pairs of 24.", marks: 1, is_correct: true },
        { step: "Extracted the individual factors correctly from the pairs.", marks: 1, is_correct: true },
        { step: "Wrote the complete unique list of factors correctly.", marks: 1, is_correct: true }
      ],
      student_answer: "Listed factor pairs and gave the final factors as 1, 2, 3, 4, 6, 8, 12, 24."
    },
    {
      feedback: {
        strengths: "Clear method and correct answer.",
        improvements: "Include the currency symbol in the final statement for completeness."
      },
      max_marks: 3,
      confidence: 0.99,
      answer_type: "short",
      correctness: "correct",
      question_id: "11",
      marks_awarded: 3,
      question_text: "The cost of 15 metres of cloth is ₹2850. Find the cost of 11 metres of cloth.",
      steps_analysis: [
        { step: "Calculated the cost per metre correctly as 190.", marks: 1, is_correct: true },
        { step: "Multiplied 190 by 11 correctly to get 2090.", marks: 1, is_correct: true },
        { step: "Stated the final cost correctly as ₹2090.", marks: 1, is_correct: true }
      ],
      student_answer: "Calculated cost per metre as 2850/15 = 190, then 11 × 190 = 2090."
    },
    {
      feedback: {
        strengths: "Correct setup and correct final answer.",
        improvements: "Write the cross-multiplication step more clearly for neat presentation."
      },
      max_marks: 3,
      confidence: 0.94,
      answer_type: "short",
      correctness: "correct",
      question_id: "12",
      marks_awarded: 3,
      question_text: "Find the third term of a proportion whose first, second and fourth terms are respectively 15, 25 and 50.",
      steps_analysis: [
        { step: "Set up the proportion correctly as 15 : 25 = x : 50.", marks: 1, is_correct: true },
        { step: "Converted the proportion into a solvable equation correctly.", marks: 1, is_correct: true },
        { step: "Solved correctly to obtain x = 30.", marks: 1, is_correct: true }
      ],
      student_answer: "Let the third term be x; wrote 15 : 25 = x : 50 and solved x = 30."
    },
    {
      feedback: {
        strengths: "Your final sum is correct and you attempted the required diagram.",
        improvements: "Show the number-line steps clearly: start at 8, move 5 units left, and mark the endpoint 3."
      },
      max_marks: 4,
      confidence: 0.7,
      answer_type: "long",
      correctness: "partially_correct",
      question_id: "13",
      marks_awarded: 2,
      question_text: "Add 8 and -5 on the number line.",
      steps_analysis: [
        { step: "Indicated a number-line diagram and submitted an image.", marks: 1, is_correct: true },
        { step: "The starting point 8 is not clearly verifiable from the extracted text/image placeholder.", marks: 1, is_correct: false },
        { step: "The movement 5 units to the left for adding -5 is not clearly verifiable from the extracted text/image placeholder.", marks: 1, is_correct: false },
        { step: "Final result 3 is correct.", marks: 1, is_correct: true }
      ],
      student_answer: "Stated that a number line was drawn, included a diagram/image, and gave the result 8 + (-5) = 3."
    },
    {
      feedback: {
        strengths: "Well-structured and completely correct solution.",
        improvements: "Keep the notation for the unknown consistent to make the working neater."
      },
      max_marks: 4,
      confidence: 0.99,
      answer_type: "long",
      correctness: "correct",
      question_id": "14",
      marks_awarded: 4,
      question_text: "If 10 men can do a work in 25 days then how many days does 50 men take to complete the work.",
      steps_analysis: [
        { step: "Stated the inverse proportion relation men × days = constant.", marks: 1, is_correct: true },
        { step: "Set up the equation 10 × 25 = 50 × x correctly.", marks: 1, is_correct: true },
        { step: "Solved the equation correctly to get x = 5.", marks: 1, is_correct: true },
        { step: "Wrote the final answer correctly as 5 days.", marks: 1, is_correct: true }
      ],
      student_answer: "Used men × days = constant; wrote 10 × 25 = 50 × x, solved x = 5, and concluded 50 men take 5 days."
    }
  ]
};
