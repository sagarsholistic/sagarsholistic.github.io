import logo from "./logo.svg";
import {colors} from "../colors";
import {motion} from "framer-motion";
import {usePageContent} from "../../hooks/usePageContent";
import {BannerContent} from "../../types/content.types";

export function Banner(){
    const {content} = usePageContent<BannerContent>('banner');

    // Use Firebase content if available, otherwise use hardcoded defaults
    const title = content?.content.title || 'SAGARS HOMEOPATHY FOR KIDS';
    const subtitle = content?.content.subtitle || 'A Video Consultation Platform by,';
    const doctorName = content?.content.doctorName || 'PADMINI SAGAR M.D. DABHM';
    const credentials = content?.content.credentials || 'Board Certified Pediatrician and Homeopath';
    const email = content?.content.email || 'pedsagar@gmail.com';
    const phone = content?.content.phone || '410 953 9347';

    return <div style={{display:'flex',flexDirection:'column',alignItems:'center',padding:'3rem 1rem',boxShadow:'0 15rem 70rem -5rem rgba(255,255,255,0.3) inset',color:'rgba(255,255,255,0.8)',textAlign:'center',minHeight:'80vh',background:'linear-gradient(180deg, rgba(206,243,199,1) 0%, rgba(16,64,83,1) 130%)'}}>
        <motion.img width={300} height={300} src={logo} alt={'Logo image'} initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.05,duration:0.5}}/>
        <motion.h1 style={{fontFamily:'Tenor Sans',letterSpacing:'0.1rem',margin:'3rem 0',color:colors.second}} initial={{opacity:0,y:100}} animate={{opacity:1,y:0}} transition={{delay:0.1,duration:0.5}}>{title}</motion.h1>
        <motion.h3 style={{fontWeight:300,margin:0,padding:0,fontSize:'0.9rem',letterSpacing:'0.15rem'}} initial={{opacity:0,y:100}} animate={{opacity:1,y:0}} transition={{delay:0.15,duration:0.5}}>{subtitle}</motion.h3>
        <motion.h2 style={{fontWeight:300,fontSize:'1.6rem',margin:'0.5rem',padding:0}} initial={{opacity:0,y:100}} animate={{opacity:1,y:0}} transition={{delay:0.2,duration:0.5}}>{doctorName}</motion.h2>
        <motion.h3 style={{fontWeight:400,fontStyle:'italic',margin:0,padding:0,fontSize:'1rem'}} initial={{opacity:0,y:100}} animate={{opacity:1,y:0}} transition={{delay:0.25,duration:0.5}}>{credentials}</motion.h3>
        <motion.h3 style={{fontWeight:400,margin:'1rem 0 0 0',padding:0,fontSize:'1rem'}} initial={{opacity:0,y:100}} animate={{opacity:1,y:0}} transition={{delay:0.3,duration:0.5}}>{email}</motion.h3>
        <motion.h3 style={{fontWeight:400,margin:0,padding:0,fontSize:'1.2rem',wordSpacing:'0.10rem',letterSpacing:'0.18rem'}} initial={{opacity:0,y:100}} animate={{opacity:1,y:0}} transition={{delay:0.35,duration:0.5}}>{phone}</motion.h3>
    </div>
}