import { Typography } from "@mui/material";
import { PostdMetaRoot } from "./PostMeta.styles";

import calendar from "../../assets/icons/interface/calendar.svg";
import clock from "../../assets/icons/interface/time.svg";

export const PostMeta = ({ date, time, color, fontSize }) => {
    return (
        <PostdMetaRoot color={color} fontSize={fontSize}>
                <img src={calendar} alt="" />
            <Typography color="inherit" fontSize="inherit">
                {date}
            </Typography>
                <img src={clock} alt="" />
            <Typography color="inherit" fontSize="inherit">
                {time}
            </Typography>
        </PostdMetaRoot>
    );
}