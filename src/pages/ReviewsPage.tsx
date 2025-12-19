import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { db, FIREBASE_ENABLED } from '../config/firebase';
import { Review } from '../types/content.types';
import { StarRating } from '../components/StarRating';
import { Page } from '../fragment/components/Page';

export function ReviewsPage() {
  const navigate = useNavigate();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    async function fetchReviews() {
      // If Firebase is not enabled, skip fetching
      if (!FIREBASE_ENABLED || !db) {
        setLoading(false);
        return;
      }

      try {
        const q = query(
          collection(db, 'reviews'),
          where('isPublished', '==', true),
          orderBy('reviewDate', 'desc')
        );
        const querySnapshot = await getDocs(q);
        const reviewsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Review[];
        setReviews(reviewsData);
      } catch (error: any) {
        console.error('Error fetching reviews:', error);
        // Check if it's an index error
        if (error?.message?.includes('index')) {
          setError('Firestore index required. Check the browser console for a link to create the index, or contact your administrator.');
        } else {
          setError('Failed to load reviews. Please try again later.');
        }
      } finally {
        setLoading(false);
      }
    }

    fetchReviews();
  }, []);

  if (loading) {
    return (
      <Page title="Customer Reviews" path="reviews">
        <div style={{ textAlign: 'center', padding: '3rem', color: '#7f8c8d' }}>
          Loading reviews...
        </div>
      </Page>
    );
  }

  return (
    <Page title="Customer Reviews" path="reviews">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <button
          onClick={() => navigate('/')}
          style={{
            alignSelf: 'flex-start',
            padding: '0.75rem 1.5rem',
            background: '#80BC6A',
            color: 'white',
            border: 'none',
            borderRadius: 8,
            fontSize: '1rem',
            cursor: 'pointer',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            transition: 'background 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = '#6da858'}
          onMouseLeave={(e) => e.currentTarget.style.background = '#80BC6A'}
        >
          ← Back to Home
        </button>
        {error && (
          <div style={{
            padding: '1rem',
            background: '#fee',
            color: '#c33',
            borderRadius: 8,
            border: '1px solid #f5c6cb'
          }}>
            {error}
          </div>
        )}
        <p style={{ fontSize: '1.1rem', color: '#555', lineHeight: 1.6 }}>
          Read what our patients have to say about their experience with homeopathic treatment.
        </p>
        {reviews.map(review => (
          <div
            key={review.id}
            style={{
              background: 'white',
              padding: '1.5rem',
              borderRadius: 8,
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              border: '1px solid #e0e0e0'
            }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '1rem',
              gap: '1rem'
            }}>
              <h3 style={{ margin: 0, flex: 1, color: '#2c3e50', fontSize: '1.25rem' }}>
                {review.customerName}
              </h3>
              <StarRating rating={review.rating} />
            </div>
            <div
              style={{ lineHeight: 1.6, color: '#555' }}
              dangerouslySetInnerHTML={{ __html: review.reviewText }}
            />
            <div style={{
              marginTop: '1rem',
              fontSize: '0.9rem',
              color: '#7f8c8d'
            }}>
              {review.reviewDate.toDate().toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
          </div>
        ))}
        {reviews.length === 0 && !FIREBASE_ENABLED && (
          <div style={{
            textAlign: 'center',
            padding: '3rem',
            background: '#fff3cd',
            borderRadius: 8,
            border: '1px solid #ffeeba',
            color: '#856404'
          }}>
            <strong>⚠️ Offline Mode</strong>
            <p style={{ margin: '1rem 0 0 0' }}>
              Reviews are managed through Firebase. Set up Firebase to enable this feature.
            </p>
          </div>
        )}
        {reviews.length === 0 && FIREBASE_ENABLED && (
          <div style={{
            textAlign: 'center',
            padding: '3rem',
            color: '#7f8c8d',
            background: 'white',
            borderRadius: 8,
            border: '1px solid #e0e0e0'
          }}>
            No reviews available yet. Check back soon!
          </div>
        )}
      </div>
    </Page>
  );
}
