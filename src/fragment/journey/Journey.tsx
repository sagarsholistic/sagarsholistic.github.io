import drSagar from "./dr-sagar-photo.png";
import {useViewportDimension} from "../useViewportDimension";
import {CSSProperties} from "react";
import {Page} from "../components/Page";
import {usePageContent} from "../../hooks/usePageContent";
import {GenericPageContent} from "../../types/content.types";

export function Journey() {
    const dimension = useViewportDimension();
    const {content} = usePageContent<GenericPageContent>('journey');

    const sectionStyle: CSSProperties = {};
    const imageStyle: CSSProperties = {float: 'right', marginLeft: '1rem', marginBottom: '1rem'};

    if (dimension.width < 735) {
        sectionStyle.display = 'flex';
        sectionStyle.flexDirection = 'column';
        sectionStyle.alignItems = 'center';
        imageStyle.marginLeft = 'unset';
        imageStyle.margin = 'auto';
        imageStyle.display = 'flex';
        imageStyle.justifyContent = 'center';
        delete imageStyle.float;
    }

    // Default hardcoded content as fallback
    const defaultContent = `<p>I am Dr. Padmini Sagar and I have been a practicing pediatrician for nearly 40 years. After practicing Pediatrics for 10+ years, I realized that Allopathic medicine is very good in treating acute, life threatening illnesses and trauma etc. but has no real cures for chronic diseases. I also observed that there was an alarming increase in the rate of ADHD, Autism, Behavioral disorders, Depression, and Asthma, etc. That is when I started my focus on other complementary modalities like Herbs, Ayurveda, yoga and Meditation but I was most impressed by HOMEOPATHY and its results. After studying Homeopathy at "National center for Homeopathy" for 2 summers, I enrolled myself with "New England School of Homeopathy" for in-depth study of Homeopathy for 2 years. I am continuing to study under Master Homeopaths, attending various seminars and conferences for the past 20+ years. It is a lifelong learning! Earlier, I had incorporated some Homeopathy in my conventional Pediatric Practice for chronic conditions, if parents were willing to try. I saw amazing results without the side effects. Now I would like to treat my Pediatric Patients exclusively with Homeopathy and Holistic approaches.</p><p>This is a Holistic Pediatric consultation only, not a primary care practice. Your child needs to have a primary care physician. The consultation is by Video visit only at this time.</p>`;

    const htmlContent = content?.content.html || defaultContent;

    return <Page title={'My Journey'} path={'journey'}>
            <div style={imageStyle}>
                <img src={drSagar} width={270} height={400}  alt={'Dr Sagar profile picture'} />
            </div>
            <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
    </Page>
}
