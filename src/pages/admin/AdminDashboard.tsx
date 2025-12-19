import { Link } from 'react-router-dom';
import { PageMetadata } from '../../types/content.types';

const pages: PageMetadata[] = [
  { id: 'banner', name: 'Banner', description: 'Hero section with doctor information' },
  { id: 'journey', name: 'My Journey', description: 'Doctor biography and background' },
  { id: 'education', name: 'Education & License', description: 'Educational background and certifications' },
  { id: 'conditionsTreated', name: 'Conditions Treated', description: 'List of conditions and treatments' },
  { id: 'firstConsultation', name: 'First Consultation', description: 'Information about initial consultations' },
  { id: 'followUpConsultations', name: 'Follow-up Consultations', description: 'Follow-up consultation details' },
  { id: 'feePayment', name: 'Fee & Payment', description: 'Pricing and payment information' },
  { id: 'whatIsHomeopathy', name: 'What is Homeopathy', description: 'Homeopathy explanation' },
  { id: 'appointment', name: 'Appointment', description: 'Appointment scheduling information' },
  { id: 'footer', name: 'Footer', description: 'Footer content and links' }
];

export function AdminDashboard() {
  return (
    <div>
      <h1 style={{
        marginBottom: '0.5rem',
        color: '#2c3e50',
        fontSize: '2rem'
      }}>
        Content Management Dashboard
      </h1>
      <p style={{
        marginBottom: '2rem',
        color: '#7f8c8d',
        fontSize: '1rem'
      }}>
        Select a page to edit its content
      </p>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '1.5rem'
      }}>
        {pages.map(page => (
          <Link
            key={page.id}
            to={`/admin/edit/${page.id}`}
            style={{ textDecoration: 'none' }}
          >
            <div style={{
              background: 'white',
              padding: '1.5rem',
              borderRadius: 8,
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              transition: 'all 0.2s',
              cursor: 'pointer',
              height: '100%',
              border: '1px solid #e0e0e0'
            }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
              }}
            >
              <h3 style={{
                margin: '0 0 0.5rem 0',
                color: '#2c3e50',
                fontSize: '1.25rem',
                fontWeight: 600
              }}>
                {page.name}
              </h3>
              <p style={{
                margin: 0,
                color: '#7f8c8d',
                fontSize: '0.9rem',
                lineHeight: 1.5
              }}>
                {page.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
