import {Page} from "../components/Page";
import {
    ButtonHTMLAttributes, CSSProperties,
    InputHTMLAttributes,
    PropsWithChildren,
    TextareaHTMLAttributes, useId, useRef
} from "react";
import {colors} from "../colors";
import {P} from "../components/P.tsx";
import {usePageContent} from "../../hooks/usePageContent";
import {GenericPageContent} from "../../types/content.types";

const Input = (properties: PropsWithChildren<InputHTMLAttributes<HTMLInputElement> & {
    containerStyle?: CSSProperties
}>) => {
    const {containerStyle, ...props} = properties;
    return <label style={{display: 'flex', flexDirection: 'column', ...containerStyle}}>
        <div style={{fontSize: '0.9rem', paddingLeft: '0.5rem'}}>{props.title}</div>
        <input {...props} style={{
            border: '1px solid rgba(0,0,0,0.1)',
            background: 'rgba(255,255,255,0.5)',
            padding: '0.7rem 0.5rem',
            fontSize: '1rem',
            color: '#333',
            width: '100%', ...props.style
        }}/>
    </label>
}

const Button = (props: PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>) => {
    return <button {...props} style={{
        border: 'none',
        background: 'rgba(255,255,255,0.5)',
        padding: '0.7rem 0.5rem',
        fontSize: '1.2rem',
        color: '#fff',
        width: '100%',
        backgroundColor: colors.second, ...props.style
    }}>{props.children}</button>
}
const TextArea = (properties: PropsWithChildren<TextareaHTMLAttributes<HTMLTextAreaElement> & {
    containerStyle?: CSSProperties
}>) => {
    const {containerStyle, ...props} = properties;
    return <label style={{display: 'flex', flexDirection: 'column', ...containerStyle}}>
        <div style={{fontSize: '0.9rem', paddingLeft: '0.5rem'}}>{props.title}</div>
        <textarea {...props} style={{
            border: '1px solid rgba(0,0,0,0.1)',
            background: 'rgba(255,255,255,0.5)',
            padding: '0.7rem 0.5rem',
            fontSize: '1rem',
            color: '#333',
            width: '100%', ...props.style
        }}>{props.children}</textarea>
    </label>
}

type Customer = { name: string, email: string, phone: string, childName: string, childDoB: string, message: string,address:string };

