ALTER TABLE reviews ADD CONSTRAINT ratings_range CHECK (rating BETWEEN 0 AND 5);
