import Container from "../../components/Shared/Container";
import { Helmet } from "react-helmet-async";
import Heading from "../../components/Shared/Heading";
import MealsRequest from "../../components/MealsRequest/MealsRequest";
import { useParams } from "react-router-dom";
import useAxiosCommon from "../../hooks/useAxiosCommon";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";

const MealsDetails = () => {
  const { id } = useParams();
  const axiosCommon = useAxiosCommon();
  const { data: meal = {}, isLoading } = useQuery({
    queryKey: ["meals"],
    queryFn: async () => {
      const res = await axiosCommon(`/meals/${id}`);
      return res.data;
    },
  });
  if (isLoading) return <LoadingSpinner />;

  return (
    <Container>
      <Helmet>
        <title>{meal?.title}</title>
      </Helmet>
      {meal && (
        <div className="max-w-screen-lg mx-auto">
          {/* Header */}
          <div className="flex flex-col gap-6">
            <div>
              <Heading title={meal.title} subtitle={meal.location} />
              <div className="w-full md:h-[60vh] overflow-hidden rounded-xl">
                <img
                  className="object-cover w-full"
                  src={meal.image}
                  alt="header image"
                />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
            {/* Room Info */}
            <div className="col-span-4 flex flex-col gap-8">
              <div className="flex flex-col gap-2">
                <div
                  className="
                text-xl 
                font-semibold 
                flex 
                flex-row 
                items-center
                gap-2
              "
                >
                  <div>Hosted by {meal?.host?.name}</div>

                  <img
                    className="rounded-full"
                    height="30"
                    width="30"
                    alt="Avatar"
                    src={meal?.host?.image}
                  />
                </div>
                <div
                  className="
                flex 
                flex-row 
                items-center 
                gap-4 
                font-light
                text-neutral-500
              "
                >
                  <div>{meal?.guests} guests</div>
                  <div>{meal?.bedrooms} rooms</div>
                  <div>{meal?.bathrooms} bathrooms</div>
                </div>
              </div>

              <hr />
              <div
                className="
          text-lg font-light text-neutral-500"
              >
                {meal?.description}
              </div>
              <hr />
            </div>

            <div className="md:col-span-3 order-first md:order-last mb-10">
              {/* MealsRequest */}
              <MealsRequest room={meal} />
            </div>
          </div>
        </div>
      )}
    </Container>
  );
};

export default MealsDetails;
