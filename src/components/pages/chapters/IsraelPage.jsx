import { useEffect } from 'react';
import ChapterNavBar from '../../common/ChapterNavBar';
import EditableText from '../../editable/EditableText';
import ChapterContent from '../../chapters/ChapterContent';
import '../../../styles/ChapterPage.css';

const IsraelPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="chapter-page">
      <header className="page-header">
        <div className="container">
          <EditableText contentKey="israel-header-title" defaultValue="חיים בארץ ישראל" as="h1" />
          <EditableText contentKey="israel-header-subtitle" defaultValue="1949-2023" as="p" />
        </div>
      </header>

      <div className="container">
        <ChapterNavBar position="top" />

        <div className="chapter-content">
          <ChapterContent chapterId="israel" />
          <ChapterNavBar position="bottom" />
        </div>
      </div>
    </div>
  );
};

export default IsraelPage;
