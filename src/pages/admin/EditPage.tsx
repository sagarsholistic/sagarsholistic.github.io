import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, setDoc, Timestamp } from 'firebase/firestore';
import { db, FIREBASE_ENABLED } from '../../config/firebase';
import { useAuth } from '../../contexts/AuthContext';
import { RichTextEditor } from '../../components/RichTextEditor';

export function EditPage() {
  const { pageId } = useParams<{ pageId: string }>();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [content, setContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    async function loadContent() {
      if (!pageId) return;

      try {
        const docRef = doc(db, 'pageContent', pageId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setContent(docSnap.data());
        } else {
          // Initialize with default structure
          setContent({
            id: pageId,
            sectionName: getPageName(pageId),
            content: getDefaultContentStructure(pageId),
            version: 0
          });
        }
      } catch (error) {
        console.error('Error loading content:', error);
        setMessage('Error loading content. Please try again.');
      } finally {
        setLoading(false);
      }
    }

    loadContent();
  }, [pageId]);

  const handleSave = async () => {
    if (!pageId || !currentUser) return;

    setSaving(true);
    setMessage('');

    // Demo mode: simulate save
    if (!FIREBASE_ENABLED || !db) {
      setTimeout(() => {
        setMessage('⚠️ Demo Mode: Changes simulated but not saved (Firebase not configured)');
        setSaving(false);
        setTimeout(() => setMessage(''), 5000);
      }, 500);
      return;
    }

    try {
      const docRef = doc(db, 'pageContent', pageId);
      await setDoc(docRef, {
        ...content,
        lastModified: Timestamp.now(),
        modifiedBy: currentUser.email,
        version: (content.version || 0) + 1
      });

      setMessage('Content saved successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Error saving content. Please try again.');
      console.error('Error saving content:', error);
    } finally {
      setSaving(false);
    }
  };

  const updateContentField = (path: string, value: any) => {
    setContent((prev: any) => ({
      ...prev,
      content: {
        ...prev.content,
        [path]: value
      }
    }));
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem' }}>
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem'
      }}>
        <h1 style={{ margin: 0, color: '#2c3e50' }}>
          Edit: {content?.sectionName || pageId}
        </h1>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button
            onClick={() => navigate('/admin')}
            style={{
              padding: '0.75rem 1.5rem',
              background: '#95a5a6',
              color: 'white',
              border: 'none',
              borderRadius: 4,
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: 600
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            style={{
              padding: '0.75rem 1.5rem',
              background: saving ? '#95a5a6' : '#27ae60',
              color: 'white',
              border: 'none',
              borderRadius: 4,
              cursor: saving ? 'not-allowed' : 'pointer',
              fontSize: '1rem',
              fontWeight: 600
            }}
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>

      {message && (
        <div style={{
          padding: '1rem',
          background: message.includes('Error') ? '#fee' : '#d4edda',
          color: message.includes('Error') ? '#c33' : '#155724',
          borderRadius: 4,
          marginBottom: '1rem',
          border: `1px solid ${message.includes('Error') ? '#f5c6cb' : '#c3e6cb'}`
        }}>
          {message}
        </div>
      )}

      <div style={{
        background: 'white',
        padding: '2rem',
        borderRadius: 8,
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <EditorForm
          pageId={pageId!}
          content={content}
          updateContentField={updateContentField}
        />
      </div>
    </div>
  );
}

function EditorForm({ pageId, content, updateContentField }: any) {
  if (!content || !content.content) return null;

  // Render editor based on page type
  if (pageId === 'banner') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#2c3e50' }}>
            Title
          </label>
          <input
            type="text"
            value={content.content.title || ''}
            onChange={(e) => updateContentField('title', e.target.value)}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #ddd',
              borderRadius: 4,
              fontSize: '1rem',
              boxSizing: 'border-box'
            }}
          />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#2c3e50' }}>
            Subtitle
          </label>
          <input
            type="text"
            value={content.content.subtitle || ''}
            onChange={(e) => updateContentField('subtitle', e.target.value)}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #ddd',
              borderRadius: 4,
              fontSize: '1rem',
              boxSizing: 'border-box'
            }}
          />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#2c3e50' }}>
            Doctor Name
          </label>
          <input
            type="text"
            value={content.content.doctorName || ''}
            onChange={(e) => updateContentField('doctorName', e.target.value)}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #ddd',
              borderRadius: 4,
              fontSize: '1rem',
              boxSizing: 'border-box'
            }}
          />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#2c3e50' }}>
            Credentials
          </label>
          <input
            type="text"
            value={content.content.credentials || ''}
            onChange={(e) => updateContentField('credentials', e.target.value)}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #ddd',
              borderRadius: 4,
              fontSize: '1rem',
              boxSizing: 'border-box'
            }}
          />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#2c3e50' }}>
            Email
          </label>
          <input
            type="email"
            value={content.content.email || ''}
            onChange={(e) => updateContentField('email', e.target.value)}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #ddd',
              borderRadius: 4,
              fontSize: '1rem',
              boxSizing: 'border-box'
            }}
          />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#2c3e50' }}>
            Phone
          </label>
          <input
            type="tel"
            value={content.content.phone || ''}
            onChange={(e) => updateContentField('phone', e.target.value)}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #ddd',
              borderRadius: 4,
              fontSize: '1rem',
              boxSizing: 'border-box'
            }}
          />
        </div>
      </div>
    );
  }

  // Generic rich text editor for pages with paragraphs/HTML content
  return (
    <div>
      <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#2c3e50' }}>
        Content
      </label>
      <p style={{ fontSize: '0.9rem', color: '#7f8c8d', marginBottom: '1rem' }}>
        Use the editor below to format your content with headers, bold, italic, lists, and links.
      </p>
      <RichTextEditor
        value={content.content.html || ''}
        onChange={(value) => updateContentField('html', value)}
        placeholder="Enter page content..."
      />
    </div>
  );
}

