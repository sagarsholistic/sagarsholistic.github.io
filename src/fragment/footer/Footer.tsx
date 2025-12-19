import {colors} from "../colors.ts";
import {usePageContent} from "../../hooks/usePageContent";
import {GenericPageContent} from "../../types/content.types";

export function Footer(){
    const currentYear = new Date().getFullYear();
    const {content} = usePageContent<GenericPageContent>('footer');

    // Check if there's HTML content from the admin editor
    if (content?.content.html) {
        return <div style={{display:'flex',flexDirection:'column',alignItems:'center',backgroundColor:colors.second,color:'#FFF',padding:'0.5rem 0 1rem 0',boxShadow:'0 0.5rem 2rem -1.5rem rgba(0,0,0,0.5) inset'}}>
            <div dangerouslySetInnerHTML={{ __html: content.content.html }} />
        </div>;
    }

    // Otherwise use default values
    const businessName = 'Sagars Homeopathy For Kids';
    const email = 'pedsagar@gmail.com';
    const copyright = `©${currentYear} by Sagars Homeopathy For Kids`;

    return <div style={{display:'flex',flexDirection:'column',alignItems:'center',backgroundColor:colors.second,color:'#FFF',padding:'0.5rem 0 1rem 0',boxShadow:'0 0.5rem 2rem -1.5rem rgba(0,0,0,0.5) inset'}}>
        <div style={{fontWeight:400,fontSize:'1.2rem'}}>{businessName}</div>
        <div style={{fontWeight:400,fontSize:'1rem',letterSpacing:'0.3rem'}}>{email}</div>
        <div style={{fontWeight:400,fontSize:'0.85rem'}}>{copyright}</div>
    </div>
}