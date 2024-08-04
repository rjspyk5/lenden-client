import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import "./OptionCard.css";

export const OptionCard = ({ link, name, logo }) => {
  return (
    <Link to={link}>
      <Card>
        <CardActionArea>
          <CardContent className="flex justify-center p-15 flex-col  items-center">
            <img src={logo} alt="" />
            <Typography gutterBottom variant="h5" component="div">
              {name}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
};
