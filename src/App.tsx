import './App.css'
import {ThemeProvider} from "@/components/theme-provider.tsx";
import {CvProvider} from "@/context/CvContext.tsx";
import {Home} from "@/pages/Home.tsx";
import NotFound from "@/pages/NotFound.tsx";
import {Routes, Route} from 'react-router-dom';

function App() {

    return (
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
            <CvProvider>
                <Routes>
                    <Route path="/" element={<Home />}/>
                    <Route path="*" element={<NotFound/>}/>
                </Routes>
            </CvProvider>
        </ThemeProvider>
    )
}

export default App
