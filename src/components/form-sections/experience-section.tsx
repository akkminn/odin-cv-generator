import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Briefcase, ChevronUp, ChevronDown, Plus, Trash2, MoveUp, MoveDown } from "lucide-react";
import { nanoid } from "nanoid";
import type { Experience } from "@/schema.ts";

interface ExperienceSectionProps {
    experience: Experience[];
    onUpdate: (data: Experience[]) => void;
}

export function ExperienceSection({ experience, onUpdate }: ExperienceSectionProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [formData, setFormData] = useState<Experience[]>(experience);

    useEffect(() => {
        setFormData(experience);
    }, [experience]);

    const addExperience = () => {
        const newExperience: Experience = {
            id: nanoid(),
            title: "",
            company: "",
            location: "",
            startDate: "",
            endDate: "",
            current: false,
            description: "",
        };
        const newData = [...formData, newExperience];
        setFormData(newData);
        onUpdate(newData);
    };

    const updateExperience = (id: string, field: keyof Experience, value: string | boolean) => {
        const newData = formData.map(exp =>
            exp.id === id ? { ...exp, [field]: value } : exp
        );
        setFormData(newData);
        onUpdate(newData);
    };

    const updateExperienceMultiple = (id: string, updates: Partial<Experience>) => {
        const newData = formData.map(exp =>
            exp.id === id ? { ...exp, ...updates } : exp
        );
        setFormData(newData);
        onUpdate(newData);
    };

    const removeExperience = (id: string) => {
        const newData = formData.filter(exp => exp.id !== id);
        setFormData(newData);
        onUpdate(newData);
    };

    const moveExperience = (id: string, direction: 'up' | 'down') => {
        const index = formData.findIndex(exp => exp.id === id);
        if (index === -1) return;

        const newIndex = direction === 'up' ? index - 1 : index + 1;
        if (newIndex < 0 || newIndex >= formData.length) return;

        const newData = [...formData];
        [newData[index], newData[newIndex]] = [newData[newIndex], newData[index]];
        setFormData(newData);
        onUpdate(newData);
    };

    return (
        <>
            <div className="px-6 py-4">
                <Button
                    variant="ghost"
                    className="w-full justify-between p-0 h-auto"
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                            <Briefcase className="text-background" size={16} />
                        </div>
                        <div className="text-left">
                            <h3 className="text-lg font-semibold">Work Experience</h3>
                            <p className="text-sm">Your professional history</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </div>
                </Button>
            </div>

            {isExpanded && (
                <div className="px-6">
                    <div className="space-y-6">
                        {formData.map((exp, index) => (
                            <div key={exp.id} className="border-b pb-6 last:border-b-0 last:pb-0">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex-1">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                            <div>
                                                <Label>Job Title *</Label>
                                                <Input
                                                    value={exp.title}
                                                    onChange={(e) => updateExperience(exp.id, 'title', e.target.value)}
                                                    placeholder="e.g. Senior Software Engineer"
                                                    className="mt-2"
                                                />
                                            </div>
                                            <div>
                                                <Label>Company *</Label>
                                                <Input
                                                    value={exp.company}
                                                    onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                                                    placeholder="Company name"
                                                    className="mt-2"
                                                />
                                            </div>
                                            <div>
                                                <Label>Start Date *</Label>
                                                <Input
                                                    type="month"
                                                    value={exp.startDate}
                                                    onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                                                    className="mt-2"
                                                />
                                            </div>
                                            <div>
                                                <Label>End Date</Label>
                                                <Input
                                                    type="month"
                                                    value={exp.endDate || ""}
                                                    onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                                                    disabled={exp.current}
                                                    className="mt-2"
                                                />
                                                <div className="flex items-center space-x-2 mt-2">
                                                    <Checkbox
                                                        id={`current-${exp.id}`}
                                                        checked={exp.current}
                                                        onCheckedChange={(checked) =>
                                                            updateExperienceMultiple(exp.id, {
                                                                current: checked as boolean,
                                                                endDate: checked ? "" : exp.endDate
                                                            })
                                                        }
                                                    />
                                                    <Label htmlFor={`current-${exp.id}`} className="text-sm">
                                                        Currently working here
                                                    </Label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mb-4">
                                            <Label>Location</Label>
                                            <Input
                                                value={exp.location || ""}
                                                onChange={(e) => updateExperience(exp.id, 'location', e.target.value)}
                                                placeholder="City, State/Country"
                                                className="mt-2"
                                            />
                                        </div>
                                        <div>
                                            <Label>Description & Achievements</Label>
                                            <Textarea
                                                value={exp.description || ""}
                                                onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                                                placeholder="Describe your role, responsibilities, and achievements..."
                                                rows={4}
                                                className="mt-2"
                                            />
                                        </div>
                                    </div>
                                    <div className="ml-4 flex flex-col space-y-2">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => moveExperience(exp.id, 'up')}
                                            disabled={index === 0}
                                        >
                                            <MoveUp size={16} />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => moveExperience(exp.id, 'down')}
                                            disabled={index === formData.length - 1}
                                        >
                                            <MoveDown size={16} />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => removeExperience(exp.id)}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            <Trash2 size={16} />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}

                        <Button
                            variant="outline"
                            onClick={addExperience}
                            className="w-full"
                        >
                            <Plus className="mr-2" size={16} />
                            Add Experience
                        </Button>
                    </div>
                </div>
            )}
        </>
    );
}