import React, { useEffect, useState } from "react";
// @ts-ignore
import ReactStars from "react-rating-stars-component";
import useFetch from "@/app/hooks/useFetch";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";

type componentProps = {
  pickedUniversity: number | boolean
}
export const PathReview = ({ pickedUniversity }: componentProps) => {
  const { data, isLoading, isError } = useFetch("/api/study-paths-for-all");
  const [specificUniData, setSpecificUniData] = useState<any[]>([]);
  useEffect(() => {
    console.log(data);
    console.log(pickedUniversity);
    if (data != null) {
      let filteredData = data.data.filter(
        (uni: any) => uni.id === pickedUniversity
      );
      setSpecificUniData(filteredData);
    }
    console.log(specificUniData);
  }, [pickedUniversity, data]);
  const ratingChanged = (newRating: any) => {
    console.log(newRating);
  };

  return (
    <div>
      {pickedUniversity && data && (
        <div>
          <div>
            {data.data.map((university: any) => {
              console.log(university.department.university.id);
              if (university.department.university.id === pickedUniversity) {
                return (
                  <div key={university.id}>
                    {university.name}
                    <ReactStars
                      count={5}
                      onChange={ratingChanged}
                      size={24}
                      activeColor="#ffd700"
                    />
                  </div>
                );
              }
              // return (
              //   <div key={university.id}>
              //     {university.name}
              //     <ReactStars
              //       count={5}
              //       onChange={ratingChanged}
              //       size={24}
              //       activeColor="#ffd700"
              //     />
              //   </div>
              // );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
