import React, { useEffect } from 'react';
import ChapterNavBar from '../../common/ChapterNavBar';
import EditableText from '../../editable/EditableText';
import ChapterContent from '../../chapters/ChapterContent';
import '../../../styles/ChapterPage.css';

const HolocaustPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="chapter-page">
      <header className="page-header">
        <div className="container">
          <EditableText contentKey="holocaust-header-title" defaultValue="בעמק הבכא" as="h1" />
          <EditableText contentKey="holocaust-header-subtitle" defaultValue="1944-1945" as="p" />
        </div>
      </header>

      <div className="container">
        <ChapterNavBar position="top" />

        <div className="chapter-content">
          <ChapterContent chapterId="holocaust" />
          <ChapterNavBar position="bottom" />
        </div>
      </div>
    </div>
  );
};

export default HolocaustPage;
