import axios from "axios"

// image upload
export const imageUpload=async image=>{
    const formData=new FormData()
formData.append('image',image)
     // 1. Upload image and get image url
  const { data } = await axios.post(
    `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_IMAGE_HOSTING_KEY
    }`,
    formData
    // image,{
    //   headers: {
    //     'Content-Type': 'multipart/form-data',
    //   },
    // }
  )
const imageUrl=data.data.display_url
return imageUrl
}