// Helper functions
function getPageName(pageId: string): string {
  const names: Record<string, string> = {
    banner: 'Banner',
    journey: 'My Journey',
    education: 'Education & License',
    conditionsTreated: 'Conditions Treated',
    firstConsultation: 'First Consultation',
    followUpConsultations: 'Follow-up Consultations',
    feePayment: 'Fee & Payment',
    whatIsHomeopathy: 'What is Homeopathy',
    appointment: 'Appointment',
    footer: 'Footer'
  };
  return names[pageId] || pageId;
}

function getDefaultContentStructure(pageId: string): any {
  if (pageId === 'banner') {
    return {
      title: 'SAGARS HOMEOPATHY FOR KIDS',
      subtitle: 'A Video Consultation Platform by,',
      doctorName: 'PADMINI SAGAR M.D. DABHM',
      credentials: 'Board Certified Pediatrician and Homeopath',
      email: 'pedsagar@gmail.com',
      phone: '410 953 9347'
    };
  }

  if (pageId === 'journey') {
    return {
      html: `<p>I am Dr. Padmini Sagar and I have been a practicing pediatrician for nearly 40 years. After practicing Pediatrics for 10+ years, I realized that Allopathic medicine is very good in treating acute, life threatening illnesses and trauma etc. but has no real cures for chronic diseases. I also observed that there was an alarming increase in the rate of ADHD, Autism, Behavioral disorders, Depression, and Asthma, etc. That is when I started my focus on other complementary modalities like Herbs, Ayurveda, yoga and Meditation but I was most impressed by HOMEOPATHY and its results. After studying Homeopathy at "National center for Homeopathy" for 2 summers, I enrolled myself with "New England School of Homeopathy" for in-depth study of Homeopathy for 2 years. I am continuing to study under Master Homeopaths, attending various seminars and conferences for the past 20+ years. It is a lifelong learning! Earlier, I had incorporated some Homeopathy in my conventional Pediatric Practice for chronic conditions, if parents were willing to try. I saw amazing results without the side effects. Now I would like to treat my Pediatric Patients exclusively with Homeopathy and Holistic approaches.</p><p>This is a Holistic Pediatric consultation only, not a primary care practice. Your child needs to have a primary care physician. The consultation is by Video visit only at this time.</p>`
    };
  }

  if (pageId === 'whatIsHomeopathy') {
    return {
      html: `<p>Homeopathy is a gentle and natural healing system of Medicine based on "Law of Similars" or "like Cures like". It means a substance which can cause symptoms when given in a large dose to a healthy person, can cure the same symptoms in a sick person when given in a highly diluted dose. This system of Medicine was developed and refined by German Physician - Chemist Dr. Samuel Hahnemann (1755 - 1843). One common example is when you cut an onion, your eyes water, burn, your nose run and itch. Allium Cepa, a homeopathic remedy made from red onion can help the same symptoms resulting from cold or allergies in a sick individual.</p><p>Homeopathy treats the whole person and produces a gentle cure without the side effects. It is highly individualized to the patient. The Remedies are made from Plants, Minerals or Animals in a very dilute concentrations (like nano concentration) which makes them effective but at the same time without the toxic side effects. Appropriately selected Homeopathic Remedy for the individual patient, works slowly but brings cure in chronic conditions. So please don't expect immediate results in hours/days. Although it works fast in acute conditions, it takes a few weeks to bring a cure in chronic conditions.</p><p>Our bodies have a tremendous power to heal and stay healthy. Sometimes our bodies go out of balance due to poor nutrition, bad lifestyle and sometimes by genetic predisposition. Due to this, the body is unable to heal itself and stay healthy. By focusing on child's nutrition, healthy lifestyle and using gentle remedies like Homeopathy, we can restore this balance and restore your child's health.</p>`
    };
  }

  if (pageId === 'firstConsultation') {
    return {
      html: `<p style="font-size: 1.6rem; font-weight: 400;">What to Expect</p><p>During the first consultation, I will be taking a complete history of your child starting from conception to the present. I will also need the child's vaccine history, lab results if there are any, food preferences, fears, sleep habits and also Family history. That way I can assess your child thoroughly and be able to figure out the appropriate Homeopathic remedy. The first consultation may take 1-2 hours. Be prepared for the time commitment.</p><p>After the consultation, the Remedy will be mailed to you in 1-2 weeks. In "Classic Homeopathy", only one dose of the Remedy is given to treat chronic conditions (there are some exceptions) and the patient is observed thereafter for 1-2 months for signs of improvement. Please keep a diary of changes in you child's symptoms for the next 2 months. I may also recommend dietary changes and some supplements if needed.</p><p>After your child takes the Remedy, you may notice one of the followings.</p><p><ol><li>Gradual improvement in most of the symptoms over a period of 4-8 weeks. Don't be alarmed if child's symptoms get worse temporarily or some old symptoms return. They will go away.</li><li>No changes at all in 8 weeks, your child may need a different Remedy</li><li>Since Homeopathic Remedies are extremely diluted, they do not have toxic effects</li></ol></p><p>Store the Remedy away from strong substances and electromagnetic fields like phone, microwave and computer etc.</p><p>I cannot guarantee cure in every patient but I will work with you to bring positive effects in your child's health.</p><p>This is a consultation practice only. Your child needs to have a Primary care Doctor for routine care.</p><p>Thank you in advance for giving me the opportunity to care for your child!.</p>`
    };
  }

  if (pageId === 'followUpConsultations') {
    return {
      html: `<h1 style="font-size: 1.6rem; font-weight: 400;">First Follow Up</h1><p>This takes place in 4-6 weeks. During the visit, I will assess whether your child has improved with the Remedy I prescribed. Please remember that the improvement is gradual over 4-6 weeks and continues even after that. The effect of one dose of the correctly chosen Remedy will last for weeks, months and sometimes years depending on the child and other factors. If your child definitely shows improvement, he/she will not need a further dose of the Remedy until the symptoms return. Please have your diary of the child's progress available at the time of follow up consultation. In case, your child does not show any improvement in the 6-8 weeks period, your child may need a different Remedy. I will analyze the case again, prescribe and follow him/her again in 4-6 weeks.</p><h1 style="font-size: 1.6rem; font-weight: 400;">Second and Further Follow Ups</h1><p>If your child continues to do well, no further dose is needed and I will follow your child every 2-6 months intervals. Sometimes Vaccines, Medications, Anesthesia, etc. may counteract the Homeopathic Remedy and child's symptoms will recur. If that happens or new problems develop please contact me and I will be happy to see your child and help.</p>`
    };
  }

  if (pageId === 'feePayment') {
    return {
      html: `<p style="font-weight: bold;">First appointment : 1 - 2 hours : $150</p><p>It includes 1st Follow up appointment at 4-6 weeks</p><p>Each Future Follow ups : $100</p><p>I do not accept Insurances, Medicaid or Medicare. Payment is expected at the time of service by credit card. If you have to cancel an appointment, you need to notify me 48 hours in advance, if not you will be charged a fee of $50.</p>`
    };
  }

  return { html: '' };
}
