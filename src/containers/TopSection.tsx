import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import debounce from 'lodash.debounce';
import theme from '../theme';

import Button from '../components/Button';
import Input from '../components/Input';
import {
  createTournament,
  fetchTournaments,
  tournamentsSearchTextUpdated
} from '../actions/tournaments';
import { NewTournament } from '../objects';
import { IStore } from '../interfaces';

const TopSection: React.FC = () => {
  const dispatch = useDispatch();
  const initialRender = useRef(true);
  const tournamentsReducer = useSelector((state: IStore) => state.tournaments);
  const { searchText } = tournamentsReducer;

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }

    const debouncedSearch = debounce((searchText: string) => {
      dispatch(fetchTournaments(searchText));
    }, 600);

    debouncedSearch(searchText);

    return debouncedSearch.cancel;
  }, [dispatch, searchText]);

  const handleCreateTournament = (
    event: React.MouseEvent<HTMLButtonElement>
  ): void => {
    const tournamentName = prompt('Tournament Name:');

    if (tournamentName) {
      dispatch(createTournament(new NewTournament(tournamentName)));
    }
  };

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    dispatch(tournamentsSearchTextUpdated(event.target.value));
  };

  return (
    <Wrapper>
      <Input
        placeholder="Search tournament ..."
        onChange={handleSearchInputChange}
        value={searchText}
      />
      <Button onClick={handleCreateTournament}>CREATE TOURNAMENT</Button>
    </Wrapper>
  );
};

export default TopSection;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: ${theme.spacing(6)} auto;
`;
