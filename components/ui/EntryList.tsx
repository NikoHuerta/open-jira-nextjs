
import { DragEvent, FC, useContext, useMemo } from "react";
import { List, Paper } from "@mui/material";

import { EntriesContext } from "../../context/entries";
import { UIContext } from "../../context/ui";

import { EntryStatus } from "../../interfaces";
import { EntryCard } from './EntryCard';

import styles from './EntryList.module.css';

interface Props {
    status: EntryStatus
}

export const EntryList:FC<Props> = ({ status }) => {

    const { entries, updateEntry } = useContext(EntriesContext);
    const { isDragging, setIsDragging } = useContext(UIContext);

    const entriesByStatus = useMemo(() => entries.filter(entry => entry.status === status) , [entries]);
     
    
    const allowDrop = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    }

    const onDropEntry = (event: DragEvent<HTMLDivElement>) => {
        const id = event.dataTransfer.getData("text");

        const entry = entries.find(entry => entry._id === id)!;   // !: force to get the entry --> never gonna fail
        entry.status = status;
        updateEntry(entry);
        setIsDragging(false);
    }

  return (
    //TODO: aqui haremos drop
    <div
        onDragOver={ allowDrop }
        onDrop={ onDropEntry }
        className={ isDragging ? styles.dragging : '' }
    >
        <Paper sx={{ 
                height: 'calc(100vh - 180px)', 
                overflow: 'scroll', 
                backgroundColor: 'transparent', 
                padding: '3px 5px',
                '&::-webkit-scrollbar': { display: 'none' }, 
        }}>

            {/* TODO: cambiara dependiendo si esta haciendo drag o no */}
            <List sx={{ opacity: isDragging ? 0.2 : 1, transition: 'all .3s' }}>
                {
                    entriesByStatus.map(entry => (
                        <EntryCard key={ entry._id } entry={ entry } />
                    ))
                }
                
            </List>
        </Paper>
    </div>
  )
}
