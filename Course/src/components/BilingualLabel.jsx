// Displays an { en, zh } field stacked as English / 中文, independent of the
// global language toggle — technical vocabulary and diagram labels stay
// bilingual on the graphic itself (spec §3).
export default function BilingualLabel({ field, as: Tag = "div", size = "md" }) {
  if (!field) return null;
  return (
    <Tag className={`bi-label bi-size-${size}`}>
      <span className="en">{field.en}</span>
      {field.zh && <span className="zh">{field.zh}</span>}
    </Tag>
  );
}
