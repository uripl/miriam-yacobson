import { useEffect } from 'react';
import ChapterNavBar from '../../common/ChapterNavBar';
import EditableText from '../../editable/EditableText';
import ChapterContent from '../../chapters/ChapterContent';
import '../../../styles/ChapterPage.css';

const BelgiumPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="chapter-page">
      <header className="page-header">
        <div className="container">
          <EditableText contentKey="belgium-header-title" defaultValue="החיים בבלגיה" as="h1" />
          <EditableText contentKey="belgium-header-subtitle" defaultValue="1938-1940" as="p" />
        </div>
      </header>

      <div className="container">
        <ChapterNavBar position="top" />

        <div className="chapter-content">
          <ChapterContent chapterId="belgium" />
          <ChapterNavBar position="bottom" />
        </div>
      </div>
    </div>
  );
};

export default BelgiumPage;
