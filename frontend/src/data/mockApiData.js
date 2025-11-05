export const apiEndpoints = [
  {
    id: 1,
    method: 'GET',
    path: '/',
    title: 'Welcome Message',
    description: 'Returns a welcome message and API status',
    parameters: [],
    response: {
      message: "Welcome to GradeSync API",
      status: "active",
      version: "1.0.0"
    }
  },
  {
    id: 2,
    method: 'GET',
    path: '/getGrades',
    title: 'Get Assignment Grades',
    description: 'Fetch all student grades for a specific assignment from Gradescope',
    parameters: [
      {
        name: 'assignment_id',
        type: 'integer',
        required: true,
        description: 'The Gradescope assignment ID'
      }
    ],
    response: {
      assignment_id: 123456,
      assignment_name: "Project 2: Data Structures",
      total_students: 487,
      graded_submissions: 485,
      avg_score: 87.3,
      max_score: 100,
      grades: [
        {
          student_email: "alice@berkeley.edu",
          student_name: "Alice Johnson",
          score: 95.5,
          status: "graded",
          submitted_at: "2024-10-15T14:32:00Z"
        },
        {
          student_email: "bob@berkeley.edu",
          student_name: "Bob Smith",
          score: 82.0,
          status: "graded",
          submitted_at: "2024-10-15T18:45:00Z"
        },
        {
          student_email: "charlie@berkeley.edu",
          student_name: "Charlie Davis",
          score: 91.5,
          status: "graded",
          submitted_at: "2024-10-14T22:10:00Z"
        }
      ]
    }
  },
  {
    id: 3,
    method: 'GET',
    path: '/getAssignmentJSON',
    title: 'Get All Assignments',
    description: 'Returns all assignments with their IDs and metadata from the course',
    parameters: [],
    response: {
      course_id: 831412, // Example course ID
      course_name: "CS 10: The Beauty and Joy of Computing (Example)",
      semester: "Fall 2024",
      total_assignments: 15,
      assignments: [
        {
          id: 123456,
          name: "Lab 1: Intro to Snap!",
          category: "lab",
          number: 1,
          due_date: "2024-09-08T23:59:00Z",
          max_score: 10
        },
        {
          id: 123457,
          name: "Homework 1: Functions",
          category: "homework",
          number: 1,
          due_date: "2024-09-15T23:59:00Z",
          max_score: 50
        },
        {
          id: 123458,
          name: "Project 1: Encryption",
          category: "project",
          number: 1,
          due_date: "2024-09-29T23:59:00Z",
          max_score: 100
        },
        {
          id: 123459,
          name: "Midterm Exam",
          category: "exam",
          number: 1,
          due_date: "2024-10-20T14:00:00Z",
          max_score: 100
        }
      ]
    }
  },
  {
    id: 4,
    method: 'GET',
    path: '/getGradeScopeAssignmentID/{category}/{number}',
    title: 'Get Assignment ID by Category',
    description: 'Retrieve the Gradescope assignment ID for a specific category and number',
    parameters: [
      {
        name: 'category',
        type: 'string',
        required: true,
        description: 'Assignment category (lab, homework, project, exam)'
      },
      {
        name: 'number',
        type: 'integer',
        required: true,
        description: 'Assignment number within the category'
      }
    ],
    response: {
      category: "project",
      number: 2,
      assignment_id: 123458,
      assignment_name: "Project 2: Data Structures",
      due_date: "2024-10-29T23:59:00Z",
      max_score: 100
    }
  },
  {
    id: 5,
    method: 'GET',
    path: '/fetchAllGrades',
    title: 'Fetch All Grades for All Students',
    description: 'Comprehensive endpoint that fetches grades for all assignments and all students',
    parameters: [],
    response: {
      course_id: 831412, // Example course ID
      total_students: 487,
      total_assignments: 15,
      last_updated: "2024-11-02T10:30:00Z",
      students: [
        {
          email: "alice@berkeley.edu",
          name: "Alice Johnson",
          total_score: 1342.5,
          max_total: 1500,
          percentage: 89.5,
          assignments: [
            {
              id: 123456,
              name: "Lab 1",
              score: 10,
              max_score: 10
            },
            {
              id: 123457,
              name: "Homework 1",
              score: 45,
              max_score: 50
            },
            {
              id: 123458,
              name: "Project 1",
              score: 95.5,
              max_score: 100
            }
          ]
        },
        {
          email: "bob@berkeley.edu",
          name: "Bob Smith",
          total_score: 1287.0,
          max_total: 1500,
          percentage: 85.8,
          assignments: [
            {
              id: 123456,
              name: "Lab 1",
              score: 10,
              max_score: 10
            },
            {
              id: 123457,
              name: "Homework 1",
              score: 42,
              max_score: 50
            },
            {
              id: 123458,
              name: "Project 1",
              score: 82.0,
              max_score: 100
            }
          ]
        }
      ]
    }
  },
  {
    id: 6,
    method: 'GET',
    path: '/getPLGrades',
    title: 'Get PrairieLearn Grades',
    description: 'Fetches the complete gradebook from PrairieLearn with question-level assessment data',
    parameters: [],
    response: {
      course_id: 155812, // Example course ID
      course_name: "CS 10 - PrairieLearn Assessments (Example)",
      total_students: 487,
      total_assessments: 12,
      last_sync: "2024-11-02T03:00:00Z",
      assessments: [
        {
          id: "hw1",
          name: "Homework 1: Boolean Logic",
          type: "homework",
          max_points: 100,
          avg_score: 82.4,
          questions: [
            {
              qid: "q1_boolean_ops",
              title: "Boolean Operations",
              points: 10,
              avg_score: 8.7
            },
            {
              qid: "q2_truth_tables",
              title: "Truth Tables",
              points: 15,
              avg_score: 12.3
            }
          ]
        },
        {
          id: "quiz1",
          name: "Quiz 1: Variables and Functions",
          type: "quiz",
          max_points: 50,
          avg_score: 41.2,
          questions: [
            {
              qid: "q1_variables",
              title: "Variable Scope",
              points: 15,
              avg_score: 12.8
            },
            {
              qid: "q2_functions",
              title: "Function Composition",
              points: 20,
              avg_score: 16.5
            }
          ]
        }
      ],
      student_grades: [
        {
          email: "alice@berkeley.edu",
          name: "Alice Johnson",
          total_points: 450,
          max_points: 500,
          percentage: 90.0
        },
        {
          email: "bob@berkeley.edu",
          name: "Bob Smith",
          total_points: 420,
          max_points: 500,
          percentage: 84.0
        }
      ]
    }
  },
  {
    id: 7,
    method: 'POST',
    path: '/testWriteToSheet',
    title: 'Test Google Sheets Write',
    description: 'Test endpoint to verify Google Sheets API connectivity and write permissions',
    parameters: [
      {
        name: 'spreadsheet_id',
        type: 'string',
        required: true,
        description: 'Google Sheets spreadsheet ID'
      },
      {
        name: 'range',
        type: 'string',
        required: false,
        description: 'Sheet range (e.g., "Sheet1!A1:B2")'
      }
    ],
    requestBody: {
      spreadsheet_id: "1abc123xyz789",
      range: "Test!A1:B2",
      values: [
        ["Student", "Score"],
        ["Alice", "95"]
      ]
    },
    response: {
      success: true,
      spreadsheet_id: "1abc123xyz789",
      updated_range: "Test!A1:B2",
      updated_rows: 2,
      updated_columns: 2,
      updated_cells: 4,
      message: "Successfully wrote to Google Sheets"
    }
  },
  {
    id: 8,
    method: 'GET',
    path: '/health',
    title: 'Health Check',
    description: 'Health check endpoint to verify API and service connectivity',
    parameters: [],
    response: {
      status: "healthy",
      timestamp: "2024-11-02T10:30:00Z",
      services: {
        gradescope: {
          status: "connected",
          last_fetch: "2024-11-02T08:00:00Z"
        },
        prairielearn: {
          status: "connected",
          last_fetch: "2024-11-02T03:00:00Z"
        },
        google_sheets: {
          status: "connected",
          last_write: "2024-11-02T08:15:00Z"
        }
      },
      uptime_seconds: 1234567,
      version: "1.0.0"
    }
  }
];

export default apiEndpoints;
