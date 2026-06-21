import React from "react"
import ContentLoader from "react-content-loader"

const CourseCardSkeleton = (props) => (
  <ContentLoader 
    speed={2}
    width={218}
    height={280}
    viewBox="0 0 218 280"
    backgroundColor="#3F4281"
    foregroundColor="#8588C8"
    {...props}
  >
    <rect x="0" y="0" rx="8" ry="8" width="218" height="200" />
    <rect x="0" y="220" rx="0" ry="0" width="218" height="18" />
    <rect x="0" y="255" rx="0" ry="0" width="120" height="20" />
  </ContentLoader>
)

export default CourseCardSkeleton