import {colors} from "../colors";
import {useViewportDimension} from "../useViewportDimension";
import {Page} from "../components/Page";
import {P} from "../components/P.tsx";
import {usePageContent} from "../../hooks/usePageContent";
import {GenericPageContent} from "../../types/content.types";

export function Education() {
    const dimension = useViewportDimension();
    const columnWidth = dimension.width < 700 ? '100%' : '50%';
    const hideBorder = dimension.width < 700;
    const {content} = usePageContent<GenericPageContent>('education');

    // If content from Firebase exists, render it as HTML
    if (content?.content.html) {
        return <Page title={'Education & License'} path={'education'}>
            <div dangerouslySetInnerHTML={{ __html: content.content.html }} />
        </Page>;
    }

    // Otherwise, render the original hardcoded structure
    return <Page title={'Education & License'} path={'education'}>
        <div style={{display: 'flex', flexWrap: 'wrap'}}>
            <div style={{display: 'flex', flexDirection: 'column', width: columnWidth}}>
                {educations.map(education => {
                    return <P style={{display: 'flex', flexDirection: 'column', margin: '1rem 0rem'}}
                                key={education.title}>
                        <h3 style={{margin: 0, padding: 0, fontWeight: 600}}>{education.title}</h3>
                        <div style={{fontWeight: 400}}>{education.year}</div>
                        <div style={{fontWeight: 500}}>{education.institution}</div>
                        <div>{education.city}</div>
                    </P>
                })}
            </div>
            <div style={{
                display: 'flex',
                flexDirection: "column",
                width: columnWidth,
                alignItems: hideBorder ? 'flex-start' : 'center',
                borderLeft: hideBorder ? 'none' : `1px solid ${colors.primary}`
            }}>
                <div style={{display: 'flex', flexDirection: 'column', marginLeft: hideBorder ? '0px' : '1rem'}}>
                    {certificationLicense.map(education => {
                        return <P style={{display: 'flex', flexDirection: 'column', margin: '1rem 0rem'}}
                                    key={education.title}>
                            <h3 style={{margin: 0, padding: 0}}>{education.title}</h3>
                            {education.contents.map(item => {
                                return <div key={item}>{item}</div>
                            })}
                        </P>
                    })}
                </div>
            </div>
        </div>
    </Page>
}

const educations: { title: string, year: string, institution: string, city: string }[] = [
    {
        title: 'Medical Degree - MBBS',
        year: '1971',
        institution: 'Vijayanagara Institute of Medical sciences',
        city: 'Bellary. India'
    },
    {
        title: 'Pediatric Residency',
        year: '1981 - 1984',
        institution: 'Rush Presbyterian St. Luke Medical Center',
        city: 'Chicago, IL'
    },
    {
        title: 'Homeopathic Education',
        year: '2000 - 2022',
        institution: 'New England School of Homeopathy',
        city: 'Connecticut, MA.'
    }
]
const certificationLicense: { title: string, contents: string[] }[] = [
    {
        title: 'Board Certification',
        contents: ['American Board of Pediatrics : 1986', 'Diploma American Board Of Homeopathic Medicine: 2022']
    },
    {title: 'Medical License', contents: ['State of Maryland']}
]