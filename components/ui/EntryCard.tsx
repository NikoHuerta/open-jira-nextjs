import { DragEvent, FC, useContext } from "react"
import { Card, CardActionArea, CardActions, CardContent, Typography } from "@mui/material"

import { Entry } from "../../interfaces"
import { UIContext } from "../../context/ui"

interface Props {
  entry: Entry
}

export const EntryCard:FC<Props> = ({ entry }) => {

  const { setIsDragging } = useContext(UIContext);

  const onDragStart = ( event: DragEvent<HTMLDivElement> ) => {
    event.dataTransfer.setData("text", entry._id);
    setIsDragging(true);
  }

  const onDragEnd = () => {
    setIsDragging(false);
  }

  return (
    <Card
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
          <Typography variant="body2">hace 30 minutos</Typography>
        </CardActions>
      </CardActionArea>
    </Card>

  )
}
