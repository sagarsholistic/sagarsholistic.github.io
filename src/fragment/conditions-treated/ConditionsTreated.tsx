import {Page} from "../components/Page";
import adhd from "./adhd.png";
import arthritis from "./arthritis.png";
import asthma from "./asthma.png";
import bowel from "./bowel.png";
import earInfections from "./ear-infections.png";
import eczema from "./eczema.png";
import growth from "./growth.png";
import injury from "./injury.png";
import {PropsWithChildren, useRef} from "react";
import {usePageContent} from "../../hooks/usePageContent";
import {GenericPageContent} from "../../types/content.types";

const conditions: { title: string, image: string, details: string[] }[] = [
    {
        title: 'Mental health problems',
        image: adhd,
        details: ['ADD,ADHD', 'Anxiety', 'Autism spectrum disorders', 'Behavioral problems', 'Depression', 'Developmental Delays']
    },
    {title: 'Allergies and Asthma', image: asthma, details: []},
    {
        title: 'Frequent Infections',
        image: earInfections,
        details: ['Ear infections', 'Tonsillitis', 'Sinusitis', 'Bronchitis & Pneumonia']
    },
    {title: 'Eczema & other Skin problems', image: eczema, details: []},
    {title: 'Bowel problems', image: bowel, details: []},
    {title: 'Arthritis', image: arthritis, details: []},
    {title: 'Injuries and its complications', image: injury, details: []},
    {title: 'Growth Problems', image: growth, details: []}
];


function ConditionsTreatedIcon(props:PropsWithChildren<{condition: { title: string; image: string; details: string[] }}>) {
    const ref = useRef(null);
    const {condition} = props;
    return <>
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 133,
            height: 133,
            borderRadius: '10rem',
            overflow: 'hidden'
        }} ref={ref}>
            <img src={condition.image} height={133.6} width={200} alt={condition.title} />
        </div>
        <div style={{fontWeight: 600, fontSize: '0.9rem', marginTop: '1rem'}}>{condition.title}</div>
        <div style={{
            fontSize: '0.8rem',
            textAlign: 'left',
            display: 'flex',
            flexDirection: 'column',
            marginLeft: 20
        }}>{condition.details.map(condition => {
            return <div key={condition}>{condition}</div>
        })}</div>
    </>;
}

export function ConditionsTreated() {
    const {content} = usePageContent<GenericPageContent>('conditionsTreated');

    // If content from Firebase exists, render it as HTML
    if (content?.content.html) {
        return <Page title={'Conditions Treated'} path={'conditions-treated'}>
            <div dangerouslySetInnerHTML={{ __html: content.content.html }} />
        </Page>;
    }

    // Otherwise, render the original hardcoded structure with icons
    return <Page title={'Conditions Treated'} path={'conditions-treated'}>
        <div style={{display: 'flex', flexWrap: 'wrap',justifyContent:'center'}}>
            {conditions.map((condition) => {
                return <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    margin: '1rem',
                    width: 130,
                    alignItems: 'center',
                    textAlign: 'center',
                    flexGrow: 1,
                    flexShrink: 0
                }} key={condition.title}  >
                    <ConditionsTreatedIcon condition={condition} />
                </div>
            })}
        </div>
    </Page>
}