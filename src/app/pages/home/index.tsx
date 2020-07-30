import { Months } from 'app/utils';
import React from 'react';
import Loader from '../../components/Loader';
import NoPosts from '../../components/NoPost';
import { PostList, SubRedditsTabs } from '../../components/Posts/components';
import usePosts from '../../hooks/usePosts';

export default function Home(): JSX.Element {
  const {
    isLoading,
    error,
    posts,
    subReddits,
    selectSubReddit,
    selectedSubReddit,
    handleSearch,
    handelSortByUpVotes,
    handleFilter,
  } = usePosts();

  return (
    <div className="mx-4">
      <h1 className="text-5xl font-bold">ReadIt!</h1>

      <section className="flex flex-col md:flex-row">
        <SubRedditsTabs
          subReddits={subReddits}
          selectSubReddit={selectSubReddit}
          selectedSubReddit={selectedSubReddit}
        />
        <div className="w-full py-2">
          {/** TODO: move into Filters Component */}
          <div className="flex flex-col lg:flex-row justify-between">
            <div className="flex flex-col sm:flex-row items-baseline justify-evenly">
              <label htmlFor="search" />
              <input
                onChange={handleSearch}
                name="search"
                className="mr-3 bg-gray-100 focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block appearance-none leading-normal"
                type="text"
                placeholder="Search by name..."
              />
              <label htmlFor="sortby" className="mx-2 my-3 font-semibold">
                Sort by:
              </label>
              <select
                onChange={handleFilter}
                name="dateFilter"
                className="mr-3 mb-2 appearance-none bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value=""> By date</option>
                {Months.map((vote, idx) => (
                  <option key={vote + idx} value={idx}>
                    {vote}
                  </option>
                ))}
              </select>
              <select
                onChange={handleFilter}
                name="upVotesFilter"
                className="appearance-none bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value=""> By up votes</option>
                {[100000, 80000, 50000, 20000].map((vote, idx) => (
                  <option key={vote + idx} value={vote}>
                    Less than {vote}
                  </option>
                ))}
              </select>
            </div>
            <h2 className="text-4xl italic text-bold text-right capitalize ">
              {selectedSubReddit}
            </h2>
          </div>
          <article className="border-t mt-5 pt-2">
            <h3 className="flex w-full items-baseline justify-end">
              <label htmlFor="sort-by-upvotes" className="mx-2 my-3 font-semibold">
                Sort By UpVotes:
              </label>
              {[
                { name: 'highest-votes', label: 'Highest' },
                { name: 'lowest-votes', label: 'Lowest' },
              ].map(({ name, label }) => (
                <button
                  key={name}
                  onClick={handelSortByUpVotes}
                  name={name}
                  className="bg-transparent border-t hover:bg-indigo-400 font-bold py-2 px-4 border-b-2 border-indigo-700 hover:border-indigo-500 rounded mr-1"
                >
                  {label}
                </button>
              ))}
            </h3>
            {isLoading ? (
              <Loader />
            ) : posts.length === 0 || error ? (
              <NoPosts />
            ) : (
              <PostList data={posts} />
            )}
          </article>
        </div>
      </section>
    </div>
  );
}
