import React from "react";
import { useNavigate } from "react-router-dom";
import { Field, Form, Formik } from "formik";

function SearchBar() {
  const navigate = useNavigate();

  return (
    <div>
      <Formik
        initialValues={{ userSearch: "" }}
        onSubmit={async (value) => {
          navigate("/user", { state: { username: value.userSearch } });
        }}
      >
        <Form>
          <div className="flex">
            <Field
              id="userSearch"
              name="userSearch"
              type="text"
              placeholder="Cari user lain..."
              className="rounded-full bg-secondary-dark p-2 outline-none w-72 placeholder-pink px-4 text-pink"
            />
            <button type="submit"></button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}

export default SearchBar;
