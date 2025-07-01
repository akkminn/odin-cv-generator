import {Download, FileText, Eye, Printer, RefreshCw} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";
import {ModeToggle} from "@/components/mode-toggle.tsx";
import {useCv} from "@/context/CvContext.tsx";
import {type CvData, dummyData} from "@/schema.ts";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator
} from "@/components/ui/dropdown-menu.tsx";
import {generateCv} from "@/components/generateCv.tsx";
import {pdf} from "@react-pdf/renderer";

interface AppBarProps {
    onUpdatePreview?: () => void;
}

function AppBar({ onUpdatePreview }: AppBarProps) {
    const {cvData, updateCvData, removeAll} = useCv();

    function handleLoad(e: { preventDefault: () => void; }) {
        e.preventDefault()
        updateCvData(dummyData as CvData)
    }

    function handleClear(e: { preventDefault: () => void; }) {
        e.preventDefault()
        removeAll()
    }

    async function handlePreview(e: { preventDefault: () => void; }) {
        e.preventDefault()

        if (!cvData || !cvData.personalInfo?.fullName) {
            alert('Please fill in your personal information before previewing.')
            return
        }

        try {
            const blob = await pdf(generateCv(cvData)).toBlob()
            const url = URL.createObjectURL(blob)

            const previewWindow = window.open(url, '_blank')

            if (!previewWindow) {
                window.location.href = url
            }

            setTimeout(() => {
                URL.revokeObjectURL(url)
            }, 1000)
        } catch (error) {
            console.error('Error generating preview:', error)
            alert('Error generating preview. Please check your data.')
        }
    }

    async function handleExportPDF(e: { preventDefault: () => void; }) {
        e.preventDefault()

        if (!cvData || !cvData.personalInfo?.fullName) {
            alert('Please fill in your personal information before exporting.')
            return
        }

        try {
            const blob = await pdf(generateCv(cvData)).toBlob()
            const url = URL.createObjectURL(blob)
            const link = document.createElement('a')
            link.href = url
            link.download = `${cvData.personalInfo.fullName.replace(/\s+/g, '_')}_CV.pdf`
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
            URL.revokeObjectURL(url)
        } catch (error) {
            console.error('Error exporting PDF:', error)
            alert('Error exporting PDF. Please check your data.')
        }
    }

    return (
        <header className="px-6 py-2 border w-[100%] shadow-sm sticky top-0 z-50  bg-background dark:bg-input/30">
            <div className="flex justify-between items-center py-4">
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                        <FileText className="text-background" size={20}/>
                    </div>
                    <div className="flex flex-col justify-start items-start ">
                        <h1 className="text-xl font-bold">CV Generator</h1>
                        <p className="text-xs">Professional Resume Builder</p>
                    </div>
                </div>
                <div className="flex items-center space-x-4">
                    {onUpdatePreview && (
                        <Button variant="outline" size="icon" onClick={onUpdatePreview}>
                            <RefreshCw className="text-foreground h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:-rotate-90" />
                            <span className="sr-only">Refresh preview</span>
                        </Button>
                    )}

                    <ModeToggle/>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline">Example</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem onClick={handleLoad}>Load Sample Data</DropdownMenuItem>
                            <DropdownMenuItem onClick={handleClear}>Clear All Data</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button>
                                <Download size={16} className="mr-2"/>
                                Export CV
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem onClick={handlePreview}>
                                <Eye className="mr-2" size={16}/>
                                Preview CV
                            </DropdownMenuItem>
                            <DropdownMenuSeparator/>
                            <DropdownMenuItem onClick={handleExportPDF}>
                                <Printer className="mr-2" size={16}/>
                                Print/Save as PDF
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </header>
    )
}

export default AppBar