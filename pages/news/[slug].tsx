import { GetStaticProps } from "next";
import React, { useState } from "react";
import Header from "../../src/components/header";
import { sanityClient, urlFor } from "../../sanity";
import { Post } from "../../typings";
import PortableText from "react-portable-text";
import { useForm, SubmitHandler } from "react-hook-form";

interface Props {
  post: Post;
}

interface IFormInput {
  _id: string;
  name: string;
  email: string;
  comment: string;
}

const Post = ({ post }: Props) => {
  const [submitted, setSubmitted] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    fetch("/api/createComment", {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then(() => {
        console.log(data);
        setSubmitted(true);
      })
      .catch((e) => {
        console.log(e);
        setSubmitted(false);
      });
  };

  return (
    <main>
      <Header />
      <div className="bg-black flex items-center mb-10">
        <h1 className="text-3xl mt-10 mb-3 text-white m-10">{post.title}</h1>
      </div>

      <div className="flex, w-2xl px-20">
        <img
          className="w-full "
          src={urlFor(post.mainImage).url()}
          alt="coverImage"
        />
      </div>
      <article className="max-w-3xl mx-auto p-5">
        <div className="flex items-center space-x-2">
          <img
            className="h-10 w-10 rounded-full"
            src={urlFor(post.author.image).url()}
            alt=""
          />
          <p className="font-extralight text-sm">
            Blog post by {post.author.name} - Published at{" "}
            {new Date(post._createdAt).toLocaleString()}
          </p>
        </div>
        <div>
          <PortableText
            dataset={process.env.NEXT_PUBLIC_SANITY_DATASET}
            projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
            content={post.body}
            serializers={{
              h1: (props: any) => (
                <h1 className="text-2xl font-bold my-5" {...props} />
              ),
              h2: (props: any) => (
                <h2 className="text-xl font-bold my-5" {...props} />
              ),
              li: ({ children }: any) => (
                <li className="ml-4 list-disc">{children}</li>
              ),
              link: ({ href, children }: any) => (
                <a href={href} className="text-blue-500 hover:underline">
                  {children}
                </a>
              ),
              normal: ({ children }: any) => <p className="mt-5">{children}</p>,
            }}
          />
        </div>
      </article>
      <hr className="max-w-lg my-5 mx-auto border border-red-500 mb-10" />
      {submitted && (
        <div className="flex flex-col py-10 my-10 max-w-2xl mx-auto bg-red-500 text-white">
          <h3 className="text-3xl font-bold">Thanks for your submission</h3>
          <p>Once this has been approved, it will appear below</p>
        </div>
      )}
      <form
        className="flex flex-col p-5 max-w-2xl mx-auto"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input {...register("_id")} type="hidden" name="_id" value={post._id} />
        <label className="block mb-5">
          <span className="text-gray-700">Name</span>
          <input
            {...register("name", { required: true })}
            className="shadow border rounded py-2 px-3 form-input mt-1 block w-full"
            placeholder="John Smith"
          />
        </label>
        <label className="block mb-5">
          <span className="text-gray-700">Email</span>
          <input
            {...register("email", { required: true })}
            className="shadow border rounded py-2 px-3 form-input mt-1 block w-full"
            placeholder="youremail@email.com"
            type="email"
          />
        </label>
        <label className="block mb-5">
          <span className="text-gray-700">Comment</span>
          <textarea
            {...register("comment", { required: true })}
            className="shadow border rounded py-2 px-3 form-text-area mt-1 block w-full"
            placeholder="Comments"
            rows={8}
          />
        </label>
        <div className="flex flex-col p-5">
          {errors.name && (
            <span className="text-red-500">Field is required</span>
          )}
          {errors.email && (
            <span className="text-red-500">Email is required</span>
          )}
          {errors.comment && (
            <span className="text-red-500">Comment is required</span>
          )}
          <input
            type="submit"
            name="submit"
            id="submit"
            className="shadow bg-red-500 hover:bg-red-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded cursor-pointer"
          />
        </div>
      </form>
      <div className="flex flex-col p-10 my-10 max-w-2xl mx-auto shadow-red-500 shadow space-y-2">
        <h3 className="text-4xl">Comments</h3>
        <hr className="pb-2" />
        {post.comments.map((comment) => (
          <div key={comment._id}>
            <p>
              <span className="text-red-500"> {comment.name}: </span>
              {comment.comment}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Post;

export const getStaticPaths = async () => {
  const query = `*[_type == "post"]{
  _id,
  slug {
    current
  }
}`;

  const posts = await sanityClient.fetch(query);
  const paths = posts.map((post: Post) => ({
    params: {
      slug: post.slug.current,
    },
  }));
  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const query = `*[_type == "post" && slug.current == $slug][0]{
  _id,
  _createdAt,
  title,
  author -> {
  name,
  image
},
'comments': *[
    _type == "comment" && 
    post._ref == ^._id &&
    approved == true],
description,
mainImage,
slug,
body,
}`;

  const post = await sanityClient.fetch(query, {
    slug: params?.slug,
  });
  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post,
    },
    revalidate: 20,
  };
};
