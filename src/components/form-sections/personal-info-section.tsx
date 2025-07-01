import {useEffect, useState} from "react";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";
import {User, ChevronUp, ChevronDown} from "lucide-react";
import type {PersonalInfo} from "@/schema.ts";

interface PersonalInfoSectionProps {
    personalInfo: PersonalInfo,
    onUpdate: (info: PersonalInfo) => void
}

export function PersonalInfoSection({personalInfo, onUpdate}: PersonalInfoSectionProps) {
    const [isExpanded, setIsExpanded] = useState(true);
    const [data, setData] = useState(personalInfo);

    useEffect(() => {
        setData(personalInfo);
    }, [personalInfo]);

    const handleChange = (key: keyof PersonalInfo, value: string) => {
        const newData = {...data, [key]: value};
        setData(newData);
        onUpdate(newData);
    }

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
                            <User className="text-background" size={16}/>
                        </div>
                        <div className="text-left">
                            <h3 className="text-lg font-semibold">Personal Information</h3>
                            <p className="text-sm">Basic details and contact info</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        {isExpanded ? <ChevronUp size={16}/> : <ChevronDown size={16}/>}
                    </div>
                </Button>
            </div>

            {isExpanded && (
                <div className="px-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <Label htmlFor="fullName">Full Name *</Label>
                            <Input
                                id="fullName"
                                value={data.fullName || ""}
                                onChange={(e) => handleChange("fullName", e.target.value)}
                                placeholder="Enter your full name"
                                className="mt-2"
                            />
                        </div>
                        <div>
                            <Label htmlFor="jobTitle">Job Title *</Label>
                            <Input
                                id="jobTitle"
                                value={data.jobTitle || ""}
                                onChange={(e) => handleChange("jobTitle", e.target.value)}
                                placeholder="e.g. Senior Software Engineer"
                                className="mt-2"
                            />
                        </div>
                        <div>
                            <Label htmlFor="email">Email *</Label>
                            <Input
                                id="email"
                                type="email"
                                value={data.email || ""}
                                onChange={(e) => handleChange("email", e.target.value)}
                                placeholder="your.email@example.com"
                                className="mt-2"
                            />
                        </div>
                        <div>
                            <Label htmlFor="phone">Phone</Label>
                            <Input
                                id="phone"
                                type="tel"
                                value={data.phone || ""}
                                onChange={(e) => handleChange("phone", e.target.value)}
                                placeholder="+1 (555) 123-4567"
                                className="mt-2"
                            />
                        </div>
                        <div>
                            <Label htmlFor="location">Location</Label>
                            <Input
                                id="location"
                                value={data.location || ""}
                                onChange={(e) => handleChange("location", e.target.value)}
                                placeholder="City, State/Country"
                                className="mt-2"
                            />
                        </div>
                        <div>
                            <Label htmlFor="linkedin">LinkedIn</Label>
                            <Input
                                id="linkedin"
                                value={data.linkedin || ""}
                                onChange={(e) => handleChange("linkedin", e.target.value)}
                                placeholder="linkedin.com/in/yourprofile"
                                className="mt-2"
                            />
                        </div>
                    </div>
                    <div>
                        <Label htmlFor="summary">Professional Summary</Label>
                        <Textarea
                            id="summary"
                            value={data.summary || ""}
                            onChange={(e) => handleChange("summary", e.target.value)}
                            placeholder="Write a brief professional summary..."
                            rows={4}
                            className="mt-2"
                        />
                    </div>
                </div>
            )}
        </>
    );
}
