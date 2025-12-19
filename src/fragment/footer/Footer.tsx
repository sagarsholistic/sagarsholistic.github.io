import {colors} from "../colors.ts";
import {usePageContent} from "../../hooks/usePageContent";
import {FooterContent} from "../../types/content.types";

export function Footer(){
    const currentYear = new Date().getFullYear();
    const {content} = usePageContent<FooterContent>('footer');

    const businessName = content?.content.businessName || 'Sagars Homeopathy For Kids';
    const email = content?.content.email || 'pedsagar@gmail.com';
    const copyright = content?.content.copyright || `©${currentYear} by Sagars Homeopathy For Kids`;

    return <div style={{display:'flex',flexDirection:'column',alignItems:'center',backgroundColor:colors.second,color:'#FFF',padding:'0.5rem 0 1rem 0',boxShadow:'0 0.5rem 2rem -1.5rem rgba(0,0,0,0.5) inset'}}>
        <div style={{fontWeight:400,fontSize:'1.2rem'}}>{businessName}</div>
        <div style={{fontWeight:400,fontSize:'1rem',letterSpacing:'0.3rem'}}>{email}</div>
        <div style={{fontWeight:400,fontSize:'0.85rem'}}>{copyright}</div>
    </div>
}