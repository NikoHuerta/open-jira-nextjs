import { DragEvent, FC, useContext } from "react";
import { useRouter } from "next/router";
import { Card, CardActionArea, CardActions, CardContent, Typography } from "@mui/material";

import { dateFunctions } from "../../utils";

import { Entry } from "../../interfaces";
import { UIContext } from "../../context/ui";

interface Props {
  entry: Entry
}

export const EntryCard:FC<Props> = ({ entry }) => {

  const { setIsDragging } = useContext(UIContext);
  const router = useRouter();

  const onDragStart = ( event: DragEvent<HTMLDivElement> ) => {
    event.dataTransfer.setData("text", entry._id);
    setIsDragging(true);
  }

  const onDragEnd = () => {
    setIsDragging(false);
  }

  const onClick = () => {
    router.push(`/entries/${ entry._id }`);
  }

  return (
    <Card
      onClick={ onClick }
      sx = {{ marginBottom: 1 }}
      //Eventos de drag and drop
      draggable
      onDragStart={ onDragStart }
      onDragEnd={ onDragEnd }

    >
      <CardActionArea>
        <CardContent>
          <Typography sx={{ whiteSpace: 'pre-line' }}>{ entry.status +': ' + entry.description }</Typography>
        </CardContent>
        <CardActions sx={{ display: 'flex', justifyContent: 'end', páddingRight: 2 }}>
          <Typography variant="body2">{ dateFunctions.getFormatDistanceToNow( entry.createdAt ) }</Typography>
        </CardActions>
      </CardActionArea>
    </Card>

  )
}
