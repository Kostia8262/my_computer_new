import React from 'react'
import ContentLoader from "react-content-loader"

const CourseSkeleton = () => {
    return (
        <ContentLoader
            speed={1}
            width={600}
            height={400}
            backgroundColor="#3F4281"
            foregroundColor="#8588C8"
        >
            <rect x="0" y="0" rx="2" ry="2" width="667" height="32" />
            <rect x="0" y="43" rx="2" ry="2" width="667" height="32" />
            <rect x="0" y="86" rx="2" ry="2" width="667" height="32" />
            <rect x="0" y="142" rx="2" ry="2" width="540" height="14" />
            <rect x="0" y="165" rx="2" ry="2" width="540" height="14" />
            <rect x="0" y="188" rx="2" ry="2" width="339" height="14" />
            <circle cx="14" cy="249" r="14" />
            <rect x="34" y="239" rx="2" ry="2" width="160" height="20" />
            <circle cx="234" cy="249" r="14" />
            <rect x="254" y="239" rx="2" ry="2" width="160" height="20" />
            <circle cx="454" cy="249" r="14" />
            <rect x="474" y="239" rx="2" ry="2" width="160" height="20" />
            <rect x="0" y="309" rx="10" ry="10" width="270" height="50" />
        </ContentLoader>
    )
}

export default CourseSkeleton