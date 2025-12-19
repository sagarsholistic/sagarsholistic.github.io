import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db, FIREBASE_ENABLED } from '../config/firebase';
import { PageContentType } from '../types/content.types';

export function usePageContent<T extends PageContentType>(pageId: string) {
  const [content, setContent] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchContent() {
      // If Firebase is not enabled, immediately return null (use fallback content)
      if (!FIREBASE_ENABLED || !db) {
        setContent(null);
        setLoading(false);
        return;
      }

      try {
        const docRef = doc(db, 'pageContent', pageId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setContent(docSnap.data() as T);
        } else {
          // No Firebase data exists - component will use hardcoded fallback
          setContent(null);
        }
      } catch (err) {
        console.error(`Error fetching content for ${pageId}:`, err);
        setError(err as Error);
        // On error, component will use hardcoded fallback
        setContent(null);
      } finally {
        setLoading(false);
      }
    }

    fetchContent();
  }, [pageId]);

  return { content, loading, error };
}
