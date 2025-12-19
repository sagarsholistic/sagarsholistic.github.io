import {Page} from "../components/Page.tsx";
import {P} from "../components/P";
import whatIsHomeoPathy from "./homeopathy-system.svg";
import {useViewportDimension} from "../useViewportDimension.ts";
import {usePageContent} from "../../hooks/usePageContent";
import {GenericPageContent} from "../../types/content.types";

export function WhatIsHomeopathy() {
    const {width} = useViewportDimension();
    const {content} = usePageContent<GenericPageContent>('whatIsHomeopathy');
    const imageSize = width > 800 ? 800 : `calc(${width}px - 0.5rem)`;

    const defaultContent = `<p>Homeopathy is a gentle and natural healing system of Medicine based on "Law of Similars" or "like Cures like". It means a substance which can cause symptoms when given in a large dose to a healthy person, can cure the same symptoms in a sick person when given in a highly diluted dose. This system of Medicine was developed and refined by German Physician - Chemist Dr. Samuel Hahnemann (1755 - 1843). One common example is when you cut an onion, your eyes water, burn, your nose run and itch. Allium Cepa, a homeopathic remedy made from red onion can help the same symptoms resulting from cold or allergies in a sick individual.</p><p>Homeopathy treats the whole person and produces a gentle cure without the side effects. It is highly individualized to the patient. The Remedies are made from Plants, Minerals or Animals in a very dilute concentrations (like nano concentration) which makes them effective but at the same time without the toxic side effects. Appropriately selected Homeopathic Remedy for the individual patient, works slowly but brings cure in chronic conditions. So please don't expect immediate results in hours/days. Although it works fast in acute conditions, it takes a few weeks to bring a cure in chronic conditions.</p><p>Our bodies have a tremendous power to heal and stay healthy. Sometimes our bodies go out of balance due to poor nutrition, bad lifestyle and sometimes by genetic predisposition. Due to this, the body is unable to heal itself and stay healthy. By focusing on child's nutrition, healthy lifestyle and using gentle remedies like Homeopathy, we can restore this balance and restore your child's health.</p>`;

    const htmlContent = content?.content.html || defaultContent;

    return <Page title={'What is Homeopathy ?'} path={'what-is-homeopathy'}>
        <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
        <P>
        <img width={imageSize} height={imageSize} src={whatIsHomeoPathy} alt={'Homeopathy image as described in homeopathy.org'}/>
        </P>
    </Page>
}