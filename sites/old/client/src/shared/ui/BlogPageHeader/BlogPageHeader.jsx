import { Box } from "@mui/material";
import { NavigateBackButton } from "../NavigateButton";
import file from "../../assets/icons/interface/file.svg";
import {
    BlogPageHeaderIcon,
    BlogPageHeaderRoot,
    BlogPageHeaderSubtitle,
    BlogPageHeaderTitle,
} from "./BlogPageHeader.styles";

export const BlogPageHeader = ({ title = "Статті", subtitle }) => {
    return (
        <BlogPageHeaderRoot>
            <Box mr={{ xs: 1.5, md: 2.5 }}>
                <NavigateBackButton />
            </Box>
            <BlogPageHeaderIcon>
                <img src={file} alt="" />
            </BlogPageHeaderIcon>
            <Box>
                <BlogPageHeaderTitle>{title}</BlogPageHeaderTitle>
                {subtitle ? <BlogPageHeaderSubtitle>{subtitle}</BlogPageHeaderSubtitle> : null}
            </Box>
        </BlogPageHeaderRoot>
    );
};
