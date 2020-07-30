import { queryByName, queryByUpDate, queryByUpVotes } from 'app/utils';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeFetchPosts, selectPosts } from '../components/Posts/posts.reducer';
import { Post } from '../types';

export default () => {
  const dispatch = useDispatch();
  const { data, error, loading } = useSelector(selectPosts);
  const [searchValue, setSearchValue] = useState('');
  const [selectedSubReddit, setSelectedSubReddit] = useState('All');
  const [subReddits, setSubReddits] = useState<string[]>([]);
  const [queryResults, setQueryResults] = useState<Post[]>([]);
  const [upVotesFilter, setUpVotesFilter] = useState(0);
  const [dateFilter, setDateFilter] = useState(0);

  const handelSortByUpVotes = ({
    currentTarget: { name },
  }: React.MouseEvent<HTMLButtonElement>) => {
    const results = [...queryResults].sort((prev, next) => {
      return /lowest/i.test(name) ? prev.ups - next.ups : next.ups - prev.ups;
    });
    setQueryResults(results);
  };

  const filteredBySubReddit = useMemo(
    () =>
      selectedSubReddit.toLowerCase() !== 'all'
        ? data.filter((post) => post.subreddit === selectedSubReddit)
        : data,
    [data, selectedSubReddit],
  );

  const handleFilter = ({ target: { name, value } }: React.ChangeEvent<HTMLSelectElement>) => {
    name === 'dateFilter' ? setDateFilter(Number(value)) : setUpVotesFilter(Number(value));
  };

  const filteredByName = useMemo(() => queryByName(filteredBySubReddit, searchValue), [
    filteredBySubReddit,
    searchValue,
  ]);

  const handleSearch = ({ currentTarget: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(value);
  };

  const selectSubReddit = ({ currentTarget: { name } }: React.MouseEvent<HTMLButtonElement>) =>
    setSelectedSubReddit(name);

  useEffect(() => {
    dispatch(makeFetchPosts());
  }, [dispatch]);

  useEffect(() => {
    const results = data.map((post) => post.subreddit);
    setSubReddits(results);
  }, [data]);

  const queryPosts = useCallback(() => {
    if (selectedSubReddit.toLowerCase() !== 'all') {
      return filteredByName;
    }

    if (upVotesFilter && dateFilter) {
      return queryByUpVotes(queryByUpDate(filteredByName, dateFilter), upVotesFilter);
    }

    if (dateFilter) {
      return queryByUpDate(filteredByName, dateFilter);
    }

    if (upVotesFilter) {
      return queryByUpVotes(filteredByName, upVotesFilter);
    }
    return filteredByName;
  }, [filteredByName, selectedSubReddit, upVotesFilter, dateFilter]);

  useEffect(() => {
    const posts = queryPosts();
    setQueryResults(posts);
  }, [setQueryResults, queryPosts]);

  return {
    posts: queryResults,
    isLoading: loading,
    error: error,
    searchValue,
    handleFilter,
    handleSearch,
    subReddits,
    selectSubReddit,
    selectedSubReddit,
    handelSortByUpVotes,
  };
};