export function Appointment() {
    const id = useId();
    const triggeredButtonRef = useRef<'email' | 'phone' | 'sms'>('email');
    const {content} = usePageContent<GenericPageContent>('appointment');

    const introText = content?.content.html || `<p>Please message me briefly about your child's problems, what treatment he/she has received and what you expect from the consultation. I will be able to decide whether your child would benefit from Homeopathy or not and then I will offer your child possible appointment dates / times.</p><p>Use the contact form below to reach out to me.</p>`;

    function sendEmail(props: Customer) {
        const a = document.createElement('a');
        const title = `From ${props.name} parents of ${props.childName}`;
        const message = `
Parent\t: ${props.name}
Child\t: ${props.childName} 
DoB\t\t: (${props.childDoB} / ${calculateAge(new Date(props.childDoB))}) 
Email\t: ${props.email} 
Phone\t: ${props.phone}
Address\t: ${props.address}

Message\t: ${props.message}
`;
        const href = `mailto:pedsagar@gmail.com?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(message)}`;
        const linkId = `mail-${id}`;
        a.setAttribute('id', linkId);
        a.setAttribute('href', href);
        document.body.appendChild(a);
        const linkElement = document.getElementById(linkId)!;
        linkElement.click();
        linkElement.remove();
    }

    function sendSms(props: Customer) {
        const a = document.createElement('a');
        const message = `Parent : ${props.name}
Child  : ${props.childName} 
DoB    : (${props.childDoB} / ${calculateAge(new Date(props.childDoB))}) 
Email  : ${props.email} 
Phone  : ${props.phone}

${props.message}
`;
        const href = `sms:+14109539347?body=${encodeURIComponent(message)}`;
        const linkId = `sms-${id}`;
        a.setAttribute('id', linkId);
        a.setAttribute('href', href);
        document.body.appendChild(a);
        const linkElement = document.getElementById(linkId)!;
        linkElement.click();
        linkElement.remove();
    }

    function sendWhatsApp(props: Customer) {
        const a = document.createElement('a');

        const message = `Parent : ${props.name}
Child  : ${props.childName} 
DoB    : (${props.childDoB} / ${calculateAge(new Date(props.childDoB))}) 
Email  : ${props.email} 
Phone  : ${props.phone}

${props.message}
`;
        const href = `https://wa.me/+14109539347?text=${encodeURIComponent(message)}`;
        const linkId = `wa-${id}`;
        a.setAttribute('id', linkId);
        a.setAttribute('href', href);
        document.body.appendChild(a);
        const linkElement = document.getElementById(linkId)!;
        linkElement.click();
        linkElement.remove();
    }

    return <Page title={'Appointment'} path={'appointment'} stickyHeader={false}>
        <div dangerouslySetInnerHTML={{ __html: introText }} style={{ marginBottom: '1rem' }} />
        <P>
        <form style={{display: 'flex', flexDirection: 'column', padding: '1rem 0rem'}} onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            const trigger = triggeredButtonRef.current;
            const form = e.currentTarget as HTMLFormElement;

            const getValue = (key: string): string => {
                const element = form.elements.namedItem(key);
                if (element instanceof HTMLInputElement) {
                    return element.value;
                }
                if (element instanceof HTMLTextAreaElement) {
                    return element.value;
                }
                return '';

            };

            const customer: Customer = {
                name: toPascalCase(getValue('name')),
                childDoB: getValue('childDob'),
                childName: toPascalCase(getValue('childName')),
                email: getValue('email'),
                message: getValue('message'),
                phone: getValue('phone'),
                address:toPascalCase(getValue('address'))
            }

            if (trigger === 'email') {
                sendEmail(customer)
            }
            if (trigger === 'sms') {
                sendSms(customer)
            }
            if (trigger === 'phone') {
                sendWhatsApp(customer)
            }
            return false;
        }} action={'#'} id={`${id}-form`}>
            <div style={{display: 'flex', flexDirection: 'row',gap:'1rem'}}>
                <Input name={'name'} required={true} title={'Name'}
                       containerStyle={{width:'50%', marginBottom: '1rem'}} placeholder={'Enter your name'}/>
                <Input name={'email'} required={true} type={'email'} inputMode={"email"}
                       containerStyle={{width:'50%', marginBottom: '1rem'}} title={'Email'}
                       placeholder={'Email'}/>
            </div>

            <div style={{display: 'flex', flexDirection: 'row',gap:'1rem'}}>
                <Input name={'phone'} required={true} type={'tel'} inputMode={'tel'}
                       containerStyle={{width:'50%', marginBottom: '1rem'}} title={'Phone'}
                       placeholder={'Phone'}/>
                <Input name={'address'} required={true} type={'text'} inputMode={'text'}
                       containerStyle={{width:'50%', marginBottom: '1rem'}} title={"Address"} placeholder={'Enter your address'}/>
            </div>

            <Input name={'childName'} required={true} type={'text'} inputMode={'text'} style={{marginBottom: '1rem'}}
                   title={"Child's Name"} placeholder={'Enter the child\'s name'}/>
            <Input name={'childDob'} required={true} type={'date'} inputMode={'text'} style={{marginBottom: '1rem'}}
                   title={"Child's Date of Birth"} placeholder={'Select a date'}/>
            <TextArea name={'message'} required={true} inputMode={'text'}
                      style={{marginBottom: '1rem', height: '10rem'}} title={'Message'}
                      placeholder={'What is ailing your child ?'}/>
            <Button style={{marginRight: '1rem'}} onClick={() => triggeredButtonRef.current = 'email'}>Send</Button>
            {/*<div style={{display: 'flex', flexDirection: 'row'}}>*/}
            {/*    <Button style={{marginRight: '1rem'}} onClick={() => triggeredButtonRef.current = 'email'}>Email</Button>*/}
            {/*    <Button onClick={() => triggeredButtonRef.current = 'sms'}>SMS</Button>*/}
            {/*    <Button style={{marginLeft: '1rem'}} onClick={() => triggeredButtonRef.current = 'phone'}>Whats App</Button>*/}
            {/*</div>*/}

        </form>
        </P>
    </Page>
}

function calculateAge(dob: Date) {
    const today = new Date();
    const yearDiff = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();
    const dayDiff = today.getDate() - dob.getDate();

    let age: number | string;

    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
        age = yearDiff - 1;
    } else {
        age = yearDiff;
    }
    if(age < 0 ){
        return ''
    }
    if (age === 0) {
        const monthCount = (today.getFullYear() - dob.getFullYear()) * 12 + today.getMonth() - dob.getMonth();
        age = monthCount.toString() + ' month'+(monthCount>1?`'s`:'');
    } else {
        age = age.toString() + ' year'+(age > 1 ?`'s`:'');
    }
    return age;
}

function toPascalCase(sentence:string) {
    // Split the sentence into words
    const words = sentence.split(/\s+/);
    // Capitalize the first letter of each word and concatenate them
    const pascalCaseResult = words.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join('');
    return pascalCaseResult;
}