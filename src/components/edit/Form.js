import { useState } from "react";
import { useEditVideoMutation } from "../../features/api/apiSlice";
import Error from "../ui/Error";
import Success from "../ui/Success";
import TextArea from "../ui/TextArea";
import TextInput from "../ui/TextInput";

export default function Form({ video }) {
  const [editVideo, { isLoading, isError, isSuccess }] = useEditVideoMutation();
  const [formData, setFormDate] = useState({
    title: video.title,
    author: video.author,
    description: video.description,
    link: video.link,
    thumbnail: video.thumbnail,
    date: video.date,
    duration: video.duration,
    views: video.views,
  });

//   const resetForm = () => {
//     setFormDate({
//       title: "",
//       author: "",
//       description: "",
//       link: "",
//       thumbnail: "",
//       date: "",
//       duration: "",
//       views: "",
//     });
//   };

  const handleOnChange = (e) => {
    const newData = { ...formData };
    newData[e.target.name] = e.target.value;
    setFormDate(newData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    editVideo({ id: video.id, data: formData });
    // resetForm();
  };
  return (
    <form onSubmit={handleSubmit} method="POST">
      <div className="shadow overflow-hidden sm:rounded-md">
        <div className="px-4 py-5 bg-white sm:p-6">
          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6 sm:col-span-3">
              <TextInput
                title="Video Title"
                name="title"
                value={formData.title}
                onChange={handleOnChange}
              />
            </div>

            <div className="col-span-6 sm:col-span-3">
              <TextInput
                title="Author"
                name="author"
                value={formData.author}
                onChange={handleOnChange}
              />
            </div>

            <div className="col-span-6">
              <TextArea
                title="Description"
                name="description"
                value={formData.description}
                onChange={handleOnChange}
              />
            </div>

            <div className="col-span-6">
              <TextInput
                title="YouTube Video link"
                name="link"
                value={formData.link}
                onChange={handleOnChange}
              />
            </div>

            <div className="col-span-6">
              <TextInput
                title="Thumbnail link"
                name="thumbnail"
                value={formData.thumbnail}
                onChange={handleOnChange}
              />
            </div>

            <div className="col-span-6 sm:col-span-6 lg:col-span-2">
              <TextInput
                title="Upload Date"
                name="date"
                value={formData.date}
                onChange={handleOnChange}
              />
            </div>

            <div className="col-span-6 sm:col-span-3 lg:col-span-2">
              <TextInput
                title="Video Duration"
                name="duration"
                value={formData.duration}
                onChange={handleOnChange}
              />
            </div>

            <div className="col-span-6 sm:col-span-3 lg:col-span-2">
              <TextInput
                title="Video no of views"
                name="views"
                value={formData.views}
                onChange={handleOnChange}
              />
            </div>
          </div>
        </div>
        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
          <button
            disabled={isLoading}
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:ring-indigo-500"
          >
            Save
          </button>
        </div>
        {isSuccess && <Success message="Video was edited successfully" />}
        {isError && <Error message="There was an error occurred" />}
      </div>
    </form>
  );
}
