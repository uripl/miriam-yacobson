import React, { useEffect } from 'react';
import ChapterNavBar from '../../common/ChapterNavBar';
import EditableText from '../../editable/EditableText';
import ChapterContent from '../../chapters/ChapterContent';
import '../../../styles/ChapterPage.css';

const FrancePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="chapter-page">
      <header className="page-header">
        <div className="container">
          <EditableText contentKey="france-header-title" defaultValue="צרפת תחת הכיבוש" as="h1" />
          <EditableText contentKey="france-header-subtitle" defaultValue="1940-1944" as="p" />
        </div>
      </header>

      <div className="container">
        <ChapterNavBar position="top" />

        <div className="chapter-content">
          <ChapterContent chapterId="france" />
          <ChapterNavBar position="bottom" />
        </div>
      </div>
    </div>
  );
};

export default FrancePage;
