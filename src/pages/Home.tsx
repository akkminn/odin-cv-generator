import {useState, useMemo} from 'react'
import {PersonalInfoSection} from "@/components/form-sections/personal-info-section.tsx"
import {useCv} from "@/context/CvContext.tsx"
import {Card} from "@/components/ui/card.tsx"
import {EducationSection} from "@/components/form-sections/education-section.tsx"
import {ExperienceSection} from "@/components/form-sections/experience-section.tsx"
import {SkillsSection} from "@/components/form-sections/skill-section.tsx"
import {generateCv} from "@/components/generateCv"
import {PDFViewer} from '@react-pdf/renderer'
import AppBar from "@/components/app-bar.tsx";

export function Home() {
    const {cvData, updatePersonalInfo, updateEducation, updateExperiences, updateSkills} = useCv()
    const [previewData, setPreviewData] = useState(cvData)
    const [hasChanges, setHasChanges] = useState(false)

    const dataChanged = JSON.stringify(cvData) !== JSON.stringify(previewData)

    const updatePreview = () => {
        setPreviewData({...cvData})
        setHasChanges(false)
    }

    if (dataChanged && !hasChanges) {
        setHasChanges(true)
    }

    const pdfDocument = useMemo(() => {
        return generateCv(previewData)
    }, [previewData])

    return (
        <>
            <AppBar onUpdatePreview={updatePreview} />
            <div className="flex gap-2 p-6">
                <div className="flex flex-col flex-1 items-center">
                    <Card className="w-full max-w-lg mb-6">
                        <PersonalInfoSection personalInfo={cvData.personalInfo} onUpdate={updatePersonalInfo}/>
                    </Card>

                    <Card className="w-full max-w-lg mb-6">
                        <EducationSection education={cvData.education} onUpdate={updateEducation}/>
                    </Card>

                    <Card className="w-full max-w-lg mb-6">
                        <ExperienceSection experience={cvData.experiences} onUpdate={updateExperiences}/>
                    </Card>

                    <Card className="w-full max-w-lg">
                        <SkillsSection skill={cvData.skills} onUpdate={updateSkills}/>
                    </Card>
                </div>


                <div className="flex-1 sticky top-20 h-[calc(100vh-8rem)]">
                    <Card className="h-full overflow-auto">
                        <PDFViewer className="w-full h-full border-0 p-5">
                            {pdfDocument}
                        </PDFViewer>
                    </Card>
                </div>
            </div>
        </>
    )
}