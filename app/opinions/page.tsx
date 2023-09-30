"use client";
import React from "react";
// @ts-ignore
import ReactStars from "react-rating-stars-component";

const page = () => {
  ///api/user/register
  const ratingChanged = (newRating: any) => {
    console.log(newRating);
  };
  return (
    <div className="flex-auto content-center h-screen items-center w-screen">
      <ReactStars
        count={5}
        onChange={ratingChanged}
        size={24}
        activeColor="#ffd700"
      />
    </div>
  );
};

export default page;
