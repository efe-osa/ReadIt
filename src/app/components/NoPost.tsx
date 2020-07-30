import React from 'react';
import emptybox from '../../assets/images/empty-box.svg';

const NoPosts = () => {
  return (
    <section className="flex w-full flex-col justify-center items-center h-screen overflow-hidden">
      <img className="opacity-4" src={emptybox} alt="No posts found" width={150} />
      <h1 className="text-3xl">No posts found.</h1>
    </section>
  );
};

export default NoPosts;
