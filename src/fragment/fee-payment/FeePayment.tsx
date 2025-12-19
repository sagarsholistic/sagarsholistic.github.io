import {Page} from "../components/Page.tsx";
import {usePageContent} from "../../hooks/usePageContent";
import {GenericPageContent} from "../../types/content.types";

export function FeePayment() {
    const {content} = usePageContent<GenericPageContent>('feePayment');

    const defaultContent = `<p style="font-weight: bold;">First appointment : 1 - 2 hours : $150</p><p>It includes 1st Follow up appointment at 4-6 weeks</p><p>Each Future Follow ups : $100</p><p>I do not accept Insurances, Medicaid or Medicare. Payment is expected at the time of service by credit card. If you have to cancel an appointment, you need to notify me 48 hours in advance, if not you will be charged a fee of $50.</p>`;

    const htmlContent = content?.content.html || defaultContent;

    return <Page title={'Fees & Payment'} path={'fee-payment'}>
        <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
    </Page>
}