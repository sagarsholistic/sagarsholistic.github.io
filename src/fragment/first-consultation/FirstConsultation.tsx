import {Page} from "../components/Page.tsx";
import {usePageContent} from "../../hooks/usePageContent";
import {GenericPageContent} from "../../types/content.types";

export function FirstConsultation() {
    const {content} = usePageContent<GenericPageContent>('firstConsultation');

    const defaultContent = `<p style="font-size: 1.6rem; font-weight: 400;">What to Expect</p><p>During the first consultation, I will be taking a complete history of your child starting from conception to the present. I will also need the child's vaccine history, lab results if there are any, food preferences, fears, sleep habits and also Family history. That way I can assess your child thoroughly and be able to figure out the appropriate Homeopathic remedy. The first consultation may take 1-2 hours. Be prepared for the time commitment.</p><p>After the consultation, the Remedy will be mailed to you in 1-2 weeks. In "Classic Homeopathy", only one dose of the Remedy is given to treat chronic conditions (there are some exceptions) and the patient is observed thereafter for 1-2 months for signs of improvement. Please keep a diary of changes in you child's symptoms for the next 2 months. I may also recommend dietary changes and some supplements if needed.</p><p>After your child takes the Remedy, you may notice one of the followings.</p><p><ol><li>Gradual improvement in most of the symptoms over a period of 4-8 weeks. Don't be alarmed if child's symptoms get worse temporarily or some old symptoms return. They will go away.</li><li>No changes at all in 8 weeks, your child may need a different Remedy</li><li>Since Homeopathic Remedies are extremely diluted, they do not have toxic effects</li></ol></p><p>Store the Remedy away from strong substances and electromagnetic fields like phone, microwave and computer etc.</p><p>I cannot guarantee cure in every patient but I will work with you to bring positive effects in your child's health.</p><p>This is a consultation practice only. Your child needs to have a Primary care Doctor for routine care.</p><p>Thank you in advance for giving me the opportunity to care for your child!.</p>`;

    const htmlContent = content?.content.html || defaultContent;

    return <Page title={"First Consultation"} path={'first-consultation'}>
        <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
    </Page>
}