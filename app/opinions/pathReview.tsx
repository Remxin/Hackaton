import React, { useEffect, useState } from "react";
// @ts-ignore
import ReactStars from "react-rating-stars-component";
import useFetch from "@/app/hooks/useFetch";
import {
  Card,
  CardBody,
  CardFooter,
  Image,
  CardHeader,
} from "@nextui-org/react";
import { appConstants } from "@/constants/app";

type componentProps = {
  pickedUniversity: number | boolean
}
export const PathReview = ({ pickedUniversity }: componentProps) => {
  const { data, isLoading, isError } = useFetch("/api/study-paths-for-all");
  const [specificUniData, setSpecificUniData] = useState<any[]>([]);
  const [stars, setStars] = useState<number>(0);
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
    setStars(newRating);
  };
  //@ts-ignore
  const handleReviewEndpoint = (universityId, studyPathId) => {
    const objToSend = {
      userId: "87e36282-d56d-4dfb-b96c-2767c76a2766",
      score: stars,
      universityId: universityId,
      studyPathId: studyPathId,
    };
    // console.log(stars);
    console.log(objToSend);
    fetch(`${appConstants.appIP}/api/review-study-path`, {
      method: "POST",
      body: JSON.stringify(objToSend),
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
        },
        (error) => {
          console.log(error);
        }
      );
  };

  return (
    <div>
      {pickedUniversity && data && (
        <div>
          <div className="grid grid-cols-3	">
            {data.data.map((university: any) => {
              // console.log(university.department.university.id);
              if (university.department.university.id === pickedUniversity) {
                return (
                  <div
                    key={university.id}
                    onClick={() =>
                      handleReviewEndpoint(
                        university.department.university.id,
                        university.categoryId
                      )
                    }
                  >
                    <Card className="max-w-[300px] ml-8 mb-6 mt-4">
                      <CardHeader className="flex gap-3">
                        <Image
                          alt="nextui logo"
                          height={30}
                          radius="sm"
                          src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
                          width={30}
                        />
                        <div className="flex flex-col">
                          <p className="text-md">{university.name}</p>
                        </div>
                      </CardHeader>

                      <CardBody>
                        <ReactStars
                          count={5}
                          onChange={ratingChanged}
                          size={24}
                          activeColor="#ffd700"
                        />
                      </CardBody>
                    </Card>

                    {/* {university.name}
                     */}
                  </div>
                );
              }
            })}
          </div>
        </div>
      )}
    </div>
  );
};
