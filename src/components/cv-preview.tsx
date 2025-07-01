import { Card } from "@/components/ui/card"
import * as React from "react";

export function CvPreview(previewRef: React.RefObject<HTMLIFrameElement>) {

    return (
        <Card className="p-6 m-3 shadow-lg">
            <iframe
                ref={previewRef}
                className="w-full h-full border-0"
                title="CV Preview"
                sandbox="allow-same-origin"
            />
        </Card>
    )
}