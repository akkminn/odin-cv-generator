import {createContext, useContext, useState} from "react";
import {type CvData, emptyData} from "@/schema.ts";
import * as React from "react";

interface CvContextType {
    cvData: CvData;
    updateCvData: (data: CvData) => void;
    removeAll: () => void;
    updatePersonalInfo: (data: CvData["personalInfo"]) => void;
    updateExperiences: (data: CvData["experiences"]) => void;
    updateEducation: (data: CvData["education"]) => void;
    updateSkills: (data: CvData["skills"]) => void;
}

const CvContext = createContext<CvContextType | null>(null);

export const useCv = () => {
    const context = useContext(CvContext);
    if (!context) {
        throw new Error('useCv must be used within a CvProvider');
    }
    return context;
}

export const CvProvider = ({children}: { children: React.ReactNode }) => {
    const [cvData, setCvData] = useState(emptyData as CvData);

    const updateCvData = (data: CvData) => {
        setCvData(data);
    }

    const removeAll = () => {
        setCvData(emptyData as CvData);
    }

    const updatePersonalInfo = (data: CvData["personalInfo"]) => {
        setCvData({...cvData, personalInfo: data});
    }

    const updateExperiences = (data: CvData["experiences"]) => {
        setCvData({...cvData, experiences: data});
    }

    const updateEducation = (data: CvData["education"]) => {
        setCvData({...cvData, education: data});
    }

    const updateSkills = (data: CvData["skills"]) => {
        setCvData({...cvData, skills: data});
    }

    const value = {
        cvData,
        updateCvData,
        removeAll,
        updatePersonalInfo,
        updateExperiences,
        updateEducation,
        updateSkills,
    }

    return <CvContext.Provider value={value}>
        {children}
    </CvContext.Provider>
}