const BASE_URL = 'http://localhost:3000';
export const environment = {
    GOOGLE_CLIENTID : "772453149406-abjsh6ajdo61sr3rcsfqav4u3mj6b5ap.apps.googleusercontent.com",
    BASE_URL : `${BASE_URL}`,
    LOGIN_URL : `${BASE_URL}/api/v1/google/login`,
    PASSWORD_LOGIN : `${BASE_URL}/api/v1/login`,
    LOGOUT : `${BASE_URL}/api/v1/logout`,
    BASE_SUPER_ADMIN_URL : `${BASE_URL}/api/v1/SuperAdmin`,
    ADMIN_URL : `${BASE_URL}/api/v1/Admin`,
    AVAILABILITY_REQUEST_ : `${BASE_URL}/api/v1/SuperAdmin/staffs/availability`,
    GET_ALL_RESPONSE : `${BASE_URL}/api/v1/SuperAdmin/responses`,
    INDIVIDUAL_RESPONSE : `${BASE_URL}/api/v1/SuperAdmin/responses`,
    ALL_STAFF_URL : `${BASE_URL}/api/v1/SuperAdmin/staffs`,
    ACCEPTED_RESPONSE : `${BASE_URL}/api/v1/SuperAdmin/responses/accepted`,
    SLOT :`${BASE_URL}/api/v1/SuperAdmin/slots`,
    STUDENT:`${BASE_URL}/api/v1/Students`,
    STUDENT_SLOT:`${BASE_URL}/api/v1/Students/slots/`,
    STUDENT_BOOKING:`${BASE_URL}/api/v1/Students/slots/`,
    BOOKERS : `${BASE_URL}/api/v1/Admin/students/`,
    STUDENTMARKS : `${BASE_URL}/api/v1/Admin/studentMarks/`,
    STUDENTS_MARKS : `${BASE_URL}/api/v1/Admin/studentMarks`,
    STUDENT_EVENT_RESULT : `${BASE_URL}/api/v1/Students/eventResult/`,
    EVENT_URL : `${BASE_URL}/api/v1/events`,
    CREATE_EVENT:`${BASE_URL}/api/v1/SuperAdmin/events`,
    INFORMATION_STUDENT:`${BASE_URL}/api/v1/Admin/information/students`,
    FILE_UPLOAD : `${BASE_URL}/api/v1/Students/upload`,
    BREAKS : `${BASE_URL}/api/v1/SuperAdmin/breaks`,
    ALLSTUDENTS : `${BASE_URL}/api/v1/Admin/students`,
    DASHBOARD : `${BASE_URL}/api/v1/SuperAdmin/dashboard`,
    STUDENT_GET_QUERY : `${BASE_URL}/api/v1/Students/query`,
    STUDENT_POST_QUERY : `${BASE_URL}/api/v1/Students/query`,
    SUPERADMIN_GET_QUERY : `${BASE_URL}/api/v1/SuperAdmin/query`,
    SUPERADMIN_POST_REMARKS : `${BASE_URL}/api/v1/SuperAdmin/query`,
};
