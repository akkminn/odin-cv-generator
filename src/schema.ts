export const dummyData = {
    personalInfo: {
        fullName: "Jhon Doe",
        jobTitle: "Software Engineer",
        email: "jhondoe@gmail.com",
        phone: "+1 (555) 123-4567",
        location: "Pathum Thani, Bangkok/Thailand", 
        linkedin: "linkedin.com/in/jhondoe",
        summary: "Results-driven Software Engineer with extensive experience in building and maintaining web applications using modern technologies. Proven track record at leading tech companies, specializing in full-stack development with a focus on scalable solutions. Demonstrated expertise in JavaScript, TypeScript, and React frameworks, with a strong commitment to writing clean, maintainable code and delivering high-quality software products."
    },
    experiences: [
        {
            id: "1",
            title: "Software Engineer",
            company: "Google",
            location: "Mountain View, CA",
            startDate: "2019-01",
            endDate: "2021-01",
            current: false,
            description: "I worked on the Google Assistant team, which is responsible for building and maintaining the Google Assistant app on Android and iOS. I also worked on the Google Assistant SDK team, which is responsible for building and maintaining the Google Assistant SDK on Android and iOS. I also worked on the Google Assistant SDK for Web team, which is responsible for building and maintaining the Google Assistant SDK for Web.",
        },
        {
            id: "2",
            title: "Software Engineer",
            company: "Facebook",
            location: "Menlo Park, CA",
            startDate: "2018-01",
            endDate: "2019-01",
            current: false,
            description: "I worked on the Facebook Messenger team, which is responsible for building and maintaining the Facebook Messenger app on Android and iOS. I also worked on the Facebook Messenger SDK team, which is responsible for building and maintaining the Facebook Messenger SDK on Android and iOS. I also worked on the Facebook Messenger SDK for Web team, which is responsible for building and maintaining the Facebook Messenger SDK for Web.",
        }
    ],
    education: [
        {
            id: "1",
            location: "Pathum Thani, Bangkok/Thailand",
            degree: "Bachelor of Science in Computer Science",
            description: "Achieved academic excellence in computer science coursework with focus on algorithms, data structures, and software engineering. Active member of the Computer Science Society and participated in several hackathons.",
            institution: "University of Bangkok",
            graduationYear: "2018",
            gpa: "3.8",
        }
    ],
    skills: [
        {
            id: "1",
            name: "JavaScript",
            category: "Programming Language",
        },
        {
            id: "2",
            name: "TypeScript",
            category: "Programming Language",
        },
        {
            id: "3",
            name: "React",
            category: "Framework",
        }
    ],
}

export const emptyData = {
    personalInfo: {
        fullName: "",
        jobTitle: "",
        email: "",
        phone: "",
        location: "",
        linkedin: "",
        summary: "",
    },
    experiences: [],
    education: [],
    skills: [],
}

export interface PersonalInfo{
    fullName: string
    jobTitle: string
    email: string
    phone: string
    location: string
    linkedin: string
    summary: string
}

export interface Experience {
    id: string
    title: string
    company: string
    location: string
    startDate: string
    endDate: string
    current: boolean
    description: string
}

export interface Education {
    id: string
    location: string
    description: string
    degree: string
    institution: string,
    graduationYear: string,
    gpa: string,
}

export interface Skill {
    id: string
    name: string
    category: string
}

export interface CvData {
    personalInfo: PersonalInfo
    experiences: Experience[]
    education: Education[]
    skills: Skill[]
}