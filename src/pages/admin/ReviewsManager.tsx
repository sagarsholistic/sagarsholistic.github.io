import { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, Timestamp, orderBy, query } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { useAuth } from '../../contexts/AuthContext';
import { Review } from '../../types/content.types';
import { RichTextEditor } from '../../components/RichTextEditor';
import { StarRating } from '../../components/StarRating';

export function ReviewsManager() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    loadReviews();
  }, []);

  async function loadReviews() {
    try {
      const q = query(collection(db!, 'reviews'), orderBy('reviewDate', 'desc'));
      const querySnapshot = await getDocs(q);
      const reviewsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Review[];
      setReviews(reviewsData);
    } catch (error) {
      console.error('Error loading reviews:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(reviewId: string) {
    if (!confirm('Are you sure you want to delete this review? This action cannot be undone.')) return;

    try {
      await deleteDoc(doc(db!, 'reviews', reviewId));
      setReviews(reviews.filter(r => r.id !== reviewId));
    } catch (error) {
      console.error('Error deleting review:', error);
      alert('Failed to delete review. Please try again.');
    }
  }

  async function handleTogglePublish(review: Review) {
    try {
      const reviewRef = doc(db!, 'reviews', review.id);
      await updateDoc(reviewRef, {
        isPublished: !review.isPublished,
        updatedAt: Timestamp.now()
      });
      setReviews(reviews.map(r =>
        r.id === review.id ? { ...r, isPublished: !r.isPublished } : r
      ));
    } catch (error) {
      console.error('Error updating review:', error);
      alert('Failed to update review. Please try again.');
    }
  }

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem' }}>
        Loading reviews...
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
        <div>
          <h1 style={{ margin: '0 0 0.5rem 0', color: '#2c3e50' }}>Manage Reviews</h1>
          <p style={{ margin: 0, color: '#7f8c8d' }}>
            {reviews.length} total review{reviews.length !== 1 ? 's' : ''}
          </p>
        </div>
        <button
          onClick={() => {
            setShowAddForm(true);
            setEditingReview(null);
          }}
          style={{
            padding: '0.75rem 1.5rem',
            background: '#27ae60',
            color: 'white',
            border: 'none',
            borderRadius: 4,
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: 600
          }}
        >
          Add New Review
        </button>
      </div>

      {(showAddForm || editingReview) && (
        <ReviewForm
          review={editingReview}
          onSave={() => {
            setShowAddForm(false);
            setEditingReview(null);
            loadReviews();
          }}
          onCancel={() => {
            setShowAddForm(false);
            setEditingReview(null);
          }}
        />
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
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
              justifyContent: 'space-between',
              alignItems: 'flex-start'
            }}>
              <div style={{ flex: 1 }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  marginBottom: '0.75rem'
                }}>
                  <h3 style={{ margin: 0, color: '#2c3e50' }}>{review.customerName}</h3>
                  <StarRating rating={review.rating} size={1} />
                  <span style={{
                    padding: '0.25rem 0.75rem',
                    borderRadius: 12,
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    background: review.isPublished ? '#d4edda' : '#f8d7da',
                    color: review.isPublished ? '#155724' : '#721c24'
                  }}>
                    {review.isPublished ? 'Published' : 'Draft'}
                  </span>
                </div>
                <div
                  style={{ marginBottom: '0.75rem', lineHeight: 1.6, color: '#555' }}
                  dangerouslySetInnerHTML={{ __html: review.reviewText }}
                />
                <div style={{ fontSize: '0.85rem', color: '#7f8c8d' }}>
                  {review.reviewDate.toDate().toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
              </div>
              <div style={{
                display: 'flex',
                gap: '0.5rem',
                marginLeft: '1rem',
                flexWrap: 'wrap'
              }}>
                <button
                  onClick={() => setEditingReview(review)}
                  style={{
                    padding: '0.5rem 1rem',
                    background: '#3498db',
                    color: 'white',
                    border: 'none',
                    borderRadius: 4,
                    cursor: 'pointer',
                    fontSize: '0.9rem'
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleTogglePublish(review)}
                  style={{
                    padding: '0.5rem 1rem',
                    background: review.isPublished ? '#95a5a6' : '#27ae60',
                    color: 'white',
                    border: 'none',
                    borderRadius: 4,
                    cursor: 'pointer',
                    fontSize: '0.9rem'
                  }}
                >
                  {review.isPublished ? 'Unpublish' : 'Publish'}
                </button>
                <button
                  onClick={() => handleDelete(review.id)}
                  style={{
                    padding: '0.5rem 1rem',
                    background: '#e74c3c',
                    color: 'white',
                    border: 'none',
                    borderRadius: 4,
                    cursor: 'pointer',
                    fontSize: '0.9rem'
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ReviewForm({ review, onSave, onCancel }: {
  review: Review | null;
  onSave: () => void;
  onCancel: () => void;
}) {
  const { currentUser } = useAuth();
  const [customerName, setCustomerName] = useState(review?.customerName || '');
  const [rating, setRating] = useState(review?.rating || 5);
  const [reviewText, setReviewText] = useState(review?.reviewText || '');
  const [isPublished, setIsPublished] = useState(review?.isPublished || false);
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    try {
      const reviewData = {
        customerName,
        rating,
        reviewText,
        isPublished,
        reviewDate: review?.reviewDate || Timestamp.now(),
        updatedAt: Timestamp.now(),
        createdBy: currentUser?.email || ''
      };

      if (review) {
        // Update existing
        await updateDoc(doc(db!, 'reviews', review.id), reviewData);
      } else {
        // Create new
        await addDoc(collection(db!, 'reviews'), {
          ...reviewData,
          createdAt: Timestamp.now()
        });
      }

      onSave();
    } catch (error) {
      console.error('Error saving review:', error);
      alert('Failed to save review. Please try again.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div style={{
      background: 'white',
      padding: '2rem',
      borderRadius: 8,
      marginBottom: '2rem',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      border: '1px solid #e0e0e0'
    }}>
      <h2 style={{ marginTop: 0, color: '#2c3e50' }}>
        {review ? 'Edit Review' : 'Add New Review'}
      </h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{
            display: 'block',
            marginBottom: '0.5rem',
            fontWeight: 600,
            color: '#2c3e50'
          }}>
            Customer Name *
          </label>
          <input
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #ddd',
              borderRadius: 4,
              fontSize: '1rem',
              boxSizing: 'border-box'
            }}
            placeholder="Enter customer name"
          />
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{
            display: 'block',
            marginBottom: '0.5rem',
            fontWeight: 600,
            color: '#2c3e50'
          }}>
            Rating *
          </label>
          <select
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            style={{
              padding: '0.75rem',
              border: '1px solid #ddd',
              borderRadius: 4,
              fontSize: '1rem'
            }}
          >
            {[1, 2, 3, 4, 5].map(r => (
              <option key={r} value={r}>{r} Star{r > 1 ? 's' : ''}</option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{
            display: 'block',
            marginBottom: '0.5rem',
            fontWeight: 600,
            color: '#2c3e50'
          }}>
            Review Text *
          </label>
          <RichTextEditor
            value={reviewText}
            onChange={setReviewText}
            placeholder="Enter review content..."
          />
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            cursor: 'pointer'
          }}>
            <input
              type="checkbox"
              checked={isPublished}
              onChange={(e) => setIsPublished(e.target.checked)}
              style={{ width: 18, height: 18, cursor: 'pointer' }}
            />
            <span style={{ fontWeight: 600, color: '#2c3e50' }}>
              Publish immediately
            </span>
          </label>
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <button
            type="submit"
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
            {saving ? 'Saving...' : 'Save Review'}
          </button>
          <button
            type="button"
            onClick={onCancel}
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
        </div>
      </form>
    </div>
  );
}
