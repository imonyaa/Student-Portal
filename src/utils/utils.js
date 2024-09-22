const colors = [
  "bg-[#c3e0e8]",
  "bg-[#c4c3e8]",
  "bg-[#d6c3e8]",
  "bg-[#e5c3e8]",
  "bg-[#e8c3df]",
  "bg-[#e8c3d2]",
  "bg-[#e8c3c3]",
  "bg-[#e8d4c3]",
  "bg-[#e7e8c3]",
  "bg-[#cbe8c3]",
  "bg-[#c3e8dd]",
];
export const getCourseColor = (courseTitle) => {
  const titleLength = courseTitle.length % colors.length;
  return colors[titleLength];
};
