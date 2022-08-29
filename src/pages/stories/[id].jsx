// src/pages/stories/[id].jsx

import { useRouteData } from "solid-app-router"
import { createSignal } from "solid-js"

const pluralize = (n) => n + (n === 1 ? " reply" : " replies")

function Comment(props) {
  const [open, setOpen] = createSignal(true)
  return (
    <li class="comment">
      <div class="by">
        {props.comment.user}{" "}
        {props.comment.time_ago} ago
      </div>
      <div class="text" innerHTML={props.comment.content} />
      <Show when={props.comment.comments.length}>
        <div class="toggle" classList={{ open: open() }}>
          <a onClick={() => setOpen(!open())}>
            {open() ? "[-]" : "[+] " + pluralize(props.comment.comments.length) + " collapsed"}
          </a>
        </div>
        <Show when={open()}>
          <ul class="comment-children">
            <For each={props.comment.comments}>{(comment) => <Comment comment={comment} />}</For>
          </ul>
        </Show>
      </Show>
    </li>
  )
}

export default function Story() {
  const story = useRouteData()
  return (
    <Show when={story()}>
      <div class="item-view">
        <div class="item-view-header">
          <a href={story().url} target="_blank">
            <h1>{story().title}</h1>
          </a>
          <Show when={story().domain}>
            <span class="host">
              ({story().domain})
            </span>
          </Show>
          <p class="meta">
            {story().points} points | by{" "}
              {story().user}{" "}
            {story().time_ago} ago
          </p>
        </div>
        <div class="item-view-comments">
          <p class="item-view-comments-header">
            {story().comments_count
              ? story().comments_count + " comments"
              : "No comments yet."}
          </p>
          <ul class="comment-children">
            <For each={story().comments}>{(comment) => <Comment comment={comment} />}</For>
          </ul>
        </div>
      </div>
    </Show>
  )
}