import React from "react";
import { Formik, Field, Form } from "formik";
import { Link } from "react-router-dom";
import axios from "axios";
import * as yup from "yup";

function Postbox({ userdata }) {
  const handlePost = async (postData) => {
    const postDataFixed = {
      title: postData.title,
      content: postData.content,
      tag: postData.tag,
      authorId: userdata.userId,
    };
    const post = await axios.post(
      "//localhost:8000/api/communities/create-post",
      postDataFixed,
      { withCredentials: true }
    );
  };

  const postSchema = yup.object().shape({
    title: yup.string().required("Required"),
    content: yup.string().required("Required"),
  });

  return (
    <div className="relative mx-auto bg-purple rounded-xl p-8">
      <Formik
        initialValues={{
          title: "",
          content: "",
          tag: "",
        }}
        validationSchema={postSchema}
        onSubmit={async (values, { resetForm }) => {
          handlePost(values);
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
                className="bg-transparent outline-none border-b-2 border-pink text-primary-dark text-sm font-semibold p-1 h-32"
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
              Post
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Postbox;
