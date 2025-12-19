import { Menu } from "../fragment/menu/Menu";
import { Banner } from "../fragment/banner/Banner";
import { Journey } from "../fragment/journey/Journey";
import { Education } from "../fragment/education/Education";
import { ConditionsTreated } from "../fragment/conditions-treated/ConditionsTreated";
import { Appointment } from "../fragment/appointment/Appointment";
import { FirstConsultation } from "../fragment/first-consultation/FirstConsultation.tsx";
import { FollowUpConsultations } from "../fragment/followup-consultations/FollowUpConsultations.tsx";
import { FeePayment } from "../fragment/fee-payment/FeePayment.tsx";
import { WhatIsHomeopathy } from "../fragment/what-is-homeopathy/WhatIsHomeopathy.tsx";
import { Footer } from "../fragment/footer/Footer.tsx";
import { ProgressBar } from "../fragment/progress/ProgressBar.tsx";

export function PublicLayout() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', maxWidth: 900, margin: 'auto' }}>
      <ProgressBar />
      <Menu />
      <Banner />
      <Journey />
      <Education />
      <ConditionsTreated />
      <FirstConsultation />
      <FollowUpConsultations />
      <Appointment />
      <FeePayment />
      <WhatIsHomeopathy />
      <Footer />
    </div>
  );
}
