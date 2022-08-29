// src/routes.js

import { lazy } from "solid-js"
import StoriesData from "./pages/[...stories].data"
import StoryData from "./pages/stories/[id].data"

export default [
  {
    path: "/stories/:id",
    component: lazy(
      () => import("./pages/stories/[id]")
    ),
    data: StoryData
  },
  {
    path: "/*stories",
    component: lazy(
      () => import("./pages/[...stories]")
    ),
    data: StoriesData
  }
]