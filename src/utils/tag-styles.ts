import projectTagsConfig from '../json_data/tag_configs/project_tags.json';
import statusTagsConfig from '../json_data/tag_configs/status_tags.json';

type TagConfig = {
  background: string;
  text: string;
};

type TagConfigMap = {
  [key: string]: TagConfig;
};

export const getTagStyle = (tag: string): TagConfig => {
  const tagConfig = (projectTagsConfig.tags as TagConfigMap)[tag];
  return (
    tagConfig || {
      background: "#E5E7EB",
      text: "#374151",
    }
  );
};

export const getStatusStyle = (status: string): TagConfig => {
  const statusConfig = (statusTagsConfig.statuses as TagConfigMap)[status];
  return (
    statusConfig || {
      background: "#E5E7EB",
      text: "#374151",
    }
  );
}; 