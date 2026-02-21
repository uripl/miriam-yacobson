import { useEffect } from 'react';
import ChapterNavBar from '../../common/ChapterNavBar';
import EditableText from '../../editable/EditableText';
import ChapterContent from '../../chapters/ChapterContent';
import '../../../styles/ChapterPage.css';

const ChildhoodPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="chapter-page">
      <header className="page-header">
        <div className="container">
          <EditableText contentKey="childhood-header-title" defaultValue="ילדות וצעירות בגרמניה" as="h1" />
          <EditableText contentKey="childhood-header-subtitle" defaultValue="לייפציג 1925-1938" as="p" />
        </div>
      </header>

      <div className="container">
        <ChapterNavBar position="top" />

        <div className="chapter-content">
          <ChapterContent chapterId="childhood" />
          <ChapterNavBar position="bottom" />
        </div>
      </div>
    </div>
  );
};

export default ChildhoodPage;
