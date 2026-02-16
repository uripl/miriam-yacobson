import React, { useEffect } from 'react';
import ChapterNavBar from '../../common/ChapterNavBar';
import EditableText from '../../editable/EditableText';
import ChapterContent from '../../chapters/ChapterContent';
import '../../../styles/ChapterPage.css';

const ImmigrationPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="chapter-page">
      <header className="page-header">
        <div className="container">
          <EditableText contentKey="immigration-header-title" defaultValue="העלייה לישראל" as="h1" />
          <EditableText contentKey="immigration-header-subtitle" defaultValue="1948-1949" as="p" />
        </div>
      </header>

      <div className="container">
        <ChapterNavBar position="top" />

        <div className="chapter-content">
          <ChapterContent chapterId="immigration" />
          <ChapterNavBar position="bottom" />
        </div>
      </div>
    </div>
  );
};

export default ImmigrationPage;
