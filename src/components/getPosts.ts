import { sanityClient } from "../../sanity";

export const getStaticPaths = async () => {
  const query = `*[_type == "post"]{
  _id,
  title,
  slug,
  author -> {
  name,
  image
},
description,
mainImage,
slug
}`;

  const posts = await sanityClient.fetch(query);
  return {
    props: {
      posts,
    },
  };
};
