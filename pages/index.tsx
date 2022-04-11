import type { NextPage } from 'next';
import { Card, CardContent, CardHeader, Grid, Typography } from '@mui/material';

import { Layout } from '../components/layouts';

import { EntryList } from '../components/ui/EntryList';



const HomePage: NextPage = () => {
  return (
    <Layout title='Home - OpenJira'>
      {/* <Typography variant='h1' color='primary' >Hola Mundo</Typography> */}
      <Grid container spacing={ 2 }>
        
        <Grid item xs={ 12 } sm={ 4 } >
          <Card sx={{ height: 'calc( 100vh - 100px )' }}>
            <CardHeader title="Pendientes" />
            <CardContent>
              <EntryList status='pending'/>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={ 12 } sm={ 4 } >
          <Card sx={{ height: 'calc( 100vh - 100px )' }}>
            <CardHeader title="En Progreso" />
            <CardContent>
              { /* Agregar entradas */ }
              <EntryList status='in-progress'/>
            </CardContent>
           
          </Card>
        </Grid>

        <Grid item xs={ 12 } sm={ 4 } >
          <Card sx={{ height: 'calc( 100vh - 100px )' }}>
            <CardHeader title="Completadas" />
            <CardContent>
              { /* Agregar entradas */ }
              <EntryList status='finished'/>
            </CardContent>
           
          </Card>
        </Grid>


      </Grid>
    </Layout>
  )
}

export default HomePage
