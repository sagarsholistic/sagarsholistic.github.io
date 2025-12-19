import {CSSProperties, HTMLProps, PropsWithChildren, useState} from "react";
import {useViewportDimension} from "../useViewportDimension.ts";
import {colors} from "../colors.ts";

const Li = (props: PropsWithChildren) => <li style={{
    margin: 0, listStyle: 'none', flexGrow: 1, padding: '0.5rem',
    justifyContent: 'center', textAlign: 'center'
}}>{props.children}</li>

const A = (props: HTMLProps<HTMLAnchorElement>) => <a {...props} style={{
    textDecoration: 'none',
    color: '#fff'
}}>{props.children}</a>

export function Menu() {
    const dimension = useViewportDimension();
    const ulStyle: CSSProperties = {display: 'flex', margin: 0, padding: 0, flexWrap: 'wrap',fontSize:'1rem'};
    const navStyle: CSSProperties = {background: '#80BC6A', boxShadow: '0 30px 30px -15px rgba(0,0,0,0.1) inset',position:'fixed',top:0,width:900,zIndex:1};
    const isMobile = dimension.width < 735;
    const [showMenu, setShowMenu] = useState(!isMobile);
    if (isMobile) {
        navStyle.position = 'fixed';
        navStyle.top = 0;
        navStyle.width = '100%';
        navStyle.zIndex = 1;
        navStyle.boxShadow = '0 30px 30px -15px rgba(0,0,0,0.1) inset, 0 10px 20px -10px rgba(0,0,0,0.5)'
        ulStyle.flexDirection = 'column';
    }
    if (!showMenu) {
        return <div style={{
            position: 'fixed',
            width: '1.5rem',
            top: '1rem',
            right: '1rem',
            zIndex: 1,
            display: 'flex',
            flexDirection: 'column'
        }} onClick={() => setShowMenu(true)}>
            <div style={{height: '0.3rem', backgroundColor: colors.primary, marginBottom: '0.2rem'}}></div>
            <div style={{height: '0.3rem', backgroundColor: colors.primary, marginBottom: '0.2rem'}}></div>
            <div style={{height: '0.3rem', backgroundColor: colors.primary, marginBottom: '0.2rem'}}></div>

        </div>
    }
    return <nav style={navStyle} >
        <ul style={ulStyle} onClick={() => {
            if (isMobile) {
                setShowMenu(false)
            }
        }}>
            <Li><A href={'#journey'}>Home</A></Li>
            <Li><A href={'#first-consultation'}>First Consultation</A></Li>
            <Li><A href={'#followup-consultations'}>Follow Up Consultation</A></Li>
            <Li><A href={'#conditions-treated'}>Services</A></Li>
            <Li><A href={'#fee-payment'}>Fees</A></Li>
            <Li><A href={'#what-is-homeopathy'}>What is Homeopathy</A></Li>
            <Li><A href={'#appointment'}>Contact</A></Li>
            <Li><A href={'/reviews'}>Reviews</A></Li>
        </ul>
    </nav>
}