import { useState, useEffect } from 'react';

const useMedia = query => {
  const [matches, setMatches] = useState(null);

  useEffect(() => {
    const media = window && window.matchMedia && window.matchMedia(query);

    if (media.matches !== matches) {
      setMatches(media.matches);
    }

    const listener = () => setMatches(media.matches);
    media.addListener(listener);

    return () => media.removeListener(listener);
  }, [query, matches]);

  return matches;
};

export default useMedia;
