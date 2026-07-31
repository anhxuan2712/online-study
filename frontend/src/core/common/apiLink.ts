export class Endpoint {
    static Auth = class {
        static Login = "/auth/login"
        static Register = "/auth/signup"
        static Profile = "/profile"
        static ProfileUpdate = "/profile/update"
        static Customer = "/customers/update"
        static ChangePassword = "/profile/change-password"
        static MyCourse = "/course_user/my-courses"
    }
    static Category = class {
        static Get = "/categories"
        static Add = "/categories/admin/add"
        static Update = "/categories/admin/update"
        static Delete = "/categories/admin/delete"
    }
    static Banner = class {
        static Get = "/banner"
        static Add = "/banner/admin/add"
        static Update = "/banner/admin/update"
        static Delete = "/banner/admin/delete"
    }

    static Course = class {
        static Get = "/courses"
        static Add = "/courses/admin/add"
        static Update = "/courses/admin/update"
        static Delete = "/courses/admin/delete"
        static Buy = "/courses"
    }

    static Teacher = class {
        static Get = "/teachers"
        static Add = "/teachers/admin/add"
        static Update = "/teachers/admin/update"
        static Delete = "/teachers/admin/delete"
        static Report = "/teachers/report"
    }

    static Lesson = class {
        static Get = "/lessions"
        static GetPublic = "/lessions/public"
        static Add = "/lessions/admin/add"
        static Update = "/lessions/admin/update"
        static Delete = "/lessions/admin/delete"
    }

    static Discipline = class {
        static Get = "/disciplines"
        static Add = "/disciplines/admin/add"
        static Update = "/disciplines/admin/update"
        static Delete = "/disciplines/admin/delete"
    }
    static Comment = class {
        static Add = "/comments/createComment"
    }
}