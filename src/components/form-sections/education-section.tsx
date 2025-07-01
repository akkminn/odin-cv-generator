import type {Education} from "@/schema.ts";
import {useEffect, useState} from "react";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Textarea} from "@/components/ui/textarea";
import {Plus, Trash2, GraduationCap, ChevronUp, ChevronDown} from "lucide-react";
import { nanoid } from "nanoid";


interface EducationSectionProps {
    education: Education[],
    onUpdate: (data: Education[]) => void
}

export function EducationSection({education, onUpdate}: EducationSectionProps) {
    const [isExpanded, setIsExpanded] = useState(false)
    const [formData, setFormData] = useState<Education[]>(education);

    useEffect(() => {
        setFormData(education);
    }, [education]);

    const addEducation = () => {
        const newEducation: Education = {
            id: nanoid(),
            degree: "",
            institution: "",
            graduationYear: "",
            gpa: "",
            location: "",
            description: ""
        };
        const newData = [...formData, newEducation];
        setFormData(newData);
        onUpdate(newData);
    };

    const updateEducation = (id: string, field: keyof Education, value: string) => {
        const newData = formData.map(edu => edu.id === id ? { ...edu, [field]: value } : edu);
        setFormData(newData);
        onUpdate(newData);
    };

    const removeEducation = (id: string) => {
        const newData = formData.filter(edu => edu.id !== id);
        setFormData(newData);
        onUpdate(newData);
    };

    return (
        <>
            <div className="px-6">
                <Button
                    variant="ghost"
                    className="w-full justify-between p-2 h-auto"
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                            <GraduationCap className="text-background" size={16} />
                        </div>
                        <div className="text-left">
                            <h3 className="text-lg font-semibold">Education</h3>
                            <p className="text-sm">Academic background</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        {isExpanded ? <ChevronUp size={16}/> : <ChevronDown size={16}/>}
                    </div>
                </Button>
            </div>

            {isExpanded && (
                <div className="px-6">
                    <div className="space-y-6">
                        {formData.map((education) => (
                            <div key={education.id} className="border-b  pb-6 last:border-b-0 last:pb-0">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                            <div>
                                                <Label>Degree *</Label>
                                                <Input
                                                    value={education.degree}
                                                    onChange={(e) => updateEducation(education.id, 'degree', e.target.value)}
                                                    placeholder="e.g. Bachelor of Science in Computer Science"
                                                    className="mt-2"
                                                />
                                            </div>
                                            <div>
                                                <Label>Institution *</Label>
                                                <Input
                                                    value={education.institution}
                                                    onChange={(e) => updateEducation(education.id, 'institution', e.target.value)}
                                                    placeholder="University/College name"
                                                    className="mt-2"
                                                />
                                            </div>
                                            <div>
                                                <Label>Graduation Year</Label>
                                                <Input
                                                    value={education.graduationYear || ""}
                                                    onChange={(e) => updateEducation(education.id, 'graduationYear', e.target.value)}
                                                    placeholder="2024"
                                                    className="mt-2"
                                                />
                                            </div>
                                            <div>
                                                <Label>GPA (Optional)</Label>
                                                <Input
                                                    value={education.gpa || ""}
                                                    onChange={(e) => updateEducation(education.id, 'gpa', e.target.value)}
                                                    placeholder="3.8/4.0"
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                        <div className="mb-4">
                                            <Label>Location</Label>
                                            <Input
                                                value={education.location || ""}
                                                onChange={(e) => updateEducation(education.id, 'location', e.target.value)}
                                                placeholder="City, State/Country"
                                                className="mt-2"
                                            />
                                        </div>
                                        <div>
                                            <Label>Additional Details</Label>
                                            <Textarea
                                                value={education.description || ""}
                                                onChange={(e) => updateEducation(education.id, 'description', e.target.value)}
                                                placeholder="Relevant coursework, honors, activities..."
                                                rows={3}
                                                className="mt-2"
                                            />
                                        </div>
                                    </div>
                                    <div className="">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => removeEducation(education.id)}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            <Trash2 size={16}/>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}

                        <Button
                            variant="outline"
                            onClick={addEducation}
                            className="w-full"
                        >
                            <Plus className="mr-2" size={16}/>
                            Add Education
                        </Button>
                    </div>
                </div>
            )}
        </>
    )
}