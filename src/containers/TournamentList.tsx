import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MessageBox from '../components/MessageBox';
import Button from '../components/Button';
import TournamentCard from '../components/TournamentCard';
import Grid from '../components/Grid';
import { fetchTournaments } from '../actions/tournaments';
import { IStore } from '../interfaces';

const TournamentList: React.FC = () => {
  const dispatch = useDispatch();
  const tournamentsReducer = useSelector((state: IStore) => state.tournaments);
  const { tournamentsObject, tournamentsLoading, error } = tournamentsReducer;

  useEffect(() => {
    getTournaments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getTournaments = () => {
    dispatch(fetchTournaments());
  };

  if (tournamentsLoading) {
    return <MessageBox>Loading tournaments ...</MessageBox>;
  }

  if (error) {
    return (
      <MessageBox>
        Something went wrong.
        <Button
          onClick={() => {
            getTournaments();
          }}
        >
          Retry
        </Button>
      </MessageBox>
    );
  }

  if (!Object.keys(tournamentsObject).length) {
    return <MessageBox>No tournaments found.</MessageBox>;
  }

  return (
    <Grid>
      {Object.keys(tournamentsObject).map((tournamentId, index) => (
        <TournamentCard
          key={index}
          tournament={tournamentsObject[tournamentId]}
        />
      ))}
    </Grid>
  );
};

export default TournamentList;
