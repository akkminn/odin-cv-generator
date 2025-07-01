import {useEffect, useState} from "react";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Button} from "@/components/ui/button";
import {Badge} from "@/components/ui/badge";
import {Settings, ChevronUp, ChevronDown, Plus, X} from "lucide-react";
import {nanoid} from "nanoid";
import type {Skill} from "@/schema.ts";
import * as React from "react";

interface SkillsSectionProps {
    skill: Skill[];
    onUpdate: (data: Skill[]) => void;
}

export function SkillsSection({skill, onUpdate}: SkillsSectionProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [newSkill, setNewSkill] = useState("");
    const [formData, setFormData] = useState<Skill[]>(skill);

    useEffect(() => {
        setFormData(skill);
    }, [skill]);

    const addSkill = () => {
        if (!newSkill.trim()) return;

        const newSkillObj: Skill = {
            id: nanoid(),
            name: newSkill.trim(),
            category: "",
        };

        const newData = [...formData, newSkillObj];
        setFormData(newData);
        onUpdate(newData);
        setNewSkill("");
    };

    const removeSkill = (id: string) => {
        const newData = formData.filter(skillItem => skillItem.id !== id);
        setFormData(newData);
        onUpdate(newData);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addSkill();
        }
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
                            <Settings className="text-background" size={16}/>
                        </div>
                        <div className="text-left">
                            <h3 className="text-lg font-semibold">Skills</h3>
                            <p className="text-sm">Technical and soft skills</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        {isExpanded ? <ChevronUp size={16}/> : <ChevronDown size={16}/>}
                    </div>
                </Button>
            </div>

            {isExpanded && (
                <div className="p-6">
                    <div className="space-y-6">
                        <div>
                            <Label>Add Skill</Label>
                            <div className="flex space-x-2 mt-2">
                                <Input
                                    value={newSkill}
                                    onChange={(e) => setNewSkill(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder="e.g. JavaScript, Project Management"
                                    className="flex-1"
                                />
                                <Button onClick={addSkill} disabled={!newSkill.trim()}>
                                    <Plus size={16}/>
                                </Button>
                            </div>
                        </div>

                        {formData.length > 0 && (
                            <div>
                                <Label className="text-sm font-medium mb-3 block">
                                    Current Skills ({formData.length})
                                </Label>
                                <div className="flex flex-wrap gap-2">
                                    {formData.map((skillItem) => (
                                        <Badge
                                            key={skillItem.id}
                                            variant="default"
                                            className="flex items-center space-x-2 px-3 py-1"
                                        >
                                            <span>{skillItem.name}</span>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="h-4 w-4 p-0"
                                                onClick={() => removeSkill(skillItem.id)}
                                            >
                                                <X size={12}/>
                                            </Button>
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}