import React from 'react'
import ContentLoader from "react-content-loader"

const ProgrammCardSkeleton = () => {
    return (
        <ContentLoader
            speed={1}
            width={1170}
            height={80}
            // viewBox="0 0 218 280"
            backgroundColor="#3F4281"
            foregroundColor="#8588C8"
        // {...props}
        >
            <rect x="0" y="0" rx="5" ry="5" width="1170" height="54" />
        </ContentLoader>
    )
}

export default ProgrammCardSkeleton