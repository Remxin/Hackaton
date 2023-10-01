"use client";
import React, { useEffect, useState } from "react";
// @ts-ignore
import ReactStars from "react-rating-stars-component";
import useFetch from "@/app/hooks/useFetch";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { PathReview } from "@/app/opinions/pathReview";

const Page = () => {
  ///api/user/register
  const [pickedUniversity, setPickedUniversity] = useState<number | boolean>(
    false
  );

  const ratingChanged = (newRating: any) => {
    console.log(newRating);
  };
  const { data, isLoading, isError } = useFetch("/api/study-paths-for-all");
  const [pathData, setPathData] = useState<any[]>([]);
  const uniData = useFetch("/api/university");
  console.log(data);
  console.log(uniData.data);

  useEffect(() => {
    console.log(data);
    console.log(uniData.data);
    console.log(pickedUniversity);
  });

  const uniCardClick = (id: number) => {
    setPickedUniversity(id);
  };

  return (
    <div className="flex-auto content-center h-screen items-center w-screen bg-white text-black">
      {data && (
        <div>
          {/* {data.data.map((university: any) => {
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
          })} */}
        </div>
      )}
      {uniData.data && !pickedUniversity && (
        <div className="flex content-center flex-col">
          {uniData.data.data.map((university: any, idx: number) => {
            return (
              <Card
                className="m-auto mb-4 mt-4 w-3/4"
                shadow="sm"
                key={idx}
                isPressable
                onPress={() => uniCardClick(university.id)}
              >
                <CardBody className="overflow-visible p-0">
                  <Image
                    shadow="sm"
                    radius="lg"
                    width="100vw"
                    alt={university.name}
                    className="w-full object-cover h-[140px]"
                    src={`/assets/universities/${university.id}.png`}
                  />
                </CardBody>
                <CardFooter className="text-small justify-between">
                  <b>{university.name}</b>
                  {/* <p className="text-default-500">{university.name}</p> */}
                </CardFooter>
              </Card>
            );
            //   <div key={university.id}>{university.name}</div>;
          })}
        </div>
      )}
      {pickedUniversity && (
        <div>
          <div>
            <PathReview pickedUniversity={pickedUniversity} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
