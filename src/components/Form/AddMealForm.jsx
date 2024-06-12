import { categories } from '../Categories/CategoriesData'
import { DateRange } from 'react-date-range'
import { TbFidgetSpinner } from 'react-icons/tb'
const AddMealForm = ({
  dates,
  handleDates,
  handleSubmit,
  setImagePreview,
  imagePreview,
  imageText,
  handleImage,
  loading,
  onSubmit,register,errors
}) => {
  return (
    <div className='w-full  flex flex-col justify-center items-center text-gray-800 rounded-xl bg-gray-50'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-10'>
          <div className='space-y-6'>
            <div className='space-y-1 text-sm'>
              <label htmlFor='title' className='block text-gray-600'>
                Title
              </label>
              <input
                className='w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md '
                name='title'
                id='title'
                type='text'
                placeholder='Title'
                required
                {...register("title", { required: true })} />
                {/* errors will return when field validation fails  */}
                {errors?.title && <span className='text-red-500'>This field is required</span>}
            </div>
            <div className='space-y-1 text-sm'>
              <label htmlFor='category' className='block text-gray-600'>
                Category
              </label>
              <select
                required
                className='w-full px-4 py-3 border-rose-300 focus:outline-rose-500 rounded-md'
                name='category'
                {...register("category", { required: true })} >
                {/* errors will return when field validation fails  */}
                {errors?.category && <span className='text-red-500'>This field is required</span>}

                {categories.slice(0,3).map(category => (
                  <option value={category.label} key={category.label}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>
            <div className='space-y-1 text-sm'>
              <label htmlFor='ingredients' className='block text-gray-600'>
                Ingredients
              </label>
              <input
                className='w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md '
                name='ingredients'
                id='ingredients'
                type='text'
                placeholder='ingredients'
                required
               {...register("ingredients", { required: true })} />
                {/* errors will return when field validation fails  */}
                {errors?.ingredients && <span className='text-red-500'>This field is required</span>}
            </div>

            
          </div>
          <div className='space-y-6'>
            

            <div className=' p-4 bg-white w-full  m-auto rounded-lg flex justify-between items-center'>
              <div className='file_upload px-5 py-3 relative border-4 border-dotted border-gray-300 rounded-lg'>
                <div className='flex flex-col w-max mx-auto text-center'>
                  <label>
                    <input
                      className='text-sm cursor-pointer w-36 hidden'
                      type='file'
                      onChange={e => handleImage(e.target.files[0])}
                      name='image'
                      id='image'
                      accept='image/*'
                      hidden
                    />
                    <div className='bg-rose-500 text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-rose-500'>
                      {/* {imageText} */}
                      {imageText.length > 20
                        ? imageText.split('.')[0].slice(0, 15) +
                          '....' +
                          imageText.split('.')[1]
                        : imageText}
                    </div>
                  </label>
                </div>
              </div>
              <div className='h-16 w-16 object-cover overflow-hidden flex items-center'>
                {imagePreview && <img src={imagePreview} />}
              </div>
            </div>
            <div className=''>
              <div className='space-y-1 text-sm'>
                <label htmlFor='price' className='block text-gray-600'>
                  Price
                </label>
                <input
                  className='w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md '
                  name='price'
                  id='price'
                  type='number'
                  placeholder='Price'
                  required
                  {...register("price", { required: true })} />
                  {/* errors will return when field validation fails  */}
                  {errors?.price && <span className='text-red-500'>This field is required</span>}
              </div>
            </div>
          </div>
        </div>
        <div className='space-y-1 text-sm my-2'>
              <label htmlFor='description' className='block text-gray-600'>
                Description
              </label>

              <textarea
                id='description'
                className='block rounded-md focus:rose-300 w-full h-32 px-4 py-3 text-gray-800  border border-rose-300 focus:outline-rose-500 '
                name='description'
                {...register("description", { required: true })} >
                {/* errors will return when field validation fails  */}
                {errors?.description && <span className='text-red-500'>This field is required</span>}

              </textarea>
            </div>       
        <button
          disabled={loading}
          type='submit'
          className='w-full p-3 mt-5 text-center font-medium text-white transition duration-200 rounded shadow-md bg-rose-500'
        >
          {loading ? (
            <TbFidgetSpinner className='animate-spin m-auto' />
          ) : (
            ' Save & Continue'
          )}
        </button>
      </form>
    </div>
  )
}

export default AddMealForm