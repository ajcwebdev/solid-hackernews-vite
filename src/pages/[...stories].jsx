// src/pages/[...stories].jsx

import { Link, useRouteData } from "solid-app-router"

function Story(props) {
  return (
    <li class="news-item">
      <span class="score">{props.story.points}</span>
      <span class="title">
        <Show
          when={props.story.url && !props.story.url.startsWith('item?id=')}
          fallback={<Link href={`/item/${props.story.id}`}>{props.story.title}</Link>}
        >
          <a href={props.story.url} target="_blank" rel="noreferrer">
            {props.story.title}
          </a>
          <span class="host"> ({props.story.domain})</span>
        </Show>
      </span>
      <br />
      <span class="meta">
        <Show
          when={props.story.type !== "job"}
          fallback={<Link href={`/stories/${props.story.id}`}>{props.story.time_ago}</Link>}
        >
          by {props.story.user}{" "}
          {props.story.time_ago} |{" "}
          <Link href={`/stories/${props.story.id}`}>
            {props.story.comments_count ? `${props.story.comments_count} comments` : "discuss"}
          </Link>
        </Show>
      </span>
      <Show when={props.story.type !== "link"}>
        {" "}
        <span class="label">{props.story.type}</span>
      </Show>
    </li>
  )
}

export default function Stories() {
  const { stories, type, page } = useRouteData()

  return (
    <div class="news-view">
      <div class="news-list-nav">
        <Show
          when={page() > 1}
          fallback={
            <span class="page-link disabled" aria-hidden="true">
              &lt; prev
            </span>
          }
        >
          <Link
            class="page-link"
            href={`/${type()}?page=${page() - 1}`}
            aria-label="Previous Page"
          >
            {"<"} prev
          </Link>
        </Show>
        <span>page {page()}</span>
        <Show
          when={stories()?.length >= 28}
          fallback={
            <span class="page-link disabled" aria-hidden="true">
              more &gt;
            </span>
          }
        >
          <Link
            class="page-link"
            href={`/${type()}?page=${page() + 1}`}
            aria-label="Next Page"
          >
            more {">"}
          </Link>
        </Show>
      </div>
      <main class="news-list">
        <Show when={stories()}>
          <ul>
            <For each={stories()}>
              {(story) => <Story story={story} />}
            </For>
          </ul>
        </Show>
      </main>
    </div>
  )
}