import React, { Fragment } from 'react';
import placeholder from '../../../assets/images/placeholder.jpg';
import { Post } from '../../types';
import { formatDate } from '../../utils';

export const SubRedditsTabs = ({
  subReddits,
  selectSubReddit,
  selectedSubReddit,
}: {
  subReddits: string[];
  selectSubReddit: (e: React.MouseEvent<HTMLButtonElement>) => void;
  selectedSubReddit: string;
}): JSX.Element => {
  return (
    <nav className="focus:border-pink-200 focus:border bg-gray-100 p-3 mx-2 flex flex-column items-start overflow-y-scroll w-full md:w-64 md:flex-col md:align-start md:overflow-x-scroll md:h-screen">
      {['All', ...subReddits].map((sr, idx) => (
        <div className="mr-2 mb-1" key={sr + idx}>
          <button
            onClick={selectSubReddit}
            className={`text-center ${
              selectedSubReddit === sr
                ? 'border-indigo-500 bg-indigo-500'
                : 'hover:border-gray-200 hover:bg-indigo-700 bg-gray-500 border-white  border '
            } rounded py-2 px-4 font-semibold caapitalize text-white`}
            name={sr}
          >
            #{sr}
          </button>
        </div>
      ))}
    </nav>
  );
};

const PostItem = ({ post }: { post: Post }) => {
  const { title, thumbnail, created, url, subreddit } = post;
  return (
    <li className="border border-gray-400 lg:border-gray-400 bg-white hover:shadow rounded-md flex mb-2">
      <picture className="mr-2 h-full object-cover overflow-hidden rounded rounded-tr-none rounded-br-none">
        <img
          width="150"
          height="150"
          src={thumbnail || placeholder}
          alt={title}
          style={{ backgroundImage: placeholder }}
        />
      </picture>
      <div className="text-left w-full py-2">
        <h4 className="text-gray-900 hover:text-indigo-500 font-bold text-xl mb-2">
          <a href={url}>{title}</a>
        </h4>
        <div className="flex flex-col md:flex-row items-start px-2">
          <p>
            <span>
              {['Ups', 'Downs'].map((vote) => (
                <>
                  {vote}
                  <span className="md:inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mx-2">
                    {post[vote.trim().toLowerCase() as keyof Post]}
                  </span>
                </>
              ))}
              <span className="inline-block bg-pink-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mt-2 mx-2">
                #{subreddit}
              </span>
            </span>
          </p>
          <p className="text-gray-600 text-base ml-auto">{formatDate(created)}</p>
        </div>
      </div>
    </li>
  );
};

export const PostList = (props: { data: Post[] }): JSX.Element => (
  <ol className="overflow-x-scroll h-screen m-4">
    {props.data.map((post) => (
      <Fragment key={post.id}>
        <PostItem post={post} />
      </Fragment>
    ))}
  </ol>
);
