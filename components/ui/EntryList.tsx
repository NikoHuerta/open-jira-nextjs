
import { FC, useContext, useMemo } from "react";
import { List, Paper } from "@mui/material";

import { EntriesContext } from "../../context/entries";
import { EntryStatus } from "../../interfaces";
import { EntryCard } from './EntryCard';

interface Props {
    status: EntryStatus
}

export const EntryList:FC<Props> = ({ status }) => {

    const { entries } = useContext(EntriesContext);
    const entriesByStatus = useMemo(() => entries.filter(entry => entry.status === status) , [entries]);
        

  return (
    //TODO: aqui haremos drop
    <div>
        <Paper sx={{ 
                height: 'calc(100vh - 180px)', 
                overflow: 'scroll', 
                backgroundColor: 'transparent', 
                padding: '3px 5px',
                '&::-webkit-scrollbar': { display: 'none' }, 
        }}>
            {/* TODO: cambiara dependiendo si esta haciendo drag o no */}
            <List sx={{ opacity: 1 }}>
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
