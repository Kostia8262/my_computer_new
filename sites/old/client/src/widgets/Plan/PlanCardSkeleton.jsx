import React from "react"
import ContentLoader from "react-content-loader"

const PlanCardSkeleton = (props) => (
  <ContentLoader 
    speed={1}
    width={370}
    height={350}
    viewBox="0 0 370 350"
    backgroundColor="#3F4281"
    foregroundColor="#8588C8"
    {...props}
  >
    <rect x="0" y="0" rx="8" ry="8" width="370" height="270" />
    <rect x="0" y="290" rx="0" ry="0" width="370" height="18" />
    <rect x="0" y="325" rx="0" ry="0" width="220" height="20" />
  </ContentLoader>
)

export default PlanCardSkeleton