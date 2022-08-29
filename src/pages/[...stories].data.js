// src/pages/[...stories].data.js

import { createResource } from "solid-js"
import fetchAPI from "../lib/api"

const mapStories = {
  top: "news",
  new: "newest",
}

export default function StoriesData({ location, params }) {
  const page = () => +(location.query.page || 1),
    type = () => params.stories || "top",
    [stories] = createResource(
      () => `${mapStories[type()]}?page=${page()}`,
      fetchAPI
    )
  return { type, stories, page }
}