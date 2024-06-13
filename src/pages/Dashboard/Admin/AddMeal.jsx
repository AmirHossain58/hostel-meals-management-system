import { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { Helmet } from "react-helmet-async";
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import AddMealForm from "../../../components/Form/AddMealForm";
import { imageUpload } from "../../../Api/utils";
import { useForm } from "react-hook-form";
const AddMeal = () => {
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const [imagePreview, setImagePreview] = useState();
  const [imageValue, setImageValue] = useState();
  const [imageText, setImageText] = useState("Upload Image");
  const [dates, setDates] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  //Date range handler
  const handleDates = (item) => {
    setDates(item.selection);
  };

  const { mutateAsync } = useMutation({
    mutationFn: async (mealData) => {
      const { data } = await axiosSecure.post(`/meals`, mealData);
      return data;
    },
    onSuccess: () => {
      ("Data Saved Successfully");
      toast.success(" Meal Added Successfully!");
      navigate("/dashboard/all-meals");
      setLoading(false);
    },
  });

  //   Form handler
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    imageValue;
    setLoading(true);
    const title = data.title;
    const category = data.category;
    const ingredients = data.ingredients;
    const price = data.price;
    const description = data.description;
    const admin = {
      name: user?.displayName,
      image: user?.photoURL,
      email: user?.email,
    };

    try {
      const image_url = await imageUpload(imageValue);
      const mealData = {
        title,
        category,
        image: image_url,
        ingredients: [ingredients.split(",")],
        description,
        price: parseInt(price),
        rating: 0,
        postTime: new Date(),
        like: 0,
        reviews: [],
        reviewCount: 0,
        admin: admin,
        likesInfo: [],
      };
      console.table(mealData);
      //   Post request to server
      await mutateAsync(mealData);
      setLoading(false);
    } catch (err) {
      err;
      toast.error(err.message);
      setLoading(false);
    }
  };

  //   handle image change
  const handleImage = (image) => {
    setImageValue(image);
    setImagePreview(URL.createObjectURL(image));
    setImageText(image.name);
  };

  return (
    <>
      <Helmet>
        <title>Add Meal | Dashboard</title>
      </Helmet>

      <div className="md:mt-16">
        {/* Form */}
        <AddMealForm
          handleDates={handleDates}
          handleSubmit={handleSubmit}
          register={register}
          error={errors}
          onSubmit={onSubmit}
          setImagePreview={setImagePreview}
          imagePreview={imagePreview}
          handleImage={handleImage}
          imageText={imageText}
          loading={loading}
        />
      </div>
    </>
  );
};

export default AddMeal;
