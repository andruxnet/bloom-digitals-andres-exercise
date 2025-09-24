import TechNewsCard from './TechNewsCard';

const TechNewsList = ({ stories, onStoryClick }) => {
  if (!stories || stories.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      {stories.map((story, index) => (
        <TechNewsCard
          key={story.id}
          story={story}
          index={index}
          onClick={onStoryClick}
        />
      ))}
    </div>
  );
};

export default TechNewsList;


