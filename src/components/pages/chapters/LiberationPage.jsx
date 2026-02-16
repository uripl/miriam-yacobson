import React, { useEffect } from 'react';
import ChapterNavBar from '../../common/ChapterNavBar';
import EditableText from '../../editable/EditableText';
import ChapterContent from '../../chapters/ChapterContent';
import '../../../styles/ChapterPage.css';

const LiberationPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="chapter-page">
      <header className="page-header">
        <div className="container">
          <EditableText contentKey="liberation-header-title" defaultValue="השחרור והחזרה לליון" as="h1" />
          <EditableText contentKey="liberation-header-subtitle" defaultValue="1945-1948" as="p" />
        </div>
      </header>

      <div className="container">
        <ChapterNavBar position="top" />

        <div className="chapter-content">
          <ChapterContent chapterId="liberation" />
          <ChapterNavBar position="bottom" />
        </div>
      </div>
    </div>
  );
};

export default LiberationPage;
