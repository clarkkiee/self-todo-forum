import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Formik, Field, Form } from "formik";
import * as yup from "yup";

function EditPost() {
  const [postDetails, setPostDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const userId = location.state.userId;
  const postId = location.state.postId;

  const getPostDetailsData = async () => {
    await axios
      .get(
        `http://localhost:8000/api/dashboard/post?userId=${userId}&postId=${postId}`,
        { withCredentials: true }
      )
      .then((response) => setPostDetails(response.data));
    setLoading(false);
  };

  useEffect(() => {
    getPostDetailsData();
  }, [userId, postId]);

  const handleUpdatedPost = async (postUpdated) => {
    const dataSend = {
      userId: userId,
      postId: postId,
      postUpdated,
    };
    const editPost = await axios.put(
      "http://localhost:8000/api/dashboard/edit",
      dataSend,
      {
        withCredentials: true,
      }
    ).then(() => navigate('/dashboard'))
    // console.log(editPost);
  };

  const postSchema = yup.object().shape({
    title: yup.string().required("Required"),
    content: yup.string().required("Required"),
  });

  return (
    <div className="flex w-[100%] min-h-screen justify-center items-center mx-auto bg-primary-dark">
      <div className="z-[100] bg-purple rounded-xl p-8">
        {loading ? (
          <p>Loading ...</p>
        ) : (
          <Formik
            initialValues={{
              title: postDetails.title,
              content: postDetails.content,
              tag: postDetails.tag,
            }}
            validationSchema={postSchema}
            onSubmit={async (values, { resetForm }) => {
              handleUpdatedPost(values);
              resetForm();
            }}
          >
            {({ errors }) => (
              <Form className="flex flex-col gap-12 w-[30vw]">
                <div className="flex flex-col">
                  <label
                    htmlFor="title"
                    className="font-semibold text-sm text-pink my-2"
                  >
                    Title
                  </label>
                  <Field
                    id="title"
                    name="title"
                    className="bg-transparent outline-none border-b-2 border-pink text-primary-dark text-sm font-semibold p-1"
                  />
                  {errors.title && (
                    <p className="text-[10px] text-primary-dark font-semibold py-2 ">
                      {errors.title}
                    </p>
                  )}
                </div>

                <div className="flex flex-col">
                  <label
                    htmlFor="content"
                    className="font-semibold text-sm my-2 text-pink"
                  >
                    Content
                  </label>
                  <Field
                    id="content"
                    name="content"
                    as="textarea"
                    className="bg-transparent outline-none border-b-2 border-pink text-primary-dark text-sm font-semibold p-1"
                  />
                  {errors.content && (
                    <p className="text-[10px] text-primary-dark font-semibold py-2 ">
                      {errors.content}
                    </p>
                  )}
                </div>

                <div className="flex flex-col">
                  <label
                    htmlFor="tag"
                    className="font-semibold text-sm text-pink my-2"
                  >
                    Tag
                  </label>
                  <Field
                    id="tag"
                    name="tag"
                    className="bg-transparent outline-none border-b-2 border-pink text-primary-dark text-sm font-semibold p-1"
                  />
                </div>
                <button
                  className="py-2 px-6 font-semibold text-pink bg-primary-dark rounded-lg hover:opacity-85"
                  type="submit"
                >
                  Edit
                </button>
              </Form>
            )}
          </Formik>
        )}
      </div>
    </div>
  );
}

export default EditPost;
