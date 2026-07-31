const PREFIX = "";

export const ROUTE_PATH = {

    LOGIN: `${PREFIX}/login`,
    REGISTER: `${PREFIX}/register`,
    ///Client
    HOME_PAGE: `${PREFIX}/`,
    LIST_COURSE: `${PREFIX}/course-public`,
    DETAIL_COURSE: `${PREFIX}/course-public/view/:id`,
    LIST_TEACHER: `${PREFIX}/teacher-public`,
    DETAIL_TEACHER: `${PREFIX}/teacher-public/view/:id`,

    LIST_LESSON: `${PREFIX}/lesson-public`,
    DETAIL_LESSON: `${PREFIX}/lesson-public/view/:id`,

    LIST_DOCUMENT: `${PREFIX}/document-public`,
    DETAIL_DOCUMENT: `${PREFIX}/document-public/view/:id`,

    ///Management
    MANAGE_LAYOUT: `${PREFIX}/manage-layout`,

    CATEGORY_MANAGEMENT: `${PREFIX}/category`,
    ADD_CATEGORY_MANAGEMENT: `${PREFIX}/category/add`,
    VIEW_CATEGORY_MANAGEMENT: `${PREFIX}/category/view/:id`,

    COURSE_MANAGEMENT: `${PREFIX}/course`,
    ADD_COURSE_MANAGEMENT: `${PREFIX}/course/add`,
    VIEW_COURSE_MANAGEMENT: `${PREFIX}/course/view/:id`,

    TEACHER_MANAGEMENT: `${PREFIX}/teacher`,
    ADD_TEACHER_MANAGEMENT: `${PREFIX}/teacher/add`,
    VIEW_TEACHER_MANAGEMENT: `${PREFIX}/teacher/view/:id`,

    LESSON_MANAGEMENT: `${PREFIX}/lesson`,
    ADD_LESSON_MANAGEMENT: `${PREFIX}/lesson/add`,
    VIEW_LESSON_MANAGEMENT: `${PREFIX}/lesson/view/:id`,

    BANNER_MANAGEMENT: `${PREFIX}/banner`,
    ADD_BANNER_MANAGEMENT: `${PREFIX}/banner/add`,
    VIEW_BANNER_MANAGEMENT: `${PREFIX}/banner/view/:id`,
}